# FLL Protect Our Sun Prairie Parks (invasive + endangered plants)

## Who this is for
A FIRST LEGO League team (kids ages 9–14) building their Innovation Project. The kids must be able to explain every file to judges. Simplicity beats cleverness.

This app is a copy of our earlier Protect Our WI Parks app, changed to match the city of Sun Prairie's feedback. Protect Our WI Parks lives in its own repo and stays as it is, for reference. Don't change it from here.

## Standing rules
- Plain HTML, CSS, JavaScript only. No frameworks, no npm, no build step.
- Keep it to about 5 files plus /photos. Ask before adding a new file.
- Every function is short and has a plain-English comment above it.
- Explain each choice in 1–2 sentences a kid could repeat.
- Work in small steps. After each step, say exactly how to test it.
- Ask before big changes. Don't rewrite working code just to tidy it.
- When `app.js` or `style.css` changes, add 1 to BOTH version numbers in `index.html` (`style.css?v=N`, `app.js?v=N`) so browsers don't reuse old saved copies. The robot checker fails if they don't match.

## How we ship changes
- Build changes on a feature branch and open a pull request. Merge to `main` (that publishes the live site) only when the user says to deploy, then test the live site.
- Team members also edit `main` directly on GitHub, so always pull before starting a branch.
- Every push runs the robot checker (`.github/workflows/check.yml`).

## Safety and privacy
- This repo will be PUBLIC (free GitHub Pages hosting). Never put people's names, school, team name, addresses, or anyone's location in code, comments, commits, or sample data. The city's name (Sun Prairie) is fine: the city asked for it.
- Never put an email address in the repo. The city's address (a team test address for now) lives only in Cloudflare, as the `CITY_EMAIL` secret of the plant helper worker. The app gets it from the helper's `/email` route.
- Never commit API keys. The Pl@ntNet key lives only in Cloudflare, as the `PLANTNET_KEY` secret of the plant helper worker. Explain where the key lives and its risk.
- Endangered plant spots are secret. Never put where an endangered plant grows anywhere in the repo (the endangered list may only say the DNR lists a plant for our county, which is public). Only use photos whose source page doesn't name a Wisconsin location. On screen, endangered reports have no map link and say "Keep the spot secret"; the email to the city includes the spot and asks the city to keep it secret.
- Photos must be CC0, CC BY or public domain (no CC BY-SA), credited, with hidden data (EXIF/GPS) removed.
- The app never sends anything by itself. "Email the city" opens the person's own email app (a `mailto:` link) with the report filled in; they attach their photo and tap Send. A small link still lets people report to the DNR too.

## Running it
- Local: `python3 -m http.server` then open http://localhost:8000
- Live: not set up yet (GitHub Pages; HTTPS is required for camera and GPS). Pushing to `main` will update it. Add the address to README "Our live setup" once it exists.
- Plant helper: `plant-helper.js` runs on Cloudflare Workers. `HELPER_URL` in `app.js` still points at the Protect Our WI Parks helper until this app's helper is set up. After changing `plant-helper.js`, redeploy it in Cloudflare.

## Living docs
- Keep README.md (how to run/deploy) and EXPLAIN.md (kid-level explanation and judge Q&A) up to date whenever the code changes.
