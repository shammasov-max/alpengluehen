---
name: preview
description: Put the current edits on a preview branch and get a preview URL. Triggers - "покажи", "превью", "zeig mir", "Vorschau", "show me", "preview".
---
Goal: the user sees their change on a real URL before it goes live.

1. If on `main`: create a branch `preview/<short-topic>-<yyyymmdd>` (ASCII, lowercase, hyphens). If already on a `preview/*` branch: stay on it.
2. Run `node scripts/check.mjs`. Fix every ERROR it reports (edit the pages, not the script). Re-run until 0 errors.
3. `git add` the changed files by path, commit with a one-line message describing the change, `git push -u origin <branch>`.
4. If no PR exists for this branch: `gh pr create --fill --base main`.
5. Wait for the workflow: `gh run watch --exit-status` (or poll `gh pr checks`). When it passes, read the preview URL from the PR comment posted by CI (`gh pr view --comments`) and give it to the user, one line: "Vorschau: <url>".
6. If CI fails, show the failing check's output in plain words and fix it. Never merge a red PR.
