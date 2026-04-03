# Troubleshooting Passenger

If Passenger shows the generic error page, the app failed during startup.

## Check First

- startup file is `app.js`
- `npm install` was run
- `npm run build` was run
- `npm run prisma:generate` was run
- environment variables are present
- if cPanel Terminal shows old Node/npm, activate the CloudLinux runtime first:

```bash
source /home/USERNAME/nodevenv/public_html/APP_ROOT/20/bin/activate
```

## Required Environment Variables

```env
DATABASE_URL=mysql://DB_USER:URL_ENCODED_PASSWORD@127.0.0.1:3306/realstate4u_marketplace
NEXTAUTH_URL=https://realstate4u.com
NEXTAUTH_SECRET=generate-a-long-random-secret
NODE_ENV=production
```

## Common Causes

- missing `node_modules`
- missing `.next` build output
- invalid `DATABASE_URL`
- bad DB password encoding
- unsupported MySQL auth plugin
- shared hosting blocked Next.js child process spawning during build (`EAGAIN`)

## Shared Hosting Build Fix

If `next build` fails with `spawn ... EAGAIN` or `ERR_WORKER_INIT_FAILED`, keep the build on a single execution lane:

- use `next build --webpack`
- set `experimental.cpus = 1`
- set `experimental.workerThreads = true`
- set `experimental.webpackBuildWorker = false`
- set `experimental.staticGenerationMaxConcurrency = 1`

These settings are already configured in [`next.config.ts`](d:/projects/realstate4u/next.config.ts).

If the host still fails with `EAGAIN` after that, it is blocking both child processes and worker threads.
At that point, the correct workaround is a prebuilt deployment:

1. Build locally or in CI.
2. Upload `.next` to the server.
3. Run:

```bash
node setup-prebuilt-server.cjs
```

## MariaDB/MySQL Auth Plugin Fix

If Prisma cannot connect, ask hosting support to switch the database user to `mysql_native_password`.

Example:

```sql
ALTER USER 'your_db_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your-db-password';
FLUSH PRIVILEGES;
```

## Useful Commands

```bash
node --version
npm --version
npm install
npm run prisma:generate
npm run build
npm run prisma:push
```

`npm run build` uses `next build --webpack` on purpose. If you change it back to the Turbopack default, some shared hosts can fail with `ERR_WORKER_INIT_FAILED`.

## Log Location

Check the Passenger or application error log in your hosting panel first. That log is the fastest way to find the actual startup failure.
