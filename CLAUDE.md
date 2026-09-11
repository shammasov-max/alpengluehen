# ALPENGLÜHEN — how to edit this site

Static site: one `.html` per page, shared `assets/css/main.css` + `assets/js/main.js`. No build step. The repo is the CMS: pages are edited in natural language, checked by CI, published by merging to `main`.

Design contract: **`STYLEGUIDE.md`**. Read it before any edit. Its rules are enforced by `node scripts/check.mjs` and CI; a page that fails the check cannot be published.

## Fence — what is fixed vs. free

Fixed (change only when the request explicitly says "on the whole site" / "überall" / "на всём сайте"):
- Design tokens in `main.css` `:root` (colours, fonts, spacing). Never add new colours or fonts.
- Header, mobile menu, footer: byte-for-byte identical on every page. Change them on `index.html` and copy to all pages in the same commit.
- Class set: only classes that already exist in `main.css`. No `<style>` blocks. No CSS frameworks. Inline `style=""` only for tiny one-off tweaks (a max-width, a delay).
- Language: `lang="de-AT"`, Austrian German vocabulary per `STYLEGUIDE.md` (Jänner not Januar, Erdäpfel not Kartoffel …).

Free per page (this is where "make it unique" lives):
- Composition: order, count and kind of sections; section background rhythm (`section--paper-2` / `--dark` / `--ink`).
- Photos (Unsplash ID pool in `STYLEGUIDE.md` or uploaded to `assets/img/`), copy, headlines, maps, galleries, timelines.
- New reusable section *patterns* may be added to `main.css` under a comment `/* ---- component: <name> ---- */` with a matching entry in the "Available CSS classes" list of `STYLEGUIDE.md`. Add a component, never a page-specific hack.

## Workflow (three commands)

Two long-lived branches. `dev` = preview site (GitHub Pages, https://shammasov-max.github.io/alpengluehen/). `main` = production. All editing happens on `dev`; `main` only receives merges from `dev`.

- `/preview` — "покажи", "zeig mir", "show me": commit on `dev` → push → Pages rebuilds (~1 min) → give the page URL. Iterate here as often as needed.
- `/publish` — "обнови", "veröffentlichen", "publish": PR `dev` → `main`, merge → production.
- `/rollback` — "откати", "rückgängig", "roll back": revert the last publish on `main`, sync `dev`.

Before every commit run `node scripts/check.mjs` and fix what it reports. Never bypass it, never edit `scripts/check.mjs` to make it pass.

## Content rules of thumb
- Every big visual uses the `.ph` gradient-fallback wrapper, never a bare `<img>`.
- Keep `<title>`, meta description, canonical and OG tags per page up to date when the page's topic changes.
- Add a page to both the header nav, the mobile menu and the footer columns when creating one; remove from all three when deleting.
- Commit messages: one line, German or English, what changed for a reader ("Tirol: neue Hüttensektion, Hero-Foto getauscht").

## Never
- No secrets in the repo, in skills or in chat. Deployment keys live only in GitHub Actions secrets.
- No direct push to `main` (it is protected; CI must pass). No force-push. Never delete `dev` or `main`.
- No external scripts/CDNs beyond the ones already in `index.html` (Google Fonts, Leaflet).
