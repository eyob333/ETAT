const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const limiter = require('./middleware/rateLimiter');

const app = express();

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/image', express.static('Image'));
app.disable('x-powered-by');
app.use(limiter);
app.set('trust proxy', 1);

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/projectRoutes'));
app.use('/api', require('./routes/serviceRoutes'));
app.use('/api', require('./routes/partnerRoutes'));
app.use('/api', require('./routes/newsRoutes'));
app.use('/api', require('./routes/eventRoutes'));
app.use('/api', require('./routes/jobRoutes'));
app.use('/api', require('./routes/jobApplicationRoutes'));
app.use('/api', require('./routes/trainingRoutes'));
app.use('/api', require('./routes/contactRoutes'));
app.use('/api', require('./routes/profileRoutes'));
app.use('/api', require('./routes/productRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
