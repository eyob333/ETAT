// controllers/serviceController.js
/* eslint-disable camelcase */
const Service = require('../models/Service') // Import the Service model
// REMOVE THIS: const Sequelize = require('sequelize'); // No longer needed here
// REMOVE THIS: const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db') // No longer needed
// REMOVE THIS: const sequelize = new Sequelize(...) // No longer needed
const SER_URL = process.env.SERVER_URL

// The controller methods no longer need to accept 'pool'
module.exports.addService_post = async (req, res) => {
  const { title, body, id } = req.body
  const picture = req.file ? SER_URL +'/' + req.file.path : ''
  try {
    const user_id = id
    const service = await Service.create({ title, body, picture, user_id }) // Service model now handles its own connection
    res.status(201).json(service)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports.allService_get = async (req, res) => {
  try {
    const services = await Service.findAll()
    res.status(200).json({ services })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

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

module.exports.updateService_post = async (req, res) => {
  const serviceId = req.params.id
  const updatedService = req.body

  try {
    const service = await Service.findByPk(serviceId)
    if (service) {
      if (req.file) {
        service.picture = SER_URL + '/' + req.file.path
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