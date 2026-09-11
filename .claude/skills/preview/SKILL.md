---
name: preview
description: Put the current edits on the preview site (GitHub Pages) and give the URL. Triggers - "покажи", "превью", "zeig mir", "Vorschau", "show me", "preview".
---
Goal: the user sees their change on a real URL before it goes live.

1. `git switch dev && git pull` (if you are on `main`, switch first — never edit on `main`). If `dev` is behind `main`, `git merge main` first.
2. Run `node scripts/check.mjs`. Fix every ERROR it reports by editing the pages, never the script. Re-run until 0 errors.
3. `git add` the changed files by path, commit with one line describing the change, `git push`.
4. Wait for the "preview" workflow: `gh run watch --exit-status` (or `gh run list --workflow preview --limit 1`).
5. Reply with one line per changed page: "Vorschau: https://shammasov-max.github.io/alpengluehen/<page>.html". Mention that the browser may need a hard refresh (Ctrl+F5) for ~1 minute.
6. If the workflow fails, show the failing step's message in plain words and fix it.
