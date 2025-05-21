const express = require('express');
const router = express.Router();
const { Message, User, Therapist } = require('../../models');

// @route   GET api/messages
// @desc    Get all messages
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/messages/conversation/:userId/:recipientId
// @desc    Get conversation between two users
// @access  Private
router.get('/conversation/:userId/:recipientId', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.userId, recipient: req.params.recipientId },
        { sender: req.params.recipientId, recipient: req.params.userId }
      ]
    }).sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/messages/user/:userId
// @desc    Get all conversations for a user
// @access  Private
router.get('/user/:userId', async (req, res) => {
  try {
    // Find all messages where the user is either sender or recipient
    const messages = await Message.find({
      $or: [
        { sender: req.params.userId },
        { recipient: req.params.userId }
      ]
    }).sort({ createdAt: -1 });

    // Get unique conversation partners
    const conversations = [];
    const conversationPartners = new Set();

    for (const message of messages) {
      const partnerId = message.sender.toString() === req.params.userId ? 
        message.recipient.toString() : message.sender.toString();
      
      if (!conversationPartners.has(partnerId)) {
        conversationPartners.add(partnerId);
        
        // Get the latest message for this conversation
        const latestMessage = await Message.findOne({
          $or: [
            { sender: req.params.userId, recipient: partnerId },
            { sender: partnerId, recipient: req.params.userId }
          ]
        }).sort({ createdAt: -1 });
        
        // Get partner details
        let partner;
        const partnerModel = message.senderModel === 'User' && message.sender.toString() !== req.params.userId ? 
          'User' : 'Therapist';
        
        if (partnerModel === 'User') {
          partner = await User.findById(partnerId).select('name email');
        } else {
          partner = await Therapist.findById(partnerId).select('name email');
        }
        
        if (partner) {
          conversations.push({
            partnerId,
            partnerModel,
            partnerName: partner.name,
            partnerEmail: partner.email,
            lastMessage: latestMessage.content,
            lastMessageTime: latestMessage.createdAt,
            unread: !latestMessage.read && latestMessage.recipient.toString() === req.params.userId
          });
        }
      }
    }
    
    // Sort conversations by last message time
    conversations.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
    
    res.json(conversations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/messages
// @desc    Send a message
// @access  Private
router.post('/', async (req, res) => {
  const { sender, senderModel, recipient, recipientModel, content } = req.body;

  try {
    // Create new message
    const newMessage = new Message({
      sender,
      senderModel,
      recipient,
      recipientModel,
      content
    });

    const message = await newMessage.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/messages/read/:id
// @desc    Mark a message as read
// @access  Private
router.put('/read/:id', async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }

    // Update message to read
    message = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: { read: true } },
      { new: true }
    );

    res.json(message);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/messages/:id
// @desc    Delete a message
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }

    await Message.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Message removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;