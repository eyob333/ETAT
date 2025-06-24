// models/Enrollment.js
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize') // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE

// REMOVE THESE LINES:
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

class Enrollment extends Model {
  // You can add instance or static methods here if needed
}

Enrollment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required'
      }
    }
  },
  enrolled_for: {
    type: DataTypes.STRING // Stores 'event' or 'training'
  },
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Email is required'
      },
      isEmail: true
    }
  },
  enrolled_for_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Assuming an ID is always required
    // The `references` definition here is for informational purposes only.
    // Dynamic foreign key constraints like this are not directly managed by Sequelize.
    // See the important note below.
    references: {
      model: 'events', // Default or primary table to reference if a hard foreign key is desired
      key: 'id'
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
  modelName: 'Enrollment', // This is the model name for Sequelize
  tableName: 'enrollment', // This is the actual table name in your database
  timestamps: true // Sequelize will manage createdAt and updatedAt automatically
});

// No associations defined here as the foreign key is conditional.
// If you need associations, they will need to be handled dynamically in your application logic
// (e.g., fetching based on enrolled_for and enrolled_for_id).

module.exports = Enrollment