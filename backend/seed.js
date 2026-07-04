const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Certificate = require('./models/Certificate');
const Settings = require('./models/Settings');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Admin.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await Certificate.deleteMany();
    await Settings.deleteMany();

    console.log('Database cleared.');

    // 1. Create Default Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    await Admin.create({
      email: adminEmail,
      password: adminPassword
    });
    console.log(`Default admin created: ${adminEmail} / ${adminPassword}`);

    // 2. Read data.json from frontend
    const dataPath = path.join(__dirname, '..', 'frontend', 'src', 'json', 'data.json');
    if (fs.existsSync(dataPath)) {
      const rawData = fs.readFileSync(dataPath, 'utf-8');
      const data = JSON.parse(rawData);

      // Seed Skills
      if (data.skills && Array.isArray(data.skills)) {
        const skillsToInsert = data.skills.map(skill => ({
          name: skill.name,
          image: skill.image
        }));
        await Skill.insertMany(skillsToInsert);
        console.log(`Seeded ${skillsToInsert.length} skills.`);
      }

      // Seed Projects
      if (data.projects && Array.isArray(data.projects)) {
        const projectsToInsert = data.projects.map(proj => ({
          name: proj.name,
          description: proj.description,
          images: proj.images,
          Detail: proj.Detail,
          demo: proj.demo,
          github: proj.github
        }));
        await Project.insertMany(projectsToInsert);
        console.log(`Seeded ${projectsToInsert.length} projects.`);
      }

      // Seed Certificates
      if (data.certificates && Array.isArray(data.certificates)) {
        const certificatesToInsert = data.certificates.map(cert => ({
          title: cert.title,
          issuer: cert.issuer,
          image: cert.image,
          link: cert.link
        }));
        await Certificate.insertMany(certificatesToInsert);
        console.log(`Seeded ${certificatesToInsert.length} certificates.`);
      }
    } else {
      console.log('frontend data.json not found, skipped seeding portfolio data.');
    }

    // 3. Create default settings
    await Settings.create({});
    console.log('Default settings created.');

    console.log('Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
