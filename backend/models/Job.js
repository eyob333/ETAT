const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
const { DataTypes, Sequelize } = require('sequelize')
const slugify = require('slugify')

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
})

const Job = sequelize.define('Job', {
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
    type: DataTypes.DECIMAL
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
      model: 'Users',
      key: 'id'
    }
  }
}, {
  tableName: 'jobs',
  timestamps: true,
  hooks: {
    beforeValidate: (training) => {
      if (training.title) {
        training.slug = slugify(training.title, { lower: true })
      }
    }
  }
})

module.exports = Job
