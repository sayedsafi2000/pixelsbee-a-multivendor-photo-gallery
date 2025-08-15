# 🚀 Pixelsbee Deployment Guide

## **Architecture Overview**
- **Frontend**: Next.js app → DreamHost (shared hosting)
- **Backend**: Node.js/Express API → Render.com (free hosting)
- **Database**: MySQL → DreamHost MySQL database

---

## **Step 1: DreamHost Database Setup** 🗄️

### **1.1 Create MySQL Database**
1. Log into DreamHost panel
2. Go to **Databases** → **MySQL Databases**
3. Create new database:
   - Database Name: `yourdomain_pixelsbee`
   - Username: Create new user
   - Password: Strong password
4. Note down credentials for later

### **1.2 Import Database Schema**
1. Go to **Databases** → **phpMyAdmin**
2. Select your database
3. Go to **SQL** tab
4. Copy schema from `server/database.sql`
5. Remove first 3 lines (CREATE DATABASE and USE)
6. Execute SQL

### **1.3 Database Credentials**
Save these for Step 3:
```
DB_HOST=your-dreamhost-mysql-host
DB_USER=your-dreamhost-db-user
DB_PASSWORD=your-dreamhost-db-password
DB_NAME=your-dreamhost-db-name
```

---

## **Step 2: Deploy Backend to Render.com** ⚙️

### **2.1 Prepare Server Code**
1. Create GitHub repository
2. Push your code to GitHub
3. Ensure `server/package.json` has build script

### **2.2 Deploy on Render.com**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **New Web Service**
4. Connect your GitHub repo
5. Configure:
   - **Name**: `pixelsbee-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### **2.3 Environment Variables**
Add these in Render dashboard:
```
DB_HOST=your-dreamhost-mysql-host
DB_USER=your-dreamhost-db-user
DB_PASSWORD=your-dreamhost-db-password
DB_NAME=your-dreamhost-db-name
PORT=10000
NODE_ENV=production
JWT_SECRET=your-super-secure-jwt-secret-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CORS_ORIGIN=https://yourdomain.com
```

### **2.4 Get Backend URL**
After deployment, note your Render URL:
`https://your-app-name.onrender.com`

---

## **Step 3: Deploy Frontend to DreamHost** 🌐

### **3.1 Build Frontend**
```bash
cd client
npm install
npm run build
```

### **3.2 Update API Configuration**
Edit `client/src/utils/api.js`:
```javascript
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-app-name.onrender.com/api'
  : 'http://localhost:5001/api';
```

### **3.3 Upload to DreamHost**
1. Upload `client/.next` folder to your domain
2. Upload `client/public` folder
3. Upload `client/package.json`
4. Create `.htaccess` file for Next.js routing

### **3.4 DreamHost Configuration**
1. Set domain to use Node.js
2. Configure domain to point to your upload directory
3. Set environment variables in DreamHost panel

---

## **Step 4: Domain Configuration** 🔗

### **4.1 Custom Domain for Backend (Optional)**
1. In Render dashboard, go to **Settings**
2. Add custom domain
3. Point subdomain (e.g., `api.yourdomain.com`) to Render

### **4.2 Update Frontend API URL**
If using custom domain:
```javascript
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://api.yourdomain.com/api'
  : 'http://localhost:5001/api';
```

---

## **Step 5: SSL & Security** 🔒

### **5.1 SSL Certificates**
- Render.com: Automatic HTTPS
- DreamHost: Automatic SSL certificates

### **5.2 Environment Variables**
Never commit `.env` files to Git
Use hosting platform environment variables

---

## **Step 6: Testing & Monitoring** ✅

### **6.1 Test Your Deployment**
1. Test registration/login
2. Test image uploads
3. Test database connections
4. Check console for errors

### **6.2 Monitoring**
- Render.com: Built-in logs
- DreamHost: Error logs in panel
- Database: Monitor connections

---

## **Troubleshooting** 🔧

### **Common Issues:**
1. **CORS Errors**: Check CORS_ORIGIN in backend
2. **Database Connection**: Verify DreamHost credentials
3. **Build Errors**: Check Node.js version compatibility
4. **Image Uploads**: Verify Cloudinary credentials

### **Useful Commands:**
```bash
# Test database connection
mysql -h your-host -u your-user -p your-database

# Check server logs
# Render.com: Dashboard → Logs
# DreamHost: Panel → Logs
```

---

## **Cost Breakdown** 💰

### **Free Tier:**
- **Render.com**: $0/month (750 hours)
- **DreamHost**: Your existing hosting
- **Cloudinary**: $0/month (25GB storage)

### **Optional Upgrades:**
- **Render.com**: $7/month (always on)
- **Custom Domain**: $12/year
- **Cloudinary**: $89/month (advanced features)

---

## **Next Steps** 🎯

1. **Performance**: Add CDN for images
2. **Monitoring**: Set up error tracking
3. **Backup**: Regular database backups
4. **Scaling**: Monitor usage and upgrade as needed

---

**Need Help?** 
- Check hosting platform documentation
- Review error logs
- Test locally first
- Use browser developer tools
