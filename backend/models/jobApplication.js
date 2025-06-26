// models/JobApplication.js
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize') // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE
const Job = require('./Job') // <--- Import the Job model for association

// REMOVE THESE LINES:
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

class JobApplication extends Model {
  // You can add instance or static methods here if needed
}

JobApplication.init({
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
  address: {
    type: DataTypes.STRING
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
  field_of_study: {
    type: DataTypes.STRING
  },
  gpa: {
    type: DataTypes.DECIMAL
  },
  name_of_previous_company: {
    type: DataTypes.STRING
  },
  total_years_of_experience: {
    type: DataTypes.INTEGER
  },
  available_start_date: {
    type: DataTypes.DATE
  },
  resume: {
    type: DataTypes.STRING
  },
  cover_letter: {
    type: DataTypes.STRING
  },
  expected_salary: {
    type: DataTypes.INTEGER
  },
  prospectus_confirmation: {
    type: DataTypes.BOOLEAN
  },
  job_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'jobs', // Use the actual table name if different from model name 'Job'
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize, // <--- IMPORTANT: Pass the centralized sequelize instance here
  modelName: 'JobApplication', // This is the model name for Sequelize
  tableName: 'jobApplications', // This is the actual table name in your database
  timestamps: true, // Keep timestamps true if you want `createdAt`
  updatedAt: false // <--- This explicitly turns off the `updatedAt` column management.
                    // If you only want `createdAt` and no `updatedAt`, this is correct.
})

// Define association here (after both models are defined)
JobApplication.belongsTo(Job, { foreignKey: 'job_id' }); // A JobApplication belongs to a Job

module.exports = JobApplication