const express = require('express');
const router = express.Router();
const appointmentController = require('../../controllers/appointmentController');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

// @route   GET api/appointments
// @desc    Get all appointments
// @access  Private/Admin
router.get('/', [auth, admin], appointmentController.getAllAppointments);

// @route   GET api/appointments/therapist/:therapistId
// @desc    Get all appointments for a therapist
// @access  Private
router.get('/therapist/:therapistId', auth, appointmentController.getTherapistAppointments);

// @route   GET api/appointments/patient/:patientId
// @desc    Get all appointments for a patient
// @access  Private
router.get('/patient/:patientId', auth, appointmentController.getPatientAppointments);

// @route   GET api/appointments/:id
// @desc    Get appointment by ID
// @access  Private
router.get('/:id', auth, appointmentController.getAppointmentById);

// @route   POST api/appointments
// @desc    Create a new appointment
// @access  Private
router.post('/', auth, appointmentController.createAppointment);

// @route   PUT api/appointments/:id/status
// @desc    Update appointment status
// @access  Private
router.put('/:id/status', auth, appointmentController.updateAppointmentStatus);

// @route   PUT api/appointments/:id/notes
// @desc    Update appointment notes
// @access  Private
router.put('/:id/notes', auth, appointmentController.updateAppointmentNotes);

// @route   DELETE api/appointments/:id
// @desc    Delete an appointment
// @access  Private
router.delete('/:id', auth, appointmentController.deleteAppointment);

module.exports = router;