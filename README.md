# RepLab — Strength & Conditioning Platform

MCDA 5510 final project — a platform for coaches to deliver curated workout programs to athletes, who log their training and track personal records.

## Team
- Adrien Grant (A00425511)
- Johnson Egbichi
- Mohammad Alalouh (A00454272)

## Tech stack
- **Frontend:** React + Vite
- **Backend:** Django + Django REST Framework, managed with `uv`
- **Auth:** django-allauth + dj-rest-auth, JWT via SimpleJWT
- **Database:** Supabase PostgreSQL, with SQLite support for local development.
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
- Hosting: Azure is the plan of record (per the final-project doc); the instructor's answer was non-committal on Render/Vercel


## Database Configuration

RepLab supports two database configurations:

- SQLite for local development.
- Supabase PostgreSQL for cloud development and deployment.

Django ORM and Django migrations are used to manage the database schema.
Django remains responsible for authentication, authorization, and REST APIs.
Supabase Auth and the Supabase Data API are not used.

### Prerequisites

- Python 3.14
- uv package manager
- Node.js and npm
- Access to the team's Supabase project for cloud development

### Install Backend Dependencies

From the project root:

```bash
cd backend
uv sync --locked
```

### Option 1: Local SQLite Database

SQLite is the default database and requires no additional credentials.

```bash
uv run --no-env-file python manage.py migrate
uv run --no-env-file python manage.py runserver
```

### Option 2: Supabase PostgreSQL

1. Copy `.env.example` to `.env` inside the backend directory.
2. Set `DJANGO_DB=postgresql`.
3. Obtain the Session pooler connection parameters from Supabase.
4. Populate the following environment variables:

```env
DJANGO_DB=postgresql
DB_NAME=postgres
DB_USER=postgres.YOUR_PROJECT_REFERENCE
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_HOST=YOUR_SUPABASE_POOLER_HOST
DB_PORT=5432
DB_SSLMODE=require
```

5. Validate the Django configuration:

```bash
uv run --env-file .env python manage.py check
```

6. Apply the database migrations to the approved development database:

```bash
uv run --env-file .env python manage.py migrate
```

7. Start the Django backend:

```bash
uv run --env-file .env python manage.py runserver
```

### Frontend Setup

Open a separate terminal at the project root:

```bash
npm ci
npm run dev
```

### Application URLs

- React frontend: http://localhost:5173/
- Django backend: http://127.0.0.1:8000/
- Django Admin: http://127.0.0.1:8000/admin/
- REST API: http://127.0.0.1:8000/api/
- Health check: http://127.0.0.1:8000/api/health/

### Verify Database Connectivity

From the backend directory:

```bash
uv run --env-file .env python manage.py shell -c "from django.db import connection; print(connection.vendor); connection.ensure_connection(); print('Connection successful')"
```

Expected output:

```text
postgresql
Connection successful
```

### Database Security

- Never commit the private `.env` file.
- Never hardcode database credentials in source code.
- Use `.env.example` as the shared configuration template.
- Keep the Supabase Data API disabled.
- Use encrypted PostgreSQL connections.
- Manage database schema changes through Django migrations.
- Do not manually modify database tables through Supabase.
- Obtain shared database credentials through a secure channel.

Production deployment requires additional security hardening,
certificate verification, and secure environment configuration.

### Integration Testing

The following checks were completed during the Supabase integration:

- PostgreSQL database connectivity.
- SQL query execution.
- All 40 existing Django migrations applied.
- All 25 expected database tables verified.
- All seven core application models verified.
- Database record creation and retrieval.
- Foreign key relationship verification.
- Transaction rollback.
- Django Admin CRUD operations.
- All seven existing REST API endpoints.
- Unauthenticated API access rejection.
- SQLite backward compatibility.
- React and Django proxy integration.
- Frontend production build.


### Database Smoke Test

To verify Supabase connectivity, database read/write operations,
relationships, and transaction rollback, run the following command
from the backend directory:

```bash
uv run --env-file .env python manage.py shell -c "exec(open('scripts/smoke_supabase.py', encoding='utf-8').read())"
```

Expected result: ALL DATABASE TESTS PASSED.

The script rolls back temporary test records after execution.
Run this script only against an approved development database.

This is a manually executed integration smoke test, not part of
the automated Django unit test suite.