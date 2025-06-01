/* eslint-disable camelcase */
const JobApplication = require('../models/jobApplication')
const Job = require('../models/Job')
const nodemailer = require('nodemailer')

// Create a new sevice
module.exports.addJobApplication_post = async (req, res) => {
  const {
    name,
    address,
    phone,
    email,
    field_of_study,
    gpa,
    name_of_previous_company,
    total_years_of_experience,
    available_start_date,
    cover_letter,
    expected_salary,
    prospectus_confirmation
  } = req.body
  const { job_id } = req.params
  const resume = req.file ? process.env.backend + req.file.path : ''

  const job = await Job.findByPk(job_id)
  if (!job) {
    return res.status(404).json({ error: 'Referenced job not found' })
  }

  try {
    const jobApplication = await JobApplication.create({
      name,
      address,
      phone,
      email,
      field_of_study,
      gpa,
      name_of_previous_company,
      total_years_of_experience,
      available_start_date,
      resume,
      cover_letter,
      expected_salary,
      prospectus_confirmation,
      job_id
    })
    
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "mail.ethiotechaddis.com",
        secure: true,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.PASSWORD
        }
      });

    const mailOptions = {
        from: 'no-reply@ethiotechaddis.com',
        to: email,
        subject: 'EthioTechAddis Job Application',
        text: `Hi ${name},\nThank you for applying. We are currently reviewing applications and will reach out to you if you are selected for further consideration. Your patience is greatly appreciated. Best regards.`
      };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(500).json({ message: 'Failed to send email.' });
        } else {
          return res.status(200).json({ message: 'Email sent!' });
        }
      });
      
    res.status(201).json(jobApplication)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// get all sevices
module.exports.allJobApplication_get = async (req, res) => {
  try {
    const jobApplications = await JobApplication.findAll()
    res.status(200).json({ jobApplications })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a specific jobApplication by ID
module.exports.jobApplication_get = async (req, res) => {
  const { job_id } = req.params
  try {
    const jobApplication = await JobApplication.findAll({
      where: { job_id }
    })

    if (!jobApplication) {
      return res.status(404).json({ error: 'Job application not found' })
    }
    res.status(200).json({ jobApplication })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
