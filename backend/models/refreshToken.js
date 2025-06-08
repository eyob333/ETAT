const { Sequelize, DataTypes, Model } = require('sequelize')
const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
})

class RefreshToken extends Model {}

RefreshToken.init(
  {
    owner: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'RefreshToken'
  }
)

module.exports = RefreshToken
