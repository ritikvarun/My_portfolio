const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: [
    // Local development
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    // Production
    'https://my-portfolio-amber-eta-87.vercel.app',
    'https://my-portfolio-admin-gamma.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files (Uploaded images/PDFs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/upload', require('./routes/uploadRoute'));
app.use('/api/download-cv', require('./routes/downloadRoute'));

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Portfolio API Server is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
