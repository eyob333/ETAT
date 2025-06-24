// models/Project.js
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize') // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE
const User = require('./User') // <--- Import the User model for association

// REMOVE THESE LINES:
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

class Project extends Model {
  // You can add instance or static methods here if needed
}

Project.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
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
    allowNull: false,
  },
  doc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    defaultValue: 'Technology'
  },
  start_date: {
    type: DataTypes.DATE
  },
  end_date: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.BOOLEAN
  },
  user_id: { // This column is correctly defined for the foreign key
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // Use the actual table name if different from model name 'Users'
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
  modelName: 'Project', // This is the model name for Sequelize
  tableName: 'projects', // This is the actual table name in your database
  timestamps: true // Sequelize will manage createdAt and updatedAt automatically
})

// Define association here (after both models are defined)
Project.belongsTo(User, { foreignKey: 'user_id' }); // A Project belongs to a User

module.exports = Project