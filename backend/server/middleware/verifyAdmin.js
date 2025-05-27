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
    console.log("foo decode::::", decoded)
    const decodedEmail = decoded.decodedEmail
    console.log("foo email",decodedEmail)
    User.findOne({ where: { email: decodedEmail } })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }
        if (user.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied. Admin role required.' })
        }
        next()
      })
      .catch(error => {
        console.error('Error finding user:', error)
        return res.status(500).json({ message: 'Server error' })
      })
  })
}
module.exports = verifyAdmin
