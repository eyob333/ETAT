require('dotenv').config()

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PORT: 5432,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DATABASE,
  DIALECT: 'postgres'
}
