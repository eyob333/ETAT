/* eslint-disable camelcase */
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const ejs = require('ejs')
const fs = require('fs')
require('dotenv').config()

// Create a new profile
module.exports.addProfile_post = async (req, res) => {
  const { first_name, last_name, email, password, role, department } = req.body
  const picture = req.file ? process.env.backend + req.file.path : ''

  try {
    const user = await User.create({ first_name, last_name, email, password, picture, role, department })
    res.status(201).json({ user: user._id })
  } catch (err) {
    res.status(400).json({ err })
  }
}

// get all profile
module.exports.allprofile_get = async (req, res) => {
  try {
    const profiles = await User.findAll()
    res.status(200).json({ profiles })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a specific profile by ID
module.exports.profile_get = async (req, res) => {
  const { id } = req.params
  try {
    const profile = await User.findByPk(id)
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }
    res.status(200).json({ profile })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a specific profile
module.exports.updateProfile_post = async (req, res) => {
  const { id } = req.params

  const updatedProfile = req.body

  try {
    const profile = await User.findByPk(id)
    if (profile) {
      Object.assign(profile, updatedProfile)
      if (req.file) {
        profile.picture = process.env.backend + req.file.path
      }
      profile.updatedAt = new Date()
      await profile.save()
      res.status(200).json({ profile })
    } else {
      res.status(404).json({ error: 'Profile not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a specific profile
module.exports.updatePassword_post = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body

  try {
    const user = await User.findOne({
      where: { email }
    })

    const isMatch = await bcrypt.compare(currentPassword, user.password)

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid current password' })
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    user.password = hashedPassword
    await user.save()
    res.status(200).json({ message: 'Password changed successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports.forgotPassword_post = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ error: 'User does not exist' })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "mail.ethiotechaddis.com",
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.PASSWORD
      }
    })

    // Read the EJS template file
    const emailTemplate = fs.readFileSync('./views/resetEmailTemplate.ejs', 'utf8')

    // Render the template with data
    const renderedEmail = ejs.render(emailTemplate, { resetLink: `${process.env.Client_URL}/reset-password/${user.id}/${token}` })
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: 'Reset Your Password',
      // text: `${process.env.BASE_URL}/reset-password/${user.id}/${token}`,
      html: renderedEmail
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
      } else {
        return res.status(200).json({ message: 'Password reset successfully' })
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports.resetPassword_post = async (req, res) => {
  const { id, token } = req.params
  const { password } = req.body

  try {
    const user = await User.findByPk(id)
    if (!user) return res.status(400).json({ message: 'Invalid link' })

    jwt.verify(token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.json({ Status: 'Invalid link' })
        } else {
          try {
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)

            user.password = hashedPassword
            await user.save()

            return res.status(200).json({ message: 'Password Changed' })
          } catch (error) {
            return res.status(400).json({ message: 'error' })
          }
        }
      })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
// Delete a specific profile
module.exports.deleteProfile_post = async (req, res) => {
  const profileId = req.params.id

  try {
    const profile = await User.findByPk(profileId)
    if (profile) {
      await profile.destroy()
      res.status(200).json({ message: 'Profile deleted successfully' })
    } else {
      res.status(404).json({ error: 'Profile not found' })
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
