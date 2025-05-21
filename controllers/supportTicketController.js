const { SupportTicket, User, Therapist } = require('../models');
const mongoose = require('mongoose');

// Generate a unique ticket ID
const generateTicketId = async () => {
  const prefix = 'TKT';
  const randomPart = Math.floor(10000 + Math.random() * 90000).toString();
  const ticketId = `${prefix}-${randomPart}`;
  
  // Check if this ID already exists
  const existingTicket = await SupportTicket.findOne({ ticketId });
  if (existingTicket) {
    // If exists, generate a new one recursively
    return generateTicketId();
  }
  
  return ticketId;
};

// Get all support tickets
const getAllTickets = async (req, res) => {
  try {
    // Only admins can see all tickets
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Not authorized to view all tickets' });
    }
    
    const tickets = await SupportTicket.find()
      .sort({ createdAt: -1 })
      .populate('submittedBy', 'name email');
      
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get tickets by user
const getUserTickets = async (req, res) => {
  try {
    // Check if user is authorized to view these tickets
    if (req.user.id !== req.params.userId && !req.user.isAdmin) {
      return res.status(403).json({ msg: 'Not authorized to view these tickets' });
    }
    
    const tickets = await SupportTicket.find({ 
      submittedBy: req.params.userId 
    }).sort({ createdAt: -1 });
    
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Get ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id)
      .populate('submittedBy', 'name email');
    
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }
    
    // Check if user is authorized to view this ticket
    if (
      ticket.submittedBy._id.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return res.status(403).json({ msg: 'Not authorized to view this ticket' });
    }
    
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Ticket not found' });
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
    
    // Create new ticket
    const newTicket = new SupportTicket({
      subject,
      category,
      message,
      attachment: attachment || '',
      submittedBy: req.user.id,
      submitterModel: req.user.userType === 'therapist' ? 'Therapist' : 'User',
      ticketId
    });

    await newTicket.save();

    res.json(newTicket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update ticket status
const updateTicketStatus = async (req, res) => {
  const { status } = req.body;

  try {
    // Only admins can update ticket status
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Not authorized to update ticket status' });
    }
    
    let ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    // Update status
    ticket.status = status;
    ticket.updatedAt = Date.now();

    await ticket.save();

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Ticket not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Add response to ticket
const addTicketResponse = async (req, res) => {
  const { message } = req.body;

  try {
    const ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    // Check if user is authorized to respond to this ticket
    if (
      ticket.submittedBy.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return res.status(403).json({ msg: 'Not authorized to respond to this ticket' });
    }

    // Create new response
    const newResponse = {
      responder: req.user.isAdmin ? 'Admin' : 'User',
      message,
      createdAt: Date.now()
    };

    // Add response to ticket
    ticket.responses.push(newResponse);
    ticket.updatedAt = Date.now();
    
    // If admin is responding, update status to 'In Progress' if it's 'Open'
    if (req.user.isAdmin && ticket.status === 'Open') {
      ticket.status = 'In Progress';
    }

    await ticket.save();

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Ticket not found' });
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
  addTicketResponse
};