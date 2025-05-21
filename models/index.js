// Export all models for easy importing
const User = require('./user');
const Therapist = require('./therapist');
const Appointment = require('./appointment');
const Message = require('./message');
const SupportTicket = require('./supportTicket');
const Group = require('./group');

module.exports = {
  User,
  Therapist,
  Appointment,
  Message,
  SupportTicket,
  Group
};