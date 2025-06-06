const { DataTypes, Sequelize } = require('sequelize')
// Assuming db.js contains your database connection details
const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db') 
const slugify = require('slugify') // Slugify is not used in this model, but kept for context if needed elsewhere

// Initialize Sequelize connection using details from db.js
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres',
  logging: false // You can set this to console.log to see SQL queries
})

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { // Name of the person giving the testimonial
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required for the testimonial'
      }
    }
  },
  testimony: { // The content of the testimonial
    type: DataTypes.TEXT, // Changed to TEXT for potentially longer testimonials
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Testimonial content is required'
      }
    }
  },
  image: { // Path or URL to the image of the person giving the testimonial
    type: DataTypes.STRING,
    allowNull: true // Image is optional
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'testimonials', // Specifies the table name in your database
  timestamps: true, // Automatically manages createdAt and updatedAt fields
  // No hooks needed for slug generation as testimonials typically don't have slugs
})

// Export the sequelize instance and the Testimonial model
module.exports = { sequelize, Testimonial }
