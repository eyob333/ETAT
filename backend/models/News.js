const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Your centralized sequelize instance

const News = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  author_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Add any other attributes your News model has
}, {
  // Add these options to explicitly set the table name
  freezeTableName: true, // Prevents Sequelize from pluralizing the table name
  tableName: 'news',     // Set the exact table name as it appears in your database
  timestamps: true,      // Assuming you want createdAt and updatedAt columns
  underscored: false      // Good practice if your column names are snake_case
});

module.exports = News; // Export the model directly