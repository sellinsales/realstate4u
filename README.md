# RealState4U

RealState4U is a Phase 1 MVP for a multi-vertical housing platform covering:

- Sweden rental and queue housing
- EU buy and rent marketplace
- Pakistan property listings with WhatsApp lead flow

Services and jobs are scaffolded as future verticals, but Phase 1 is intentionally limited to properties, auth, leads, queue basics, and admin review.

## Phase 1 Scope

- Homepage
- Property search page
- Property detail page
- Post property page
- Credentials auth
- Lead and inquiry capture
- Basic queue housing application flow
- Dashboard and admin pages
- Seeded demo data

## Stack

- Next.js App Router
- Tailwind CSS v4
- NextAuth credentials provider
- Prisma ORM
- MySQL/MariaDB
- Cloudinary-ready image URL field
- OpenStreetMap link integration

## Project Structure

```text
app/
  admin/
  api/
  dashboard/
  jobs/
  login/
  post-property/
  properties/
  queue-housing/
  register/
  services/
components/
  auth/
  property/
  ui/
lib/
  auth.ts
  data.ts
  demo-data.ts
  db/
  markets.ts
  validators.ts
prisma/
  schema.prisma
  seed.ts
```

## Environment

Copy `.env.example` to `.env` and fill in the values.

```env
DATABASE_URL=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Setup

1. Install dependencies.

```bash
npm install
```

2. Generate the Prisma client.

```bash
npm run prisma:generate
```

3. Run the initial migration.

```bash
npm run prisma:migrate -- --name init
```

4. Seed demo data.

```bash
npm run db:seed
```

## Deployment

The app is configured for automated deployment to cPanel hosting via GitHub Actions FTP. Push to the `master` branch to trigger deployment.

5. Start the app.

```bash
npm run dev
```

## Demo Credentials

These work when the database is not configured yet:

- Admin: `admin@realstate4u.com` / `demo1234`
- Agent: `agent@realstate4u.com` / `demo1234`
- User: `user@realstate4u.com` / `demo1234`

## MVP Notes

- Public property pages work with demo data fallback when PostgreSQL is not connected.
- Lead and queue APIs return demo-mode success messages without persistence until `DATABASE_URL` is configured.
- Posting new properties and registration require a real database connection.
- The post property form currently accepts image URLs so Cloudinary uploads can be integrated cleanly next.

## Useful Commands

```bash
npm run lint
npm run build
npm run prisma:studio
```

## Next Phase Notes

- Replace image URL input with signed Cloudinary uploads.
- Expand Sweden queue ranking logic beyond the basic application record.
- Add multilingual content fields and locale routing for EU markets.
- Add Pakistan-specific featured listings and stronger agent lead routing.
- Add services and jobs verticals after the property flow is stable.
