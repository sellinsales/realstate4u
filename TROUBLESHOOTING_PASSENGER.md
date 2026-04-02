# Troubleshooting Passenger Error on cPanel

## Error: "We're sorry, but something went wrong"

This Passenger error means your Node.js app deployed but isn't running. Common causes:

## 1. Check Passenger Logs (CRITICAL)

**In cPanel → File Manager:**
- Navigate to: `/home/realstate4u/logs/`
- Look for: `passenger.log`
- Download and check for error messages

**Common errors:**
- `Cannot find module` → dependencies not installed
- `ECONNREFUSED` → database can't connect
- `Error: listen EADDRINUSE` → port already in use
- `undefined environment variable` → missing .env variables

## 2. Verify Environment Variables in cPanel

**In cPanel → Node.js Manager:**
Check these variables are set:
```
DATABASE_URL=mysql://realstate4u_online:Z4%5D%24bE7TPdF%3Fg5%5E8@localhost:3306/realstate4u_marketplace?authPlugin=mysql_native_password
NEXTAUTH_URL=http://realstate4u.com
NEXTAUTH_SECRET=7f9d2c8e1a4b6k9m3p5q8t2v6x1z4c7j9n2r5u8w
NODE_ENV=production
```

## 3. Install Dependencies on Server

**Via cPanel Terminal/SSH:**
```bash
cd /home/realstate4u/public_html/rs4u
npm install --production
```

## 4. Check .env File in App Root

**File:** `/home/realstate4u/public_html/rs4u/.env`

Should contain exactly:
```
NODE_ENV=production
DATABASE_URL=mysql://realstate4u_online:Z4%5D%24bE7TPdF%3Fg5%5E8@localhost:3306/realstate4u_marketplace?authPlugin=mysql_native_password
NEXTAUTH_URL=http://realstate4u.com
NEXTAUTH_SECRET=7f9d2c8e1a4b6k9m3p5q8t2v6x1z4c7j9n2r5u8w
```

## 5. Restart the App

**In cPanel → Node.js Manager:**
- Click "Restart"

## 6. Check MySQL Auth Plugin Again

In phpMyAdmin, run:
```sql
ALTER USER 'realstate4u_online'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Z4]$bE7TPdF?g5^8';
```

## Quick Diagnostic Script

If you have cPanel Terminal/SSH, run:
```bash
cd /home/realstate4u/public_html/rs4u
echo "=== Node Version ==="
node --version
echo "=== npm Version ==="
npm --version
echo "=== .env file ==="
cat .env
echo "=== node_modules exists ==="
ls -la | grep node_modules
echo "=== .next build exists ==="
ls -la | grep .next
echo "=== package.json exists ==="
ls -la | grep package.json
```

## Most Common Fix

Most likely issue: **npm dependencies not installed on server**

```bash
cd /home/realstate4u/public_html/rs4u
rm -rf node_modules package-lock.json
npm install --production
npm start
```

Then restart via cPanel Node.js Manager.

---

**What to do now:**
1. Check `/home/realstate4u/logs/passenger.log` for the actual error
2. Share the first 10 lines of that error
3. I'll give you the exact fix
