---
name: publish
description: Publish the preview site (dev) to production by merging dev into main. Triggers - "обнови", "публикуй", "опубликуй", "veröffentlichen", "live schalten", "publish", "go live".
---
Goal: what the user saw on the preview goes to production. Nothing else.

1. `git switch dev && git pull`. If there are uncommitted edits, run the `preview` skill first — the user must have seen a preview URL of the exact state being published (unless they explicitly say "publish without preview").
2. Open or reuse the PR: `gh pr create --base main --head dev --fill` (if one already exists, `gh pr view` it). Wait for checks: `gh pr checks --watch`.
3. Tell the user in one line what goes live (PR title + changed pages), then `gh pr merge --merge` (a merge commit — never squash, so `dev` and `main` stay in sync).
4. `gh run watch --exit-status` for the "deploy" workflow. Then reply "Live: https://alpengluehen.at/<page>.html" per changed page. If the deploy step says secrets are not set, say production hosting is not configured yet and the change is merged and waiting.
5. If the deploy fails after merge, run the `rollback` skill and tell the user.
