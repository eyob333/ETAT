const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader) return res.status(401).json({ error: 'Access token not provided' })
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error(err)
      return res.status(403).json({ message: 'Access denied. Admin role required.' })
    }

    const decodedEmail = decoded.email
    User.findOne({ email: decodedEmail })
      .then(user => {
        if (!user) {
          return res.json({ message: 'User not found' })
        }
        next()
      })
  })
}
module.exports = verifyAdmin
