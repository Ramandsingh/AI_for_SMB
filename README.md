# AI for SMB Dashboard

A structured AI adoption guide for business leaders — from first awareness to operational value.

## Stack

- **Frontend** — React 18 + Vite + Tailwind CSS, served via nginx
- **Backend** — Node.js 22 / Express
- **Database** — MySQL 8.0
- **Infrastructure** — Docker Compose, self-hosted GitHub Actions runner

## How deploys work

The self-hosted CI runner on MBserver deploys automatically when a commit message contains `[deploy]`.

```bash
git commit -m "your message [deploy]"
git push
```

Commits **without** `[deploy]` push code to the branch but do not trigger a deploy or take the site down.

### What the pipeline does

1. **Builds the frontend** — runs `npm ci && npm run build` on the runner host; Vite writes compiled assets to `sites/ai-smb/`
2. **Rebuilds the backend image** — `docker compose build backend`
3. **Starts services** — `docker compose up -d --remove-orphans`
4. **Reloads nginx** — `docker compose restart nginx` picks up new files instantly (no image rebuild needed)

### After a frontend-only change

A full Docker image rebuild is not required. On the server:

```bash
cd frontend
npm run build            # writes to ../sites/ai-smb/
cd ..
docker compose restart nginx
```

nginx serves the new files immediately from the host-mounted `sites/ai-smb/` directory.

## Local development

```bash
# Install dependencies
cd frontend && npm install && cd ..
cd backend  && npm install && cd ..

# Start MySQL locally
docker compose up -d mysql

# Run frontend dev server (hot-reload)
cd frontend && npm run dev

# Run backend
cd backend && npm start
```

## Project layout

```
frontend/         React + Vite source (JSX, CSS)
backend/          Node.js / Express API
sites/ai-smb/     Vite build output — gitignored, populated by npm run build
nginx/conf.d/     nginx virtual host config (volume-mounted into the container)
docker-compose.yml
deploy.sh         Manual deploy script (mirrors CI pipeline)
.github/workflows/deploy.yml
```
