import localData from '../json/data.json';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Fallback profile settings matching the hardcoded ones
const defaultSettings = {
  developerName: 'Ritik Varun',
  developerTitle: 'Frontend Developer',
  bio: 'Hi, I’m Ritik Varun 👋 I am a dedicated Web Developer with experience in building modern, responsive, and scalable websites. I specialize in JavaScript, React, Node.js, and Express, and I am also familiar with Next.js and MongoDB. I enjoy solving problems, writing clean code, and creating impactful digital solutions.',
  aboutQuote: 'A brief introduction about me and my interest.',
  contactEmail: 'ritikvarun64@gmail.com',
  contactPhone: '',
  contactAddress: '',
  githubUrl: 'https://github.com/Ritikvarun',
  linkedinUrl: 'https://www.linkedin.com/in/ritik-varun-0b6795274/',
  instagramUrl: 'https://www.instagram.com/arjun_rk_0021',
  resumeUrl: '/RItik.pdf',
  profileImage: '/images/Me/Ritik.jpg',
  aboutImage: '/images/Me/Me2.jpg'
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
  try {
    const res = await fetch(`${API_URL}/skills`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data.length > 0 ? data : localData.skills;
  } catch (error) {
    console.warn('Using local fallback for skills:', error.message);
    return localData.skills;
  }
}

export async function getCertificates() {
  try {
    const res = await fetch(`${API_URL}/certificates`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data.length > 0 ? data : localData.certificates;
  } catch (error) {
    console.warn('Using local fallback for certificates:', error.message);
    return localData.certificates;
  }
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

export async function getNotes() {
  try {
    const res = await fetch(`${API_URL}/notes`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (error) {
    console.warn('Failed to fetch notes:', error.message);
    return [];
  }
}
