# DEPLOY — одноразовая настройка (для разработчика, не для клиента)

## Сервер (VPS, root)
```bash
adduser --disabled-password --gecos "" deploy
mkdir -p /var/www/alpengluehen /var/www/preview && chown -R deploy:deploy /var/www
sudo -u deploy ssh-keygen -t ed25519 -N "" -f /home/deploy/.ssh/id_ed25519   # приватный ключ → GitHub secret DEPLOY_SSH_KEY
sudo -u deploy sh -c 'cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys'
apt install -y nginx rsync
```
nginx:
```nginx
server { server_name alpengluehen.at www.alpengluehen.at; root /var/www/alpengluehen; index index.html; }
server { server_name preview.alpengluehen.at; root /var/www/preview; index index.html; autoindex off;
         # опционально: auth_basic "Vorschau"; auth_basic_user_file /etc/nginx/.preview_htpasswd;
       }
```
DNS: `preview` → тот же IP. TLS — certbot на оба.

## GitHub repo
Secrets: `DEPLOY_HOST`, `DEPLOY_USER=deploy`, `DEPLOY_SSH_KEY` (приватный ключ), `DEPLOY_PATH=/var/www/alpengluehen`, `PREVIEW_PATH=/var/www/preview`.
Variables: `SITE_URL=https://alpengluehen.at`, `PREVIEW_URL=https://preview.alpengluehen.at`.
Branch protection на `main`: require PR, require status check `check`, no force-push. Клиент — collaborator с write.

Уборка старых превью на сервере (cron раз в день):
```bash
find /var/www/preview -mindepth 1 -maxdepth 1 -type d -mtime +14 -exec rm -rf {} +
```

## Клиент
Claude (claude.ai/code или desktop) + GitHub-аккаунт с доступом к репо. Команды: «покажи» / «обнови» / «откати». Секретов у клиента нет: деплой делает Actions.
