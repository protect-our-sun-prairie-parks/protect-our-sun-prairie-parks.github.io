// ============================================================
// Plant helper: a tiny program that runs on Cloudflare (in the cloud), NOT on the phone.
//
// Why it exists: the Pl@ntNet key must stay secret. So the key lives here, locked
// inside Cloudflare. The app sends the photo to this helper, the helper adds the
// key and asks Pl@ntNet, then passes the answer back. Nothing is saved.
// It also keeps the city's email address, so the address isn't in our public code.
// Two security checks protect our 500 free photo checks a day from robots:
//   a speed limit (PHOTO_LIMIT) and a "are you a real person?" check (Cloudflare Turnstile).
//
// Setup (an adult does this once): see README.md, "Set up the plant helper".
// Cloudflare settings it needs:
//   PLANTNET_KEY  (Secret)  the Pl@ntNet key
//   CITY_EMAIL    (Secret)  the email address that plant reports go to
//   ALLOWED_SITES (Text)    websites allowed to use this helper, separated by commas,
//                           like: https://USERNAME.github.io,http://localhost:8000
//   TURNSTILE_SECRET (Secret) the Turnstile widget's secret key. Until it's added, the human check is skipped.
//   PHOTO_LIMIT   (Rate limit binding) at most 20 photo checks a minute from one internet address.
//   VISITS        (D1 database binding) the visit tally: one line per day + city + state + country.
// ============================================================

// The one place this helper is allowed to send photos.
const PLANTNET_URL = "https://my-api.plantnet.org/v2/identify/all?lang=en&nb-results=3&api-key=";

// The biggest photo we accept. The app shrinks photos to much less than this.
const MAX_BYTES = 5 * 1024 * 1024;

// Where Cloudflare Turnstile tells us if the human check passed.
const TURNSTILE_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// The headers that tell the browser "yes, this website may read my answer".
function allowHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Headers": "Content-Type, X-Human-Check",
    "Content-Type": "application/json",
  };
}

// Send back an answer with a status number (like 200 = OK, 403 = not allowed).
function reply(status, message, origin) {
  const body = message ? JSON.stringify({ message }) : null;
  return new Response(body, { status, headers: allowHeaders(origin) });
}

// Give the app the city's email address: { "email": "..." }.
function sendCityEmail(env, origin) {
  if (!env.CITY_EMAIL) return reply(500, "The plant helper has no city email yet.", origin);
  return new Response(JSON.stringify({ email: env.CITY_EMAIL }), { status: 200, headers: allowHeaders(origin) });
}

// Speed limit: is this internet address sending photos too fast? (More than 20 a minute.)
async function tooFast(request, env) {
  if (!env.PHOTO_LIMIT) return false; // the speed limit isn't set up in Cloudflare yet
  const address = request.headers.get("CF-Connecting-IP") || "unknown";
  const { success } = await env.PHOTO_LIMIT.limit({ key: address });
  return !success;
}

// Human check: ask Cloudflare Turnstile if the app's "I'm a real person" pass is real.
async function isHuman(request, env) {
  if (!env.TURNSTILE_SECRET) return true; // the human check isn't switched on yet (see README)
  const pass = request.headers.get("X-Human-Check");
  if (!pass) return false;
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET);
  form.append("response", pass);
  form.append("remoteip", request.headers.get("CF-Connecting-IP") || "");
  try {
    const answer = await fetch(TURNSTILE_URL, { method: "POST", body: form });
    return (await answer.json()).success === true;
  } catch {
    return false; // couldn't ask Turnstile, so play it safe
  }
}

// Count one visit: add 1 to today's line for the visitor's city, state and country.
// The place is Cloudflare's guess from the internet connection. We never save the internet address itself.
async function countVisit(request, env, origin) {
  if (!env.VISITS) return reply(204, null, origin); // the tally isn't set up yet
  const address = request.headers.get("CF-Connecting-IP") || "unknown";
  if (env.PHOTO_LIMIT && !(await env.PHOTO_LIMIT.limit({ key: "visit " + address })).success) return reply(204, null, origin);
  const place = request.cf || {};
  const day = new Date().toISOString().slice(0, 10); // like 2026-11-21 (world time, UTC)
  await env.VISITS.prepare(
    "INSERT INTO visits (day, country, region, city, count) VALUES (?, ?, ?, ?, 1) " +
    "ON CONFLICT (day, country, region, city) DO UPDATE SET count = count + 1"
  ).bind(day, place.country || "unknown", place.region || "unknown", place.city || "unknown").run();
  return reply(204, null, origin);
}

// Cloudflare runs this every time the app sends a request.
async function handleRequest(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowedSites = (env.ALLOWED_SITES || "").split(",").map((site) => site.trim()).filter(Boolean); // skip blanks
  // Not on the list? Say no. (The browser may still read this "no", so the app can explain it.)
  if (!allowedSites.includes(origin)) return reply(403, "This website isn't allowed to use the plant helper.", origin);
  if (request.method === "OPTIONS") return reply(204, null, origin); // the browser asking "may I?" first
  const path = new URL(request.url).pathname;
  if (request.method === "GET" && path === "/email") return sendCityEmail(env, origin);
  if (request.method === "POST" && path === "/visit") return countVisit(request, env, origin);
  if (request.method !== "POST") return reply(405, "Send a photo with POST.", origin);
  if (!env.PLANTNET_KEY) return reply(500, "The plant helper has no Pl@ntNet key yet.", origin);
  if (await tooFast(request, env)) return reply(429, "slow down", origin); // the app shows "wait a minute"
  if (!(await isHuman(request, env))) return reply(428, "The human check didn't pass.", origin);

  const photo = await request.arrayBuffer();
  if (photo.byteLength === 0 || photo.byteLength > MAX_BYTES) return reply(413, "The photo is missing or too big.", origin);
  try {
    const answer = await fetch(PLANTNET_URL + encodeURIComponent(env.PLANTNET_KEY), {
      method: "POST",
      headers: { "Content-Type": request.headers.get("Content-Type") || "" },
      body: photo,
    });
    return new Response(answer.body, { status: answer.status, headers: allowHeaders(origin) });
  } catch {
    return reply(502, "The plant helper couldn't reach Pl@ntNet.", origin);
  }
}

export default { fetch: handleRequest };
