require('dotenv').config()
const app = require('./app')
const Pool = require('pg').Pool
const configDB = require('./db')

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

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
