/* eslint-disable camelcase */
const Partner = require('../models/Partner')

// Create a new sevice
module.exports.addPartner_post = async (req, res) => {
  const { name, body, key_offerings, id } = req.body
  const logo = req.file ? process.env.backend + req.file.path : ''
  try {
    const user_id = id
    const partner = await Partner.create({ name, body, key_offerings, logo, user_id })
    res.status(201).json(partner)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// get all sevices
module.exports.allPartner_get = async (req, res) => {
  try {
    const partners = await Partner.findAll()
    res.status(200).json({ partners })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a specific partner by ID
module.exports.partner_get = async (req, res) => {
  const { id } = req.params
  try {
    const partner = await Partner.findByPk(id)
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' })
    }
    res.status(200).json({ partner })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a specific partner
module.exports.updatePartner_post = async (req, res) => {
  const partnerId = req.params.id
  const updatedPartner = req.body

  try {
    const partner = await Partner.findByPk(partnerId)
    if (partner) {
      Object.assign(partner, updatedPartner)

      if (req.file) {
        partner.logo = process.env.backend + req.file.path
      }
      partner.updatedAt = new Date()
      await partner.save()
      res.status(200).json({ partner })
    } else {
      res.status(404).json({ error: 'Partner not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Delete a specific partner
module.exports.deletePartner_post = async (req, res) => {
  const partnerId = req.params.id

  try {
    const partner = await Partner.findByPk(partnerId)
    if (partner) {
      await partner.destroy()
      res.status(200).json({ message: 'Partner deleted successfully' })
    } else {
      res.status(404).json({ error: 'Partner not found' })
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
