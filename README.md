# AI for SMB Dashboard

A structured AI adoption guide for business leaders — from first awareness to operational value.

## Stack

- **Frontend** — React 18 + Vite + Tailwind CSS
- **Backend** — Node.js 22 / Express
- **Database** — MySQL 8.0
- **Infrastructure** — Docker Compose (backend + DB only), host-managed Nginx, self-hosted GitHub Actions runner

## Deployment architecture

This repo owns only:
- the frontend build output (`frontend/dist/`)
- its backend container (`ai-smb-backend` on port `BACKEND_PORT`)
- its MySQL container (`ai-smb-mysql`)
- its own Nginx vhost snippet (`deploy/nginx/site.conf.template`)

**Nginx is managed at the host level.** Each site drops in its own vhost file — one site's deploy never touches another site's config.

```
Host machine
├── /srv/sites/ai-smb/current/     ← built frontend (rsync'd by deploy)
├── /etc/nginx/conf.d/
│   ├── ai-smb.conf                ← generated from deploy/nginx/site.conf.template
│   └── other-site.conf            ← another site's vhost (untouched by this deploy)
└── Docker containers
    ├── ai-smb-backend  (127.0.0.1:3101 → container:3002)
    ├── ai-smb-mysql    (internal only)
    └── other-site-backend  (127.0.0.1:3102 → container:3002)
```

## First-time server setup

```bash
# 1. Clone the repo
git clone <repo-url> /opt/ai-smb
cd /opt/ai-smb

# 2. Create .env from the example
cp deploy/.env.example .env
nano .env   # fill in SITE_DOMAIN, SITE_ROOT, BACKEND_PORT, DB_*, NGINX_*

# 3. Create the site root
mkdir -p /srv/sites/ai-smb/current

# 4. Install Node on the host (for frontend build)
#    macOS: brew install node
#    Linux: nvm or nodesource

# 5. Run the deploy script
bash deploy.sh
```

## GitHub Actions secrets required

| Secret | Example value |
|--------|---------------|
| `SITE_DOMAIN` | `ai-smb.example.com` |
| `SITE_ROOT` | `/srv/sites/ai-smb/current` |
| `BACKEND_PORT` | `3101` |
| `NGINX_VHOST_DIR` | `/etc/nginx/conf.d` |
| `NGINX_RELOAD_CMD` | `sudo nginx -s reload` |
| `DB_ROOT_PASSWORD` | *(secret)* |
| `DB_USER` | `ai_smb_user` |
| `DB_PASSWORD` | *(secret)* |
| `DB_NAME` | `ai_smb_db` |
| `LAN_IP` | *(optional)* |

## How deploys work

Commits tagged `[deploy]` trigger the CI runner on MBserver:

1. **Build frontend** — `npm run build` → `frontend/dist/`
2. **Sync static files** — `rsync frontend/dist/ → $SITE_ROOT`
3. **Backend** — `docker compose build backend` + `up -d --force-recreate backend`
4. **Nginx vhost** — `envsubst` renders `deploy/nginx/site.conf.template` → `$NGINX_VHOST_DIR/ai-smb.conf`, then `nginx -t && reload`
5. **Health check** — `curl 127.0.0.1:$BACKEND_PORT/api/health` must return 200

Frontend changes: no Docker rebuild, just rsync + nginx keeps serving.  
Backend changes: Docker image rebuild + container recreate.  
Nginx config changes: edit the template, redeploy.

## Local development

```bash
# Start backend + MySQL
docker compose up -d

# Frontend dev server (hot-reload, proxies /api → localhost:3101)
cd frontend && npm install && npm run dev
```

The Vite dev proxy targets `http://localhost:3101`, which is the host-mapped port for the backend container.

## Project layout

```
frontend/          React + Vite source; builds to frontend/dist/
backend/           Node.js / Express API
mysql/             init.sql (schema, runs on first MySQL boot only)
deploy/
  nginx/
    site.conf.template   Nginx vhost template (envsubst markers)
  .env.example           All required env vars documented
docker-compose.yml       Backend + MySQL only (no nginx service)
deploy.sh                Manual deploy (mirrors CI pipeline)
.github/workflows/
  deploy.yml             CI: triggered by [deploy] in commit message
```
