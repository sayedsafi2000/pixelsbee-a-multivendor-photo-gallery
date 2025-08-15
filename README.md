# Pixelsbee - Image Sharing Platform

A full-stack image sharing platform built with Next.js, Node.js, and MySQL.

## 🚀 Features

- **User Authentication**: Register, login, and role-based access
- **Image Management**: Upload, organize, and share images
- **Role-based Access**: User, Vendor, and Admin roles
- **Favorites & Downloads**: Save and track favorite images
- **Responsive Design**: Modern UI with dark mode support
- **Admin Dashboard**: Manage vendors and platform content

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File upload handling

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Pixelsbee
```

### 2. Database Setup
```bash
# Start MySQL service
# Import the database schema
mysql -u root -p < server/database.sql
```

### 3. Environment Configuration

#### Server Setup
```bash
cd server
cp env.example .env
```

Edit `server/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=pixelsbee_db
PORT=5001
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Client Setup
```bash
cd client
cp env.example .env.local
```

Edit `client/.env.local`:
```env
NEXT_PUBLIC_API_BASE=http://localhost:5001/api
```

### 4. Install Dependencies

#### Server
```bash
cd server
npm install
```

#### Client
```bash
cd client
npm install
```

### 5. Start Development Servers

#### Start Server (Terminal 1)
```bash
cd server
npm run dev
```

#### Start Client (Terminal 2)
```bash
cd client
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Default Admin**: admin@pixelsbee.com / admin123

## 🔧 Issues Fixed

### 1. API Endpoint Mismatch
- ✅ Fixed client API calls to use correct port (5001)
- ✅ Updated Next.js config with proper API routing

### 2. Authentication Improvements
- ✅ Enhanced login modal with better error handling
- ✅ Removed unnecessary page reloads
- ✅ Added loading states for better UX

### 3. Database Configuration
- ✅ Created complete database schema
- ✅ Added proper indexes for performance
- ✅ Included default admin user

### 4. Error Handling
- ✅ Improved API error handling with centralized function
- ✅ Better error messages and user feedback
- ✅ Added try-catch blocks for all async operations

### 5. Environment Configuration
- ✅ Created example environment files
- ✅ Proper configuration for both client and server
- ✅ Added JWT secret configuration

## 📁 Project Structure

```
Pixelsbee/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── src/
│   │   ├── config/        # Database & Cloudinary config
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── utils/         # JWT utilities
│   └── database.sql       # Database schema
└── README.md
```

## 🔐 Authentication

The application uses JWT tokens for authentication. Users can register as:
- **Users**: Can browse, favorite, and download images
- **Vendors**: Can upload and manage their products (requires admin approval)
- **Admins**: Can manage vendors and platform content

## 🖼️ Image Management

- Upload images via Cloudinary
- Organize images with tags and categories
- Track favorites and downloads
- Responsive image grid layout

## 🎨 UI Features

- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean, Pinterest-inspired interface
- **Loading States**: Smooth user experience

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check database credentials in `.env`
   - Verify database exists: `pixelsbee_db`

2. **API Connection Error**
   - Ensure server is running on port 5001
   - Check client environment variables
   - Verify CORS configuration

3. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT secret in server `.env`
   - Verify token expiration

4. **Image Upload Issues**
   - Configure Cloudinary credentials
   - Check file size limits
   - Verify upload directory permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the repository or contact the development team. 
