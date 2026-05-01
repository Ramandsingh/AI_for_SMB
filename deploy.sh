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

# Stop existing containers (keep volumes)
log "Stopping containers..."
docker compose down --remove-orphans

# Rebuild and start
log "Building and starting services..."
docker compose up -d --build

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
