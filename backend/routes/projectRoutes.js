const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  const { name, description, images, Detail, demo, github, category } = req.body;

  try {
    const project = new Project({
      name,
      description,
      images: images || [],
      Detail: Detail || '',
      demo: demo || '',
      github: github || '',
      category: category || 'Frontend'
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
router.put('/:id', protect, async (req, res) => {
  const { name, description, images, Detail, demo, github, category } = req.body;

  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.name = name || project.name;
      project.description = description || project.description;
      project.images = images !== undefined ? images : project.images;
      project.Detail = Detail !== undefined ? Detail : project.Detail;
      project.demo = demo !== undefined ? demo : project.demo;
      project.github = github !== undefined ? github : project.github;
      project.category = category !== undefined ? category : project.category;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await Project.deleteOne({ _id: req.params.id });
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
