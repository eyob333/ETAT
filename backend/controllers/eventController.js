/* eslint-disable camelcase */
const Event = require('../models/Event')
const Enrollment = require('../models/Enrollment')
const nodemailer = require('nodemailer')
const sequelize = require('../config/sequelize'); // <--- IMPORT THE CENTRALIZED SEQUELIZE INSTANCE FOR LITERALS
const User = require('../models/User') // Ensure User model is also imported

// REMOVE THESE LINES:
// const Sequelize = require('sequelize');
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

// Create a new event
module.exports.addEvent_post = async (req, res) => {
  const { title, body, location, max_enrollment, start_date, end_date, status, id } = req.body
  const picture = req.file ? process.env.backend + req.file.path : ''
  const user_id = id
  try {
    const event = await Event.create({ title, body, picture, location, max_enrollment, start_date, end_date, status, user_id })
    console.log("foo event sucess:::::", event)
    res.status(201).json(event)
  } catch (error) {
    console.log("foo EEvent huge error::::", error)
    res.status(500).json({ error: error.message })
  }
}

module.exports.addEventEnrollment_post = async (req, res) => {
  const { name, phone, email, event_id } = req.body;
  const enrolledFor = 'event';

  try {
    const trimmedEmail = email.trim(); // Trim email string

    // console.log("Email string char codes:", [...trimmedEmail].map(char => char.charCodeAt(0))); // Keep for debugging
    // console.log(`Attempting to save email: '${trimmedEmail}'`); // Keep for debugging

    const event = await Event.findByPk(event_id);

    if (!event) {
      console.log("enroll event", event)
      return res.status(404).json({ error: 'Event not found' });
    }

    const eventTitle = event.title;
    const eventMaxEnroll = event.max_enrollment;

    const count = await Enrollment.count({
      distinct: true,
      col: 'email',
      where: {
        enrolled_for: enrolledFor,
        enrolled_for_id: event_id,
        email: trimmedEmail // Ensure email uniqueness is checked against trimmed email
      }
    });

    if (count < eventMaxEnroll) {
      const enrollment = await Enrollment.create({ name, enrolled_for: enrolledFor, phone, email: trimmedEmail, enrolled_for_id: event_id });

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
        to: trimmedEmail,
        subject: 'EthioTechAddis Event Registration',
        text: `Hi ${name},\nYou have successfully registered for ${eventTitle}`
      };

      // Send email asynchronously, but do not block the main response
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('Error sending email:', error);
          // Log the error, but still send success response for enrollment
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.status(201).json(enrollment); // <--- Corrected to send enrollment object
    } else {
      return res.status(400).json({ error: 'Maximum enrollment limit reached.' });
    }
  } catch (error) {
    console.log("foo::: enroll event", error)
    return res.status(500).json({ error: error.message });
  }
};
// get all sevices
module.exports.allEvent_get = async (req, res) => {
  try {
    const events = await Event.findAll({
      attributes: {
        include: [
          [
            sequelize.literal('(SELECT COUNT(*) FROM "enrollment" WHERE "enrollment"."enrolled_for_id" = "Event"."id" and "enrollment"."enrolled_for" = \'event\')'),
            'enrolled_count'
          ],
          [
            sequelize.literal(`CASE WHEN "end_date" > NOW() THEN true ELSE false END`),
            'status_event'
          ]
        ]
      }
    });
    res.status(200).json({ events })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a specific event by slug
module.exports.event_get = async (req, res) => {
  const { slug } = req.params
  try {
    const event = await Event.findOne({
      where: { slug },
        attributes: {
    include: [
      [
        sequelize.literal('(SELECT COUNT(*) FROM "enrollment" WHERE "enrollment"."enrolled_for_id" = "Event"."id" and "enrollment"."enrolled_for" = \'event\')'),
        'enrolled_count'
      ],
      [
        sequelize.literal(`CASE WHEN "end_date" > NOW() THEN true ELSE false END`),
        'status_event'
      ]
    ]
  }
    })
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }
    res.status(200).json({ event })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports.enrolledEvent_get = async (req, res) => {
  try {
    const enrolled_for = 'event'
    const enrollment = await Enrollment.findAll({
      where: { enrolled_for }
    })
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' })
    }
    res.status(200).json({ enrollment })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a specific event
module.exports.updateEvent_post = async (req, res) => {
  const eventId = req.params.id
  const updatedEvent = req.body

  try {
    const event = await Event.findByPk(eventId)
    if (event) {
      if (req.file) {
        event.picture = process.env.backend + req.file.path
      }
      Object.assign(event, updatedEvent)
      event.updatedAt = new Date()
      await event.save()

    const events = await Event.findByPk(eventId, {
        attributes: {
    include: [
      [
        sequelize.literal('(SELECT COUNT(*) FROM "enrollment" WHERE "enrollment"."enrolled_for_id" = "Event"."id" and "enrollment"."enrolled_for" = \'event\')'),
        'enrolled_count'
      ],
      [
        sequelize.literal(`CASE WHEN "end_date" > NOW() THEN true ELSE false END`),
        'status_event'
      ]
    ]
  }
        });
      res.status(200).json({ events })
    } else {
      res.status(404).json({ error: 'Event not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Delete a specific event
module.exports.deleteEvent_post = async (req, res) => {
  const eventId = req.params.id

  try {
    const event = await Event.findByPk(eventId)
    if (event) {
      await event.destroy()
      res.status(200).json({ message: 'Event deleted successfully' })
    } else {
      res.status(404).json({ error: 'Event not found' })
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}