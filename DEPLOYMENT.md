# RealState4U Deployment Checklist

## GitHub Secret

Create this GitHub Actions secret:

- `CPANEL_PASSWORD`: your cPanel account password

## Server Requirements

- Node.js 20.x
- MariaDB/MySQL database available
- cPanel Node.js App or CloudLinux NodeJS Selector
- Passenger startup file set to `app.js`

## Environment Variables

Set these in cPanel:

```env
DATABASE_URL=mysql://DB_USER:URL_ENCODED_PASSWORD@127.0.0.1:3306/realstate4u_marketplace
NEXTAUTH_URL=https://realstate4u.com
NEXTAUTH_SECRET=generate-a-long-random-secret
NODE_ENV=production
```

## Deployment Steps

1. Upload or deploy the project files.
2. Set the application root to the project folder.
3. Set the startup file to `app.js`.
4. Run:

```bash
npm install
npm run prisma:generate
npm run build
npm run prisma:deploy
```

If you only have a one-time JS runner in the hosting panel, run:

```bash
node setup-server.cjs
```

5. Restart the app from cPanel.

For future updates where packages did not change, run:

```bash
node update-server.cjs
```

## Database Checks

Verify:

- database name: `realstate4u_marketplace`
- database user exists
- user has privileges on that database

If the server uses an incompatible auth plugin, ask hosting support to switch the DB user to `mysql_native_password`.

Example SQL:

```sql
ALTER USER 'your_db_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your-db-password';
FLUSH PRIVILEGES;
```

## After First Deploy

Test these routes:

- `/`
- `/properties`
- `/login`
- `/register`
- `/queue-housing`

## If It Fails

Check:

- Passenger log
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `node_modules`
- build output in `.next`
