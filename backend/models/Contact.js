// models/Contact.js
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize') // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE

// REMOVE THESE LINES:
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

class Contact extends Model {
  // You can add instance or static methods here if needed
}

Contact.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Please enter an email'
      },
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Please enter a phone number'
      }
    }
  },
  address: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Please enter an address'
      }
    }
  },
  map_location: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Please enter a location link'
      }
    }
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
  modelName: 'Contact', // This is the model name for Sequelize
  tableName: 'contacts', // This is the actual table name in your database
  timestamps: true // Sequelize will manage createdAt and updatedAt automatically
});

module.exports = Contact