// models/Training.js
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize') // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE
const slugify = require('slugify')
const User = require('./User') // Assuming Training has a user_id foreign key to the User model

// REMOVE THESE LINES:
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

class Training extends Model {
  // You can add instance or static methods here if needed
}

Training.init({
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
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  max_enrollment: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  picture: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  start_date: {
    type: DataTypes.DATE
  },
  end_date: {
    type: DataTypes.DATE
  },
  phases: {
    type: DataTypes.STRING // Assuming phases is a string, e.g., JSON string or comma-separated
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
  modelName: 'Training', // This is the model name for Sequelize
  tableName: 'trainings', // This is the actual table name in your database
  timestamps: true, // Sequelize will manage createdAt and updatedAt automatically
  hooks: {
    beforeValidate: (training) => {
      if (training.title) {
        training.slug = slugify(training.title, { lower: true })
      }
    }
  }
});

// Define association here (after both models are defined)
Training.belongsTo(User, { foreignKey: 'user_id' }); // A Training belongs to a User

module.exports = Training