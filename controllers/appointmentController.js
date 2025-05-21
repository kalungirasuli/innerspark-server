const { Appointment, User, Therapist } = require('../models');
const mongoose = require('mongoose');

// Get all appointments (admin only)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email')
      .populate('therapist', 'name email')
      .sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all appointments for a therapist
const getTherapistAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ therapist: req.params.therapistId })
      .populate('patient', 'name email')
      .sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all appointments for a patient
const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId })
      .populate('therapist', 'name email')
      .sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'name email')
      .populate('therapist', 'name email');
    
    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    
    // Check if user is authorized to view this appointment
    if (
      req.user.userType !== 'therapist' && 
      appointment.patient.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return res.status(401).json({ msg: 'Not authorized to view this appointment' });
    }
    
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Create a new appointment
const createAppointment = async (req, res) => {
  const { patient, therapist, date, time, status, meetLink, notes } = req.body;

  try {
    // Check if patient exists
    const patientExists = await User.findById(patient);
    if (!patientExists) {
      return res.status(400).json({ msg: 'Patient not found' });
    }

    // Check if therapist exists
    const therapistExists = await Therapist.findById(therapist);
    if (!therapistExists) {
      return res.status(400).json({ msg: 'Therapist not found' });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      patient,
      therapist,
      date,
      time,
      status: status || 'pending',
      meetLink: meetLink || '',
      notes: notes || ''
    });

    const appointment = await newAppointment.save();

    // Return appointment with populated fields
    const returnAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'name email')
      .populate('therapist', 'name email');

    res.json(returnAppointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  const { status, meetLink } = req.body;

  // Check if status is valid
  const validStatuses = ['pending', 'confirmed', 'completed', 'missed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    // Check if user is authorized to update this appointment
    if (
      req.user.userType !== 'therapist' && 
      appointment.patient.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return res.status(401).json({ msg: 'Not authorized to update this appointment' });
    }

    // Update fields
    appointment.status = status;
    if (meetLink) appointment.meetLink = meetLink;

    await appointment.save();

    // Return updated appointment with populated fields
    const updatedAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'name email')
      .populate('therapist', 'name email');

    res.json(updatedAppointment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update appointment notes
const updateAppointmentNotes = async (req, res) => {
  const { notes } = req.body;

  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    // Check if user is authorized to update this appointment
    if (
      req.user.userType !== 'therapist' && 
      !req.user.isAdmin
    ) {
      return res.status(401).json({ msg: 'Not authorized to update appointment notes' });
    }

    // Update notes
    appointment.notes = notes;
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    // Check if user is authorized to delete this appointment
    if (
      req.user.userType !== 'therapist' && 
      !req.user.isAdmin
    ) {
      return res.status(401).json({ msg: 'Not authorized to delete this appointment' });
    }

    await Appointment.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Appointment removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllAppointments,
  getTherapistAppointments,
  getPatientAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentStatus,
  updateAppointmentNotes,
  deleteAppointment
};