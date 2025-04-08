const { Sequelize, DataTypes } = require('sequelize')
const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
})

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: [true, 'Please enter an name']
  },
  last_name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Please enter an email'
      },
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 255],
        msg: 'Password must be above 6 characters'
      }
    }
  },
  role: {
    type: DataTypes.STRING
  },
  picture: {
    type: DataTypes.STRING
  },
  department: {
    type: DataTypes.STRING
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
  tableName: 'users'
})

// Before saving the user to the database
User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt()
  user.password = await bcrypt.hash(user.password, salt)
})

// Static method to login user
User.login = async function (email, password) {
  const user = await this.findOne({ where: { email } })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
      const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
      const accessToken = jwt.sign(
        { email },
        accessTokenSecret,
        { expiresIn: '1m' }
      )

      const refreshToken = jwt.sign(
        { email },
        refreshTokenSecret,
        { expiresIn: '1d' }
      )

      return [refreshToken, accessToken, user]
    }
    throw new Error('Incorrect password')
  }
  throw new Error('Incorrect email')
}

module.exports = User
