# How Our App Works (for judges, and for us!)

## The big idea

Some plants hurt Wisconsin's nature, and some need our help:
- **Invasive plants** come from other places, spread fast and crowd out Wisconsin's own plants.
- **Endangered plants** are Wisconsin's own plants that are almost gone. The law protects them.

The city of Sun Prairie takes care of its parks and wants to know when people spot these plants. But most people don't know what they're looking at, or how to report it.

We first built **Protect Our WI Parks** for all of Wisconsin. Then we showed it to the city of Sun Prairie, and they gave us feedback. So we made this copy just for Sun Prairie:
- The name says **Sun Prairie** instead of **WI**.
- The plant lists only have plants that are **common around Sun Prairie** (invasive) or that the DNR lists for **our county** (endangered).
- Reports are **emailed to the city** instead of going to the DNR.
- The ℹ️ button is gone, but **How does this app work?** is still there.

Our app's front page says **"Watch for these plants in Sun Prairie!"** and has three big buttons: **🌿 Invasive plants** (16 cards), **🌸 Endangered plants** (10 protected plants), and **📷 Not sure what it is?** Each plant has a photo and tips on how to spot it. Some invasive cards are **groups** of look-alike plants, like the bush honeysuckles.

## How the information flows

There are two paths:

```
 KNOW IT (100% sure)   🌿🌸 Pick it from a list ──► 📍 Where is it? ─────────────────────────────► ✉️ Email the city

 NOT SURE              📷 Take a photo ──► 📍 Where is it? ──► 🤖 AI guesses ──► 📋 On our list? ──► ✉️ Email the city
                                                               (photo → our helper → Pl@ntNet)
```

1. **Know the plant?** Tap **Invasive plants** or **Endangered plants**. A page pops up with photos. Tap yours: a card shows how to spot it and why it matters. Tap **I found this: report it**. No photo and no AI needed, because you already know.
2. **Not sure?** Tap **Not sure what it is?** and take a photo. We shrink the photo and send it through our **plant helper** to **Pl@ntNet**, a plant-identifying AI made by scientists. It sends back its 3 best guesses, and we check each one against our two lists: 41 invasive plants and 22 endangered or threatened plants.
3. **Where is it?** The phone's GPS finds you, the photo already knows where it was taken, or you tap the map.
4. **Email the city:** we show the plant, how you know, and the exact spot. Tap **Email the city** and your own email app opens with all of it filled in. You attach your photo and tap Send. **You** send the email. The app never sends anything by itself.

## What each file does

| File | In kid words |
|---|---|
| `index.html` | The skeleton: all the screens (front page, photo, map, AI answer, report) plus the pop-up plant list are on one page, and we show one at a time. |
| `style.css` | The clothes: colors, big buttons, and making it fit on any phone. |
| `app.js` | The brain: what happens when you tap each button. It has 10 labeled sections. |
| `invasive-plants.json` | Our list of 41 invasive plants, mostly from the state law called NR 40. |
| `plant-helper.js` | The plant helper. It runs in the cloud (on Cloudflare), keeps the AI key locked up, passes photos to Pl@ntNet, and keeps the city's email address. |
| `endangered-plants.json` | Our list of 22 endangered and threatened plants from the state's law (NR 27) that the DNR lists for our county. |
| `photos/` | The plant photos on the two plant pages. |
| `README.md` | Instructions for grown-ups: running the app, putting it online, adding plants. |
| `EXPLAIN.md` | This file! |
| `claude.md` | Rules we gave the AI coding helper that helped us build the app (like "keep it simple" and "never put names in the code"). |
| `.gitignore` | A list of files that should never be uploaded to GitHub. |
| `.github/workflows/check.yml` | Our robot checker. Every time we save a change on GitHub, a robot checks our files for mistakes (like a missing comma) and shows ✅ or ❌. |

## Words to know

- **Scientific name:** every plant has a two-word name that's the same all over the world, like *Alliaria petiolata* (garlic mustard). The first word is the **genus** (a small group of closely related plants), and the second is the **species** (the exact kind of plant). We match on both words, because some plants in the same genus are native and good!
- **Prohibited:** not common in Wisconsin yet. If we find it early, the DNR can stop it. These reports matter most!
- **Restricted:** already common in parts of Wisconsin. It's against the law to sell it, move it, or plant it.
- **Endangered:** so few are left that the plant could disappear from Wisconsin. It's protected by law.
- **Threatened:** likely to become endangered. Also protected by law.
- **Not regulated:** some plants cause problems but aren't in Wisconsin's invasive plant law. Two on our list are like that: sweet clover and reed canary grass. The app labels them honestly.
- **Group:** some invasive plants have look-alike cousins (like four kinds of bush honeysuckle). One card covers the whole group and lists each kind.
- **Confidence ("% sure"):** how sure the AI is about its guess. Under 20%, we say "The AI isn't sure."
- **API key:** like a library card for the plant AI. It lets us use Pl@ntNet, up to 500 checks a day. It's a secret, so only our plant helper has it.
- **Plant helper:** a tiny program in the cloud that holds the key, like a locker. The app asks the helper, and the helper asks Pl@ntNet. The helper also keeps the city's email address, so it isn't written in our code.

## Questions judges might ask

**How does the AI know what plant it is?**
Pl@ntNet learned from millions of plant photos that scientists and regular people labeled. It looks for patterns, like leaf shape and flower color, and compares them to what it learned. Then it gives its top guesses and a score for how sure it is.

**What if it's wrong?**
It can be wrong! That's why we always say "**possible** invasive plant" and show how sure the AI is. If it's less than 20% sure, we say "The AI isn't sure." A real expert at the city makes the final decision. And if you already know the plant, you don't need the AI at all: tap **Invasive plants** or **Endangered plants** and pick it from the list.

**Where does my photo go?**
If you pick a plant from the list, there's no photo at all. If you use the AI, the photo stays on your phone until the AI step. Then a smaller copy goes through our plant helper to Pl@ntNet to be identified. The helper only passes it along and saves nothing (you can read all of its code in `plant-helper.js`). There's no database, so we never keep your photo. Your location stays on your phone until you send the email to the city yourself, or tap **See this spot on a map** (that opens OpenStreetMap at that spot). (Drawing the map means downloading map pictures of your area from OpenStreetMap.)

**Why no login?**
A login means storing people's names and passwords, and keeping those safe is a big job. Our app doesn't need to know who you are to help find invasive plants, so we left it out. Safer and simpler!

**Why does the app email the city instead of the DNR?**
The city of Sun Prairie asked for it. The city takes care of the parks, so it can send people to pull invasive plants and protect rare ones. If you want to tell the state too, there's a small "Want to tell the state too?" link to the DNR's report page.

**Why doesn't the app send the email by itself?**
If it did, the city could get emails from every practice run and every wrong guess. Instead, the app opens **your** email app with everything filled in. You check it, add your photo, and decide whether to send it.

We looked at having the app send the email for us, so the photo would be attached automatically. We decided not to, for now:
- We'd need to buy our own web address, because email services only send to anyone from an address you own.
- We'd need another secret key, for the email service.
- Spammers could use our helper to flood the city's inbox.
- The city couldn't write back to the person who found the plant. With your own email app, it can.

**Why can't the app attach the photo?**
Email links can fill in the address, subject and message, but they can't attach a file. So the screen and the email both remind you to attach your photo.

**Where is the city's email address? Why isn't it in your code?**
Our code is public, and people sometimes collect email addresses from public code to send spam. So we keep it in our plant helper on Cloudflare, like the AI key. The app asks the helper for it when you tap **Email the city**. It's not a big secret: once your email app opens, you can see it in the "To" line. But it's not sitting in our code, and the team can change it (from our test address to the city's real one) without changing any code.

**How does this help the city?**
More people learn what invasive and endangered plants look like, from the plant pages. When someone spots one, they can email the city with the exact location in a couple of taps. The city gets better reports, the most dangerous invasive plants (like giant hogweed) are clearly marked, and endangered plant emails remind the city to keep the spot secret.

**How would you make it better?**
- Add more plants to the list (the law lists over 100!)
- Figure out the county, so we can say "prohibited" or "restricted" exactly
- Work fully offline, even after the phone closes the app
- Attach the photo to the city email automatically (that would need an email service, our own web address, and limits so spammers can't use it)
- Use our own team photos on the plant pages
- Make a version for other cities, using their own plant lists and email address
- Work in other states, using their invasive plant lists

**Bonus: How do you keep the AI key safe?**
Our code is public on GitHub, so the key can't go there, because anyone could copy it. Instead, the key is locked inside our plant helper on Cloudflare. Phones never see it. The helper only helps our own website, and only sends photos to Pl@ntNet. If someone tries to misuse it, the worst that can happen is using up the day's 500 free checks. No money is involved, and the key stays secret.

**Bonus: How do you change the app?**
Right on the GitHub website, from any computer. We click a file, click the pencil, make the change, and save. A robot checks our work for mistakes, and the live app updates by itself in about a minute.

**Bonus: Where do the plant photos come from?**
They're real photos from Wikimedia Commons and iNaturalist that photographers shared for anyone to use. We credit each photographer in the app's About box (tap **How does this app work?**), and we removed hidden data (like GPS) from the photos. For endangered plants, we only picked photos that don't show where in Wisconsin the plant grows.

**Bonus: Why are some plants "not regulated"?**
Wisconsin's law (NR 40) lists the invasive plants people can't sell, move or plant. Some plants, like sweet clover and reed canary grass, still crowd out native plants but aren't in that law. We kept them on our list (so the AI knows them) and labeled them honestly, and we got their facts from the Minnesota DNR.

**Bonus: How did you pick the plants for Sun Prairie?**
For invasive plants, we used a UW–Madison list of how many times each plant has been reported in our county. The most-reported ones got cards, like Japanese hedge-parsley (reported over 900 times!). The city asked us to remove common mullein. For endangered plants, we used the DNR's county list and kept only the 22 protected plants it lists for our county.

**Why do you have endangered plants too? Isn't the app about invasive plants?**
They're two sides of the same problem. Invasive plants crowd out Wisconsin's own plants, and some of those are now endangered. The city wants to know about both, so one app helps with both.

**Why does the app say "keep the spot secret"?**
Some people dig up rare plants to sell or plant them. That's why the DNR keeps the spots of endangered plants secret. So for an endangered plant, our app shows no map link on the screen and reminds you: don't post the spot online, and only share it in the email to the city. The email tells the city the spot too (so they can protect the plant) and asks them to keep it secret. Our code never says where any endangered plant grows.

**Why does the AI only say "endangered" for its best guess?**
Many common plants look like rare ones. When we tested a photo of common milkweed, the AI said 49% common milkweed and 40% prairie milkweed, which is threatened. If we counted every guess, we'd tell people their common milkweed is endangered! So for endangered plants we only use the AI's best guess. For invasive plants we count all its top guesses, because it's better to check a possible invasive than to miss one.

**What if the AI thinks a garden flower is endangered?**
Some protected plants are also sold for gardens. The AI can't tell a garden plant from a wild one, so the answer says: "Planted in a garden? Then you don't need to report it."

**Bonus: Why show a list of plants first?**
If you already know the plant, you don't need an AI: picking it from the list is 100% certain and faster. The list also teaches people what to watch for before they ever see one. The AI is there for when you're not sure.
