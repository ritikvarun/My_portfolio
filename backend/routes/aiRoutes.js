const express = require('express');
const router = express.Router();
const { processAIChat, generateProjectContent } = require('../services/aiService');

/**
 * @route   POST /api/ai/chat
 * @desc    Chat with Ritik AI assistant powered by LangChain
 * @access  Public
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required and must be non-empty.' });
    }

    const result = await processAIChat(message.trim(), history || []);

    return res.json({
      success: true,
      reply: result.reply,
      action: result.action
    });
  } catch (error) {
    console.error('Error in /api/ai/chat route:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process AI chat request',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/ai/generate-project
 * @desc    Generate professional project descriptions for Admin Panel
 * @access  Public / Admin
 */
router.post('/generate-project', async (req, res) => {
  try {
    const { title, github, category, prompt } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Project title is required to generate content.' });
    }

    const result = await generateProjectContent({
      title: title.trim(),
      github: github || '',
      category: category || '',
      prompt: prompt || ''
    });

    return res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error in /api/ai/generate-project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate project content',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/ai/status
 * @desc    Check if AI service is active and if API key is configured
 * @access  Public
 */
router.get('/status', (req, res) => {
  const hasKey = !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
  res.json({
    status: 'online',
    service: 'Ritik AI (LangChain + Google Gemini)',
    hasApiKey: hasKey
  });
});

module.exports = router;

