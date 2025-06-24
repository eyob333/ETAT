// models/Service.js
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize') // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE
const User = require('./User') // Ensure User model is imported for the association

// REMOVE THESE LINES:
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

class Service extends Model {
  // You can add instance or static methods here if needed
}

Service.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: 'Title must be unique'
    },
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Title is required'
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
  picture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  user_id: { // Assuming a user_id foreign key for the association
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // Use the actual table name of your User model
      key: 'id'
    }
  }
}, {
  sequelize, // <--- IMPORTANT: Pass the centralized sequelize instance here
  modelName: 'Service', // This is the model name for Sequelize
  tableName: 'services', // This is the actual table name in your database
  timestamps: true // Sequelize will manage createdAt and updatedAt automatically
});

// Define association here (after both models are defined)
Service.belongsTo(User, { foreignKey: 'user_id' }); // A Service belongs to a User

module.exports = Service