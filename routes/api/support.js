const express = require('express');
const router = express.Router();
const supportController = require('../../controllers/supportController');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

// @route   GET api/support
// @desc    Get all support tickets
// @access  Private/Admin
router.get('/', [auth, admin], supportController.getAllTickets);

// @route   GET api/support/user/:userId/:userType
// @desc    Get all tickets for a specific user
// @access  Private
router.get('/user/:userId/:userType', auth, supportController.getUserTickets);

// @route   GET api/support/:id
// @desc    Get ticket by ID
// @access  Private
router.get('/:id', auth, supportController.getTicketById);

// @route   POST api/support
// @desc    Create a support ticket
// @access  Private
router.post('/', auth, supportController.createTicket);

// @route   PUT api/support/:id/status
// @desc    Update ticket status
// @access  Private/Admin
router.put('/:id/status', [auth, admin], supportController.updateTicketStatus);

// @route   POST api/support/:id/response
// @desc    Add a response to a ticket
// @access  Private
router.post('/:id/response', auth, supportController.addTicketResponse);

// @route   DELETE api/support/:id
// @desc    Delete a support ticket
// @access  Private/Admin
router.delete('/:id', [auth, admin], supportController.deleteTicket);

module.exports = router;