const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect } = require('../middleware/auth');

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({}).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a note
// @route   POST /api/notes
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  const { title, description, code, language } = req.body;

  try {
    const note = new Note({
      title,
      description: description || '',
      code: code || '',
      language: language || 'javascript'
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note) {
      await Note.deleteOne({ _id: req.params.id });
      res.json({ message: 'Note removed' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
