# 🚀 Pixelsbee Deployment Checklist

## **Before Deployment**

### ✅ **Server Preparation**
- [ ] Server code is production-ready
- [ ] Environment variables are configured
- [ ] CORS is properly set for production
- [ ] Health check endpoint added (`/health`)
- [ ] Error handling is robust
- [ ] Logging is appropriate for production

### ✅ **Database Preparation**
- [ ] MongoDB Atlas account created
- [ ] Database cluster is running
- [ ] Connection string is ready
- [ ] Database user has proper permissions
- [ ] Network access is configured

### ✅ **Frontend Preparation**
- [ ] API base URL can be configured via environment
- [ ] All API calls use the configurable base URL
- [ ] Error handling for API failures
- [ ] Loading states for better UX

## **Deployment Steps**

### **Step 1: Deploy Server**
1. **Choose Platform**: Render.com (recommended) or Railway
2. **Connect GitHub**: Link your repository
3. **Configure Service**:
   - Name: `pixelsbee-api`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Set Environment Variables**:
   ```
   NODE_ENV=production
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   FRONTEND_URL=https://your-frontend-domain.com
   ```
5. **Deploy**: Click "Create Web Service"

### **Step 2: Test Server**
- [ ] Health check: `https://your-api.onrender.com/health`
- [ ] Test user registration: `POST /api/auth/register`
- [ ] Test user login: `POST /api/auth/login`
- [ ] Test product creation: `POST /api/products`
- [ ] Test order creation: `POST /api/orders`

### **Step 3: Deploy Frontend**
1. **Choose Platform**: Vercel (recommended) or Netlify
2. **Connect GitHub**: Link your repository
3. **Configure Build**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. **Set Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api
   ```
5. **Deploy**: Click "Deploy"

### **Step 4: Update Frontend API URL**
- [ ] Update `client/src/utils/api.js` with new API URL
- [ ] Test all frontend functionality
- [ ] Verify user registration/login works
- [ ] Test product browsing and cart
- [ ] Test checkout process
- [ ] Test vendor dashboard
- [ ] Test user dashboard

## **Post-Deployment Testing**

### ✅ **Core Functionality**
- [ ] User registration and login
- [ ] Product browsing and search
- [ ] Cart functionality
- [ ] Checkout process
- [ ] Order creation
- [ ] Vendor order management
- [ ] User downloads and purchases

### ✅ **File Uploads**
- [ ] Image uploads work
- [ ] Cloudinary integration is working
- [ ] Images are accessible after upload

### ✅ **Database Operations**
- [ ] Data is being saved correctly
- [ ] Queries return expected results
- [ ] Relationships between models work

## **Monitoring & Maintenance**

### ✅ **Performance**
- [ ] API response times are acceptable
- [ ] Database queries are optimized
- [ ] File uploads complete successfully

### ✅ **Security**
- [ ] JWT tokens are working
- [ ] Protected routes are secure
- [ ] User data is properly isolated
- [ ] No sensitive data in logs

### ✅ **Error Handling**
- [ ] Check deployment logs regularly
- [ ] Monitor for 500 errors
- [ ] Set up error notifications if possible

## **Common Issues & Solutions**

### **CORS Errors**
- Update `FRONTEND_URL` in server environment
- Check CORS configuration in server

### **Database Connection Issues**
- Verify MongoDB URI is correct
- Check network access settings
- Ensure database user has permissions

### **Build Failures**
- Check `package.json` scripts
- Verify all dependencies are listed
- Check Node.js version compatibility

### **Environment Variables**
- Ensure all required variables are set
- Check variable names match code
- Verify no typos in values

## **Free Tier Limitations**

### **Render.com**
- 750 hours/month (enough for 24/7)
- 512MB RAM
- Sleep after 15 minutes of inactivity

### **Vercel**
- Unlimited deployments
- 100GB bandwidth/month
- Serverless functions timeout at 10 seconds

### **MongoDB Atlas**
- 512MB storage
- Shared clusters
- 500 connections max

## **Next Steps After Deployment**

1. **Set up monitoring** for your API
2. **Configure custom domain** if desired
3. **Set up automated backups** for database
4. **Monitor usage** to stay within free tier limits
5. **Plan for scaling** when you outgrow free tier

## **Support Resources**

- **Render**: [docs.render.com](https://docs.render.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Railway**: [docs.railway.app](https://docs.railway.app)
