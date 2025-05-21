const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupportTicketSchema = new Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Technical Issue', 'Billing Question', 'Patient Concern', 'Feature Request', 'Other']
  },
  message: {
    type: String,
    required: true
  },
  attachment: {
    type: String,
    default: ''
  },
  submittedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'submitterModel'
  },
  submitterModel: {
    type: String,
    required: true,
    enum: ['User', 'Therapist']
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Under Review'],
    default: 'Open'
  },
  ticketId: {
    type: String,
    unique: true
  },
  responses: [{
    responder: String,
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate a unique ticket ID before saving
SupportTicketSchema.pre('save', function(next) {
  if (!this.ticketId) {
    // Generate a random 5-digit number
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    this.ticketId = `#${randomNum}`;
  }
  next();
});

module.exports = mongoose.model('SupportTicket', SupportTicketSchema);