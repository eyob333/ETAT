// index.js (Updated)

require('dotenv').config()

const express = require('express')
const cors = require('cors')
// REMOVE THIS LINE: const Pool = require('pg').Pool // No longer needed if using Sequelize ORM primarily
// REMOVE THIS LINE: const configDB = require('./db') // This file is deleted/no longer needed

// IMPORT THE CENTRALIZED SEQUELIZE INSTANCE
const sequelize = require('./config/sequelize') // <--- NEW LINE

// Import your models to ensure they are defined with Sequelize
// It's crucial that all models are imported *after* the sequelize instance is defined
// and *before* you try to sync or use any associations.
require('./models/User'); // Example: import User model
require('./models/Service'); // Example: import Service model
// ... (import all your other models here: Project, Event, News, Job, Training, Contact, Partner, Testimonial, Enrollment, etc.)

// --- IMPORTANT: Define associations AFTER all models are imported ---
// This is typically done in a separate file, or directly here after all models are loaded.
// For example, in a file like `models/associations.js` that you would `require` here.
// Or you can define them here, if you prefer:
// Service.belongsTo(User); // Assuming a service belongs to a user
// User.hasMany(Service);
// ... (all your belongsTo, hasMany, etc., associations)
// If you have a separate file for associations, e.g., models/associations.js:
// require('./models/associations'); // <--- NEW LINE if you have a separate file for associations


const authRoutes = require('./routes/authRoutes')
const projectRoutes = require('./routes/projectRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const partnerRoutes = require('./routes/partnerRoutes')
const newsRoutes = require('./routes/newsRoutes')
const eventRoutes = require('./routes/eventRoutes')
const jobRoutes = require('./routes/jobRoutes')
const jobApplicationRoutes = require('./routes/jobApplicationRoutes')
const trainingRoutes = require('./routes/trainingRoutes')
const contactRoutes = require('./routes/contactRoutes')
const profileRoutes = require('./routes/profileRoutes')
const productRoutes = require('./routes/productRoutes')
const testimonialRoutes = require('./routes/testimnialRoutes')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const corsOptions = require('./config/corsOptions')
const upload = require('./middleware/fileUpload')
const limiter = require('./middleware/rateLimiter')

const app = express()
app.use('/image',express.static('Image'));
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.disable('x-powered-by')
app.use(limiter)
app.set('trust proxy', 1)

app.set('view engine', 'ejs')

// REMOVE MANUAL PG POOL CONNECTION:
// pool.connect()
//   .then(() => {
//     console.log('Connected to PostgreSQL database')
//   })
//   .catch((err) => console.error('Error connecting to PostgreSQL database', err))


// Optionally, synchronize your models with the database (use with caution in production!)
// Only run `sync()` if you want Sequelize to create/alter tables.
// In development, `alter: true` is common. In production, use migrations.
// sequelize.sync({ alter: true }) // WARNING: Use with caution!
//   .then(() => {
//     console.log('Database & tables synced!');
//   })
//   .catch(err => {
//     console.error('Error syncing database:', err);
//   });


app.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT || 5000}`)
})

app.get('/', (req, res) => {
  res.send('<h1> hello, welcome</h1>');
});

app.post('/image', upload.single('profilePicture'), (req, res) => {
  try {
    if (req.file) {
      req.body.profilePicture = req.file.path
      res.status(200).json({ message: req.body.profilePicture })
    } else {
      req.body.profilePicture = 'default_picture.jpg'
      res.status(200).json({ message: 'No file uploaded, using default picture.' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal server error.' })
  }
})

// --- IMPORTANT: You no longer pass `pool` here if models are using Sequelize directly ---
// Routes will now import their models, and the models will use the global sequelize instance.
app.use(authRoutes) // <--- No longer passing pool directly
app.use(projectRoutes)
app.use(partnerRoutes)
app.use(serviceRoutes)
app.use(newsRoutes)
app.use(eventRoutes)
app.use(trainingRoutes)
app.use(jobRoutes)
app.use(jobApplicationRoutes)
app.use(contactRoutes)
app.use(profileRoutes)
app.use(productRoutes)
app.use(testimonialRoutes)