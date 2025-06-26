// controllers/trainingController.js
/* eslint-disable camelcase */
const Training = require('../models/Training')
const Enrollment = require('../models/Enrollment') // Assuming you have an Enrollment model
const nodemailer = require('nodemailer')
const sequelize = require('../config/sequelize'); // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE FOR LITERALS

// REMOVE THESE LINES:
// const Sequelize = require('sequelize');
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

// Create a new training
module.exports.addTraining_post = async (req, res) => {
  const { title, body, location, max_enrollment, start_date, end_date, status, phases, id } = req.body
  const picture = req.file ? process.env.backend + req.file.path : ''
  try {
    const user_id = id
    const training = await Training.create({ title, body, picture, location, max_enrollment, start_date, end_date, phases, user_id })
    console.log("foo works very fine some siht:", training)
    res.status(201).json(training)
  } catch (error) {
    console.log("foo huge error", error)
    res.status(500).json({ error: error.message })
  }
}

module.exports.addTrainingEnrollment_post = async (req, res) => {
  const { name, phone, email, training_id } = req.body;
  const enrolledFor = 'training';

  try {
    const training = await Training.findByPk(training_id);

    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }

    const trainingTitle = training.title;
    const trainingMaxEnroll = training.max_enrollment;

    const count = await Enrollment.count({
      distinct: true,
      col: 'email',
      where: {
        enrolled_for: enrolledFor,
        enrolled_for_id: training_id
      }
    });

    if (count < trainingMaxEnroll) {
      const enrollment = await Enrollment.create({ name, enrolled_for: enrolledFor, phone, email, enrolled_for_id: training_id });

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
        subject: 'EthioTechAddis Training Registration',
        text: `Hi ${name},\nYou have successfully registered for ${trainingTitle}`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: 'Failed to send email.' });
        } else {
          return res.status(200).json({ message: 'Email sent!' });
        }
      });

      return res.status(201).json(enrollment);
    } else {
      return res.status(400).json({ error: 'Maximum enrollment limit reached.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get all trainings
module.exports.allTraining_get = async (req, res) => {
  try {
    const trainings = await Training.findAll({
      attributes: {
        include: [
          [
            sequelize.literal('(SELECT COUNT(*) FROM "enrollment" WHERE "enrollment"."enrolled_for_id" = "Training"."id" and "enrollment"."enrolled_for" = \'training\')'),
            'enrolled_count'
          ],
          [
            sequelize.literal(`CASE WHEN "end_date" > NOW() THEN true ELSE false END`),
            'status_training'
          ]
        ]
      }
    });
    console.log("foo sucessfull::::", trainings)
    res.status(200).json({ trainings })
  } catch (error) {
    console.log("foo error:", error)
    res.status(500).json({ error: error.message })
  }
}

// Get a specific training by ID
module.exports.training_get = async (req, res) => {
  const { slug } = req.params
  try {
    const training = await Training.findOne({
      where: { slug },
        attributes: {
    include: [
      [
        sequelize.literal('(SELECT COUNT(*) FROM "enrollment" WHERE "enrollment"."enrolled_for_id" = "Training"."id" and "enrollment"."enrolled_for" = \'training\')'),
        'enrolled_count'
      ],
      [
        sequelize.literal(`CASE WHEN "end_date" > NOW() THEN true ELSE false END`),
        'status_training'
      ]
    ]
  }
    })
    if (!training) {
      return res.status(404).json({ error: 'Training not found' })
    }
    res.status(200).json({ training })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports.enrolledTraining_get = async (req, res) => {
  try {
    const enrolled_for = 'training';
    const enrollment = await Enrollment.findAll({
      where: { enrolled_for }
    });
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    res.status(200).json({ enrollment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific training
module.exports.updateTraining_post = async (req, res) => {
  const trainingId = req.params.id
  const updatedTraining = req.body

  try {
    const training = await Training.findByPk(trainingId)
    if (training) {
      if (req.file) {
        training.picture = process.env.backend + req.file.path
      }
      Object.assign(training, updatedTraining)

      training.updatedAt = new Date()
      await training.save()

          const trainings = await Training.findByPk(trainingId, {
        attributes: {
    include: [
      [
        sequelize.literal('(SELECT COUNT(*) FROM "enrollment" WHERE "enrollment"."enrolled_for_id" = "Training"."id" and "enrollment"."enrolled_for" = \'training\')'),
        'enrolled_count'
      ],
      [
        sequelize.literal(`CASE WHEN "end_date" > NOW() THEN true ELSE false END`),
        'status_training'
      ]
    ]
  }
        });
      res.status(200).json({ trainings })
    } else {
      res.status(404).json({ error: 'Training not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Delete a specific training
module.exports.deleteTraining_post = async (req, res) => {
  const trainingId = req.params.id

  try {
    const training = await Training.findByPk(trainingId)
    if (training) {
      await training.destroy()
      res.status(200).json({ message: 'Training deleted successfully' })
    } else {
      res.status(404).json({ error: 'Training not found' })
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}