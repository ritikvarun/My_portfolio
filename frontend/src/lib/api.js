import localData from '../json/data.json';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Fallback profile settings matching the hardcoded ones
const defaultSettings = {
  developerName: 'Ritik Varun',
  developerTitle: 'Frontend Developer',
  bio: 'Hi, I’m Ritik Varun 👋 I am a dedicated Web Developer with experience in building modern, responsive, and scalable websites. I specialize in JavaScript, React, Node.js, and Express, and I am also familiar with Next.js and MongoDB. I enjoy solving problems, writing clean code, and creating impactful digital solutions.',
  aboutQuote: 'A brief introduction about me and my interest.',
  contactEmail: 'ritikvarun64@gmail.com',
  contactPhone: '9808433521',
  contactAddress: 'Agra, Uttar Pradesh, India',
  githubUrl: 'https://github.com/Ritikvarun',
  linkedinUrl: 'https://www.linkedin.com/in/ritik-varun-0b6795274/',
  instagramUrl: 'https://www.instagram.com/arjun_rk_0021',
  profileImage: '/images/Me/Ritik.jpg',
  aboutImage: '/images/Me/Me2.jpg',
  whatsappUrl: 'https://wa.me/919808843521',
  aboutBio: "Hey there, I'm Ritik Varun, a BCA student and an aspiring Full Stack Developer currently focused on building a strong foundation in MERN stack development. I’m currently pursuing my BCA degree at Uttam Institute of Technology and Management (affiliated with Dr. Bhim Rao Ambedkar University, Agra). I love working on projects that combine modern web technologies with fresh ideas—whether it’s creating responsive, scalable websites or exploring AI tools. I enjoy pushing my limits and learning every day. Apart from coding, I stay curious about design and emerging technologies, because in today’s fast-changing digital world, I believe being a lifelong learner is the real superpower."
};

export async function getProjects() {
  try {
    const res = await fetch(`${API_URL}/projects`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data.length > 0 ? data : localData.projects;
  } catch (error) {
    console.warn('Using local fallback for projects:', error.message);
    return localData.projects;
  }
}

export async function getSkills() {
  return localData.skills || [];
}

export async function getSettings() {
  try {
    const res = await fetch(`${API_URL}/settings`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return { ...defaultSettings, ...data };
  } catch (error) {
    console.warn('Using local fallback for settings:', error.message);
    return defaultSettings;
  }
}

/**
 * Send chat message to Ritik AI backend (LangChain + Gemini)
 * Includes graceful local fallback if backend is unreachable.
 */
export async function sendChatMessage(message, history = []) {
  try {
    const res = await fetch(`${API_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    if (data && data.reply) {
      return {
        reply: data.reply,
        action: data.action || null,
      };
    }
    throw new Error('Invalid response structure');
  } catch (err) {
    console.warn('[AI Client] Fallback mode activated:', err.message);
    
    // Client-side quick intelligent fallback
    const msg = (message || '').toLowerCase();
    if (msg.includes('resume') || msg.includes('cv') || msg.includes('download')) {
      return {
        reply: "You can download Ritik's official Resume directly using the button below! Feel free to ask if you'd like to know about his projects or skills.",
        action: { type: 'DOWNLOAD_CV', label: 'Download Resume (CV)', url: `${API_URL}/download-cv` }
      };
    }
    if (msg.includes('project') || msg.includes('shopx') || msg.includes('ems') || msg.includes('cara')) {
      return {
        reply: "Ritik has developed key projects including:\n\n1. **ShopX E-commerce**: Full-stack MERN with AI voice navigation\n2. **EMS**: Enterprise Employee Management System\n3. **Cara E-commerce**: High performance shopping storefront\n4. **LinkedIn Clone**: Modern social networking clone\n\nWhich one would you like to explore?",
        action: { type: 'VIEW_PROJECT', label: 'Explore Projects', project: 'ShopX' }
      };
    }
    if (msg.includes('contact') || msg.includes('whatsapp') || msg.includes('email') || msg.includes('hire')) {
      return {
        reply: "You can reach Ritik at:\n- **Email**: ritikvarun64@gmail.com\n- **Phone**: +91 9808433521\n- **Location**: Agra, UP, India\n\nClick below to message him directly on WhatsApp!",
        action: { type: 'WHATSAPP', label: 'Chat on WhatsApp', url: 'https://wa.me/919808843521' }
      };
    }
    return {
      reply: "Hi! I am **Ritik AI**, your virtual guide to Ritik Varun's portfolio. You can ask me about his **Projects**, **Tech Stack**, **Education**, or **Download his CV**!",
      action: null
    };
  }
}

