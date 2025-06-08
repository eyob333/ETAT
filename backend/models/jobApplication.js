const { DataTypes, Sequelize } = require('sequelize')
const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
})

const JobApplication = sequelize.define('JobApplication', {
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
      model: 'jobs',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'jobApplications',
  timestamps: true,
  updatedAt: false
})

module.exports = JobApplication
