/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
  const errors = { first_name: '', email: '', password: '' }

  // dupliacte email
  if (err.name === 'SequelizeUniqueConstraintError') {
    errors.email = 'That email is already registered'
  }

  // Missing or invalid email
  if (err.message.includes('Please enter an email')) {
    errors.email = 'Please enter an email'
  } else if (err.message.includes('Validation isEmail on email failed')) {
    errors.email = 'That is not a valid email'
  }

  // Invalid password
  if (err.message.includes('Password must be above 6 characters')) {
    errors.password = 'Password must be at least 6 characters long'
  }

  // incorrect password
  if (err == 'Error: Incorrect password') {
    errors.password = 'That password is incorrect'
  }

  if (err == 'Error: Incorrect email') {
    errors.email = 'That email is not registered'
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    //  (err);
    Object.values(err.errors).forEach(({ properties }) => {
      //  (val);
      //  (properties);
      errors[properties.path] = properties.message
    })
  }

  return errors
}

// create json web token
const maxAge = 24 * 60 * 60

module.exports.signup_post = async (req, res) => {
  const { first_name, last_name, email, password, role, picture, department } = req.body

  try {
    const user = await User.create({ first_name, last_name, email, password, role, picture, department })
    res.status(201).json({ user: user._id })
     ("User created successfully")
     (user)
  } catch (err) {
     (err)
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const [refreshToken, accessToken] = await User.login(email, password)
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: maxAge * 1000 })
    res.status(200).json({ accessToken: `${accessToken}` })
  } catch (err) {
     ('loginerror')
    const errors = handleErrors(err)
    res.status(401).json({ errors })
  }
}

module.exports.handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt

  try {
    // Verify refreshToken and generate new accessToken
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        const decodedEmail = decoded.email
        User.findOne({ email: decodedEmail })
          .then(user => {
            if (!user) {
              return res.sendStatus(403)
            }
            const accessToken = jwt.sign(
              { decodedEmail },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '1m' }
            )

            // const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
            const newRefreshToken = jwt.sign(
              { decodedEmail },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: '1d' }
            )

            res.cookie('refresh_token', newRefreshToken, { httpOnly: true })
            res.json({ accessToken: `${accessToken}` })
          })

        if (err) return res.sendStatus(403)
      }
    )
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
// Find user by refreshToken...
//     const foundUser = await User.findOne({ where: { refreshToken } })

//     if (foundUser) {
//       res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
//       // Clear refreshToken in database;;
//       await foundUser.update({ refreshToken: '' })
//       return res.sendStatus(200).json({ message: 'cookie cleared' })
//     }

//     res.sendStatus(204)
//   } catch (error) {
//     console.error(error)
//     res.sendStatus(500)
//   }
// }

module.exports.logout_get = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) // No content
  const refreshToken = cookies.jwt

  try {
    // Find user by refreshToken...
    const foundUser = await User.findOne({ where: { refreshToken } })

    if (foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
      // Clear refreshToken in database;;
      await foundUser.update({ refreshToken: '' })
      return res.sendStatus(200).json({ message: 'cookie cleared' })
    }

    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
