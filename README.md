# Protect Our Sun Prairie Parks

A phone-friendly web app for a FIRST LEGO League Innovation Project, made for the city of Sun Prairie, Wisconsin. It started as a copy of our earlier app, Protect Our WI Parks, and was changed to match the city's feedback. The front page says **"Watch for these plants in Sun Prairie!"** and has three big buttons:
- **🌿 Invasive plants:** 16 invasive plants that are common around Sun Prairie (some are groups of look-alike plants), with photos and tips on how to spot them. Spot one? Report it.
- **🌸 Endangered plants:** 10 endangered and threatened plants that Wisconsin law protects and the DNR lists for our county. Look, don't pick, and report it.
- **📷 Not sure what it is?** Take a photo. The Pl@ntNet AI identifies it, and we check both lists.

**Two ways to report:**
- **You know the plant (100% sure):** tap **🌿 Invasive plants** or **🌸 Endangered plants** → pick it → **I found this: report it** → show where it is → email the city. No photo, no AI.
- **You're not sure:** **📷 Not sure what it is?** → photo → where it is → the AI identifies it and we check our invasive and endangered lists → email the city.

The report screen shows the plant and the exact spot. **✉️ Email the city** opens the person's own email app with everything filled in; they attach their photo and tap Send. The app never sends anything by itself. A small link lets people tell the state (the DNR) too.

```
 📱 app ──photo──► 🔒 plant helper (Cloudflare, holds the secret key) ──► 🌿 Pl@ntNet AI
   ▲                                                                          │
   └─────────────────────────── top 3 guesses ◄───────────────────────────────┘

 📱 app ──"what's the city's email?"──► 🔒 plant helper (holds CITY_EMAIL) ──► 📱 opens your email app
```

## Our live setup

| What | Address |
|---|---|
| The app (GitHub Pages) | https://protect-our-sun-prairie-parks.github.io |
| The code (GitHub) | https://github.com/protect-our-sun-prairie-parks/protect-our-sun-prairie-parks.github.io |
| The plant helper (Cloudflare) | https://sun-prairie-helper.wi-invasive-plants.workers.dev |

The plant helper's address says `wi-invasive-plants`: that's the name of our Cloudflare account, which we share with Protect Our WI Parks (it has its own helper, `plant-helper`). The two apps' helpers are separate, so changing one never breaks the other.

Two things are stored **only** in Cloudflare, as secrets of the `sun-prairie-helper` worker: the Pl@ntNet key (`PLANTNET_KEY`) and the city's email address (`CITY_EMAIL`). Neither is in this code. `ALLOWED_SITES` is `https://protect-our-sun-prairie-parks.github.io,http://localhost:8000`.

## Using the app

| Screen | What you see | What you do |
|---|---|---|
| Front page | **"Watch for these plants in Sun Prairie!"** and three big choices: **🌿 Invasive plants**, **🌸 Endangered plants** and **📷 Not sure what it is?** The green header stays at the top while you scroll | Tap the choice that fits. **How does this app work?** at the bottom opens the About box. |
| Endangered plants *(pop-up page)* | 10 small photo tiles. Each card has a pink **Endangered** or teal **Threatened** label and says **🚫 Don't pick it or dig it up. It's protected by law.** | Tap a tile to see how to spot it and why it needs help, then **📍 I found this: report it**. At the bottom: for a rare plant that's not here, use **Not sure what it is?** or the DNR's rare plant form, plus a link to the full state list. |
| Invasive plants *(pop-up page)* | 16 small photo tiles, 3 across. ⚠️ marks plants that are dangerous to touch. (Prohibited plants used to have a red border; the team removed it. The card's label still says **🚨 Prohibited**.) | Tap a tile to open its **pop-out card**: big photo, label, how to spot it, why it's a problem, any **Don't touch!** warning, and a "More about it" link. A **group** card (like bush honeysuckles) lists each kind with its own label and link. Tap **📍 I found this: report it**. **✕ Close** goes back to the front page. |
| Take a photo *(not-sure path only)* | **📷 Take photo** / **🖼️ My photos** | Take or pick a clear, close photo. |
| Where is the plant? | A map of Wisconsin | Tap **📍 Find me** (GPS), or tap the map. If the photo has GPS saved inside, the pin drops by itself. |
| What plant is it? *(not-sure path only)* | "Asking the plant AI…", then **⚠️ Possible invasive plant!**, **🌸 Possible endangered plant!** (or threatened), **✅ Not on our invasive or endangered lists**, or **🤔 The AI isn't sure**, plus the AI's top 3 guesses | Read the card, then tap **Next: Report it →**. |
| Email it to the city | The plant, how you know (you picked it, or the AI's guess and how sure), the exact spot (with a map link in the details), and the date. For an endangered plant: **🤫 Keep the spot secret**, and no clickable map link on the screen | Tap **✉️ Email the city**, attach your photo, and tap Send. **📋 Copy details** is a backup if the email app doesn't open. "Want to tell the state too?" opens the DNR's report page. **🔁 Check another plant** goes back to the front page. |

Each screen shows its step, like "Step 1 of 2" on the know-it path or "Step 1 of 4" on the photo path.

**How does this app work?** (at the bottom of the front page) opens the **About** box: how to use the app, why the AI can be wrong, staying safe, where photos and locations go, emailing the city, and all sources and photo credits. (The city asked us to remove the ℹ️ button that used to be in the top right.)

## Making changes on GitHub (no laptop setup needed)

Team members can change the app from **any computer or Chromebook**, right on the GitHub website. When you save a change, GitHub republishes the live site in about a minute.

**Before you start (once):**
1. Get a GitHub account. ⚠️ GitHub accounts are for people **13 and older**. Pick a username **without your real name**, because it shows publicly next to every change.
2. In GitHub, go to **Settings → Emails** and turn on **Keep my email addresses private**.
3. Ask an owner of our GitHub organization to give you **Write** access to the repository.

**Change one file:**
1. Open our code on GitHub (the address is in "Our live setup") and click the file (for example `invasive-plants.json`).
2. Click the ✏️ **pencil**, make your change, then click **Commit changes…**.
3. Write a short message that says what you changed (example: "Add cypress spurge"), then click **Commit changes**.

**Changed `app.js` or `style.css`?** In `index.html`, add 1 to the version number in **both** `style.css?v=` and `app.js?v=` (for example, `v=4` becomes `v=5` in both places). That makes phones download the new files instead of reusing old saved copies. The robot checker tells you if the two numbers don't match.

**Change several files at once:** on the repository page, press the **`.`** key. A full code editor opens in your browser. When you're done, use the **Source Control** panel on the left to commit.

**Change a plant's photo:** follow the photo rules in "The plant pages" below (use a screenshot, so there's no hidden location), then open the `photos` folder → **Add file → Upload files**, and point the plant's `photo` at it in `invasive-plants.json` (or `endangered-plants.json`).

**Check your change:**
- The **robot checker** runs on every change. Open the **Actions** tab: ✅ means all good. ❌ means something is broken. Click it to see the problem in plain words, like "Garlic mustard: category must be one of…" or "This file is broken (often a missing comma) … line 8 column 7".
- After about 1–2 minutes, reload the app (its address is in "Our live setup") on your phone and try it.

**Undo a mistake:** every change is saved.
1. Open the file and click **History**.
2. Find the change from **before** your mistake. On the right of it are three small icons. Click the **middle** one, **View code at this point**. (Not the `<>` icon: that one shows the whole project.)
3. Click **Raw**, then select all and copy.
4. Open the file again (the newest version), click the ✏️ pencil, select all, paste, and commit with a message like "Undo my last change".

Not sure what broke? Ask an adult; they can put any file back exactly as it was.

**What still needs an adult:** the Pl@ntNet key, the city's email address, and the plant helper on Cloudflare. Normal changes (plants, words, colors, photos, docs) never need them.

## Run it on a laptop

1. Open Terminal in this folder.
2. Run `python3 -m http.server`
3. Open http://localhost:8000 in Chrome.
4. To see it like a phone: press `Cmd+Option+I`, then click the phone icon.
5. Press `Ctrl+C` in Terminal to stop.

The plant pages and the "I found this" path work even without the plant helper, up to the report screen. The "Not sure what it is?" photo path and the **Email the city** button need it.

**Page looks wrong or old after a change?** Press `Cmd+Shift+R` to reload without saved copies. (This is also why `index.html` has version numbers on `style.css` and `app.js`; see "Making changes on GitHub".)

## One-time setup (an adult does this)

Setup happens once. After that, **nobody types a key on any phone.** Do the steps in this order.

### 1. Get a Pl@ntNet key
1. Sign up at https://my.plantnet.org and confirm your email.
2. Go to **Settings → API key** and copy the key. Keep it private: don't put it in the code, a chat, or an email.

The free plan allows **500 plant checks per day**. Going back and forth between screens doesn't use extra checks, and the "I found this" path uses none.

### 2. Put the app on GitHub Pages (free `https://` website)
Phone camera and GPS only work on secure `https://` pages. A laptop on Wi-Fi serves plain `http://` (like `http://192.168.1.5:8000`), and phones block the camera and GPS there. GitHub Pages gives a free `https://` address.

1. Make a GitHub account at https://github.com. ⚠️ The username appears in the website address, so don't use a real name, school, or team name.
2. Click **+** → **New repository**. Name it (example: `invasive-plant-reporter`), choose **Public**, and click **Create repository**.
3. In Terminal, in this folder (replace `USERNAME` and `REPO`):
   ```
   git add .
   git commit -m "Protect Our Sun Prairie Parks"
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```
4. In the repository, go to **Settings → Pages** → **Deploy from a branch** → **main** and **/ (root)** → **Save**.
5. After 1–2 minutes, the app is at `https://USERNAME.github.io/REPO/`
6. Open the **Actions** tab. If it says **"Workflows aren't being run on this repository"**, click **Enable Actions on this repository**. (Brand-new organizations start with Actions off, and then the robot checker never runs.)

**Good to know:** a repo named exactly `ORGANIZATION.github.io` (like ours) publishes `main` by itself as soon as it's pushed, and GitHub won't let you turn Pages off for it. So whatever is on `main` is live right away; build new work on a branch and merge it when it's ready.

### 3. Set up the plant helper (Cloudflare Workers, free)
The plant helper is `plant-helper.js`: a tiny program that runs on Cloudflare, not on phones. It keeps the key secret, accepts photos only from our website, and passes them to Pl@ntNet. It also keeps the city's email address and gives it to our website when someone taps **Email the city**. It saves nothing.

1. Sign up at https://dash.cloudflare.com/sign-up (the Free plan is enough). ⚠️ When Cloudflare asks for a **workers.dev subdomain**, don't use a real name; it appears in the helper's address.
2. Go to **Workers & Pages** → **Create** → **Start with Hello World** → name it `sun-prairie-helper` → **Deploy**.
3. Click **Edit code**, delete everything, paste in all of `plant-helper.js`, and click **Deploy**.
4. Open the worker's **Settings → Variables and Secrets** and add three:
   - Type **Secret**, name `PLANTNET_KEY`, value: your Pl@ntNet key
   - Type **Secret**, name `CITY_EMAIL`, value: the email address plant reports should go to (for testing, a team test address; later, the city's real address)
   - Type **Text**, name `ALLOWED_SITES`, value: `https://USERNAME.github.io,http://localhost:8000`
   
   Click **Deploy** (or **Add variable and deploy**). ⚠️ **Save version** alone does *not* turn a setting on: the helper keeps acting as if it's missing until you deploy.
5. Copy the helper's address (like `https://plant-helper.YOUR-SUBDOMAIN.workers.dev`).
6. In `app.js`, find `HELPER_URL` and paste that address in. Because `app.js` changed, add 1 to both version numbers in `index.html` (see "Making changes on GitHub"). Then run `git add .`, `git commit -m "Connect plant helper"` and `git push`.
7. **Check it:** open the helper's address in a browser. If you see `This website isn't allowed to use the plant helper`, it's running. (A browser address bar isn't on the allowed list, so that "no" is correct.) Then open the app and try a real photo, and tap **Email the city** on a report: your email app should open with the city's address filled in.

**Good to know:** the helper calls Pl@ntNet from a server, not from a web page, so Pl@ntNet's "Authorized domains" list isn't used. Our helper works with that list empty.

### Updating the plant helper
`plant-helper.js` on GitHub is just a copy for reading. The one that runs lives in Cloudflare. If you change it, paste the new version into Cloudflare (**Workers & Pages → sun-prairie-helper → Edit code → Deploy**). Your `PLANTNET_KEY`, `CITY_EMAIL` and `ALLOWED_SITES` settings stay as they are.

**To change where reports go** (for example, from the test address to the city's real one), update `CITY_EMAIL` in Cloudflare. No code changes, and every phone picks it up the next time someone opens the app.

### Where the key lives, and the risk
- **The key is only inside Cloudflare,** stored as an encrypted secret. It's not in the code, not on GitHub, and not on any phone, and the helper never sends it back.
- **To change the key,** update `PLANTNET_KEY` in Cloudflare. Every phone keeps working, with nothing to change.
- **The helper only accepts requests from the websites in `ALLOWED_SITES`**, and only passes photos (up to 5 MB) to Pl@ntNet's identify service. It can't be used for anything else.
- **Remaining risk:** a determined person could write a program that pretends to be our website and use the helper to identify plants. That uses up our 500 free checks for the day, and then the app says "We used up today's free plant checks." They still can't see the key, and there's no money involved on free plans. For extra protection, an adult can add a Cloudflare rate-limiting rule.
- **Photos pass through Cloudflare** on their way to Pl@ntNet. The helper doesn't save them (you can read every line of `plant-helper.js`).
- **The city's email address is kept out of our code, but it isn't truly secret.** The helper gives it to our website so the email app can open, so anyone using the app sees it in their email's "To" line, and a determined person could ask the helper for it. That's fine for a public reporting address. Keeping it in Cloudflare means it isn't in our public code (or search engines), and it can be changed without touching the code.

## Reporting (the last screen)

Reports go to the city of Sun Prairie by email, because the city asked for that. The app never sends anything by itself: it opens the person's **own email app** with the report filled in, and they decide whether to send it.
- **The details:** the plant (common + scientific name), how they know (picked from the list, or the AI's guess and how sure), latitude/longitude with a map link, and the date. **📋 Copy details** copies exactly what's shown, in case the email app doesn't open.
- **✉️ Email the city** asks the plant helper for the city's address (`CITY_EMAIL` in Cloudflare), then opens a `mailto:` link. The email has:
  - **Subject:** like `Plant report: Garlic mustard (possible invasive plant)`
  - **Message:** a hello, the details above, "Photo: (attach your photo before you tap Send)", and "Sent from the Protect Our Sun Prairie Parks app". Email links can't attach a photo by themselves, so the screen and the email both remind people to attach it.
  - If the helper can't give the address, the screen says why in plain words (website not allowed, no `CITY_EMAIL` yet, or no internet) and suggests **Copy details**.
- **For an endangered or threatened plant,** the screen says **🤫 Keep the spot secret. Don't post it online, and don't pick the plant. Only share the spot in this email to the city.** There's no clickable map link on the screen. The email includes the spot (so the city can protect the plant) and says **"This plant is protected by law. Please keep this spot secret."**
- **Want to tell the state too?** A small link opens the DNR's official [Report invasive species](https://dnr.wisconsin.gov/topic/Invasives/report) page, or for an endangered or threatened plant, the DNR's [rare species report form](https://survey123.arcgis.com/share/f57cba58511a4c99b1d1292776b05125).
- **🌐 Learn about …** opens the DNR's page about that plant (`dnrPage`), or for the 2 plants that aren't regulated, the page we got their facts from (`infoPage`). For a group, or a plant that isn't on our list, it opens the DNR's main [invasive species page](https://dnr.wisconsin.gov/topic/Invasives). An endangered plant without its own page opens the DNR's [endangered and threatened species list](https://dnr.wisconsin.gov/topic/EndangeredResources/ETList).
- **For a group** (like bush honeysuckles), the details name all the kinds, e.g. "Bush honeysuckles, one of: Amur honeysuckle (Lonicera maackii), …".
- **For a plant that isn't regulated** (sweet clover, reed canary grass), the report screen says it isn't regulated by state law, but the city may still want to know about it.
- **For a plant the AI couldn't match,** the email says "possible invasive or rare plant".

## The plant pages

The **invasive plants** page (opened with **🌿 Invasive plants** on the front page) shows every plant and group in `invasive-plants.json` that has a `frontPage` number, in that order. The **endangered plants** page (**🌸 Endangered plants**) does the same with `endangered-plants.json`. On each front-page button, the first 5 plants also appear as small round photos.

These 16 invasive plants have cards. We picked them with the city's feedback, using how often each one has been reported in our county (EDDMapS sightings, summarized by the [UW–Madison Renz Lab](https://renzweedscience.cals.wisc.edu/?p=6202)):

| # | Card | Status |
|---|---|---|
| 1 | Bush honeysuckles *(group: Amur, Tatarian, Morrow's, Bell's)* | Restricted (Amur: depends on county) |
| 2 | Common buckthorn | Restricted |
| 3 | Glossy buckthorn | Restricted |
| 4 | Invasive thistles *(group: Canada, musk, plumeless, European marsh)* | Restricted (European marsh: depends on county) |
| 5 | Japanese hedge-parsley | Depends on county |
| 6 | Garlic mustard | Restricted |
| 7 | Dame's rocket | Restricted |
| 8 | Phragmites | Depends on county |
| 9 | Leafy spurge | Restricted |
| 11 | Japanese knotweed | Restricted |
| 12 | Black locust | Restricted |
| 13 | Wild parsnip | Restricted |
| 14 | Purple loosestrife | Restricted |
| 15 | Invasive cattails *(group: narrow-leaved, hybrid, southern, graceful)* | Restricted (southern and graceful: **prohibited**) |
| 16 | Common teasel | Restricted |
| 17 | Spotted knapweed | Restricted |

The city asked us to remove common mullein, so it's gone from the app. Sweet clover and reed canary grass no longer have cards, but they're still in the list. The other plants in `invasive-plants.json` (like giant hogweed and poison hemlock) have no card either, but the AI still recognizes them and shows their warnings.

And these 10 endangered and threatened plants:

| # | Card | Status |
|---|---|---|
| 1 | White lady's-slipper | Threatened |
| 2 | Pale purple coneflower | Threatened |
| 3 | Wild hyacinth | Endangered |
| 4 | Purple milkweed | Endangered |
| 5 | Hill's thistle | Threatened |
| 6 | Eastern prairie fringed orchid | Endangered (also federally threatened) |
| 7 | Woolly milkweed | Threatened |
| 8 | Wild petunia | Endangered |
| 9 | Kitten tails | Threatened |
| 12 | Prairie bush clover | Endangered (also federally threatened) |

The other 12 plants in `endangered-plants.json` have no card, but the AI still recognizes them.

**A plant card** is a plant in `"plants"` (in either file) with these extra parts:

| Part | What it's for |
|---|---|
| `frontPage` | Its place on its plant page (1 = first). Every card needs a different number. Leave it out to hide the card; the AI still checks the plant. |
| `lookFor` | One or two short sentences on how to spot it (shown on the pop-out card, with `why`) |
| `photo` | Its photo in the `photos/` folder |
| `photoCredit`, `photoCreditUrl` | Who took the photo and its license. These show in the About box. |

**A group card** lives in `"groups"`. It has a `commonName` (like `"Bush honeysuckles"`), the same `frontPage`, `lookFor`, `why`, `photo`, `photoCredit` and `photoCreditUrl` parts, and `"members"`: the scientific names of its kinds. **Every kind must also be its own plant in `"plants"`** (with its own category and `dnrPage`), so the card can list it and the AI can recognize it by name. The robot checker tells you if a member is missing.

**The photos** are real photos from [Wikimedia Commons](https://commons.wikimedia.org) and [iNaturalist](https://www.inaturalist.org) with free licenses (CC0, CC BY or public domain), credited to each photographer. Their hidden data, including any GPS, was removed. For an endangered plant, we only use a photo whose page doesn't show a Wisconsin spot: on iNaturalist that means the location is hidden ("obscured") and it was taken outside Wisconsin. Five endangered photos come from iNaturalist, from sightings that other experts confirmed, all with the exact spot hidden: kitten tails and pale purple coneflower (taken in Minnesota), wild petunia (Illinois, where it isn't rare), Hill's thistle (Michigan) and woolly milkweed (Nebraska). We don't use "share-alike" (CC BY-SA) photos.

**To use your own photo:**
1. **Take a screenshot of your photo and upload the screenshot.** A phone photo usually has the exact spot where it was taken hidden inside it (that could be someone's home). A screenshot doesn't, and it's always a `.png` file that every browser can show. (iPhone photos are often `.heic`, which many browsers can't show. The robot checker only accepts `.jpg`, `.jpeg` or `.png`.)
2. Only photos taken in a public place, never at a home or school, and with no people in them. For an endangered plant, never write down where you saw it (not in the file name, the credit, or a commit message): those spots are kept secret.
3. Keep it under 1 MB. Give it a simple name with no spaces, like `my-buckthorn.png`.
4. Set `photoCredit` to `"Photo: our team"` and `photoCreditUrl` to our code's GitHub address (see "Our live setup").

**Without internet:** once the app has opened, the plant pages and the "I found this" path keep working with no internet. Only the map pictures and the plant AI need internet.

## Files

| File | What it does |
|---|---|
| `index.html` | The screens (front page, Take a photo, Where is it?, What plant is it?, Report), the two plant pages, the plant details card, and the About box |
| `style.css` | Colors, big buttons, phone layout |
| `app.js` | Everything the app does, in 10 labeled sections |
| `invasive-plants.json` | The Wisconsin invasive plant list |
| `endangered-plants.json` | The Wisconsin endangered and threatened plants that the DNR lists for our county |
| `plant-helper.js` | The plant helper that runs on Cloudflare and keeps the key and the city's email address out of our code |
| `photos/` | The photos on the two plant pages |
| `README.md` | This file |
| `EXPLAIN.md` | Kid-friendly explanation and judge Q&A |
| `claude.md` | Rules for the AI coding assistant that helped build the app |
| `.gitignore` | Files that should never be uploaded to GitHub |
| `.github/workflows/check.yml` | The robot checker: GitHub runs it on every change to catch typos, broken plant lists, missing plant photos or credits, version numbers that don't match, and pasted keys |

## Libraries and services we use

| What | Why | From |
|---|---|---|
| [Pl@ntNet API](https://my.plantnet.org) | Identifies the plant from the photo | my-api.plantnet.org |
| [Cloudflare Workers](https://workers.cloudflare.com) | Runs the plant helper that holds the key and the city's email address | cloudflare.com (free plan: 100,000 requests/day) |
| [Leaflet](https://leafletjs.com/) 1.9.4 | Draws the map | cdnjs.cloudflare.com |
| [exifr](https://github.com/MikeKovarik/exifr) 7.1.3 | Reads GPS saved inside photos | cdn.jsdelivr.net |
| [OpenStreetMap](https://www.openstreetmap.org/copyright) | Map pictures (tiles) | tile.openstreetmap.org |
| [Wikimedia Commons](https://commons.wikimedia.org), [iNaturalist](https://www.inaturalist.org) | Plant photos (CC0, CC BY and public domain) | stored in `photos/` |
| [Wisconsin DNR rare plant pages](https://apps.dnr.wi.gov/biodiversity/Home/index/plants) | "How to spot it" for the endangered plants | links in `endangered-plants.json` |
| [Minnesota DNR](https://www.dnr.state.mn.us/invasives/terrestrialplants/index.html) | Facts for the 2 plants that aren't in Wisconsin's law (sweet clover, reed canary grass) | links in `invasive-plants.json` |
| [UW–Madison Renz Lab](https://renzweedscience.cals.wisc.edu/?p=6202), [DNR Natural Heritage Inventory](https://nhiportal.dnr.wi.gov/public/data/county) | Which plants are common (invasive) or recorded (endangered) in our county, to pick the plant cards | not stored in the app |

Each library has an `integrity` fingerprint in `index.html`. The browser refuses the file if anyone changed it, so if you upgrade a library, update its fingerprint too.

## The invasive plant list

**Source:** Wisconsin Administrative Code [chapter NR 40](https://docs.legis.wisconsin.gov/code/admin_code/nr/001/40), *Invasive Species Identification, Classification and Control*, Register November 2024 No. 827. Prohibited plants are in NR 40.04(2)(b) and restricted plants are in NR 40.05(2)(b). "How to spot it" comes from each plant's DNR page. The "why it's a problem" sentences are our own short summaries.

Two plants on our list are **not in NR 40**: sweet clover and reed canary grass. Their facts come from the Minnesota DNR ([sweet clover](https://www.dnr.state.mn.us/invasives/terrestrialplants/herbaceous/whitesweetclover.html), [reed canary grass](https://www.dnr.state.mn.us/invasives/terrestrialplants/grasses/reedcanarygrass.html)).

**Categories:**
- `prohibited`: not yet common in Wisconsin. The goal is to stop it before it spreads, so reports are very important.
- `restricted`: already common in parts of Wisconsin. It's illegal to sell, move, or plant it.
- `depends-on-county`: NR 40 lists it as prohibited in some counties and restricted in others.
- `not-regulated`: invasive, but not in NR 40. It has no `dnrPage`; instead it needs `infoPage` (a link to a trusted page about it) and `infoSource` (who wrote that page, like `"Minnesota DNR"`).

**How matching works:** we compare only the first two words of the scientific name (genus + species), ignoring capital letters and the hybrid sign `×`. So `Lonicera × bella Zabel` matches `lonicera x bella`. We also check `otherNames`, because scientists sometimes rename plants. For example, NR 40 says *Fallopia japonica*, but Pl@ntNet says *Reynoutria japonica*.

**When we say "possible invasive":** if any of the AI's top 3 guesses is on the list **and** the AI is at least 20% sure about that guess. Below 20%, we say "The AI isn't sure." Either way, you can still report it.

**When we say "possible endangered" (or threatened):** only if it's the AI's **best** guess, and the AI is at least 20% sure. Many common plants look like rare ones. For example, a photo of common milkweed came back 49% common milkweed and 40% prairie milkweed (threatened). Calling that "endangered" would be a false alarm. The guess list still marks prairie milkweed with a pink **Endangered list** tag. If the best guess is endangered and a lower guess is invasive, the app goes with the best guess.

### Add a plant
1. Find it in NR 40.04(2)(b) (prohibited) or NR 40.05(2)(b) (restricted). If it's in both, use `depends-on-county`. If it isn't in NR 40 at all, use `not-regulated` (see Categories). Then find its page on the DNR website (they look like `https://dnr.wisconsin.gov/topic/Invasives/fact/PlantName`). A few plants have no DNR page; leave `dnrPage` out for those.
2. Add a block inside `"plants": [ ... ]` in `invasive-plants.json`, with a comma between blocks:
   ```json
   {
     "scientificName": "Euphorbia cyparissias",
     "otherNames": [],
     "commonName": "Cypress spurge",
     "dnrPage": "https://dnr.wisconsin.gov/topic/Invasives/fact/CypressSpurge",
     "category": "restricted",
     "why": "One short sentence a 4th grader can read."
   }
   ```
3. If it's dangerous to touch or eat, add `"warning": "Don't touch! ..."`.
4. Put the plant's other scientific names in `otherNames`. The name Pl@ntNet uses is the most important one.
5. To show it on the invasive plants page too, add `frontPage` (a number no other card uses), `lookFor`, `photo`, `photoCredit` and `photoCreditUrl` (see "The plant pages" above). To put it in a group instead, add its scientific name to that group's `"members"`.
6. Reload the app. If something breaks, paste the file into https://jsonlint.com to find the missing comma.

## The endangered plant list

**Source:** Wisconsin Administrative Code [NR 27.03](https://docs.legis.wisconsin.gov/code/admin_code/nr/001/27/03), the state's list of endangered and threatened species. It's part of Wisconsin's endangered species law: it's illegal to pick, dig up or harm these plants on public land, and they should never be picked anywhere. "How to spot it" comes from each plant's page on the DNR's [rare plants website](https://apps.dnr.wi.gov/biodiversity/Home/index/plants). The "why it needs help" sentences are our own short summaries.

**Categories:**
- `endangered`: so few are left that it could disappear from Wisconsin.
- `threatened`: likely to become endangered.

**What's in the file:** the 22 plants from NR 27 that the DNR's [Natural Heritage Inventory](https://nhiportal.dnr.wi.gov/public/data/county) lists for our county (the city asked us to keep the list local). The AI can warn about any of them, not just the 10 with cards. Plants that NR 27 lists only as a *variety* or *subspecies* (like the pale green orchid, *Platanthera flava* var. *herbiola*) are left out, because the AI can't tell varieties apart. The file never says where any plant grows, only that the DNR lists it for the county (public information on the DNR's website).

**Same rules as the invasive list:** matching uses the first two words of the scientific name, plus `otherNames` (for example, NR 27 says *Besseya bullii*, but the DNR and many apps now say *Synthyris bullii*). A plant card needs `frontPage`, `lookFor`, `why`, `photo`, `photoCredit` and `photoCreditUrl`. `dnrPage` is the plant's page on the DNR's rare plants website.

### Give an endangered plant a card
1. Find the plant's block in `endangered-plants.json` (search for its name). If it isn't there, add a block with `scientificName`, `otherNames`, `commonName` and `category` (copy one of the others). The Protect Our WI Parks app has blocks for all 116 NR 27 plants that the AI can recognize.
2. Find its page on the DNR's [rare plants website](https://apps.dnr.wi.gov/biodiversity/Home/index/plants) (search by name). Add it as `"dnrPage"`. The address looks like `https://apps.dnr.wi.gov/biodiversity/Home/detail/plants/1234`.
3. Add `frontPage`, `lookFor`, `why`, `photo`, `photoCredit` and `photoCreditUrl`, just like an invasive plant card.

**Garden plants:** some protected plants are also sold for gardens (like heartleaf foamflower). The AI can't tell a garden plant from a wild one, so the result card says: "Planted in a garden? Then you don't need to report it."

### Known limits
- **Phragmites:** a native kind has the same genus + species, so it also shows as "possible". Experts make the final call.
- **Reed canary grass and ribbon grass** are the same species, so the AI can't tell them apart. The plain green wild grass isn't regulated; the striped garden form (ribbon grass) is restricted.
- **Thistles and cattails:** Wisconsin also has native thistles and a native cattail (broad-leaved cattail). The AI matches only the invasive kinds by name, and the group cards explain how to tell them apart.
- **Japanese barberry** and a few others: NR 40 exempts some garden varieties, and the app can't tell them apart from a photo.
- **The AI doesn't know every rare plant well.** When we tested the cards' photos in Protect Our WI Parks, the AI was unsure about kitten tails and prairie bush clover (under 20% sure), so it said "The AI isn't sure." If you know the plant, pick it on the **🌸 Endangered plants** page instead.
- **Hill's thistle** is a protected native thistle. Don't mix it up with the weedy **invasive thistles** group; its card explains that people sometimes pull it by mistake.
- **Only local endangered plants:** the endangered list only has the 22 plants the DNR lists for our county, so a rare plant from another part of Wisconsin would show as "not on our lists".
- **County splits:** the app doesn't know the county, so it says "depending on the county."
