// models/RefreshToken.js
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize') // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE
const User = require('./User') // <--- Import the User model for association

// REMOVE THESE LINES:
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

class RefreshToken extends Model {}

RefreshToken.init(
  {
    id: { // Added primary key for consistency
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: { // <--- Added field to store the refresh token string
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Refresh tokens should typically be unique
    },
    expires: { // <--- Added field for token expiration date
      type: DataTypes.DATE,
      allowNull: false
    },
    owner: { // This refers to the user_id foreign key
      type: DataTypes.INTEGER,
      allowNull: false, // Assuming a refresh token always belongs to a user
      references: {
        model: 'users', // <--- Corrected to 'users' (lowercase, plural) assuming your User table is named 'users'
        key: 'id'
      }
    }
  },
  {
    sequelize, // <--- IMPORTANT: Pass the centralized sequelize instance here
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens', // Recommended: explicit table name, often plural
    timestamps: true // <--- Added timestamps for createdAt and updatedAt
  }
)

// Define association here (after both models are defined)
RefreshToken.belongsTo(User, { foreignKey: 'owner' }); // A RefreshToken belongs to a User

module.exports = RefreshToken