# RepLab — Strength & Conditioning Platform

MCDA 5510 final project — a platform for coaches to deliver curated workout programs to athletes, who log their training and track personal records.

## Team
- Adrien Grant (A00425511)
- Johnson Egbichi
- Mohammad Alalouh

## Tech stack
- **Frontend:** React + Vite
- **Backend:** Django + Django REST Framework, managed with `uv`
- **Auth:** django-allauth + dj-rest-auth, JWT via SimpleJWT
- **Database:** PostgreSQL in production (provider TBD — Supabase, Azure SQL, or CS-server MSSQL); SQLite for local dev
- **Deployment:** Azure — Static Web Apps (frontend), App Service (backend), Azure Pipelines

## Scope
- Coaches create exercises, workouts, and programs, and assign them to athletes/groups.
- Athletes view today's workout, log sets/reps/weight, and track PRs.
- Checkout with full card validation (demo/internal authorization only — no real payment processing, no real charges).

## Run locally

### Backend
```cmd
cd backend
uv run python manage.py migrate
uv run python manage.py runserver
```
API runs at http://127.0.0.1:8000 — health check at `/api/health/`, auth at `/api/auth/`.

### Frontend
```cmd
npm install
npm run dev
```
The Vite dev server proxies `/api` to the Django backend.

## Project structure
- `backend/` — Django project (`config/` settings + URLs, `core/` app with models, serializers, API views)
- `src/` — React frontend
- `public/` — static assets

## Status
- Auth (allauth + JWT) — done, merged in PR #1
- Core models (Profile, Exercise, PersonalRecord, Workout, WorkoutExercise, Program, PaymentPlan) — done, merged in PR #1
- API endpoints — in progress (`feature/api-endpoints`)
- Remaining models (ProgramDay, assignments, logs, org, payment) — to do

## Open decisions
- Production database: Supabase vs Azure SQL vs CS-server MSSQL
- Hosting: Azure is the plan of record (per the final-project doc); the instructor's answer was non-committal on Render/Vercel
