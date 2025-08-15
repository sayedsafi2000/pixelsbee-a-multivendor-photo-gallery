#!/bin/bash

# 🚀 Railway.app Deployment Script for Pixelsbee
# This script helps you deploy your Pixelsbee application to Railway.app

echo "🚀 Starting Railway.app Deployment for Pixelsbee..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the Pixelsbee root directory"
    exit 1
fi

print_status "Checking project structure..."

# Check if required directories exist
if [ ! -d "client" ] || [ ! -d "server" ]; then
    print_error "Client or server directory not found"
    exit 1
fi

print_status "Project structure looks good!"

echo ""
echo "📋 Railway.app Deployment Checklist:"
echo "1. ⏳ Create GitHub repository"
echo "2. ⏳ Push code to GitHub"
echo "3. ⏳ Create Railway.app account"
echo "4. ⏳ Deploy to Railway.app"
echo "5. ⏳ Configure environment variables"
echo "6. ⏳ Import database schema"
echo "7. ⏳ Update frontend API URL"
echo "8. ⏳ Deploy frontend to DreamHost"
echo ""

read -p "Have you created a GitHub repository and pushed your code? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Please create a GitHub repository first:"
    echo ""
    echo "1. Go to https://github.com"
    echo "2. Create a new repository called 'pixelsbee'"
    echo "3. Run these commands:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin https://github.com/yourusername/pixelsbee.git"
    echo "   git push -u origin main"
    echo ""
    echo "Then run this script again."
    exit 1
fi

print_step "Step 1: Preparing server for Railway deployment..."

# Build backend
cd server
print_status "Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Backend dependency installation failed"
    exit 1
fi

print_status "Backend dependencies installed successfully!"

cd ..

print_step "Step 2: Preparing frontend for deployment..."

# Build frontend
cd client
print_status "Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Frontend dependency installation failed"
    exit 1
fi

print_status "Building frontend for production..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Frontend build failed"
    exit 1
fi

print_status "Frontend built successfully!"

cd ..

echo ""
print_status "🎉 Build process completed!"
echo ""
print_step "Step 3: Railway.app Deployment Instructions"
echo ""
echo "📝 Follow these steps to deploy to Railway.app:"
echo ""
echo "1. 🚀 Go to Railway.app:"
echo "   - Visit https://railway.app"
echo "   - Sign up with GitHub"
echo "   - Verify your email"
echo ""
echo "2. 🗄️ Create New Project:"
echo "   - Click 'New Project'"
echo "   - Select 'Deploy from GitHub repo'"
echo "   - Connect your GitHub repository"
echo "   - Select your Pixelsbee repository"
echo ""
echo "3. 🗃️ Add Database Service:"
echo "   - In your Railway project, click 'New Service'"
echo "   - Select 'Database' → 'MySQL'"
echo "   - Railway will automatically create a MySQL database"
echo ""
echo "4. ⚙️ Add Web Service:"
echo "   - Click 'New Service' again"
echo "   - Select 'GitHub Repo'"
echo "   - Choose your repository"
echo "   - Set 'Root Directory' to 'server'"
echo "   - Railway will detect it's a Node.js project"
echo ""
echo "5. 🔧 Configure Environment Variables:"
echo "   In your web service, go to 'Variables' tab and add:"
echo "   NODE_ENV=production"
echo "   PORT=3000"
echo "   JWT_SECRET=your-super-secure-jwt-secret-key-here"
echo "   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name"
echo "   CLOUDINARY_API_KEY=your-cloudinary-api-key"
echo "   CLOUDINARY_API_SECRET=your-cloudinary-api-secret"
echo "   CORS_ORIGIN=https://yourdomain.com"
echo ""
echo "6. 🔗 Link Database to Web Service:"
echo "   - In your web service, go to 'Variables' tab"
echo "   - Click 'Reference Variable'"
echo "   - Select your MySQL service"
echo "   - This adds database connection variables automatically"
echo ""
echo "7. 📊 Import Database Schema:"
echo "   - Go to your MySQL service in Railway"
echo "   - Click 'Connect' → 'MySQL Workbench' or use query editor"
echo "   - Copy schema from server/database.sql"
echo "   - Remove first 3 lines (CREATE DATABASE and USE)"
echo "   - Execute the SQL"
echo ""
echo "8. 🌐 Update Frontend API URL:"
echo "   - After deployment, get your Railway URL"
echo "   - Edit client/src/utils/api.js"
echo "   - Replace 'your-app-name.railway.app' with your actual URL"
echo ""
echo "9. 🚀 Deploy Frontend to DreamHost:"
echo "   - Upload client/.next folder to your domain"
echo "   - Upload client/public folder"
echo "   - Upload client/package.json"
echo "   - Configure domain for Node.js"
echo ""

print_status "Railway deployment script completed!"
echo ""
echo "💡 Tips:"
echo "- Railway provides $5 credit/month (enough for small projects)"
echo "- Database is included in the service"
echo "- Automatic HTTPS and custom domains"
echo "- Monitor usage in Railway dashboard"
echo ""
echo "🔗 Useful Links:"
echo "- Railway Docs: https://docs.railway.app"
echo "- Railway Discord: https://discord.gg/railway"
echo ""
print_status "Good luck with your deployment! 🚀"




