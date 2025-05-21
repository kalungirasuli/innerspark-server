const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  therapist: {
    type: Schema.Types.ObjectId,
    ref: 'Therapist',
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    sender: {
      type: Schema.Types.ObjectId,
      refPath: 'messages.senderModel',
      required: true
    },
    senderModel: {
      type: String,
      required: true,
      enum: ['User', 'Therapist']
    },
    content: {
      type: String,
      required: true
    },
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

module.exports = mongoose.model('Group', GroupSchema);