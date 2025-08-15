# ⚡ Railway.app Quick Deployment Guide

## **🚀 Immediate Steps (Do These Now)**

### **1. GitHub Setup** 📁
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/pixelsbee.git
git push -u origin main
```

### **2. Railway.app Setup** ⚙️
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your Pixelsbee repository

### **3. Add Services** 🔧
1. **Add Database Service:**
   - Click **"New Service"** → **"Database"** → **"MySQL"**
   - Railway creates MySQL database automatically

2. **Add Web Service:**
   - Click **"New Service"** → **"GitHub Repo"**
   - Set **Root Directory** to `server`
   - Railway detects Node.js automatically

### **4. Environment Variables** 🔑
In your web service, add these variables:
```
NODE_ENV=production
PORT=3000
JWT_SECRET=your-super-secure-jwt-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CORS_ORIGIN=https://yourdomain.com
```

### **5. Link Database** 🔗
1. In web service → **Variables** tab
2. Click **"Reference Variable"**
3. Select your MySQL service
4. Database variables are added automatically

### **6. Import Database Schema** 📊
1. Go to MySQL service → **Connect**
2. Use query editor or MySQL Workbench
3. Copy schema from `server/database.sql`
4. Remove first 3 lines (CREATE DATABASE and USE)
5. Execute SQL

### **7. Get Your URLs** 🌐
After deployment:
- **Backend URL**: `https://your-app-name.railway.app`
- **Database**: Available in MySQL service

### **8. Update Frontend** 🎨
Edit `client/src/utils/api.js`:
```javascript
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-app-name.railway.app/api'  // Your Railway URL
    : 'http://localhost:5001/api');
```

### **9. Deploy Frontend** 🚀
```bash
cd client
npm install
npm run build
```
Then upload to DreamHost:
- Upload `client/.next` folder
- Upload `client/public` folder
- Upload `client/package.json`
- Configure domain for Node.js

---

## **⚡ Quick Commands**

```bash
# Run Railway deployment script
./railway-deploy.sh

# Or manually:
cd server && npm install
cd ../client && npm install && npm run build
```

---

## **🔧 Troubleshooting**

### **Common Issues:**
- **Database Connection Error**: Check if database service is linked
- **Build Error**: Ensure `server/package.json` has correct scripts
- **CORS Error**: Verify `CORS_ORIGIN` environment variable
- **Port Error**: Railway uses port 3000 by default

### **Test Your Deployment:**
1. Visit your Railway web service URL
2. Try to register a new user
3. Check Railway logs for errors
4. Check browser console for frontend errors

---

## **💰 Cost Summary**
- **Railway.app**: $5 credit/month (free tier)
- **MySQL Database**: Included
- **Custom Domains**: Included
- **SSL Certificates**: Automatic
- **Total**: $0-3/month (completely free for small projects!)

---

## **📞 Need Help?**
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Check Railway logs for detailed error messages

---

**🎯 Next Steps:**
1. Follow the steps above
2. Test your deployment
3. Monitor usage in Railway dashboard
4. Upgrade if needed (Railway scales easily)
