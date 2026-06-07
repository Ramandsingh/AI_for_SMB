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

log "Starting all services (MySQL data is safe in named volume)..."
# --remove-orphans cleans up containers for services no longer in compose (e.g. old 'frontend')
docker compose up -d --remove-orphans

log "Reloading nginx config and site files..."
docker compose restart nginx

# Wait for health
log "Waiting for services to become healthy..."
sleep 10

if docker compose ps | grep -q "unhealthy"; then
  log "ERROR: One or more services are unhealthy"
  docker compose ps
  exit 1
fi

log "=== Deployment complete ==="
log "Frontend: http://localhost:5173"
log "Backend:  http://localhost:3001/api/health"
