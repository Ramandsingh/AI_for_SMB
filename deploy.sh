#!/usr/bin/env bash
# deploy.sh — build, sync, and restart the ai-smb site
set -euo pipefail

BRANCH="claude/docker-react-vite-mysql-PeMvf"
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_FILE="$REPO_DIR/deploy.log"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }

# ── Load site config ──────────────────────────────────────────────────────────
if [[ ! -f "$REPO_DIR/.env" ]]; then
  log "ERROR: .env not found — copy deploy/.env.example to .env and fill in values"
  exit 1
fi
set -a; source "$REPO_DIR/.env"; set +a

: "${SITE_DOMAIN:?SITE_DOMAIN must be set in .env}"
: "${SITE_ROOT:?SITE_ROOT must be set in .env}"
: "${BACKEND_PORT:?BACKEND_PORT must be set in .env}"
: "${NGINX_VHOST_DIR:=/etc/nginx/conf.d}"
: "${NGINX_RELOAD_CMD:=sudo nginx -s reload}"

log "=== Deployment started ==="
log "Site:    $SITE_DOMAIN"
log "Root:    $SITE_ROOT"
log "Backend: 127.0.0.1:$BACKEND_PORT"

cd "$REPO_DIR"

# ── Pull latest code ──────────────────────────────────────────────────────────
log "Fetching latest code..."
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull origin "$BRANCH"
log "Code updated to $(git rev-parse --short HEAD)"

# ── Build frontend ────────────────────────────────────────────────────────────
log "Building frontend..."
cd frontend
npm ci --silent --legacy-peer-deps
NODE_OPTIONS=--max-old-space-size=3072 npm run build
cd "$REPO_DIR"

# ── Sync static files to site root ────────────────────────────────────────────
log "Syncing frontend/dist/ → $SITE_ROOT ..."
mkdir -p "$SITE_ROOT"
rsync -a --delete frontend/dist/ "$SITE_ROOT/"
log "Sync complete — $(find "$SITE_ROOT" -type f | wc -l | tr -d ' ') files"

# ── Build + restart backend ───────────────────────────────────────────────────
log "Building backend image..."
# DOCKER_BUILDKIT=0: legacy builder avoids Docker Hub auth on restricted networks
DOCKER_BUILDKIT=0 docker compose build backend

log "Starting backend and database..."
docker compose up -d --force-recreate backend
docker compose up -d mysql

# ── Install nginx vhost ───────────────────────────────────────────────────────
log "Installing nginx vhost → $NGINX_VHOST_DIR/ai-smb.conf ..."
# envsubst substitutes only the listed variables; nginx's own $host etc. are left intact
envsubst '${SITE_DOMAIN} ${SITE_ROOT} ${BACKEND_PORT}' \
  < "$REPO_DIR/deploy/nginx/site.conf.template" \
  > /tmp/ai-smb.conf
cp /tmp/ai-smb.conf "$NGINX_VHOST_DIR/ai-smb.conf"

log "Reloading nginx..."
nginx -t 2>&1 | tee -a "$LOG_FILE"
eval "$NGINX_RELOAD_CMD"

# ── Health check ──────────────────────────────────────────────────────────────
log "Waiting for backend to start..."
sleep 10

log "Backend health check (direct)..."
if curl -sf "http://127.0.0.1:${BACKEND_PORT}/api/health" > /tmp/health.json; then
  log "Backend OK — $(python3 -c 'import sys,json; d=json.load(open("/tmp/health.json")); print(d.get("status"), "|", d.get("database"), "| tables:", len(d.get("tables",[])))' 2>/dev/null || cat /tmp/health.json)"
else
  log "ERROR: Backend is not responding on port $BACKEND_PORT"
  docker compose logs backend --tail=50
  exit 1
fi

log "Frontend check..."
if curl -sf "http://127.0.0.1:${BACKEND_PORT}" -o /dev/null 2>/dev/null || \
   [[ -f "$SITE_ROOT/index.html" ]]; then
  log "Frontend OK — index.html present at $SITE_ROOT"
else
  log "WARNING: $SITE_ROOT/index.html not found"
fi

log "=== Deployment complete ==="
log "Site:    http://$SITE_DOMAIN"
log "Health:  http://$SITE_DOMAIN/api/health"
