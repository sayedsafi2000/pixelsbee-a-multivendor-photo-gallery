# 🚀 Vercel Deployment Guide for Pixelsbee.com

## **Overview**
Deploy your Pixelsbee frontend to Vercel and connect your custom domain `pixelsbee.com`.

## **Prerequisites**
- ✅ GitHub repository with your code
- ✅ Backend already hosted on Render.com
- ✅ DreamHost domain: `pixelsbee.com`

## **Step 1: Deploy to Vercel**

### **1.1: Create Vercel Account**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click **"New Project"**

### **1.2: Import Repository**
1. **Connect GitHub** (if not already connected)
2. **Select Repository**: Choose your Pixelsbee repository
3. **Framework Preset**: Next.js (auto-detected)
4. **Root Directory**: `client` (since your frontend is in the client folder)

### **1.3: Configure Build Settings**
```
Framework Preset: Next.js
Root Directory: client
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### **1.4: Set Environment Variables**
Before deploying, click **"Environment Variables"** and add:

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_API_URL` | `https://pixelsbee-server.onrender.com/api` |
| `NEXT_PUBLIC_APP_NAME` | `Pixelsbee` |

### **1.5: Deploy**
Click **"Deploy"** and wait for the build to complete.

**Your site will be available at**: `https://your-project-name.vercel.app`

## **Step 2: Connect Custom Domain**

### **2.1: Add Domain in Vercel**
1. Go to your project dashboard
2. Click **"Settings"** → **"Domains"**
3. Click **"Add Domain"**
4. Enter: `pixelsbee.com`
5. Click **"Add"**

### **2.2: Configure DNS at DreamHost**
Vercel will show you the DNS records. Go to **DreamHost Panel** → **Domains** → **Manage Domains** → **DNS** and add:

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Note**: If CNAME for root (@) doesn't work, use these A records instead:
```
Type: A
Name: @
Value: 76.76.19.36
TTL: 3600

Type: A
Name: @
Value: 76.76.19.37
TTL: 3600
```

### **2.3: Wait for DNS Propagation**
- DNS changes can take 24-48 hours
- You can check propagation at [whatsmydns.net](https://whatsmydns.net)

## **Step 3: Test Your Deployment**

### **3.1: Test Frontend**
- Visit: `https://pixelsbee.com`
- Check if the site loads correctly
- Test responsive design on mobile/desktop

### **3.2: Test API Integration**
- Test user registration
- Test user login
- Test product browsing
- Test cart functionality
- Check browser console for errors

### **3.3: Test Backend Connection**
- Verify API calls go to: `https://pixelsbee-server.onrender.com/api`
- Check Network tab in browser dev tools
- Ensure no CORS errors

## **Step 4: Environment Variables Reference**

### **Development (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_APP_NAME=Pixelsbee
NODE_ENV=development
```

### **Production (Vercel Dashboard)**
```env
NEXT_PUBLIC_API_URL=https://pixelsbee-server.onrender.com/api
NEXT_PUBLIC_APP_NAME=Pixelsbee
NODE_ENV=production
```

## **Step 5: Automatic Deployments**

### **5.1: GitHub Integration**
- Every push to `main` branch triggers automatic deployment
- Vercel creates preview deployments for pull requests
- You can enable/disable auto-deploy in project settings

### **5.2: Manual Deployments**
- Go to project dashboard
- Click **"Deployments"**
- Click **"Redeploy"** for manual deployment

## **Troubleshooting**

### **Common Issues**

1. **Build Fails**
   - Check build logs in Vercel dashboard
   - Verify all dependencies are in `package.json`
   - Check for syntax errors in your code

2. **API Calls Fail**
   - Verify `NEXT_PUBLIC_API_URL` is set correctly
   - Check if backend is running on Render.com
   - Check CORS configuration in backend

3. **Domain Not Working**
   - Verify DNS records are correct
   - Wait for DNS propagation (up to 48 hours)
   - Check domain status in Vercel dashboard

4. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_`
   - Redeploy after adding environment variables
   - Check variable names for typos

### **Useful Commands**

```bash
# Check build locally
cd client
npm run build

# Check for linting errors
npm run lint

# Test production build locally
npm run start
```

## **Monitoring & Analytics**

### **Vercel Analytics**
- **Page Views**: Track visitor count
- **Performance**: Core Web Vitals
- **Errors**: JavaScript errors and 404s

### **Performance Monitoring**
- **Lighthouse Scores**: Performance, SEO, Accessibility
- **Real User Metrics**: Actual user experience data
- **Edge Network**: Global CDN performance

## **Cost & Limits**

| Feature | Free Tier | Pro Tier |
|---------|-----------|----------|
| **Deployments** | Unlimited | Unlimited |
| **Bandwidth** | 100GB/month | 1TB/month |
| **Function Execution** | 10s timeout | 60s timeout |
| **Custom Domains** | Unlimited | Unlimited |
| **Team Members** | 1 | Unlimited |

**Your setup**: **100% FREE** ✅

## **Next Steps**

1. **Set up monitoring** and analytics
2. **Configure error tracking** (Sentry, etc.)
3. **Set up performance monitoring**
4. **Configure backup domains** if needed
5. **Set up staging environment**

## **Support Resources**

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **DreamHost Support**: [help.dreamhost.com](https://help.dreamhost.com)

---

**🎉 Congratulations!** Your Pixelsbee application will be live at `https://pixelsbee.com` with professional hosting on Vercel.
