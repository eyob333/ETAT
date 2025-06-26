// models/Partner.js
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize') // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE
const User = require('./User') // <--- Import the User model for association

// REMOVE THESE LINES:
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

class Partner extends Model {
  // You can add instance or static methods here if needed
}

Partner.init({
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
  body: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Body is required'
      }
    }
  },
  key_offerings: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Key Offering is required'
      }
    }
  },
  logo: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // Use the actual table name if different from model name 'Users'
      key: 'id'
    }
  }
}, {
  sequelize, // <--- IMPORTANT: Pass the centralized sequelize instance here
  modelName: 'Partner', // This is the model name for Sequelize
  tableName: 'partners', // This is the actual table name in your database
  timestamps: true // Sequelize will manage createdAt and updatedAt automatically
})

// Define association here (after both models are defined)
Partner.belongsTo(User, { foreignKey: 'user_id' }); // A Partner belongs to a User

module.exports = Partner