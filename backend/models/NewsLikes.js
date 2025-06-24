const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Your centralized sequelize instance

const NewsLikes = sequelize.define('NewsLikes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  total_likes: { // This might be better as 'is_liked' boolean or similar if tracking per user
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  total_dislikes: { // This might be better as 'is_disliked' boolean or similar if tracking per user
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  // Foreign keys will be added by associations, but sometimes useful to define explicitly
  // news_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  // user_id: { // Assuming NewsLikes tracks who liked/disliked
  //   type: DataTypes.INTEGER,
  //   allowNull: true, // or false if a like must be tied to a user
  // }
  // Add any other attributes your NewsLikes model has
});

module.exports = NewsLikes; // Export the model directly