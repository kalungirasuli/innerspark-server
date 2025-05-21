const { Therapist, User, Appointment } = require('../models');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Get all therapists
const getAllTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find().select('-password');
    res.json(therapists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get therapist by ID
const getTherapistById = async (req, res) => {
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
};

// Get all patients for a therapist
const getTherapistPatients = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);
    
    if (!therapist) {
      return res.status(404).json({ msg: 'Therapist not found' });
    }
    
    // Check if user is authorized to view this therapist's patients
    if (
      req.user.id !== req.params.id && 
      !req.user.isAdmin
    ) {
      return res.status(401).json({ msg: 'Not authorized to view these patients' });
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
};

// Create a therapist
const createTherapist = async (req, res) => {
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
      bio: bio || '',
      status: status || 'active'
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
};

// Update a therapist
const updateTherapist = async (req, res) => {
  const { name, email, specialization, bio, status } = req.body;

  try {
    let therapist = await Therapist.findById(req.params.id);

    if (!therapist) {
      return res.status(404).json({ msg: 'Therapist not found' });
    }

    // Check if user is authorized to update this therapist
    if (
      req.user.id !== req.params.id && 
      !req.user.isAdmin
    ) {
      return res.status(401).json({ msg: 'Not authorized to update this therapist' });
    }

    // Update fields
    if (name) therapist.name = name;
    if (email) therapist.email = email;
    if (specialization !== undefined) therapist.specialization = specialization;
    if (bio !== undefined) therapist.bio = bio;
    if (status) therapist.status = status;

    await therapist.save();

    // Return updated therapist without password
    const updatedTherapist = await Therapist.findById(therapist._id).select('-password');
    res.json(updatedTherapist);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Therapist not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update therapist password
const updateTherapistPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    let therapist = await Therapist.findById(req.params.id);

    if (!therapist) {
      return res.status(404).json({ msg: 'Therapist not found' });
    }

    // Check if user is authorized to update this therapist's password
    if (req.user.id !== req.params.id) {
      return res.status(401).json({ msg: 'Not authorized to update this password' });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, therapist.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    therapist.password = await bcrypt.hash(newPassword, salt);

    await therapist.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Therapist not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Get therapist dashboard stats
const getTherapistStats = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);
    
    if (!therapist) {
      return res.status(404).json({ msg: 'Therapist not found' });
    }
    
    // Check if user is authorized to view this therapist's stats
    if (
      req.user.id !== req.params.id && 
      !req.user.isAdmin
    ) {
      return res.status(401).json({ msg: 'Not authorized to view these stats' });
    }
    
    // Get patient count
    const patientCount = await User.countDocuments({ therapist: req.params.id });
    
    // Get upcoming appointments
    const today = new Date();
    const upcomingAppointments = await Appointment.find({
      therapist: req.params.id,
      date: { $gte: today },
      status: { $in: ['pending', 'confirmed'] }
    }).countDocuments();
    
    // Get completed appointments this month
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const completedAppointments = await Appointment.find({
      therapist: req.params.id,
      date: { $gte: firstDayOfMonth, $lte: today },
      status: 'completed'
    }).countDocuments();
    
    res.json({
      patientCount,
      upcomingAppointments,
      completedAppointments
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Therapist not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a therapist
const deleteTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);
    
    if (!therapist) {
      return res.status(404).json({ msg: 'Therapist not found' });
    }

    // Check if user is authorized to delete this therapist
    if (!req.user.isAdmin) {
      return res.status(401).json({ msg: 'Not authorized to delete this therapist' });
    }

    // Check if therapist has patients
    const patientCount = await User.countDocuments({ therapist: req.params.id });
    if (patientCount > 0) {
      return res.status(400).json({ 
        msg: 'Cannot delete therapist with assigned patients. Reassign patients first.' 
      });
    }

    await Therapist.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Therapist removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Therapist not found' });
    }
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllTherapists,
  getTherapistById,
  getTherapistPatients,
  createTherapist,
  updateTherapist,
  updateTherapistPassword,
  getTherapistStats,
  deleteTherapist
};