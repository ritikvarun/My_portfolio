const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'javascript'
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
