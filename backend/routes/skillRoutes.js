const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const { protect } = require('../middleware/auth');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  const { name, image } = req.body;

  try {
    if (!name || !image) {
      return res.status(400).json({ message: 'Skill name and image are required' });
    }

    const skill = new Skill({
      name,
      image
    });

    const createdSkill = await skill.save();
    res.status(201).json(createdSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (skill) {
      await Skill.deleteOne({ _id: req.params.id });
      res.json({ message: 'Skill removed' });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
