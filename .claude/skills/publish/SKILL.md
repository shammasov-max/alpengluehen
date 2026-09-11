---
name: publish
description: Publish the current preview branch to the live site by merging it into main. Triggers - "обнови", "публикуй", "опубликуй", "veröffentlichen", "live schalten", "publish", "go live".
---
Goal: what the user saw on the preview goes to production.

1. Must be on a `preview/*` branch with an open PR whose checks are green (`gh pr checks`). If not, run the `preview` skill first and stop when the user has a URL to look at — publishing without a seen preview is not allowed unless the user explicitly says "publish without preview".
2. Confirm in one line what will go live (the PR title and the list of changed pages). Then `gh pr merge --squash --delete-branch`.
3. `git switch main && git pull`. Watch the deploy: `gh run watch --exit-status`. Then tell the user "Live: https://<site>/<page>" for the pages that changed.
4. If the deploy fails after merge, run the `rollback` skill immediately and tell the user.
