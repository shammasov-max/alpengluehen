---
name: rollback
description: Undo the last publish on the live site. Triggers - "откати", "верни как было", "rückgängig", "zurück", "roll back", "undo publish".
---
Goal: production returns to the state before the last publish. History is kept, nothing is deleted.

1. `git switch main && git pull`. `git log --oneline -5` — identify the last merge commit from `dev`. Say in one line what will be undone.
2. `git switch -c rollback/<yyyymmdd-hhmm>` and `git revert --no-edit -m 1 <merge-sha>`.
3. `git push -u origin HEAD`, `gh pr create --base main --fill --title "Rollback: <what>"`, `gh pr checks --watch`, `gh pr merge --merge --delete-branch`.
4. Sync the preview branch so it does not re-publish the reverted change: `git switch dev && git pull && git merge main && git push`.
5. `gh run watch --exit-status`, then confirm "Zurückgesetzt: <url>". The reverted work is still in history and can be restored by reverting the revert.
