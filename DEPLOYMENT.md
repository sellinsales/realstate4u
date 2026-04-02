# RealState4U - Complete Deployment Checklist

## Step 1: Create GitHub Secret (REQUIRED - User Action)

1. Go to: https://github.com/sellinsales/realstate4u/settings/secrets/actions
2. Click "New repository secret"
3. Name: `CPANEL_PASSWORD`
4. Value: `Kashmir1....`
5. Click "Add secret"

## Step 2: Verify Local Configuration

✅ Database URL configured with MySQL:
```
DATABASE_URL=mysql://realstate4u_online:Z4]$bE7TPdF?g5^8@localhost:3306/realstate4u_marketplace?authPlugin=mysql_native_password
```

✅ .env file created with:
```
NODE_ENV=production
NEXTAUTH_URL=http://realstate4u.com
NEXTAUTH_SECRET=<generate-secure-string>
```

✅ Build successful:
```
npm run build ✓
```

## Step 3: Verify cPanel Database Setup (REQUIRED - User Action)

In cPanel:
1. Go to MySQL Databases
2. Verify database exists: `realstate4u_marketplace`
3. Verify user exists: `realstate4u_online`
4. **Using phpMyAdmin - Create Tables**:
   - Open phpMyAdmin in cPanel
   - Select database: `realstate4u_marketplace`
   - Click **SQL** tab
   - Copy entire content from `prisma/schema.sql` file in your project
   - Paste into SQL editor and click **Go**
   - All 7 tables will be created automatically
5. **FIX AUTH PLUGIN** (critical):
   - Still in phpMyAdmin SQL tab, run:
   ```sql
   ALTER USER 'realstate4u_online'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Z4]$bE7TPdF?g5^8';
   ```
   - Click **Go** and verify success

## Step 4: Verify Node.js App in cPanel (REQUIRED - User Action)

In cPanel Node.js Manager:
1. Create/Configure Node.js Application:
   - Application root: `/home/realstate4u/public_html/rs4u`
   - Application URL: `http://realstate4u.com/`
   - Node.js version: 20.x or latest
   - Application mode: `production`
   - NODE_ENV: `production`
   - Startup file: Leave default or use `npm start`

2. Add Environment Variables in cPanel:
   ```
   DATABASE_URL=mysql://realstate4u_online:Z4]$bE7TPdF?g5^8@localhost:3306/realstate4u_marketplace?authPlugin=mysql_native_password
   NEXTAUTH_URL=http://realstate4u.com
   NEXTAUTH_SECRET=<generate-secure-strong-string>
   ```

## Step 5: Deploy via GitHub Actions (Automatic)

1. Make a commit to push to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. Watch deployment:
   - Go to: https://github.com/sellinsales/realstate4u/actions
   - Click the latest workflow run
   - Monitor "Deploy via FTP" step
   - Check logs if any errors

## Step 6: Database Initialization (One-time, after first deploy)

**Option A: Via cPanel Terminal or SSH** (if available):
```bash
cd public_html/rs4u
npx prisma generate
npx prisma migrate deploy
npx tsx prisma/seed.ts
```

**Option B: Via phpMyAdmin** (if no terminal access):
1. Open phpMyAdmin
2. Select database: `realstate4u_marketplace`
3. Click **SQL** tab
4. Paste the demo data SQL from `prisma/demo-seed.sql` (see Troubleshooting section)
5. Click **Go**
6. Data will be seeded automatically

## Step 7: Test the Deployment

1. Visit: `http://realstate4u.com/`
2. Check homepage loads
3. Test registration: `/register`
4. Test login: `/login`
5. Check properties page: `/properties`
6. Verify database seeded with demo data

## Troubleshooting

### If you don't have cPanel Terminal access:

**Option 1: Use phpMyAdmin (Easiest)**
1. Go to cPanel → phpMyAdmin
2. Select database: `realstate4u_marketplace`
3. Click **SQL** tab
4. Run: `ALTER USER 'realstate4u_online'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Z4]$bE7TPdF?g5^8';`
5. Then use Prisma migrations via the app or setup script

**Option 2: Contact Hosting Support**
- Email your host asking them to:
  1. Fix auth plugin to mysql_native_password
  2. Run Prisma migrations for your database

**Option 3: Setup Locally, Export & Import**
1. Setup database locally with Prisma
2. Export database dump
3. Import via phpMyAdmin on cPanel

**Option 4: Check for SSH Access**
- Check if SSH is available in cPanel
- Connect via: `ssh realstate4u@108.163.234.178`
- Then run setup commands

### If FTP deployment fails:
- Verify `CPANEL_PASSWORD` secret is set in GitHub
- Check username is `realstate4u@realstate4u.com`
- Check FTP port is 21 (standard)
- Check `/home/realstate4u/logs/passenger.log` for errors

### If database connection fails:
- Verify auth plugin is `mysql_native_password`
- Test connection string locally first
- Check special characters are URL-encoded: `?` → `%3F`, `^` → `%5E`
- Ensure user has ALL privileges on database

### If app crashes after deploy:
- Check Passenger logs: `/home/realstate4u/logs/passenger.log`
- Verify all dependencies installed: `npm install` on server
- Verify environment variables are set properly
- Check Node.js version is 20+

## Summary of What's Ready

✅ GitHub Actions workflow configured for FTP deployment
✅ Database configured for MySQL
✅ App built successfully locally
✅ start.sh script ready
✅ All code pushed to GitHub

## What Needs User Action

1. Create CPANEL_PASSWORD GitHub secret
2. Fix MySQL auth plugin in cPanel
3. Configure Node.js app in cPanel with environment variables
4. Run database migration commands after first deploy
5. Test the live application

---

**Next Steps:**
1. Create GitHub secret first
2. Set up Node.js app in cPanel
3. Push to GitHub to trigger deployment
4. Run database setup commands
5. Visit http://realstate4u.com/ to verify
