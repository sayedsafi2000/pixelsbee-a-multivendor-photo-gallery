# ⚡ Quick Deployment Reference

## **Immediate Steps (Do These First)**

### **1. DreamHost Database Setup** 🗄️
```sql
-- In phpMyAdmin, run this (remove first 3 lines from database.sql):
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'vendor', 'admin') DEFAULT 'user',
    status ENUM('pending', 'approved', 'blocked') DEFAULT 'pending',
    profile_pic_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- ... (copy rest from server/database.sql)
```

### **2. GitHub Repository** 📁
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/pixelsbee.git
git push -u origin main
```

### **3. Render.com Backend** ⚙️
1. Go to [render.com](https://render.com)
2. **New Web Service** → Connect GitHub repo
3. **Settings:**
   - Name: `pixelsbee-api`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

### **4. Environment Variables (Render)** 🔧
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

### **5. Update API URL** 🔗
Edit `client/src/utils/api.js`:
```javascript
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-app-name.onrender.com/api'  // Your Render URL
    : 'http://localhost:5001/api');
```

### **6. Build Frontend** 🏗️
```bash
cd client
npm install
npm run build
```

### **7. DreamHost Frontend** 🌐
1. Upload `client/.next` folder to your domain
2. Upload `client/public` folder
3. Upload `client/package.json`
4. Configure domain for Node.js in DreamHost panel

---

## **Quick Commands** ⚡

```bash
# Build everything
./deploy.sh

# Or manually:
cd server && npm install
cd ../client && npm install && npm run build

# Test locally
npm run dev
```

---

## **Troubleshooting** 🔧

### **Common Issues:**
- **CORS Error**: Check `CORS_ORIGIN` in Render environment variables
- **Database Error**: Verify DreamHost MySQL credentials
- **Build Error**: Check Node.js version (use 18+)
- **404 Error**: Ensure API URL is correct in `client/src/utils/api.js`

### **Test Your Deployment:**
1. Visit your domain
2. Try to register a new user
3. Check browser console for errors
4. Check Render.com logs for backend errors

---

## **Cost Summary** 💰
- **Render.com**: $0/month (free tier)
- **DreamHost**: Your existing hosting
- **Total**: $0/month (free deployment!)

---

**Need Help?** Check the full `DEPLOYMENT.md` guide for detailed steps.
