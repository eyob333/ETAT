// config/sequelize.js (New File)
const { Sequelize } = require('sequelize');

// Load environment variables (important for DATABASE_URL)
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Use SSL for Neon
            rejectUnauthorized: false // Necessary for self-signed certificates or certain environments like Neon
        }
    },
    logging: false, // Set to true to see SQL queries in console
    pool: { // Configure connection pooling if desired
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Sequelize connected successfully to PostgreSQL database.');
  })
  .catch(err => {
    console.error('Unable to connect to the database with Sequelize:', err);
  });

module.exports = sequelize;