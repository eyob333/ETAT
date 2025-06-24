// models/Testimonial.js
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize') // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE
// const slugify = require('slugify') // Slugify is not used in this model, no need to require it if not used

// REMOVE THESE LINES:
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

class Testimonial extends Model {
  // You can add instance or static methods here if needed
}

Testimonial.init({
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
  sequelize, // <--- IMPORTANT: Pass the centralized sequelize instance here
  modelName: 'Testimonial', // Specifies the model name for Sequelize
  tableName: 'testimonials', // Specifies the table name in your database
  timestamps: true // Automatically manages createdAt and updatedAt fields
})

// Export only the Testimonial model, not the sequelize instance from a model file
module.exports = Testimonial