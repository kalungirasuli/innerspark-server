const express = require('express');
const router = express.Router();
const { User, Therapist } = require('../../models');
const bcrypt = require('bcryptjs');

// @route   GET api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('therapist', 'name');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('therapist', 'name');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users
// @desc    Create a user
// @access  Private/Admin
router.post('/', async (req, res) => {
  const { name, email, password, therapist, status, notes } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Check if therapist exists if provided
    if (therapist) {
      const therapistExists = await Therapist.findById(therapist);
      if (!therapistExists) {
        return res.status(400).json({ msg: 'Therapist not found' });
      }
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      therapist,
      status,
      notes
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return user without password
    const returnUser = await User.findById(user._id).select('-password').populate('therapist', 'name');
    res.json(returnUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/:id
// @desc    Update a user
// @access  Private
router.put('/:id', async (req, res) => {
  const { name, email, therapist, status, notes, password } = req.body;

  // Build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (therapist) userFields.therapist = therapist;
  if (status) userFields.status = status;
  if (notes) userFields.notes = notes;
  
  try {
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      userFields.password = await bcrypt.hash(password, salt);
    }

    // Update user
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    ).select('-password').populate('therapist', 'name');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/users/:id
// @desc    Delete a user
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await User.findByIdAndRemove(req.params.id);

    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;