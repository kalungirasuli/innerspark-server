const express = require('express');
const router = express.Router();
const supportTicketController = require('../../controllers/supportTicketController');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

// @route   GET api/support-tickets
// @desc    Get all support tickets
// @access  Private/Admin
router.get('/', [auth, admin], supportTicketController.getAllTickets);

// @route   GET api/support-tickets/user/:userId
// @desc    Get all tickets for a user
// @access  Private
router.get('/user/:userId', auth, supportTicketController.getUserTickets);

// @route   GET api/support-tickets/:id
// @desc    Get ticket by ID
// @access  Private
router.get('/:id', auth, supportTicketController.getTicketById);

// @route   POST api/support-tickets
// @desc    Create a new support ticket
// @access  Private
router.post('/', auth, supportTicketController.createTicket);

// @route   PUT api/support-tickets/:id/status
// @desc    Update ticket status
// @access  Private/Admin
router.put('/:id/status', [auth, admin], supportTicketController.updateTicketStatus);

// @route   POST api/support-tickets/:id/responses
// @desc    Add response to ticket
// @access  Private
router.post('/:id/responses', auth, supportTicketController.addTicketResponse);

module.exports = router;