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
- Password reset and email confirmation
- Lead and inquiry capture
- Basic queue housing application flow
- Dashboard and admin pages
- Seeded demo data

## Stack

- Next.js App Router
- Tailwind CSS
- NextAuth credentials provider
- Prisma ORM
- MySQL / MariaDB
- Local server image uploads
- OpenStreetMap link integration

## Project Structure

```text
app/
  admin/
  api/
  dashboard/
  forgot-password/
  jobs/
  login/
  post-property/
  properties/
  queue-housing/
  register/
  reset-password/
  services/
  verify-email/
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
AUTH_REQUIRE_EMAIL_VERIFICATION=false
MAIL_FROM=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
LOCAL_UPLOADS_DIR=
LOCAL_UPLOADS_PUBLIC_BASE=
```

Notes:

- The app uses MySQL / MariaDB, not PostgreSQL.
- Email confirmation becomes required automatically when SMTP is configured.
- You can force confirmation on or off with `AUTH_REQUIRE_EMAIL_VERIFICATION=true` or `false`.
- If `LOCAL_UPLOADS_DIR` is empty, images are stored outside the app folder in `~/realstate4u-storage/listings`.
- If `LOCAL_UPLOADS_PUBLIC_BASE` is empty, uploaded images are served through `/uploads/listings/...`.

## Setup

1. Install dependencies.

```bash
npm install
```

2. Generate the Prisma client.

```bash
npm run prisma:generate
```

3. Run the initial migration locally.

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

- Public property pages work with demo data fallback when MySQL / MariaDB is not connected.
- Lead and queue APIs return demo-mode success messages without persistence until `DATABASE_URL` is configured.
- Posting new properties, registration, and live sign-in require a real database connection.
- The post property form uses direct server uploads from the browser instead of pasted image URLs.
- Password reset email and email confirmation delivery require SMTP settings.
- For safer persistence on shared hosting, uploads are now stored outside the deployed app folder by default.

## Useful Commands

```bash
npm run lint
npm run build
npm run prisma:studio
```

## Passenger Deployment

If your hosting uses Phusion Passenger or cPanel Node.js App:

1. Set the application root to this project folder.
2. Set the startup file to `app.js`.
3. Install dependencies:

```bash
npm install
```

4. Generate Prisma client:

```bash
npm run prisma:generate
```

5. Build the app:

```bash
npm run build
```

6. Apply the Prisma schema:

```bash
npm run prisma:push
```

If the live database already exists and you only need the auth upgrade for email confirmation and password reset, you can also run `prisma/auth-upgrade.sql` once in phpMyAdmin.

7. Set these environment variables in the hosting panel:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `MAIL_FROM`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_SECURE`

8. Restart the Passenger app.

If your hosting panel can run a single Node.js script but you do not have terminal access, use:

```bash
node setup-server.cjs
```

Or run:

```bash
npm run setup:server
```

Do not use `setup-server.cjs` as the app startup file. It is a one-time setup script only. Keep the startup file as `app.js`.

For later deployments where dependencies did not change, use:

```bash
node update-server.cjs
```

Or:

```bash
npm run update:server
```

If Passenger still shows the generic error page, check the app error log first. The most common causes for this project are:

- `npm run build` was not run on the server
- `node_modules` is missing
- `NEXTAUTH_SECRET` is missing
- `DATABASE_URL` is invalid
- the startup file was not set to `app.js`
- the MySQL user is using the unsupported `sha256_password` authentication plugin

This project does not ship Prisma migration files. The server scripts automatically use `prisma db push` unless a `prisma/migrations` directory exists.

## Prebuilt Deployment For Restricted Shared Hosting

If your host fails during `next build` with `EAGAIN`, it is blocking the worker model Next.js uses during production builds.
In that case, build locally or in CI and upload the generated `.next` folder.

Server steps for a prebuilt upload:

1. Activate the CloudLinux Node runtime:

```bash
source /home/USERNAME/nodevenv/public_html/APP_ROOT/20/bin/activate
```

2. Run the prebuilt setup script:

```bash
node setup-prebuilt-server.cjs
```

3. Keep the startup file as `app.js`.
4. Restart the app.

For later updates after uploading a fresh `.next` folder:

```bash
node update-prebuilt-server.cjs
```

## Next Phase Notes

- Add image reordering, cover selection, and deletion for uploaded media.
- Expand Sweden queue ranking logic beyond the basic application record.
- Add multilingual content fields and locale routing for EU markets.
- Add Pakistan-specific featured listings and stronger agent lead routing.
- Add services and jobs verticals after the property flow is stable.
