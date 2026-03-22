# YOI Website

The official website of the [Youth Oceanic Initiative](https://theyoi.org) — built with [Payload CMS](https://payloadcms.com) and [Next.js](https://nextjs.org).

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **CMS:** Payload CMS 3
- **Database:** PostgreSQL (Neon in production)
- **Storage:** Vercel Blob (media uploads)
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Package manager:** Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.0
- Node.js ≥ 20.9
- PostgreSQL (local) or a Neon connection string

### Setup

```bash
# Install dependencies
bun install

# Copy env template and fill in values
cp .env.example .env
```

Required environment variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Secret key for Payload JWT signing |
| `NEXT_PUBLIC_SERVER_URL` | Public URL (e.g. `http://localhost:3000`) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (optional locally) |

### Development

```bash
bun dev
```

App runs at [http://localhost:3000](http://localhost:3000).  
Payload admin at [http://localhost:3000/admin](http://localhost:3000/admin).

### Database

```bash
# Create and apply migrations
bun payload migrate:create --name <migration_name>
bun payload migrate

# Seed data from JSON files
bun run seed

# Seed globals (Header, Footer) + upload media to Blob
bun run seed:globals
```

### Build

```bash
bun run build
bun start
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/     # Public-facing Next.js pages
│   └── (payload)/      # Payload admin panel
├── collections/        # Payload collections (Pages, Posts, TeamMembers, etc.)
├── globals/            # Payload globals (Header, Footer, JoinOptions)
├── components/         # Shared React components
│   ├── ui/             # shadcn/ui primitives
│   ├── banners/        # Hero banner components
│   └── navigation/     # Navbar + mobile sidebar
├── blocks/             # Payload block components
├── heros/              # Hero block variants
├── scripts/            # Seed scripts
└── migrations/         # Payload DB migrations
```

## Collections

| Collection | Description |
|---|---|
| Pages | CMS-managed pages with block builder |
| Posts | Blog / newsletter posts |
| TeamMembers | YOI team members by department |
| Projects | YOI projects and initiatives |
| Events | Past and upcoming events |
| Opportunities | Ocean conservation opportunities database |
| Chapters | YOI school chapters (with geo coordinates) |
| Media | Uploaded files (stored in Vercel Blob) |
| Users | Admin users with profile pictures |

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes to `main` trigger automatic production deploys.

When adding new collections or changing the schema:
1. Run `bun payload migrate:create --name <name>` locally
2. Commit the generated migration files in `src/migrations/`
3. Apply to prod: `DATABASE_URL=<prod_url> bun payload migrate`

## License

© 2024 The Youth Oceanic Initiative. All rights reserved.
