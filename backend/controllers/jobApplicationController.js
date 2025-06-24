/* eslint-disable camelcase */
const JobApplication = require('../models/jobApplication')
const Job = require('../models/Job')
const nodemailer = require('nodemailer')
// No need to import Sequelize here as it's not directly used for literals
// and no local Sequelize instance is created, which is GOOD.

// Create a new job application
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

  try {
    const job = await Job.findByPk(job_id)
    if (!job) {
      return res.status(404).json({ error: 'Referenced job not found' })
    }

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

    // Prepare and send email asynchronously
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
        subject: 'EthioTechAddis Job Application Confirmation', // More specific subject
        text: `Hi ${name},\nThank you for applying for the ${job.title} position. We are currently reviewing applications and will reach out to you if you are selected for further consideration. Your patience is greatly appreciated. Best regards.`
      };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error('Error sending job application confirmation email:', error); // Use console.error for errors
          // Do NOT send res.status() here, as a response has already been sent or will be sent
        } else {
          console.log('Job application confirmation email sent: ' + info.response);
        }
      });

    // This is the primary response for the API call
    res.status(201).json(jobApplication)
  } catch (error) {
    // This catches errors from Job.findByPk or JobApplication.create
    console.error('Error in addJobApplication_post:', error); // More specific logging
    res.status(500).json({ error: error.message })
  }
}

// get all job applications
module.exports.allJobApplication_get = async (req, res) => {
  try {
    const jobApplications = await JobApplication.findAll()
    res.status(200).json({ jobApplications })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get job applications for a specific job ID
module.exports.jobApplication_get = async (req, res) => {
  const { job_id } = req.params
  try {
    const jobApplications = await JobApplication.findAll({
      where: { job_id }
    })

    if (!jobApplications || jobApplications.length === 0) { // Check for empty array
      return res.status(404).json({ error: 'No job applications found for this job ID' })
    }
    res.status(200).json({ jobApplications })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}