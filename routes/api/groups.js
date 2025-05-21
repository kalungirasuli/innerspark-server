const express = require('express');
const router = express.Router();
const { Group, User, Therapist } = require('../../models');
const groupController = require('../../controllers/groupController');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

// @route   GET api/groups
// @desc    Get all groups
// @access  Private
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find()
      .populate('therapist', 'name email')
      .populate('members', 'name email');
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/groups/therapist/:therapistId
// @desc    Get all groups for a therapist
// @access  Private
router.get('/therapist/:therapistId', async (req, res) => {
  try {
    const groups = await Group.find({ therapist: req.params.therapistId })
      .populate('members', 'name email');
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/groups/member/:userId
// @desc    Get all groups for a member
// @access  Private
router.get('/member/:userId', async (req, res) => {
  try {
    const groups = await Group.find({ members: req.params.userId })
      .populate('therapist', 'name email');
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/groups/:id
// @desc    Get group by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('therapist', 'name email')
      .populate('members', 'name email');
    
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }
    
    res.json(group);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Group not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/groups
// @desc    Create a group
// @access  Private/Therapist
router.post('/', auth, groupController.createGroup);
// @route   PUT api/groups/:id
// @desc    Update a group
// @access  Private
router.put('/:id', auth, groupController.updateGroup);

// @route   POST api/groups/:id/members
// @desc    Add member to group
// @access  Private
router.post('/:id/members', auth, groupController.addGroupMember);

// @route   DELETE api/groups/:id/members/:userId
// @desc    Remove member from group
// @access  Private
router.delete('/:id/members/:userId', auth, groupController.removeGroupMember);

// @route   POST api/groups/:id/messages
// @desc    Add message to group
// @access  Private
router.post('/:id/messages', auth, groupController.addGroupMessage);

// @route   DELETE api/groups/:id
// @desc    Delete a group
// @access  Private
router.delete('/:id', auth, groupController.deleteGroup);

module.exports = router;