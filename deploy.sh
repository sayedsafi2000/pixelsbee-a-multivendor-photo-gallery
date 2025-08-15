#!/bin/bash

# 🚀 Pixelsbee Deployment Script
# This script helps you deploy your Pixelsbee application

echo "🚀 Starting Pixelsbee Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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
echo "📋 Deployment Checklist:"
echo "1. ✅ DreamHost database created"
echo "2. ✅ Database schema imported"
echo "3. ✅ GitHub repository created"
echo "4. ✅ Code pushed to GitHub"
echo "5. ⏳ Deploy backend to Render.com"
echo "6. ⏳ Build and deploy frontend to DreamHost"
echo ""

read -p "Have you completed steps 1-4? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Please complete steps 1-4 first, then run this script again"
    exit 1
fi

print_status "Starting backend deployment preparation..."

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
echo "📝 Next Steps:"
echo ""
echo "1. Deploy Backend to Render.com:"
echo "   - Go to https://render.com"
echo "   - Connect your GitHub repository"
echo "   - Create new Web Service"
echo "   - Root Directory: server"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo ""
echo "2. Set Environment Variables in Render:"
echo "   - DB_HOST=your-dreamhost-mysql-host"
echo "   - DB_USER=your-dreamhost-db-user"
echo "   - DB_PASSWORD=your-dreamhost-db-password"
echo "   - DB_NAME=your-dreamhost-db-name"
echo "   - PORT=10000"
echo "   - NODE_ENV=production"
echo "   - JWT_SECRET=your-secret-key"
echo "   - CLOUDINARY_CLOUD_NAME=your-cloud-name"
echo "   - CLOUDINARY_API_KEY=your-api-key"
echo "   - CLOUDINARY_API_SECRET=your-api-secret"
echo "   - CORS_ORIGIN=https://yourdomain.com"
echo ""
echo "3. Update API URL in client/src/utils/api.js:"
echo "   - Replace 'your-app-name.onrender.com' with your actual Render URL"
echo ""
echo "4. Deploy Frontend to DreamHost:"
echo "   - Upload client/.next folder"
echo "   - Upload client/public folder"
echo "   - Upload client/package.json"
echo "   - Configure domain for Node.js"
echo ""
echo "5. Test Your Deployment:"
echo "   - Test registration/login"
echo "   - Test image uploads"
echo "   - Check console for errors"
echo ""

print_status "Deployment script completed! Follow the steps above to complete your deployment."
