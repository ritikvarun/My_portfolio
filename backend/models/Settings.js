const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  developerName: {
    type: String,
    default: 'Ritik Varun'
  },
  developerTitle: {
    type: String,
    default: 'Frontend Developer'
  },
  bio: {
    type: String,
    default: 'Hi, I’m Ritik Varun 👋 I am a dedicated Web Developer with experience in building modern, responsive, and scalable websites. I specialize in JavaScript, React, Node.js, and Express, and I am also familiar with Next.js and MongoDB. I enjoy solving problems, writing clean code, and creating impactful digital solutions.'
  },
  aboutQuote: {
    type: String,
    default: 'A brief introduction about me and my interest.'
  },
  contactEmail: {
    type: String,
    default: 'ritikvarun64@gmail.com'
  },
  contactPhone: {
    type: String,
    default: ''
  },
  contactAddress: {
    type: String,
    default: ''
  },
  githubUrl: {
    type: String,
    default: 'https://github.com/Ritikvarun'
  },
  linkedinUrl: {
    type: String,
    default: 'https://www.linkedin.com/in/ritik-varun-0b6795274/'
  },
  instagramUrl: {
    type: String,
    default: 'https://www.instagram.com/arjun_rk_0021'
  },
  resumeUrl: {
    type: String,
    default: '/RItik.pdf'
  },
  profileImage: {
    type: String,
    default: '/images/Me/Ritik.jpg'
  },
  aboutImage: {
    type: String,
    default: '/images/Me/Me2.jpg'
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
