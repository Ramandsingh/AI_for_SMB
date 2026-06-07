#!/usr/bin/env bash
# deploy.sh — pull latest code and restart Docker services
set -euo pipefail

BRANCH="claude/docker-react-vite-mysql-PeMvf"
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_FILE="$REPO_DIR/deploy.log"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }

log "=== Deployment started ==="
log "Branch: $BRANCH"
log "Directory: $REPO_DIR"

cd "$REPO_DIR"

# Pull latest changes
log "Fetching latest code..."
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull origin "$BRANCH"
log "Code updated to $(git rev-parse --short HEAD)"

# Build frontend static files into sites/ai-smb/ (outDir set in vite.config.js).
# No Docker image rebuild needed — nginx mounts the files directly as a volume.
log "Building frontend..."
cd frontend
npm ci --silent --legacy-peer-deps
NODE_OPTIONS=--max-old-space-size=3072 npm run build
cd "$REPO_DIR"

# Rebuild backend image only (Node/Express code changes).
# DOCKER_BUILDKIT=0 uses the legacy builder — skips Docker Hub registry auth on
# restricted networks where BuildKit contacts registry.docker.io even for cached images.
log "Building backend..."
DOCKER_BUILDKIT=0 docker compose build backend

log "Starting services..."
# --force-recreate backend ensures fresh container with the newly built image
# --remove-orphans cleans up containers no longer in compose (e.g. old 'frontend')
docker compose up -d --remove-orphans --force-recreate backend
docker compose up -d mysql nginx
docker compose restart nginx

log "Waiting for services to become healthy..."
sleep 15

log "--- Container status ---"
docker compose ps
log "--- Backend startup logs ---"
docker compose logs backend --tail=30

log "--- Health check ---"
if curl -sf http://localhost:3001/api/health > /dev/null; then
  log "Backend OK — $(curl -s http://localhost:3001/api/health | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get(\"status\"), d.get(\"database\"))')"
else
  log "ERROR: Backend health check failed"
  docker compose logs backend --tail=50
  exit 1
fi

if curl -sf http://localhost:3001 > /dev/null; then
  log "Frontend OK"
else
  log "WARNING: Frontend not responding on port 3001"
fi

log "=== Deployment complete ==="
log "App:     http://localhost:3001"
log "Health:  http://localhost:3001/api/health"
