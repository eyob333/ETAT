const { Sequelize, DataTypes } = require('sequelize')
const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
})

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Please enter an email'
      },
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Please enter a phone number'
      }
    }
  },
  address: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Please enter an address'
      }
    }
  },
  map_location: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Please enter a location link'
      }
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
  tableName: 'contacts'
})

module.exports = Contact
