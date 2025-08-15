import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../models/userModel.js';
import { signToken } from '../utils/jwt.js';

// Password validation function
const validatePassword = (password) => {
  const minLength = 8;
  const hasCapital = /[A-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  if (password.length < minLength) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!hasCapital) {
    return { isValid: false, message: 'Password must contain at least one capital letter' };
  }
  if (!hasSpecial) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }
  if (!hasNumber) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true };
};

export const register = async (req, res) => {
  const { name, email, password, role, profile_pic_url } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  // Validate password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return res.status(400).json({ message: passwordValidation.message });
  }
  
  const existing = await findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const userRole = role === 'vendor' ? 'vendor' : 'user';
  const user = await createUser({ name, email, password: hashed, role: userRole, profile_pic_url });
  
  // Users are automatically approved and logged in, vendors need admin approval
  if (userRole === 'vendor') {
    return res.status(201).json({ message: 'Registration successful, pending admin approval' });
  } else {
    // Auto-login for regular users
    const token = signToken({ id: user.id, role: user.role });
    return res.status(201).json({ 
      message: 'Registration successful! Welcome to Pixelsbee!',
      token,
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        profile_pic_url: user.profile_pic_url 
      }
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Only vendors need approval, users can log in immediately
  if (user.role === 'vendor' && user.status !== 'approved') {
    return res.status(403).json({ message: 'Account not approved by admin' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = signToken({ id: user.id, role: user.role });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, profile_pic_url: user.profile_pic_url } });
}; 