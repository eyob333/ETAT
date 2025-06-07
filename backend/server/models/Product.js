const { Sequelize, DataTypes } = require('sequelize')
const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
const User = require('./User')

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
})

const Product = sequelize.define('Product', {
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
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Description is required'
      }
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Category is required'
      },
      isIn: {
        args: [['Laptop computers', 'Monitors & Displays', 'Networking Devices', 'Office Equipments', 'Software licenses', 'Others']],
        msg: 'Category must be one of: Laptop computers, Printing devices, Software licenses'
      }
    }
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: true
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
  tableName: 'products',
  timestamps: true
})

Product.belongsTo(User, { foreignKey: 'user_id' })

module.exports = Product
