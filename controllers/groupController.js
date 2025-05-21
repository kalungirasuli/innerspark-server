const { Group, User, Therapist } = require('../models');
const mongoose = require('mongoose');

// Get all groups
const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find()
      .populate('therapist', 'name email')
      .populate('members', 'name email');
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all groups for a therapist
const getTherapistGroups = async (req, res) => {
  try {
    const groups = await Group.find({ therapist: req.params.therapistId })
      .populate('members', 'name email');
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all groups for a member
const getMemberGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.params.userId })
      .populate('therapist', 'name email');
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get group by ID
const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('therapist', 'name email')
      .populate('members', 'name email');
    
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }
    
    // Check if user is authorized to view this group
    if (
      req.user.userType !== 'therapist' && 
      !group.members.some(member => member._id.toString() === req.user.id) && 
      !req.user.isAdmin
    ) {
      return res.status(401).json({ msg: 'Not authorized to view this group' });
    }
    
    res.json(group);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Group not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Create a new group
const createGroup = async (req, res) => {
  const { name, description, therapist, members } = req.body;

  try {
    // Check if therapist exists
    const therapistExists = await Therapist.findById(therapist);
    if (!therapistExists) {
      return res.status(400).json({ msg: 'Therapist not found' });
    }

    // Create new group
    const newGroup = new Group({
      name,
      description: description || '',
      therapist,
      members: members || []
    });

    const group = await newGroup.save();

    // Return group with populated fields
    const returnGroup = await Group.findById(group._id)
      .populate('therapist', 'name email')
      .populate('members', 'name email');

    res.json(returnGroup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a group
const updateGroup = async (req, res) => {
  const { name, description } = req.body;

  try {
    let group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    // Check if user is authorized to update this group
    if (
      req.user.userType !== 'therapist' && 
      group.therapist.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return res.status(401).json({ msg: 'Not authorized to update this group' });
    }

    // Update fields
    if (name) group.name = name;
    if (description !== undefined) group.description = description;

    await group.save();

    // Return updated group with populated fields
    const updatedGroup = await Group.findById(group._id)
      .populate('therapist', 'name email')
      .populate('members', 'name email');

    res.json(updatedGroup);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Group not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Add member to group
const addGroupMember = async (req, res) => {
  const { userId } = req.body;

  try {
    const group = await Group.findById(req.params.id);
    
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    // Check if user is authorized to update this group
    if (
      req.user.userType !== 'therapist' && 
      group.therapist.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return res.status(401).json({ msg: 'Not authorized to update this group' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    // Check if user is already a member
    if (group.members.includes(userId)) {
      return res.status(400).json({ msg: 'User is already a member of this group' });
    }

    // Add user to group
    group.members.push(userId);
    await group.save();

    // Return updated group with populated fields
    const updatedGroup = await Group.findById(group._id)
      .populate('therapist', 'name email')
      .populate('members', 'name email');

    res.json(updatedGroup);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Group or user not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Remove member from group
const removeGroupMember = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    // Check if user is authorized to update this group
    if (
      req.user.userType !== 'therapist' && 
      group.therapist.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return res.status(401).json({ msg: 'Not authorized to update this group' });
    }

    // Check if user is a member
    if (!group.members.includes(req.params.userId)) {
      return res.status(400).json({ msg: 'User is not a member of this group' });
    }

    // Remove user from group
    group.members = group.members.filter(
      member => member.toString() !== req.params.userId
    );
    
    await group.save();

    // Return updated group with populated fields
    const updatedGroup = await Group.findById(group._id)
      .populate('therapist', 'name email')
      .populate('members', 'name email');

    res.json(updatedGroup);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Group or user not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Add message to group
const addGroupMessage = async (req, res) => {
  const { content } = req.body;

  try {
    const group = await Group.findById(req.params.id);
    
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    // Check if user is authorized to post in this group
    const isMember = group.members.some(member => member.toString() === req.user.id);
    const isTherapist = group.therapist.toString() === req.user.id;
    
    if (!isMember && !isTherapist && !req.user.isAdmin) {
      return res.status(401).json({ msg: 'Not authorized to post in this group' });
    }

    // Create new message
    const newMessage = {
      sender: req.user.id,
      senderModel: req.user.userType === 'therapist' ? 'Therapist' : 'User',
      content
    };

    // Add message to group
    group.messages.push(newMessage);
    await group.save();

    res.json(group.messages[group.messages.length - 1]);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Group not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a group
const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    // Check if user is authorized to delete this group
    if (
      req.user.userType !== 'therapist' && 
      group.therapist.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return res.status(401).json({ msg: 'Not authorized to delete this group' });
    }

    await Group.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Group removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Group not found' });
    }
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllGroups,
  getTherapistGroups,
  getMemberGroups,
  getGroupById,
  createGroup,
  updateGroup,
  addGroupMember,
  removeGroupMember,
  addGroupMessage,
  deleteGroup
};