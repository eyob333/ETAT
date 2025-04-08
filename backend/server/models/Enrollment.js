const { DataTypes, Sequelize } = require('sequelize');
const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db');

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
});

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required'
      }
    }
  },
  enrolled_for: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Email is required'
      },
      isEmail: true
    }
  },
  enrolled_for_id: {
    type: DataTypes.INTEGER,
    references: {
      model: function () {
        if (this.enrolled_for === 'event') {
          return 'events';
        } else if (this.enrolled_for === 'training') {
          return 'trainings';
        }
      },
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'enrollment',
  timestamps: true
});

module.exports = Enrollment;