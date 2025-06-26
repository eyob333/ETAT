// models/Product.js
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize') // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE
const User = require('./User') // <--- Import the User model for association

// REMOVE THESE LINES:
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

class Product extends Model {
  // You can add instance or static methods here if needed
}

Product.init({
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
        // Corrected message to match args
        msg: 'Category must be one of: Laptop computers, Monitors & Displays, Networking Devices, Office Equipments, Software licenses, Others'
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
  },
  user_id: { // <--- Added missing user_id column
    type: DataTypes.INTEGER,
    allowNull: true, // Assuming a product can exist without a user initially, adjust as needed
    references: {
      model: 'users', // Use the actual table name for User model
      key: 'id'
    }
  }
}, {
  sequelize, // <--- IMPORTANT: Pass the centralized sequelize instance here
  modelName: 'Product', // This is the model name for Sequelize
  tableName: 'products', // This is the actual table name in your database
  timestamps: true // Sequelize will manage createdAt and updatedAt automatically
})

// Define association here (after both models are defined)
// No need for a separate line for belongsTo if defined within init (as above via references).
// However, if you explicitly want to define it here:
Product.belongsTo(User, { foreignKey: 'user_id' }) // A Product belongs to a User

module.exports = Product