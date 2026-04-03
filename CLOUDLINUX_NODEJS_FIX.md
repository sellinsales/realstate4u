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

Run after the app is created:

```bash
npm install
npm run prisma:generate
npm run build
npm run prisma:deploy
```

Then restart the application.
