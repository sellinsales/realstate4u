# CloudLinux NodeJS Selector Setup

If your host uses CloudLinux, use CloudLinux NodeJS Selector instead of a generic Node.js manager.

## Recommended Setup

- Application root: your uploaded project folder
- Application URL: your domain or subdomain
- Node.js version: 20.x
- Mode: `production`
- Startup file: `app.js`

## Environment Variables

```env
DATABASE_URL=mysql://DB_USER:URL_ENCODED_PASSWORD@127.0.0.1:3306/realstate4u_marketplace
NEXTAUTH_URL=https://realstate4u.com
NEXTAUTH_SECRET=generate-a-long-random-secret
NODE_ENV=production
```

## Commands

If cPanel Terminal is using the system runtime, activate the CloudLinux app runtime first:

```bash
source /home/USERNAME/nodevenv/public_html/APP_ROOT/20/bin/activate
```

Then run:

```bash
npm install
npm run prisma:generate
npm run build
npm run prisma:push
```

`npm run build` intentionally uses `next build --webpack` to avoid Turbopack worker issues on some shared hosts.

Then restart the application.

## If Build Still Fails With `EAGAIN`

Some shared hosts block both child processes and worker threads during `next build`.
If that happens, do not build on the server.

Instead:

1. Build locally or in CI.
2. Upload the generated `.next` folder to the server.
3. Run the prebuilt setup script on the server:

```bash
node setup-prebuilt-server.cjs
```

For later updates with a freshly uploaded `.next` folder:

```bash
node update-prebuilt-server.cjs
```

If CloudLinux gives you a "Run JS Script" option and you do not have terminal access, run:

```bash
node setup-server.cjs
```

This script performs the same setup steps automatically. It is not the startup file. The startup file must stay `app.js`.

For normal updates after the app is already installed, run:

```bash
node update-server.cjs
```

This skips `npm install` and only regenerates Prisma, rebuilds, and deploys migrations.

For this repository, the server scripts fall back to `prisma db push` because there is no `prisma/migrations` directory.
