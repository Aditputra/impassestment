# IMP Assessment - Software Engineer

## Tech Stack
- **Laravel 12** (API-only, Sanctum Auth, PostgreSQL)
- **Next.js 16** (App Router, DaisyUI, TailwindCSS v3)

## Features
- [x] **Authentication**
  - Sign Up
  - Sign In
  - Sign Out
- [x] **Post Management (CRUD)**
  - List all posts (with pagination)
  - View post details
  - Create a new post
  - Edit an existing post
  - Delete a post
- [x] Only owner can edit/delete their post
- [x] Clean UI using **DaisyUI** (no complex design needed)

## Project Structure
imp-assessment/
├── Laravel/        → Laravel API (Sanctum, PostgreSQL)
├── NextJs/         → Next.js Frontend (App Router, DaisyUI)
├── docker-compose.yml
├── README.md
└── .gitignore


## How to Install and Run Each Stack

### Using Docker Compose

```bash
# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start all services
docker-compose up -d --build

# Run migrations
docker exec -it backend php artisan migrate

# Optional: Seed dummy data
docker exec -it backend php artisan db:seed