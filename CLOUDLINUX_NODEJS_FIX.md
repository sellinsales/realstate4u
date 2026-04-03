# CloudLinux NodeJS Selector Setup (REQUIRED for Your Host)

## **You MUST Use CloudLinux NodeJS Selector**

Your cPanel has CloudLinux enabled, which requires a different Node.js setup. The error you got is from CloudLinux NodeJS Selector, not regular Node.js Manager.

## **Find CloudLinux NodeJS Selector**

In cPanel, look for:
- **CloudLinux NodeJS Selector** (under "Software" or "CloudLinux" section)
- **NodeJS** (with CloudLinux icon)
- **Node.js Selector** (CloudLinux version)

**Do NOT use** the regular "Setup Node.js App" or "Node.js Manager" - that's for non-CloudLinux hosts.

## **If You Can't Find It**

1. Check if CloudLinux is enabled: Look for "CloudLinux" in cPanel sidebar
2. Contact your host: "Please enable CloudLinux NodeJS Selector in cPanel"
3. Most hosts with CloudLinux have it available

## **Setup Steps**

1. **Delete node_modules** from `/home/realstate4u/public_html/rs4u/` (if exists)
2. **Open CloudLinux NodeJS Selector**
3. **Create New Application**:
   - Application root: `/home/realstate4u/public_html/rs4u`
   - Application URL: `http://realstate4u.com/`
   - Node.js version: 20.x
   - Application mode: `production`
   - Environment variables:
     ```
     DATABASE_URL=mysql://realstate4u_online:Z4%5D%24bE7TPdF%3Fg5%5E8@localhost:3306/realstate4u_marketplace?authPlugin=mysql_native_password
     NEXTAUTH_URL=http://realstate4u.com
     NEXTAUTH_SECRET=7f9d2c8e1a4b6k9m3p5q8t2v6x1z4c7j9n2r5u8w
     NODE_ENV=production
     ```

4. **Run NPM Install** (CloudLinux will create virtual environment)
5. **Restart** the application
6. **Test** `http://realstate4u.com/`

## **Why CloudLinux is Different**

- **Virtual Environment**: node_modules stored separately with symlink
- **Resource Limits**: Better isolation and security
- **Automatic Management**: CloudLinux handles npm operations
- **Required**: Your host uses CloudLinux, so regular Node.js Manager won't work

## **Common Mistake**

Users often use "Setup Node.js App" (regular) instead of "CloudLinux NodeJS Selector" - this causes the error you saw.

**Use CloudLinux NodeJS Selector** - it's the correct tool for your hosting environment.

---

**Action:** Use CloudLinux NodeJS Selector instead of regular cPanel Node.js Manager. This is the correct tool for your host setup.
