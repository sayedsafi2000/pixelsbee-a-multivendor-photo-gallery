#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Pixelsbee...\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'green') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function success(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function info(message) {
  console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

// Check if Node.js is installed
try {
  const nodeVersion = process.version;
  log(`Node.js version: ${nodeVersion}`, 'blue');
  
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion < 18) {
    error('Node.js version 18 or higher is required');
    process.exit(1);
  }
} catch (err) {
  error('Node.js is not installed');
  process.exit(1);
}

// Check if MySQL is running
try {
  execSync('mysql --version', { stdio: 'ignore' });
  success('MySQL is installed');
} catch (err) {
  error('MySQL is not installed or not running');
  info('Please install MySQL and start the service');
  process.exit(1);
}

// Create environment files
function createEnvFile() {
  const serverEnvPath = path.join(__dirname, 'server', '.env');
  const clientEnvPath = path.join(__dirname, 'client', '.env.local');
  
  if (!fs.existsSync(serverEnvPath)) {
    const serverEnvContent = `# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pixelsbee_db

# Server Configuration
PORT=5001
NODE_ENV=development

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
`;
    
    fs.writeFileSync(serverEnvPath, serverEnvContent);
    success('Created server/.env file');
  } else {
    info('server/.env already exists');
  }
  
  if (!fs.existsSync(clientEnvPath)) {
    const clientEnvContent = `# API Configuration
NEXT_PUBLIC_API_BASE=http://localhost:5001/api

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=Pixelsbee
`;
    
    fs.writeFileSync(clientEnvPath, clientEnvContent);
    success('Created client/.env.local file');
  } else {
    info('client/.env.local already exists');
  }
}

// Install dependencies
function installDependencies() {
  log('Installing server dependencies...', 'yellow');
  try {
    execSync('npm install', { cwd: path.join(__dirname, 'server'), stdio: 'inherit' });
    success('Server dependencies installed');
  } catch (err) {
    error('Failed to install server dependencies');
    process.exit(1);
  }
  
  log('Installing client dependencies...', 'yellow');
  try {
    execSync('npm install', { cwd: path.join(__dirname, 'client'), stdio: 'inherit' });
    success('Client dependencies installed');
  } catch (err) {
    error('Failed to install client dependencies');
    process.exit(1);
  }
}

// Setup database
function setupDatabase() {
  log('Setting up database...', 'yellow');
  try {
    const dbPath = path.join(__dirname, 'server', 'database.sql');
    if (fs.existsSync(dbPath)) {
      execSync(`mysql -u root -p < "${dbPath}"`, { stdio: 'inherit' });
      success('Database setup completed');
    } else {
      error('Database schema file not found');
      process.exit(1);
    }
  } catch (err) {
    error('Failed to setup database. Please check your MySQL credentials.');
    info('You can manually run: mysql -u root -p < server/database.sql');
  }
}

// Main setup process
async function main() {
  try {
    createEnvFile();
    installDependencies();
    setupDatabase();
    
    log('\n🎉 Setup completed successfully!', 'green');
    log('\nNext steps:', 'blue');
    log('1. Update server/.env with your database credentials', 'yellow');
    log('2. Update client/.env.local if needed', 'yellow');
    log('3. Start the server: cd server && npm run dev', 'yellow');
    log('4. Start the client: cd client && npm run dev', 'yellow');
    log('5. Open http://localhost:3000 in your browser', 'yellow');
    log('\nDefault admin credentials:', 'blue');
    log('Email: admin@pixelsbee.com', 'yellow');
    log('Password: admin123', 'yellow');
    
  } catch (err) {
    error('Setup failed: ' + err.message);
    process.exit(1);
  }
}

main(); 