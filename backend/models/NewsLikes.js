const { DataTypes, Sequelize } = require('sequelize')
const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
})

const NewsLikes = sequelize.define('NewsLikes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  total_likes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
    total_likes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
    total_dislikes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  news_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'News',
      key: 'id'
    }
  }
}, {
  tableName: 'newsLikes',
  timestamps: true
})

module.exports = NewsLikes
