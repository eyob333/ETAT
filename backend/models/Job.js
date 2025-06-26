// models/Job.js
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize') // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE
const slugify = require('slugify')
const User = require('./User') // <--- Import the User model for association

// REMOVE THESE LINES:
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

class Job extends Model {
  // You can add instance or static methods here if needed
}

Job.init({
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
  picture: {
    type: DataTypes.STRING
  },
  company: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  department: {
    type: DataTypes.STRING
  },
  employment_type: {
    type: DataTypes.STRING
  },
  workplace_type: {
    type: DataTypes.STRING
  },
  salary: {
    type: DataTypes.DECIMAL // Use DECIMAL for currency to avoid floating point issues
  },
  start_date: {
    type: DataTypes.DATE
  },
  end_date: {
    type: DataTypes.DATE
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
  modelName: 'Job', // This is the model name for Sequelize
  tableName: 'jobs', // This is the actual table name in your database
  timestamps: true, // Sequelize will manage createdAt and updatedAt automatically
  hooks: {
    beforeValidate: (job) => { // Changed 'training' to 'job' for consistency
      if (job.title) {
        job.slug = slugify(job.title, { lower: true })
      }
    }
  }
})

// Define association here (after both models are defined)
Job.belongsTo(User, { foreignKey: 'user_id' }); // A Job belongs to a User

module.exports = Job