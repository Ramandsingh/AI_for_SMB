#!/usr/bin/env node
/**
 * webhook-listener.js
 * Listens for GitHub push events and triggers deploy.sh automatically.
 *
 * Setup:
 *   1. npm install (installs express + @octokit/webhooks)
 *   2. Set environment variables:
 *        WEBHOOK_SECRET=<your-github-webhook-secret>
 *        WEBHOOK_PORT=9000          (default 9000)
 *        DEPLOY_BRANCH=claude/docker-react-vite-mysql-PeMvf
 *   3. Run: node scripts/webhook-listener.js
 *   4. In GitHub repo → Settings → Webhooks → Add webhook:
 *        Payload URL: http://<your-server-ip>:9000/webhook
 *        Content type: application/json
 *        Secret: <same as WEBHOOK_SECRET>
 *        Events: Just the push event
 *   5. (Optional) Run as a system service — see scripts/webhook.service
 */

const http    = require('http');
const crypto  = require('crypto');
const { execFile } = require('child_process');
const path    = require('path');
const fs      = require('fs');

const PORT          = parseInt(process.env.WEBHOOK_PORT  || '9000', 10);
const SECRET        = process.env.WEBHOOK_SECRET         || '';
const DEPLOY_BRANCH = process.env.DEPLOY_BRANCH          || 'claude/docker-react-vite-mysql-PeMvf';
const DEPLOY_SCRIPT = path.resolve(__dirname, '..', 'deploy.sh');
const LOG_FILE      = path.resolve(__dirname, '..', 'webhook.log');

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  process.stdout.write(line);
  fs.appendFileSync(LOG_FILE, line);
}

function verifySignature(body, signature) {
  if (!SECRET) return true; // skip verification if no secret configured
  const hmac = crypto.createHmac('sha256', SECRET);
  hmac.update(body);
  const expected = `sha256=${hmac.digest('hex')}`;
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature || ''));
  } catch {
    return false;
  }
}

function runDeploy() {
  log('Starting deployment...');
  execFile('bash', [DEPLOY_SCRIPT], { cwd: path.dirname(DEPLOY_SCRIPT) }, (err, stdout, stderr) => {
    if (err) {
      log(`Deployment FAILED: ${err.message}`);
      if (stderr) log(`stderr: ${stderr}`);
    } else {
      log('Deployment succeeded');
      if (stdout) log(`stdout: ${stdout.trim()}`);
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', branch: DEPLOY_BRANCH }));
    return;
  }

  if (req.method !== 'POST' || req.url !== '/webhook') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    const sig = req.headers['x-hub-signature-256'];
    if (!verifySignature(body, sig)) {
      log('Rejected: invalid signature');
      res.writeHead(401);
      res.end('Unauthorized');
      return;
    }

    let payload;
    try { payload = JSON.parse(body); } catch {
      res.writeHead(400);
      res.end('Bad request');
      return;
    }

    const pushedBranch = (payload.ref || '').replace('refs/heads/', '');
    log(`Received push to branch: ${pushedBranch}`);

    if (pushedBranch !== DEPLOY_BRANCH) {
      log(`Ignoring push to ${pushedBranch} (watching ${DEPLOY_BRANCH})`);
      res.writeHead(200);
      res.end('Ignored');
      return;
    }

    res.writeHead(200);
    res.end('Deployment triggered');
    setImmediate(runDeploy);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  log(`Webhook listener running on port ${PORT}`);
  log(`Watching branch: ${DEPLOY_BRANCH}`);
  log(`Deploy script:   ${DEPLOY_SCRIPT}`);
  if (!SECRET) log('WARNING: WEBHOOK_SECRET not set — signature verification disabled');
});
