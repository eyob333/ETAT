/* eslint-disable camelcase */
const Service = require('../models/Service')

// Create a new sevice
module.exports.addService_post = async (req, res) => {
  const { title, body, id } = req.body
  const picture = req.file ? 'https://server.ethiotechaddis.com/' + req.file.path : ''
  try {
    const user_id = id
    const service = await Service.create({ title, body, picture, user_id })
    res.status(201).json(service)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// get all sevices
module.exports.allService_get = async (req, res) => {
  try {
    const services = await Service.findAll()
    res.status(200).json({ services })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a specific service by ID
module.exports.service_get = async (req, res) => {
  const { id } = req.params
  try {
    const service = await Service.findByPk(id)
    if (!service) {
      return res.status(404).json({ error: 'Service not found' })
    }
    res.status(200).json({ service })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a specific service
module.exports.updateService_post = async (req, res) => {
  const serviceId = req.params.id
  const updatedService = req.body

  try {
    const service = await Service.findByPk(serviceId)
    if (service) {
      if (req.file) {
        service.picture = 'https://server.ethiotechaddis.com/' + req.file.path
      }
      Object.assign(service, updatedService)

      service.updatedAt = new Date()
      await service.save()
      res.status(200).json({ service })
    } else {
      res.status(404).json({ error: 'Service not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Delete a specific service
module.exports.deleteService_post = async (req, res) => {
  const serviceId = req.params.id

  try {
    const service = await Service.findByPk(serviceId)
    if (service) {
      await service.destroy()
      res.status(200).json({ message: 'Service deleted successfully' })
    } else {
      res.status(404).json({ error: 'Service not found' })
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
