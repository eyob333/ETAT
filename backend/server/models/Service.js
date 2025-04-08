const { Sequelize, DataTypes } = require('sequelize')
const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
const User = require('./User')

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
})

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: 'Title must be unique',
      allowNull: false
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
  }
}, {
  tableName: 'services',
  timestamps: true
})
Service.belongsTo(User, { foreignKey: 'user_id' })

module.exports = Service
