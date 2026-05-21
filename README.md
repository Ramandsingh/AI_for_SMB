# AI for SMB Dashboard

A structured AI adoption guide for business leaders — from first awareness to operational value.

## Deployment

The self-hosted CI runner deploys automatically when a commit message contains `[deploy]`.

**To deploy:**
```bash
git commit -m "your message [deploy]"
git push
```

Commits **without** `[deploy]` push code to the branch but do not trigger a rebuild or take the site down. Use `[deploy]` only when you're ready to release.

The deploy pipeline:
1. Stops existing Docker containers
2. Rebuilds all images from scratch (`--no-cache`)
3. Starts containers and verifies health

## Stack

- **Frontend** — React + Vite + Tailwind CSS, served via nginx
- **Backend** — Node.js / Express
- **Database** — MySQL 8.0
- **Infrastructure** — Docker Compose, self-hosted GitHub Actions runner

## Development

```bash
cd frontend && npm install
cd backend && npm install
docker compose up -d   # start MySQL locally
```
