# Fix: CloudLinux NodeJS Selector Virtual Environment Issue

## Problem
CloudLinux NodeJS Selector requires node_modules to be in a virtual environment (separate folder) with a symlink, NOT in the app root.

## Solution

### Step 1: Delete Local node_modules

In cPanel → File Manager:
1. Navigate to: `/home/realstate4u/public_html/rs4u/`
2. Find and **delete** the `node_modules` folder (if it exists)
3. Also delete `package-lock.json`

### Step 2: Use CloudLinux NodeJS Selector (NOT Regular cPanel Node.js Manager)

1. Go to cPanel → **CloudLinux NodeJS Selector** (or look for "NodeJS" in CloudLinux section)
2. Click **Create New Application**
3. Set:
   - **Application root:** `/home/realstate4u/public_html/rs4u`
   - **Application domain/URL:** `http://realstate4u.com/`
   - **Node.js version:** 20.x (latest available)
   - **Application startup file:** Leave default or set to `app.js`
   - **Application mode:** `production`

4. **Add Environment Variables:**
   ```
   DATABASE_URL=mysql://realstate4u_online:Z4%5D%24bE7TPdF%3Fg5%5E8@localhost:3306/realstate4u_marketplace?authPlugin=mysql_native_password
   NEXTAUTH_URL=http://realstate4u.com
   NEXTAUTH_SECRET=7f9d2c8e1a4b6k9m3p5q8t2v6x1z4c7j9n2r5u8w
   NODE_ENV=production
   ```

5. Click **Create**

### Step 3: CloudLinux Will Create Virtual Environment

CloudLinux will automatically:
- Create a virtual environment folder
- Create a `node_modules` symlink pointing to it
- Handle all npm operations in that virtual environment

### Step 4: Run npm install

Once the application is created in CloudLinux:
1. Click on your application
2. Click **Run NPM Install**
3. Wait for completion

### Step 5: Restart and Test

1. Click **Restart** in CloudLinux NodeJS Selector
2. Visit `http://realstate4u.com/`
3. Should load without Passenger errors

## Key Differences

**Regular cPanel Node.js Manager:**
- Direct node_modules in app root
- SimpleNode/Passenger handling
- Not suitable for CloudLinux

**CloudLinux NodeJS Selector:**
- Virtual environment management
- Automatic symlink creation
- Proper isolation and resource limits
- Better for cPanel + CloudLinux setups

## If You Don't See CloudLinux NodeJS Selector

1. Check if CloudLinux is enabled (cPanel usually shows it)
2. If only regular Node.js Manager available: contact cPanel support to enable CloudLinux NodeJS Selector
3. Or ask host to enable it - most hosts with CloudLinux have it available

## Common Issues After Setup

**If still errors:**
1. Verify `node_modules` is a symlink (→ arrow in file manager indicates symlink)
2. Don't manually edit node_modules - let CloudLinux manage it
3. Use CloudLinux panel for all npm operations
4. Restart from CloudLinux panel, not server restart

---

**Action:** Use CloudLinux NodeJS Selector instead of regular cPanel Node.js Manager. This is the correct tool for your host setup.
