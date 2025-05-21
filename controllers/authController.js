const { User, Therapist } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authenticate user & get token
const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    let user;
    let isAdmin = false;
    
    // Check if user is a therapist or regular user
    if (userType === 'therapist') {
      user = await Therapist.findOne({ email });
      isAdmin = user ? user.isAdmin : false;
    } else {
      user = await User.findOne({ email });
    }

    // Check if user exists
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Update last active for users
    if (userType !== 'therapist') {
      user.lastActive = Date.now();
      await user.save();
    }

    // Create payload for JWT
    const payload = {
      user: {
        id: user.id,
        userType: userType,
        isAdmin
      }
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            userType: userType,
            isAdmin
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get authenticated user
const getAuthUser = async (req, res) => {
  try {
    let user;
    
    // Get user based on userType
    if (req.user.userType === 'therapist') {
      user = await Therapist.findById(req.user.id).select('-password');
    } else {
      user = await User.findById(req.user.id).select('-password');
    }

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    // Check if user already exists
    let existingUser;
    
    if (userType === 'therapist') {
      existingUser = await Therapist.findOne({ email });
    } else {
      existingUser = await User.findOne({ email });
    }

    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user based on type
    let user;
    
    if (userType === 'therapist') {
      user = new Therapist({
        name,
        email,
        password,
        status: 'pending' // New therapists require admin approval
      });
    } else {
      user = new User({
        name,
        email,
        password,
        status: 'pending'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create payload for JWT
    const payload = {
      user: {
        id: user.id,
        userType: userType,
        isAdmin: false
      }
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            userType: userType,
            isAdmin: false
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Request password reset
const requestPasswordReset = async (req, res) => {
  const { email, userType } = req.body;

  try {
    let user;
    
    // Find user based on type
    if (userType === 'therapist') {
      user = await Therapist.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Generate reset code (in a real app, this would be sent via email)
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store reset code and expiry (in a real app, this would be stored in the database)
    // For demo purposes, we'll just return it
    res.json({ 
      msg: 'Password reset code generated',
      resetCode,
      email
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const { email, resetCode, newPassword, userType } = req.body;

  try {
    let user;
    
    // Find user based on type
    if (userType === 'therapist') {
      user = await Therapist.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // In a real app, verify the reset code from the database
    // For demo purposes, we'll just accept any code
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ msg: 'Password reset successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  loginUser,
  getAuthUser,
  registerUser,
  requestPasswordReset,
  resetPassword
};