# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-05-30

## User Preferences

- Prefers concise responses — no filler, no preamble
- Wants working code committed and pushed, not just explained
- Uses `[deploy]` keyword in commit messages to trigger CI/CD
- Prefers grouped toolbar items (save + download near each other, not scattered)
- Wants "must have" features called out — treat as highest priority
- Biz hub route prefix is `/biz` (user wrote "/bit" once — always interpret as `/biz`)
- Tabs in UI are preferred over separate pages for related admin/meta content
- Lessons Learned should be stored in Admin page under a dedicated tab

## Key Learnings

- **Project:** AI_for_SMB — AI Adoption Dashboard for SMBs, Vite + React + Tailwind + Node/Express + MySQL, served via nginx in Docker
- **Git branch:** `claude/docker-react-vite-mysql-PeMvf` — all work goes here; `[deploy]` in commit message triggers CI/CD
- **PageWrapper** is at `src/components/PageWrapper.jsx` — takes `badge`, `title`, `subtitle`, `sections`, `children`; registers sections with the right sidebar
- **Layout LAB_ROUTES:** pages in this array get no max-width constraint (full-width layout); add `/biz/*` and `/lab/*` pages here
- **Layout NO_RIGHT_SIDEBAR:** pages in this array auto-close the right sidebar; use for large browsable/canvas pages (`/biz/industries`, `/biz/usecases`, `/lab/pdf`, etc.)
- **App.jsx pattern:** lazy-load heavy pages (`LabExcalidraw`, potentially `LabPDF`, `LabFlowcharts`) with `React.lazy()` + `<Suspense>` to avoid bundling them into the main chunk
- **LabGraph (Graphify):** PAGE_DEFS and searchIndex.js must be kept in sync when new routes are added — both need entries for every new page
- **Docker — file persistence:** container filesystem is ephemeral; use named Docker volumes or store files in MySQL as BLOBs (this project uses BLOB for PDFs and gallery images)
- **Docker — layer cache:** `COPY package*.json` then `RUN npm ci` before `COPY . .` ensures the npm install layer is cached; `--no-cache` bypasses this and was the cause of 10-15 min deploys
- **Docker — deploy pattern:** use `docker compose build frontend backend` + `docker compose up -d --no-deps frontend backend` instead of `compose down` + full `compose up`; MySQL never needs to restart on code changes
- **Vite build in Docker:** requires `ENV NODE_OPTIONS=--max-old-space-size=3072` or Node OOMs mid-build due to large deps (Mermaid, PDF.js, Fabric.js)
- **MySQL healthcheck:** backend `depends_on` must use `condition: service_healthy` not just `condition: service_started`; without it the backend races with MySQL init and fails with ECONNREFUSED
- **MySQL init.sql:** only runs on first boot (empty data directory); schema changes need idempotent `CREATE TABLE IF NOT EXISTS` / `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` in `server.js runMigrations()`
- **React ref in useEffect deps:** `pdfDocRef.current` in a useEffect dependency array does not reliably trigger re-renders — refs are mutable outside React's render cycle. Fix: use a `docVersion` integer state that increments after async work completes; put `docVersion` in the dep array instead
- **Fabric.js v5 + PDF.js pattern:** PDF.js renders each page to an offscreen canvas → `toDataURL` → set as Fabric `backgroundImage`; annotations live as Fabric objects above it; serialise with `fc.toJSON()` / restore with `fc.loadFromJSON()`
- **biz data files:** `src/data/biz/industries.js` (275 use cases, 11 verticals) and `src/data/biz/departments.js` (275 dept use cases + 15 matrix functions); structure includes `nonTech: bool` and `quarter: Q1|Q2|Q3|Q4` per use case

## Do-Not-Repeat

- [2026-05-30] Never put `ref.current` values in useEffect dependency arrays — React doesn't track ref mutations. Use a state counter (`docVersion`) incremented after async work instead.
- [2026-05-30] Never use `--no-cache` in the deploy workflow `docker compose build` step — this forces a full npm reinstall every deploy (10-15 min). Remove it and rely on layer caching.
- [2026-05-30] Don't `docker compose down` before a code deploy — it kills MySQL unnecessarily. Use `--no-deps frontend backend` to restart only app containers.
- [2026-05-30] Don't write curly/smart quotes (`'`) inside JavaScript single-quoted string literals — they break esbuild parsing. Use straight `\'` or switch to double-quoted strings.
- [2026-05-30] When adding new routes, update ALL THREE of: `App.jsx` (route), `LeftSidebar.jsx` (nav group), `LabGraph.jsx PAGE_DEFS` + `searchIndex.js` (discovery). Missing any one of these causes inconsistency.
- [2026-05-30] anatomy.md auto-tracking only captures files actually edited this session — it is NOT a full project scan. Don't rely on it being complete; grep/find for unknown files.

## Decision Log

- [2026-05-30] PDF annotations stored in MySQL (`pdf_fabric_data` table, JSON column) rather than filesystem — avoids container persistence problem entirely.
- [2026-05-30] CLI module kept in Q1 of Business Hub but tagged "Advanced / Optional" — accessible to power users without blocking non-technical learners.
- [2026-05-30] MCP moved from Q1 to Q3 Business Hub — it's a power-user topic appropriate after functional specialisation is established.
- [2026-05-30] `/biz/industries` and `/biz/usecases` get NO_RIGHT_SIDEBAR treatment — they are large filterable reference pages that need full width.
- [2026-05-30] Lessons Learned added as a tab in Admin rather than a standalone page — it's meta/internal content that doesn't need its own sidebar nav entry.
- [2026-05-30] Deploy speed: chose `up --no-deps` over zero-downtime blue-green — simpler, sufficient for a dev/demo environment; a brief restart of nginx+node containers is acceptable.
