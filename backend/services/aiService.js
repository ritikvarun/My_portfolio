require('dotenv').config();
const mongoose = require('mongoose');
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { HumanMessage, SystemMessage, AIMessage } = require('@langchain/core/messages');
const Project = require('../models/Project');
const Settings = require('../models/Settings');

// Default fallback knowledge base in case database is empty or offline
const fallbackKnowledge = {
  name: "Ritik Varun",
  title: "Full Stack Web Developer & Frontend Specialist",
  college: "Uttam Institute of Technology and Management (Dr. Bhim Rao Ambedkar University, Agra)",
  degree: "BCA (Bachelor of Computer Applications)",
  location: "Agra, Uttar Pradesh, India",
  email: "ritikvarun64@gmail.com",
  phone: "9808433521",
  whatsappUrl: "https://wa.me/919808843521",
  github: "https://github.com/Ritikvarun",
  linkedin: "https://www.linkedin.com/in/ritik-varun-0b6795274/",
  skills: [
    "Frontend: React.js, Next.js 16, TypeScript, JavaScript (ES6+), Tailwind CSS v4, Framer Motion, GSAP, Swiper.js, HTML5/CSS3",
    "Backend: Node.js, Express.js, RESTful APIs, MongoDB, Mongoose, JWT Authentication, Cloudinary, Razorpay Integration, Resend",
    "Tools & DevOps: Git, GitHub, Postman, Vercel, Render, Technical SEO"
  ],
  projects: [
    {
      name: "ShopX E-commerce",
      category: "Full Stack",
      description: "Full-stack e-commerce platform with product catalogue, cart, order management, and AI-based voice navigation.",
      demo: "https://shopx-6u3e.onrender.com/",
      github: "https://github.com/ritikvarun/ShopX",
      tech: "React.js, Node.js, Express, MongoDB, Voice AI API"
    },
    {
      name: "Muscle Craft Fitness Gym",
      category: "Full Stack",
      description: "Modern full-stack gym platform with GSAP animations, custom admin dashboard for trainers/gallery, enquiry system with Nodemailer, and MongoDB Atlas.",
      demo: "https://www.musclecraftfitnessgym.in/",
      github: "https://github.com/ritikvarun",
      tech: "React.js, GSAP, Node.js, Express.js, MongoDB Atlas, Nodemailer, Cloudinary"
    },
    {
      name: "EMS (Employee Management System)",
      category: "Full Stack",
      description: "Enterprise management system where admins assign tasks to employees with real-time status tracking and clean responsive UI.",
      demo: "https://ems21.netlify.app/",
      github: "https://github.com/ritikvarun/ems",
      tech: "React.js, Tailwind CSS, LocalStorage / Node.js, Express"
    },
    {
      name: "ZORA Watch Store",
      category: "Frontend",
      description: "Luxury stainless steel chronograph watch storefront with responsive modern UI, search filtering, and Add to Cart system.",
      demo: "https://zora-watch.netlify.app/",
      github: "https://github.com/ritikvarun",
      tech: "React.js, Tailwind CSS, Responsive Web Design"
    },
    {
      name: "IMDb CinemaHub",
      category: "Frontend",
      description: "Modern movie discovery & streaming preview web application built with React SPA architecture and powered by TMDB API.",
      demo: "https://imdbmovie21.netlify.app/",
      github: "https://github.com/ritikvarun",
      tech: "React.js, TMDB API, Tailwind CSS, Modern UI"
    },
    {
      name: "Cara E-commerce",
      category: "Frontend",
      description: "Modern, responsive e-commerce storefront with smooth slider animations and mobile-first experience.",
      demo: "https://cara-e-commerce12.netlify.app/",
      github: "https://github.com/ritikvarun/Cara_E-commerce",
      tech: "HTML5, CSS3, JavaScript, Swiper.js"
    },
    {
      name: "LinkedIn Clone",
      category: "Full Stack",
      description: "Professional networking platform clone with modern feed, messaging, and profile sections.",
      demo: "https://linkend-in-clone.vercel.app/",
      github: "https://github.com/ritikvarun/linkendIn-clone",
      tech: "React.js, CSS3, Responsive Web Design"
    }
  ]
};

const connectDB = require('../config/db');

/**
 * Builds real-time context string by querying MongoDB directly
 */
async function buildRAGContext() {
  let settingsData = fallbackKnowledge;
  let projectsData = fallbackKnowledge.projects;

  try {
    // Ensure active MongoDB connection
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    // 1. Fetch live settings from MongoDB
    const dbSettings = await Settings.findOne();
    if (dbSettings) {
      settingsData = {
        name: dbSettings.developerName || fallbackKnowledge.name,
        title: dbSettings.developerTitle || fallbackKnowledge.title,
        bio: dbSettings.bio || dbSettings.aboutBio,
        email: dbSettings.contactEmail || fallbackKnowledge.email,
        phone: dbSettings.contactPhone || fallbackKnowledge.phone,
        location: dbSettings.contactAddress || fallbackKnowledge.location,
        github: dbSettings.githubUrl || fallbackKnowledge.github,
        linkedin: dbSettings.linkedinUrl || fallbackKnowledge.linkedin,
        whatsappUrl: dbSettings.whatsappUrl || fallbackKnowledge.whatsappUrl,
        college: fallbackKnowledge.college,
        degree: fallbackKnowledge.degree,
        skills: fallbackKnowledge.skills
      };
    }

    // 2. Fetch live projects directly from MongoDB (sorted by newest first)
    const dbProjects = await Project.find().sort({ createdAt: -1 });
    if (dbProjects && dbProjects.length > 0) {
      projectsData = dbProjects.map(p => ({
        name: p.name,
        category: p.category || 'Web Development',
        description: p.description || p.Detail || '',
        demo: p.demo || '',
        github: p.github || ''
      }));
    }
  } catch (err) {
    console.warn('[AI Service] MongoDB query error, using fallback:', err.message);
  }

  const projectsSummary = projectsData.map((p, index) => 
    `${index + 1}. **${p.name}** [Category: ${p.category}] - ${p.description} (Demo: ${p.demo || 'N/A'}, GitHub: ${p.github || 'N/A'})`
  ).join('\n');

  return `
=== ABOUT RITIK VARUN (LIVE DATABASE) ===
Name: ${settingsData.name}
Role: ${settingsData.title}
Education: ${settingsData.degree} from ${settingsData.college}
Location: ${settingsData.location}
Bio: ${settingsData.bio || "Passionate Full Stack Developer with expertise in MERN stack & modern web tech."}

=== CONTACT INFO ===
Email: ${settingsData.email}
Phone: ${settingsData.phone}
WhatsApp: ${settingsData.whatsappUrl}
GitHub: ${settingsData.github}
LinkedIn: ${settingsData.linkedin}

=== TECHNICAL SKILLS ===
${fallbackKnowledge.skills.join('\n')}

=== ALL LIVE PROJECTS IN DATABASE (TOTAL: ${projectsData.length}) ===
${projectsSummary}
`;
}

/**
 * Parses action tags from AI response like [ACTION:OPEN_URL:url:label] or [ACTION:DOWNLOAD_CV]
 */
function extractActionFromReply(rawReply) {
  let reply = rawReply;
  let action = null;

  // 1. Explicit OPEN_URL tag [ACTION:OPEN_URL:url:label]
  const openUrlMatch = reply.match(/\[ACTION:OPEN_URL:(.+?)\]/i);
  if (openUrlMatch) {
    const content = openUrlMatch[1].trim();
    const lastColonIdx = content.lastIndexOf(':');
    let targetUrl = content;
    let label = 'Live Link';
    if (lastColonIdx > 6) {
      targetUrl = content.substring(0, lastColonIdx).trim();
      label = content.substring(lastColonIdx + 1).trim();
    }
    action = { type: 'OPEN_URL', label: `Open ${label}`, url: targetUrl, autoOpen: true };
    reply = reply.replace(/\[ACTION:OPEN_URL:.*?\]/gi, '').trim();
  }

  // 2. Explicit NAVIGATE tag [ACTION:NAVIGATE:path:label]
  const navMatch = reply.match(/\[ACTION:NAVIGATE:(.+?)\]/i);
  if (navMatch) {
    const content = navMatch[1].trim();
    const parts = content.split(':');
    const targetPath = parts[0].trim();
    const label = parts[1] ? parts[1].trim() : 'Page';
    action = { type: 'NAVIGATE', label: `Go to ${label}`, path: targetPath, autoOpen: true };
    reply = reply.replace(/\[ACTION:NAVIGATE:.*?\]/gi, '').trim();
  }

  // 3. DOWNLOAD_CV tag
  const cvMatch = reply.match(/\[ACTION:DOWNLOAD_CV\]/i);
  if (cvMatch) {
    action = { type: 'DOWNLOAD_CV', label: 'Download Resume (CV)', url: '/api/download-cv', autoOpen: true };
    reply = reply.replace(/\[ACTION:DOWNLOAD_CV\]/gi, '').trim();
  }

  // 4. WHATSAPP tag
  const whatsappMatch = reply.match(/\[ACTION:WHATSAPP\]/i);
  if (whatsappMatch) {
    action = { type: 'WHATSAPP', label: 'Chat on WhatsApp', url: 'https://wa.me/919808843521', autoOpen: true };
    reply = reply.replace(/\[ACTION:WHATSAPP\]/gi, '').trim();
  }

  // 5. EMAIL tag
  const emailMatch = reply.match(/\[ACTION:EMAIL\]/i);
  if (emailMatch) {
    action = { type: 'EMAIL', label: 'Send Email', url: 'mailto:ritikvarun64@gmail.com', autoOpen: true };
    reply = reply.replace(/\[ACTION:EMAIL\]/gi, '').trim();
  }

  // 6. Generic PROJECT tag
  const projectMatch = reply.match(/\[ACTION:PROJECT:(.*?)\]/i);
  if (projectMatch) {
    const projectName = projectMatch[1].trim();
    action = { type: 'VIEW_PROJECT', label: `View ${projectName}`, project: projectName, autoOpen: false };
    reply = reply.replace(/\[ACTION:PROJECT:.*?\]/gi, '').trim();
  }

  return { reply, action };
}

/**
 * Smart Fallback Engine if API key is missing or invalid
 */
function handleFallbackResponse(message) {
  const lower = (message || '').toLowerCase();
  
  if (lower.includes('zora')) {
    return {
      reply: "Opening **ZORA Watch Store** for you! It is a luxury stainless steel chronograph watch storefront built with React and Tailwind CSS.",
      action: { type: 'OPEN_URL', label: 'Open ZORA', url: 'https://zora-watch.netlify.app/', autoOpen: true }
    };
  }

  if (lower.includes('muscle') || lower.includes('gym')) {
    return {
      reply: "Opening **Muscle Craft Fitness Gym** for you! It is a full-stack gym platform with GSAP animations, admin portal and enquiry system.",
      action: { type: 'OPEN_URL', label: 'Open Muscle Craft', url: 'https://www.musclecraftfitnessgym.in/', autoOpen: true }
    };
  }

  if (lower.includes('shopx')) {
    return {
      reply: "Opening **ShopX E-commerce** for you! It features product management and AI-based voice navigation.",
      action: { type: 'OPEN_URL', label: 'Open ShopX', url: 'https://shopx-6u3e.onrender.com/', autoOpen: true }
    };
  }

  if (lower.includes('imdb') || lower.includes('movie')) {
    return {
      reply: "Opening **IMDb CinemaHub** for you! It is powered by TMDB API with modern movie discovery.",
      action: { type: 'OPEN_URL', label: 'Open IMDb CinemaHub', url: 'https://imdbmovie21.netlify.app/', autoOpen: true }
    };
  }

  if (lower.includes('ems')) {
    return {
      reply: "Opening **EMS (Employee Management System)** for you! It lets admins manage tasks and employee attendance.",
      action: { type: 'OPEN_URL', label: 'Open EMS', url: 'https://ems21.netlify.app/', autoOpen: true }
    };
  }

  if (lower.includes('cara')) {
    return {
      reply: "Opening **Cara E-commerce** for you! It features a modern storefront built with HTML, CSS, JavaScript, and Swiper.js.",
      action: { type: 'OPEN_URL', label: 'Open Cara E-commerce', url: 'https://cara-e-commerce12.netlify.app/', autoOpen: true }
    };
  }

  if (lower.includes('linkedin')) {
    return {
      reply: "Opening **LinkedIn Clone** for you! It is a professional networking platform with messaging and profile feeds.",
      action: { type: 'OPEN_URL', label: 'Open LinkedIn Clone', url: 'https://linkend-in-clone.vercel.app/', autoOpen: true }
    };
  }

  if (lower.includes('github')) {
    return {
      reply: "Opening Ritik's **GitHub Profile** for you!",
      action: { type: 'OPEN_URL', label: 'Open GitHub', url: 'https://github.com/Ritikvarun', autoOpen: true }
    };
  }

  if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) {
    return {
      reply: "Downloading Ritik's official Resume for you!",
      action: { type: 'DOWNLOAD_CV', label: 'Download Resume (CV)', url: '/api/download-cv', autoOpen: true }
    };
  }

  if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('build')) {
    return {
      reply: "Ritik has built **7 featured projects** across Full-Stack and Frontend:\n\n1. 🛍️ **ShopX E-commerce** (Full Stack) - E-commerce with AI voice navigation\n2. 🏋️‍♂️ **Muscle Craft Fitness Gym** (Full Stack) - Live gym website with GSAP, admin portal & enquiry system\n3. 👥 **EMS (Employee Management System)** (Full Stack) - Task assignment & employee dashboard\n4. ⌚ **ZORA Watch Store** (Frontend) - Luxury chronograph watch e-commerce\n5. 🎬 **IMDb CinemaHub** (Frontend) - Movie discovery preview app powered by TMDB API\n6. 👗 **Cara E-commerce** (Frontend) - Modern responsive storefront with Swiper.js\n7. 💼 **LinkedIn Clone** (Full Stack) - Social networking platform clone\n\nTell me: *'Open ZORA'*, *'Open Muscle Craft'*, or *'Open ShopX'* and I will launch it for you!",
      action: { type: 'VIEW_PROJECT', label: 'Explore All Projects', project: 'ShopX', autoOpen: false }
    };
  }

  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('phone') || lower.includes('whatsapp')) {
    return {
      reply: "Connecting you with Ritik on WhatsApp!",
      action: { type: 'WHATSAPP', label: 'Chat on WhatsApp', url: 'https://wa.me/919808843521', autoOpen: true }
    };
  }

  if (lower.includes('about') || lower.includes('who is') || lower.includes('ritik') || lower.includes('education') || lower.includes('bca')) {
    return {
      reply: "Ritik Varun is an enthusiastic Full Stack Web Developer and BCA student at Uttam Institute of Technology and Management, Agra. He specializes in building scalable MERN stack applications, responsive UIs, and integrating AI tools like LangChain.",
      action: null
    };
  }

  return {
    reply: "Hello! I am **Ritik AI**, your virtual guide to Ritik Varun's portfolio. You can ask me to:\n\n- 🚀 **Open any project** (e.g. *'Open Zora'*, *'Open Muscle Craft'*, *'Open ShopX'*)\n- 📄 **Download Resume** (e.g. *'Download CV'*)\n- 💬 **Connect on WhatsApp** (e.g. *'Open WhatsApp'*)\n- 🛠️ **Explore Skills & Tech Stack**\n\nWhat would you like to do?",
    action: null
  };
}

/**
 * Main Chat Processing Function using LangChain + Google Gemini
 */
async function processAIChat(userMessage, chatHistory = []) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
    console.warn('[AI Service] No GEMINI_API_KEY found in environment. Using smart local fallback.');
    return handleFallbackResponse(userMessage);
  }

  try {
    const ragContext = await buildRAGContext();

    // Initialize LangChain Gemini model
    const model = new ChatGoogleGenerativeAI({
      apiKey: apiKey,
      model: "gemini-3.6-flash",
      temperature: 0.7,
      maxOutputTokens: 1500,
    });

    const systemPromptText = `
You are "Ritik AI", the official intelligent AI assistant for Ritik Varun's personal developer portfolio.
Your goal is to represent Ritik Varun professionally, enthusiastically, and accurately to recruiters, clients, and visitors.
You also have AUTONOMOUS TOOL/ACTION CAPABILITIES to open projects, trigger downloads, and navigate the website.

KNOWLEDGE BASE (FETCHED LIVE FROM MONGODB):
${ragContext}

INSTRUCTIONS:
1. Answer questions strictly based on the Knowledge Base.
2. When asked about projects (e.g., "what projects have you made?", "show all projects", "list all projects", "top projects"):
   - ALWAYS list ALL projects available in the KNOWLEDGE BASE above.
   - For each project, show its name, category (Full Stack / Frontend), and a clear 1-line description.
3. Keep answers engaging, crisp, and well-formatted with markdown numbered lists/bullets.
4. Be friendly and confident. You can respond in English (default) or Hinglish/Hindi if the user queries in Hindi.
5. ACTION COMMANDS & TOOL CALLING (CRITICAL: Append these special action tags when the user requests an action or asks to open/view/launch something):
   - If user asks to OPEN or VIEW or LAUNCH any project (e.g., "open zora", "show me muscle craft", "open shopx", "open cara", "open ems", "open imdb", "open linkedin clone"):
     Locate that project's demo URL from the KNOWLEDGE BASE and append:
     "[ACTION:OPEN_URL:demo_url:ProjectName]"
     Example: For "open zora", append "[ACTION:OPEN_URL:https://zora-watch.netlify.app/:ZORA]".
     Example: For "open muscle craft", append "[ACTION:OPEN_URL:https://www.musclecraftfitnessgym.in/:Muscle Craft Fitness Gym]".
     Example: For "open shopx", append "[ACTION:OPEN_URL:https://shopx-6u3e.onrender.com/:ShopX E-commerce]".
   - If user asks to open GitHub -> Append "[ACTION:OPEN_URL:https://github.com/Ritikvarun:GitHub Profile]".
   - If user asks to open LinkedIn -> Append "[ACTION:OPEN_URL:https://www.linkedin.com/in/ritik-varun-0b6795274/:LinkedIn Profile]".
   - If user asks for resume or says "open cv / download cv" -> Append "[ACTION:DOWNLOAD_CV]".
   - If user asks to open WhatsApp or contact -> Append "[ACTION:WHATSAPP]".
   - If user asks to email Ritik -> Append "[ACTION:EMAIL]".
   - If user asks to go to projects page -> Append "[ACTION:NAVIGATE:/projects:Projects Page]".
   - If user asks to go to about page -> Append "[ACTION:NAVIGATE:/about:About Page]".
`;

    const messages = [
      new SystemMessage(systemPromptText)
    ];

    // Append prior chat history (limit last 6 turns for token efficiency)
    if (Array.isArray(chatHistory)) {
      const recentHistory = chatHistory.slice(-6);
      recentHistory.forEach(item => {
        if (item.sender === 'user' || item.role === 'user') {
          messages.push(new HumanMessage(item.text || item.content || ''));
        } else if (item.sender === 'ai' || item.role === 'assistant') {
          messages.push(new AIMessage(item.text || item.content || ''));
        }
      });
    }

    // Add current user prompt
    messages.push(new HumanMessage(userMessage));

    // Execute LangChain LLM invocation
    const response = await model.invoke(messages);
    const rawContent = response.content;

    return extractActionFromReply(rawContent);

  } catch (error) {
    console.error('[AI Service Error]:', error.message);
    // Graceful fallback on LLM error
    return handleFallbackResponse(userMessage);
  }
}

/**
 * AI Project Content Generator for Admin Panel
 */
async function generateProjectContent({ title, github = '', category = '', prompt = '' }) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
    return {
      description: `A modern ${category || 'web'} application developed by Ritik Varun featuring scalable architecture and responsive user experience.`,
      detail: `Developed ${title || 'a high-performance application'} with modern frontend and backend technologies. Features include responsive design, optimized state management, clean component hierarchy, and seamless user interaction.`,
      suggestedCategory: category || 'Frontend'
    };
  }

  try {
    const model = new ChatGoogleGenerativeAI({
      apiKey: apiKey,
      model: "gemini-3.6-flash",
      temperature: 0.7,
      maxOutputTokens: 800,
    });

    const systemPrompt = `
You are an expert technical portfolio writer for Ritik Varun (Full Stack & Frontend Developer).
Your task is to write high-quality, professional, recruiter-impressive descriptions for a portfolio project.

PROJECT INPUTS:
- Title: ${title || 'Untitled Project'}
- Category Hint: ${category || 'Not specified'}
- GitHub Link: ${github || 'None'}
- Developer Notes / Prompt: ${prompt || 'None'}

OUTPUT FORMAT:
Return ONLY a valid JSON object (no markdown code fences, no extra text) with these exact keys:
{
  "description": "A crisp, powerful 1-2 sentence summary of the project suitable for cards.",
  "detail": "A detailed 1-2 paragraph technical explanation explaining architecture, key features, performance optimizations, and technologies used.",
  "suggestedCategory": "One of: Full Stack, Frontend, Website Template, Creative Website, AI Project, Other"
}
`;

    const response = await model.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(`Generate professional project content for: "${title}"`)
    ]);

    let raw = response.content.trim();
    // Remove markdown code fence if model included it
    raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();

    try {
      const parsed = JSON.parse(raw);
      return {
        description: parsed.description || '',
        detail: parsed.detail || '',
        suggestedCategory: parsed.suggestedCategory || category || 'Frontend'
      };
    } catch (parseErr) {
      // Regex extraction fallback for unescaped newlines/quotes
      const descMatch = raw.match(/"description"\s*:\s*"([\s\S]*?)(?<!\\)"/);
      const detailMatch = raw.match(/"detail"\s*:\s*"([\s\S]*?)(?<!\\)"/);
      const catMatch = raw.match(/"suggestedCategory"\s*:\s*"([\s\S]*?)(?<!\\)"/);

      return {
        description: descMatch ? descMatch[1].replace(/\\"/g, '"').trim() : `A modern ${category || 'web'} application developed with clean code.`,
        detail: detailMatch ? detailMatch[1].replace(/\\"/g, '"').trim() : `Developed ${title || 'this project'} with modern architecture.`,
        suggestedCategory: catMatch ? catMatch[1].trim() : (category || 'Frontend')
      };
    }
  } catch (err) {
    console.error('[AI Project Generator Error]:', err.message);
    return {
      description: `A modern ${category || 'web'} application developed with clean code, scalability, and seamless user experience.`,
      detail: `Developed ${title || 'this project'} featuring modern web technologies, responsive layout, and robust architecture.`,
      suggestedCategory: category || 'Frontend'
    };
  }
}

module.exports = {
  processAIChat,
  buildRAGContext,
  generateProjectContent
};

