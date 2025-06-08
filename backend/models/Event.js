const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
const { DataTypes, Sequelize } = require('sequelize')
const slugify = require('slugify')

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
})

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Title is required'
      }
    }
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Body is required'
      }
    }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  max_enrollment: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  picture: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  start_date: {
    type: DataTypes.DATE
  },
  end_date: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.BOOLEAN
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
},
{
  tableName: 'events',
  timestamps: true,
  hooks: {
    beforeValidate: (event) => {
      if (event.title) {
        event.slug = slugify(event.title, { lower: true })
      }
    }
  }
})

module.exports = Event
