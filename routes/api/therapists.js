const express = require('express');
const router = express.Router();
const { Therapist, User } = require('../../models');
const bcrypt = require('bcryptjs');

// @route   GET api/therapists
// @desc    Get all therapists
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const therapists = await Therapist.find().select('-password');
    res.json(therapists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/therapists/:id
// @desc    Get therapist by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id).select('-password');
    
    if (!therapist) {
      return res.status(404).json({ msg: 'Therapist not found' });
    }
    
    res.json(therapist);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Therapist not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/therapists/:id/patients
// @desc    Get all patients for a therapist
// @access  Private
router.get('/:id/patients', async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);
    
    if (!therapist) {
      return res.status(404).json({ msg: 'Therapist not found' });
    }
    
    const patients = await User.find({ therapist: req.params.id }).select('-password');
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Therapist not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/therapists
// @desc    Create a therapist
// @access  Private/Admin
router.post('/', async (req, res) => {
  const { name, email, password, specialization, bio, status } = req.body;

  try {
    // Check if therapist already exists
    let therapist = await Therapist.findOne({ email });
    if (therapist) {
      return res.status(400).json({ msg: 'Therapist already exists' });
    }

    // Create new therapist
    therapist = new Therapist({
      name,
      email,
      password,
      specialization,
      bio,
      status
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    therapist.password = await bcrypt.hash(password, salt);

    await therapist.save();

    // Return therapist without password
    const returnTherapist = await Therapist.findById(therapist._id).select('-password');
    res.json(returnTherapist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/therapists/:id
// @desc    Update a therapist
// @access  Private
router.put('/:id', auth, therapistController.updateTherapist);

// @route   PUT api/therapists/:id/password
// @desc    Update therapist password
// @access  Private
router.put('/:id/password', auth, therapistController.updateTherapistPassword);

// @route   GET api/therapists/:id/stats
// @desc    Get therapist dashboard stats
// @access  Private
router.get('/:id/stats', auth, therapistController.getTherapistStats);

// @route   DELETE api/therapists/:id
// @desc    Delete a therapist
// @access  Private/Admin
router.delete('/:id', [auth, admin], therapistController.deleteTherapist);

module.exports = router;