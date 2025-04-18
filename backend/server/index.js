require('dotenv').config()

const express = require('express')
const cors = require('cors')
const Pool = require('pg').Pool
const configDB = require('./db')
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

app.listen(process.env.SERVER_PORT , () => {
  console.log('Server is running on port 5000')
})

app.get('/', (req, res) => {
  res.send('<h1>Hi</h1>');
});

const pool = new Pool({
  user: configDB.USER,
  password: configDB.PASSWORD,
  host: configDB.HOST,
  database: configDB.DATABASE,
  ssl: false
})

pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database')
  })
  .catch((err) => console.error('Error connecting to PostgreSQL database', err))

app.post('/image', upload.single('profilePicture'), (req, res) => {
  try {
    // Check if a file was uploaded
    if (req.file) {
      // A file was uploaded, save the file path in the user model
      req.body.profilePicture = req.file.path
      res.status(200).json({ message: req.body.profilePicture })
    } else {
      // No file was uploaded, handle accordingly (e.g., set a default picture)
      req.body.profilePicture = 'default_picture.jpg'
      res.status(200).json({ message: 'No file uploaded, using default picture.' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal server error.' })
  }
})

app.use(authRoutes)
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
