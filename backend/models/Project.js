const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  Detail: {
    type: String
  },
  demo: {
    type: String,
    default: ''
  },
  github: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['Full Stack', 'Frontend', 'Website Template', 'Creative Website', 'AI Project', 'Other'],
    default: 'Frontend'
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
