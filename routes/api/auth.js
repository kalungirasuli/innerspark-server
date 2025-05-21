const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const auth = require('../../middleware/auth');
require('dotenv').config();

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.loginUser);

// @route   GET api/auth
// @desc    Get authenticated user
// @access  Private
router.get('/', auth, authController.getAuthUser);

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authController.registerUser);

// @route   POST api/auth/forgot-password
// @desc    Request password reset
// @access  Public
router.post('/forgot-password', authController.requestPasswordReset);

// @route   POST api/auth/reset-password
// @desc    Reset password with code
// @access  Public
router.post('/reset-password', authController.resetPassword);

module.exports = router;