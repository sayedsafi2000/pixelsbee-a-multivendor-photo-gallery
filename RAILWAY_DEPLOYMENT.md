# 🚀 Railway.app Deployment Guide

## **Railway.app Overview**
- **Server**: Node.js/Express API
- **Database**: MySQL (included)
- **Free Tier**: $5 credit/month (enough for small projects)
- **Pros**: Easy deployment, automatic HTTPS, custom domains, database included

---

## **Step 1: Prepare Your Project** 📁

### **1.1 Update Database Configuration**
Railway.app provides MySQL, so we need to update your database configuration to work with Railway's environment variables.

Edit `server/src/config/db.js`:
```javascript
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'pixelsbee_db',
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
```

### **1.2 Create Railway Configuration**
Create `railway.json` in your root directory:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### **1.3 Update Server Package.json**
Ensure your `server/package.json` has the correct scripts:
```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "build": "echo 'No build step required'"
  }
}
```

---

## **Step 2: Deploy to Railway.app** ⚙️

### **2.1 Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Verify your email

### **2.2 Create New Project**
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Connect your GitHub repository
4. Select your Pixelsbee repository

### **2.3 Add Database Service**
1. In your Railway project, click **"New Service"**
2. Select **"Database"** → **"MySQL"**
3. Railway will automatically create a MySQL database
4. Note the database credentials (they'll be in environment variables)

### **2.4 Add Web Service**
1. Click **"New Service"** again
2. Select **"GitHub Repo"**
3. Choose your repository
4. Set **Root Directory** to `server`
5. Railway will automatically detect it's a Node.js project

---

## **Step 3: Configure Environment Variables** 🔧

### **3.1 Database Variables (Auto-generated)**
Railway automatically provides these:
```
MYSQLHOST=your-mysql-host
MYSQLUSER=your-mysql-user
MYSQLPASSWORD=your-mysql-password
MYSQLDATABASE=your-mysql-database
MYSQLPORT=3306
```

### **3.2 Add Custom Variables**
In your web service, go to **Variables** tab and add:
```
NODE_ENV=production
PORT=3000
JWT_SECRET=your-super-secure-jwt-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CORS_ORIGIN=https://yourdomain.com
```

### **3.3 Link Database to Web Service**
1. In your web service, go to **Variables** tab
2. Click **"Reference Variable"**
3. Select your MySQL service
4. This will automatically add the database connection variables

---

## **Step 4: Deploy and Test** 🚀

### **4.1 Deploy**
1. Railway will automatically deploy when you push to GitHub
2. Or click **"Deploy"** in the Railway dashboard
3. Wait for deployment to complete

### **4.2 Get Your URLs**
After deployment, you'll get:
- **Web Service URL**: `https://your-app-name.railway.app`
- **Database URL**: Available in the database service

### **4.3 Import Database Schema**
1. Go to your MySQL service in Railway
2. Click **"Connect"** → **"MySQL Workbench"** or use the built-in query editor
3. Copy and paste the schema from `server/database.sql`
4. Remove the first 3 lines (CREATE DATABASE and USE statements)
5. Execute the SQL

---

## **Step 5: Update Frontend Configuration** 🌐

### **5.1 Update API URL**
Edit `client/src/utils/api.js`:
```javascript
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-app-name.railway.app/api'  // Your Railway URL
    : 'http://localhost:5001/api');
```

### **5.2 Build Frontend**
```bash
cd client
npm install
npm run build
```

### **5.3 Deploy Frontend to DreamHost**
1. Upload `client/.next` folder to your domain
2. Upload `client/public` folder
3. Upload `client/package.json`
4. Configure domain for Node.js

---

## **Step 6: Custom Domain (Optional)** 🔗

### **6.1 Add Custom Domain**
1. In Railway dashboard, go to your web service
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `api.yourdomain.com`)
4. Update DNS records as instructed

### **6.2 Update Frontend API URL**
If using custom domain:
```javascript
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://api.yourdomain.com/api'
    : 'http://localhost:5001/api');
```

---

## **Step 7: Testing & Monitoring** ✅

### **7.1 Test Your Deployment**
1. Visit your Railway web service URL
2. Test registration/login
3. Test image uploads
4. Check Railway logs for errors

### **7.2 Monitor Usage**
- Railway dashboard shows usage metrics
- Monitor database connections
- Check logs for any issues

---

## **Cost Breakdown** 💰

### **Free Tier:**
- **Railway.app**: $5 credit/month
- **MySQL Database**: Included
- **Custom Domains**: Included
- **SSL Certificates**: Automatic

### **Estimated Monthly Cost:**
- **Small Project**: $0-3/month
- **Medium Project**: $5-10/month
- **Large Project**: $10+/month

---

## **Troubleshooting** 🔧

### **Common Issues:**
1. **Database Connection Error**: Check if database service is linked
2. **Build Error**: Ensure `server/package.json` has correct scripts
3. **CORS Error**: Verify `CORS_ORIGIN` environment variable
4. **Port Error**: Railway uses port 3000 by default

### **Useful Commands:**
```bash
# Check Railway CLI (optional)
npm install -g @railway/cli
railway login
railway status
```

---

## **Next Steps** 🎯

1. **Performance**: Monitor usage and upgrade if needed
2. **Backup**: Railway provides automatic database backups
3. **Scaling**: Easy to scale up with Railway's paid plans
4. **Monitoring**: Set up alerts for usage limits

---

**Need Help?**
- Railway documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Check Railway logs for detailed error messages




