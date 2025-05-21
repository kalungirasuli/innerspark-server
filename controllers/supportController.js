const { SupportTicket } = require('../models');
const mongoose = require('mongoose');

// Generate a unique ticket ID
const generateTicketId = async () => {
  const count = await SupportTicket.countDocuments();
  const date = new Date();
  const year = date.getFullYear().toString().substr(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `TKT-${year}${month}-${(count + 1).toString().padStart(4, '0')}`;
};

// Get all support tickets (admin only)
const getAllTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get tickets for a specific user
const getUserTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({
      submittedBy: req.params.userId,
      submitterModel: req.params.userType === 'therapist' ? 'Therapist' : 'User'
    }).sort({ createdAt: -1 });
    
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ msg: 'Support ticket not found' });
    }
    
    // Check if user is authorized to view this ticket
    if (
      ticket.submittedBy.toString() !== req.user.id && 
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({ msg: 'Not authorized to view this ticket' });
    }
    
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Support ticket not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Create a new support ticket
const createTicket = async (req, res) => {
  const { subject, category, message, attachment } = req.body;

  try {
    // Generate a unique ticket ID
    const ticketId = await generateTicketId();
    
    const newTicket = new SupportTicket({
      subject,
      category,
      message,
      attachment: attachment || '',
      submittedBy: req.user.id,
      submitterModel: req.user.role === 'therapist' ? 'Therapist' : 'User',
      ticketId
    });

    const ticket = await newTicket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update ticket status (admin only)
const updateTicketStatus = async (req, res) => {
  const { status } = req.body;

  // Check if status is valid
  const validStatuses = ['Open', 'In Progress', 'Resolved', 'Under Review'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    let ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Support ticket not found' });
    }

    ticket.status = status;
    await ticket.save();

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Support ticket not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Add a response to a ticket
const addTicketResponse = async (req, res) => {
  const { message } = req.body;

  try {
    const ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Support ticket not found' });
    }

    // Check if user is authorized to respond to this ticket
    if (
      ticket.submittedBy.toString() !== req.user.id && 
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({ msg: 'Not authorized to respond to this ticket' });
    }

    const newResponse = {
      responder: req.user.role === 'admin' ? 'Support Team' : req.user.name,
      message
    };

    ticket.responses.push(newResponse);
    
    // If admin is responding, update status to In Progress if it's Open
    if (req.user.role === 'admin' && ticket.status === 'Open') {
      ticket.status = 'In Progress';
    }

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Support ticket not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a support ticket (admin only)
const deleteTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ msg: 'Support ticket not found' });
    }

    await SupportTicket.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Support ticket removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Support ticket not found' });
    }
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllTickets,
  getUserTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
  addTicketResponse,
  deleteTicket
};