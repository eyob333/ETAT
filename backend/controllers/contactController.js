/* eslint-disable camelcase */
const Contact = require('../models/Contact')
const nodemailer = require('nodemailer')

// Create a new sevice
module.exports.addContact_post = async (req, res) => {
  const { email, phone, address, map_location } = req.body

  try {
    const existingContact = await Contact.findOne()

    if (existingContact) {
      return res.status(409).json({ error: 'Contact already exists' })
    }

    const contact = await Contact.create({ email, phone, address, map_location })
    res.status(201).json({ contact })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a  contact
module.exports.contact_get = async (req, res) => {
  try {
    const contact = await Contact.findOne()
    if (!contact) {
      return res.status(404).json({ error: 'No contact found' })
    }
    res.status(200).json({ contact })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update contact
module.exports.updateContact_post = async (req, res) => {
  const updatedContact = req.body
  try {
    const contact = await Contact.findOne()
    if (!contact) {
      return res.status(404).json({ error: 'No contact found' })
    }
    Object.assign(contact, updatedContact)
    await contact.save()

    res.status(200).json({ contact })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update contact
module.exports.contactUs_post = async (req, res) => {
  const { name, email, phone, subject, message } = req.body
  console.log(req.body)
  try {
    console.log(process.env.EMAIL_ADDRESS)
    console.log(process.env.PASSWORD)

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.PASSWORD
      }
    })


    const mailOptions = {
      from: email,
      to: process.env.EMAIL_ADDRESS,
      subject,
      text: `${message}\n` + `Name: ${name}\n` + `Phone Number: ${phone}\n` + `Email: ${email}`
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        return res.status(500).json({ message: 'Failed to send email.' })
      } else {
        return res.status(200).json({ message: 'Email sent!' })
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
