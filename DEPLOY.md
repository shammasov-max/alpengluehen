# DEPLOY — одноразовая настройка (для разработчика, не для клиента)

## Сервер (VPS, root)
```bash
adduser --disabled-password --gecos "" deploy
mkdir -p /var/www/alpengluehen && chown -R deploy:deploy /var/www
sudo -u deploy ssh-keygen -t ed25519 -N "" -f /home/deploy/.ssh/id_ed25519   # приватный ключ → GitHub secret DEPLOY_SSH_KEY
sudo -u deploy sh -c 'cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys'
apt install -y nginx rsync
```
nginx:
```nginx
server { server_name alpengluehen.at www.alpengluehen.at; root /var/www/alpengluehen; index index.html; }
```
DNS: `alpengluehen.at` → IP VPS. TLS — certbot.

Превью живёт НЕ на VPS: ветка `dev` → GitHub Pages → https://shammasov-max.github.io/alpengluehen/ (workflow `pages.yml`). Репо public — иначе Pages платный.

## GitHub repo
Secrets: `DEPLOY_HOST`, `DEPLOY_USER=deploy`, `DEPLOY_SSH_KEY` (приватный ключ), `DEPLOY_PATH=/var/www/alpengluehen`.
Branch protection на `main` уже включена: status check `check`, no force-push. Клиент — collaborator с write, работает только в `dev`.

## Клиент
Claude (claude.ai/code или desktop) + GitHub-аккаунт с доступом к репо. Команды: «покажи» / «обнови» / «откати». Секретов у клиента нет: деплой делает Actions.
