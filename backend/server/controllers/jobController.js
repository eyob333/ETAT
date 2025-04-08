/* eslint-disable camelcase */
const Job = require('../models/Job')
const JobApplication = require('../models/jobApplication')
const Sequelize = require('sequelize');
const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
})

// Create a new sevice
module.exports.addJob_post = async (req, res) => {
  const { title, body, company, location, department, employment_type, workplace_type, salary, start_date, end_date, id } = req.body

  const picture = req.file ? 'https://server.ethiotechaddis.com/' + req.file.path : ''
  const user_id = id
  try {
    const job = await Job.create({
      title,
      body,
      company,
      location,
      department,
      employment_type,
      workplace_type,
      salary,
      start_date,
      end_date,
      picture,
      user_id
    })
    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// get all sevices
module.exports.allJob_get = async (req, res) => {
  try {
const jobs = await Job.findAll({
  attributes: {
    include: [
      [
        sequelize.literal('(SELECT COUNT(*) FROM "jobApplications" WHERE "jobApplications"."job_id" = "Job"."id")'),
        'application_count'
      ],
      [
        sequelize.literal(`CASE WHEN "end_date" > NOW() THEN true ELSE false END`),
        'status'
      ]
    ]
  }
});
    res.status(200).json({ jobs })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a specific job by slug
module.exports.job_get = async (req, res) => {
  const { slug } = req.params
  try {
    const job = await Job.findOne({
      where: { slug },
      attributes: {
    include: [
      [
        sequelize.literal('(SELECT COUNT(*) FROM "jobApplications" WHERE "jobApplications"."job_id" = "Job"."id")'),
        'application_count'
      ],
      [
        sequelize.literal(`CASE WHEN "end_date" > NOW() THEN true ELSE false END`),
        'status'
      ]
    ]
  }
    })
    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }
    res.status(200).json({ job })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a specific job
module.exports.updateJob_post = async (req, res) => {
  const jobId = req.params.id
  const updatedJob = req.body
  try {
    const job = await Job.findByPk(jobId)
    if (job) {
      Object.assign(job, updatedJob)

      if (req.file) {
        job.picture = 'https://server.ethiotechaddis.com/' + req.file.path
      }
      job.updatedAt = new Date()
      await job.save()
      
      
      const jobs = await Job.findByPk(jobId, {
          attributes: {
            include: [
              [
                sequelize.literal('(SELECT COUNT(*) FROM "jobApplications" WHERE "jobApplications"."job_id" = "Job"."id")'),
                'application_count'
              ],
              [
                sequelize.literal(`CASE WHEN "end_date" > NOW() THEN true ELSE false END`),
                'status'
              ]
            ]
          }
        });
      res.status(200).json({ jobs })
    } else {
      res.status(404).json({ error: 'Job not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Delete a specific job
module.exports.deleteJob_post = async (req, res) => {
  const jobId = req.params.id

  try {
    const job = await Job.findByPk(jobId)
    if (job) {
      await job.destroy()
      res.status(200).json({ message: 'Job deleted successfully' })
    } else {
      res.status(404).json({ error: 'Job not found' })
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
