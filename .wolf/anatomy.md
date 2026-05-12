# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-05-12T11:09:39.113Z
> Files: 81 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.dockerignore` — Docker ignore rules (~19 tok)
- `.gitignore` — Git ignore rules (~20 tok)
- `CLAUDE.md` — OpenWolf (~57 tok)
- `dashboard structure.md` — Declares The (~3474 tok)
- `deploy.sh` — deploy.sh — pull latest code and restart Docker services (~315 tok)
- `Discussions` (~19708 tok)
- `docker-compose.yml` — Docker Compose services (~395 tok)
- `README.md` — Project documentation (~9 tok)

## .claude/

- `settings.json` (~441 tok)

## .claude/rules/

- `openwolf.md` (~313 tok)

## .github/workflows/

- `deploy.yml` — CI: Deploy to MBserver (~332 tok)

## backend/

- `Dockerfile` — Docker container definition (~32 tok)
- `package-lock.json` — npm lock file (~13869 tok)
- `package.json` — Node.js package manifest (~96 tok)
- `server.js` — express: getPool, runMigrations (~7999 tok)

## frontend/

- `Dockerfile` — Docker container definition (~95 tok)
- `index.html` — AI Adoption Dashboard (~157 tok)
- `nginx.conf` — Nginx configuration (~219 tok)
- `package-lock.json` — npm lock file (~98481 tok)
- `package.json` — Node.js package manifest (~230 tok)
- `postcss.config.js` — PostCSS configuration (~24 tok)
- `tailwind.config.js` — Tailwind CSS configuration (~159 tok)
- `vite.config.js` — Vite build configuration (~87 tok)

## frontend/src/

- `App.jsx` — SectionsContext — renders chart — uses useContext, useState (~1754 tok)
- `index.css` — Styles: 10 rules, 1 media queries, 2 layers (~1060 tok)
- `main.jsx` (~94 tok)

## frontend/src/components/

- `Layout.jsx` — Truly full-bleed (no padding) — canvas/diagram pages that need edge-to-edge space (~486 tok)
- `LeftSidebar.jsx` — NAV_GROUPS — renders chart (~2708 tok)
- `PageWrapper.jsx` — PageWrapper — uses useEffect (~284 tok)
- `RightSidebar.jsx` — RightSidebar — uses useState, useEffect (~922 tok)

## frontend/src/context/

- `CompanyContext.jsx` — CompanyContext — uses useState, useEffect, useContext (~238 tok)

## frontend/src/pages/

- `Admin.jsx` — INDUSTRIES — renders form — uses useState, useEffect (~3030 tok)
- `AIFitPlanner.jsx` — SECTIONS — renders chart (~9032 tok)
- `Assessment.jsx` — SECTIONS (~3306 tok)
- `ConsultBain.jsx` — SECTIONS — renders chart (~5372 tok)
- `ConsultBCG.jsx` — SECTIONS — renders table (~4938 tok)
- `ConsultDeloitte.jsx` — SECTIONS — renders chart (~5583 tok)
- `ConsultMcKinsey.jsx` — SECTIONS — renders chart (~4790 tok)
- `EntDevAIFactory.jsx` — SECTIONS (~5156 tok)
- `EntDevAIPlatforms.jsx` — SECTIONS — renders chart (~5218 tok)
- `EntDevDataInfra.jsx` — SECTIONS — renders table (~4941 tok)
- `EntDevFoundationRAG.jsx` — SECTIONS (~5706 tok)
- `EntDevGovernance.jsx` — SECTIONS (~4956 tok)
- `EntDevTeam.jsx` — SECTIONS — renders chart (~5758 tok)
- `EnterpriseHowAdopt.jsx` — SECTIONS (~4830 tok)
- `EnterpriseMeasure.jsx` — SECTIONS — renders table (~5099 tok)
- `EnterpriseValue.jsx` — SECTIONS (~4705 tok)
- `EnterpriseWhatAI.jsx` — SECTIONS — renders chart — uses useState, useEffect (~7650 tok)
- `EnterpriseWhen.jsx` — SECTIONS (~4092 tok)
- `IndividualAdoption.jsx` — SECTIONS (~3873 tok)
- `Landing.jsx` — STAGES — uses useState (~3892 tok)
- `LearningApproach.jsx` — SECTIONS — renders table (~4111 tok)
- `MaturityCanvas.jsx` — STAGES — uses useState, useCallback (~4492 tok)
- `MaturityJourney.jsx` — STAGE_COLORS (~3886 tok)
- `OrgContributions.jsx` — SECTIONS (~3626 tok)
- `Roadmap.jsx` — SECTIONS — renders table (~3205 tok)
- `ROICalculator.jsx` — SECTIONS — renders table, chart — uses useState, useEffect (~4730 tok)
- `RoleImpactMap.jsx` — SECTIONS — renders chart — uses useState (~3885 tok)
- `SalesNarrative.jsx` — SECTIONS (~3117 tok)
- `TechCategories.jsx` — SECTIONS — renders table (~3683 tok)
- `TechDeployment.jsx` — SECTIONS (~4416 tok)
- `TechGlossary.jsx` — SECTIONS (~4287 tok)
- `TechHowWork.jsx` — SECTIONS (~4298 tok)
- `TechIntegrations.jsx` — SECTIONS — renders chart (~5293 tok)
- `Technology.jsx` — SECTIONS — renders table (~3867 tok)
- `TechWhatIsAI.jsx` — SECTIONS (~3443 tok)
- `UnderstandingAI.jsx` — SECTIONS (~2482 tok)

## frontend/src/pages/lab/

- `ImageEditorModal.jsx` — ImageEditorModal (~1006 tok)
- `LabArch.jsx` — ArchNode (~2636 tok)
- `LabCalendar.jsx` — makeId — renders form, modal — uses useState, useForm (~3041 tok)
- `LabCharts.jsx` — Shared (~10848 tok)
- `LabChat.jsx` — PROMPT_SECTIONS — uses useState (~7017 tok)
- `LabDatabase.jsx` — COLOR_MAP — uses useState, useEffect (~2597 tok)
- `LabGraph.jsx` — SECTIONS — renders chart — uses useNavigate, useCallback (~3576 tok)
- `LabHome.jsx` — NOTES_KEY — renders chart — uses useState, useRef, useEffect (~2986 tok)
- `LabTimeline.jsx` — EVENTS (~2122 tok)
- `LabUppy.jsx` — Lazy-load the editor so react-konva/konva don't run at app startup — (~5330 tok)

## mysql/

- `init.sql` — SQL: tables: assessments, roi_calculations, roi_models, lab_gallery (~2630 tok)

## scripts/

- `package.json` — Node.js package manifest (~65 tok)
- `webhook-listener.js` — webhook-listener.js (~1063 tok)
- `webhook.service` — systemd service for the webhook listener (~264 tok)
