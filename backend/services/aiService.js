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
      name: "Employee Management System (EMS)",
      category: "Full Stack",
      description: "Enterprise EMS for employee tracking, admin assignment dashboards, attendance, and task status.",
      demo: "https://ems-bay-one.vercel.app",
      github: "https://github.com/ritikvarun/ems",
      tech: "React.js, Node.js, Express, MongoDB, JWT"
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
      category: "Frontend",
      description: "Professional networking platform clone with modern feed, messaging, and profile sections.",
      demo: "https://linkend-in-clone.vercel.app/",
      github: "https://github.com/ritikvarun/linkendIn-clone",
      tech: "React.js, CSS3, Responsive Web Design"
    }
  ]
};

/**
 * Builds real-time context string by querying MongoDB or falling back to static data
 */
async function buildRAGContext() {
  let settingsData = fallbackKnowledge;
  let projectsData = fallbackKnowledge.projects;

  const isDbConnected = mongoose.connection && mongoose.connection.readyState === 1;

  if (isDbConnected) {
    try {
      const dbSettings = await Settings.findOne().maxTimeMS(2000);
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
    } catch (err) {
      console.warn('[AI Service] Could not fetch settings from DB, using fallback:', err.message);
    }

    try {
      const dbProjects = await Project.find().maxTimeMS(2000);
      if (dbProjects && dbProjects.length > 0) {
        projectsData = dbProjects.map(p => ({
          name: p.name,
          category: p.category,
          description: p.description || p.Detail,
          demo: p.demo || '',
          github: p.github || ''
        }));
      }
    } catch (err) {
      console.warn('[AI Service] Could not fetch projects from DB, using fallback:', err.message);
    }
  }

  const projectsSummary = projectsData.map(p => 
    `- **${p.name}** (${p.category}): ${p.description} | Demo: ${p.demo || 'N/A'} | GitHub: ${p.github || 'N/A'}`
  ).join('\n');

  return `
=== ABOUT RITIK VARUN ===
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

=== FEATURED PROJECTS ===
${projectsSummary}
`;
}

/**
 * Parses action tags from AI response like [ACTION:DOWNLOAD_CV]
 */
function extractActionFromReply(rawReply) {
  let reply = rawReply;
  let action = null;

  const cvMatch = reply.match(/\[ACTION:DOWNLOAD_CV\]/i);
  if (cvMatch) {
    action = { type: 'DOWNLOAD_CV', label: 'Download Resume (CV)', url: '/api/download-cv' };
    reply = reply.replace(/\[ACTION:DOWNLOAD_CV\]/gi, '').trim();
  }

  const whatsappMatch = reply.match(/\[ACTION:WHATSAPP\]/i);
  if (whatsappMatch) {
    action = { type: 'WHATSAPP', label: 'Chat on WhatsApp', url: 'https://wa.me/919808843521' };
    reply = reply.replace(/\[ACTION:WHATSAPP\]/gi, '').trim();
  }

  const emailMatch = reply.match(/\[ACTION:EMAIL\]/i);
  if (emailMatch) {
    action = { type: 'EMAIL', label: 'Send Email', url: 'mailto:ritikvarun64@gmail.com' };
    reply = reply.replace(/\[ACTION:EMAIL\]/gi, '').trim();
  }

  const projectMatch = reply.match(/\[ACTION:PROJECT:(.*?)\]/i);
  if (projectMatch) {
    const projectName = projectMatch[1].trim();
    action = { type: 'VIEW_PROJECT', label: `View ${projectName}`, project: projectName };
    reply = reply.replace(/\[ACTION:PROJECT:.*?\]/gi, '').trim();
  }

  return { reply, action };
}

/**
 * Smart Fallback Engine if API key is missing or invalid
 */
function handleFallbackResponse(message) {
  const lower = (message || '').toLowerCase();
  
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) {
    return {
      reply: "You can download Ritik's official Resume directly using the button below! Feel free to ask if you'd like to know about his projects or skills.",
      action: { type: 'DOWNLOAD_CV', label: 'Download Resume (CV)', url: '/api/download-cv' }
    };
  }

  if (lower.includes('project') || lower.includes('shopx') || lower.includes('ems') || lower.includes('cara') || lower.includes('work')) {
    return {
      reply: "Ritik has built several impressive projects including:\n\n1. **ShopX E-commerce** (Full Stack with AI voice navigation)\n2. **Employee Management System** (React + Node.js + MongoDB)\n3. **Cara E-commerce** (Modern responsive store)\n4. **LinkedIn Clone** (Interactive social platform)\n\nWhich project would you like to explore in detail?",
      action: { type: 'VIEW_PROJECT', label: 'Explore Projects', project: 'ShopX' }
    };
  }

  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack') || lower.includes('react') || lower.includes('node')) {
    return {
      reply: "Ritik's tech stack includes:\n- **Frontend**: React.js, Next.js, JavaScript, TypeScript, Tailwind CSS, Framer Motion\n- **Backend**: Node.js, Express.js, MongoDB, REST APIs, JWT, Razorpay\n- **AI & Tools**: LangChain, Google GenAI, Git, GitHub, Postman, Vercel, Render",
      action: null
    };
  }

  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('phone') || lower.includes('whatsapp')) {
    return {
      reply: "You can reach Ritik directly via:\n- **Email**: ritikvarun64@gmail.com\n- **Phone/WhatsApp**: +91 9808433521\n- **Location**: Agra, Uttar Pradesh, India\n\nClick below to connect on WhatsApp directly!",
      action: { type: 'WHATSAPP', label: 'Chat on WhatsApp', url: 'https://wa.me/919808843521' }
    };
  }

  if (lower.includes('about') || lower.includes('who is') || lower.includes('ritik') || lower.includes('education') || lower.includes('bca')) {
    return {
      reply: "Ritik Varun is an enthusiastic Full Stack Web Developer and BCA student at Uttam Institute of Technology and Management, Agra. He specializes in building scalable MERN stack applications, responsive UIs, and integrating AI tools like LangChain.",
      action: null
    };
  }

  return {
    reply: "Hello! I am **Ritik AI**, your virtual guide to Ritik Varun's portfolio. You can ask me about his:\n\n- 💼 **Full-Stack & Frontend Projects**\n- 🛠️ **Tech Stack & Skills**\n- 🎓 **Education & Background**\n- 📄 **Resume / CV Download**\n- 📬 **Contact & Hiring Details**\n\nHow can I help you today?",
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
      maxOutputTokens: 600,
    });

    const systemPromptText = `
You are "Ritik AI", the official intelligent AI assistant for Ritik Varun's personal developer portfolio.
Your goal is to represent Ritik Varun professionally, enthusiastically, and accurately to recruiters, clients, and visitors.

KNOWLEDGE BASE:
${ragContext}

INSTRUCTIONS:
1. Answer questions strictly based on the Knowledge Base. If asked about something outside Ritik's background/tech/hiring, politely redirect back to Ritik's work.
2. Keep answers concise, engaging, and well-formatted with markdown bullets where helpful.
3. Be friendly and confident. You can respond in English (default) or Hinglish/Hindi if the user queries in Hindi.
4. ACTION TRIGGERS (Append these special tags when applicable so the frontend can render rich interactive buttons):
   - If user asks for resume, CV, or hiring documents -> Append "[ACTION:DOWNLOAD_CV]" at the end.
   - If user wants to contact, message, or hire Ritik on WhatsApp -> Append "[ACTION:WHATSAPP]" at the end.
   - If user wants to email Ritik -> Append "[ACTION:EMAIL]" at the end.
   - If user specifically asks about a project (e.g. ShopX, EMS, Cara) -> Append "[ACTION:PROJECT:ProjectName]" at the end.
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

module.exports = {
  processAIChat,
  buildRAGContext
};
