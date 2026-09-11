---
name: rollback
description: Undo the last publish on the live site. Triggers - "откати", "верни как было", "rückgängig", "zurück", "roll back", "undo publish".
---
Goal: production returns to the state before the last publish. Nothing is deleted from history.

1. `git switch main && git pull`. Show the last merge commit (`git log --oneline -5`) and say in one line what will be undone.
2. Create branch `rollback/<yyyymmdd-hhmm>`, `git revert --no-edit <last-merge-sha> -m 1` (plain `git revert --no-edit <sha>` if it was a squash commit).
3. Push, `gh pr create --fill --base main --title "Rollback: <what>"`, wait for checks, `gh pr merge --squash --delete-branch`.
4. Watch the deploy (`gh run watch --exit-status`) and confirm "Zurückgesetzt: <url>".
5. If the user wants the reverted change back later, it is still on the original preview branch or can be re-reverted.
