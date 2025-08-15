# 🚀 Quick Start Guide

Get Pixelsbee running in 5 minutes!

## Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- Git

## 1. Clone & Setup

```bash
git clone <your-repo-url>
cd Pixelsbee
npm run setup
```

## 2. Configure Environment

Edit `server/.env`:
```env
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_secret_key
```

## 3. Start Development

```bash
npm run dev
```

This starts both server (port 5001) and client (port 3000) simultaneously.

## 4. Access the App

- **Frontend**: http://localhost:3000
- **Default Admin**: admin@pixelsbee.com / admin123

## 🎯 What's Fixed

✅ **API Endpoints**: All client-server communication now works correctly  
✅ **Authentication**: Login/logout flows properly without page reloads  
✅ **Database**: Complete schema with proper relationships  
✅ **Error Handling**: Better user feedback and error messages  
✅ **Environment**: Proper configuration files and setup  

## 🐛 Common Issues

**Database Connection Error?**
```bash
# Check MySQL is running
sudo service mysql start  # Linux
brew services start mysql # macOS
```

**Port Already in Use?**
```bash
# Kill processes on ports 3000 and 5001
lsof -ti:3000 | xargs kill -9
lsof -ti:5001 | xargs kill -9
```

**Permission Denied?**
```bash
# Make setup script executable
chmod +x setup.js
```

## 📞 Need Help?

1. Check the main README.md for detailed instructions
2. Verify your MySQL credentials in server/.env
3. Ensure all dependencies are installed: `npm run install:all`

## 🎉 You're Ready!

Your Pixelsbee platform is now running with:
- ✅ User authentication
- ✅ Image upload/management  
- ✅ Role-based access control
- ✅ Favorites & downloads
- ✅ Admin dashboard
- ✅ Responsive design 