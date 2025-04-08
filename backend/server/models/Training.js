const { DataTypes, Sequelize } = require('sequelize')
const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
const slugify = require('slugify')

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
})

const Training = sequelize.define('Training', {
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
      model: 'Users',
      key: 'id'
    }
  }
}, {
  tableName: 'trainings',
  timestamps: true,
  hooks: {
    beforeValidate: (training) => {
      if (training.title) {
        training.slug = slugify(training.title, { lower: true })
      }
    }
  }
})

module.exports = Training
