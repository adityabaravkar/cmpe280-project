'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')
const APIError = require('../utils/APIError')
const Schema = mongoose.Schema

const roles = [
  'traveler', 'owner'
]

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 128
  },
  fname: {
    type: String,
    maxlength: 50
  },
  lname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: String,
    default: 'traveler',
    enum: roles
  },
  aboutMe: {
    type: String,
    default: '',
    maxlength: 50
  },
  city: {
    type: String,
    default: '',
    maxlength: 50
  },
  country: {
    type: String,
    default: '',
    maxlength: 50
  },
  company: {
    type: String,
    default: '',
    maxlength: 50
  },
  school: {
    type: String,
    default: '',
    maxlength: 50
  },
  hometown: {
    type: String,
    default: '',
    maxlength: 50
  },
  language: {
    type: String,
    default: '',
    maxlength: 50
  },
  phoneNumber: {
    type: String,
    default: '',
    maxlength: 50
  },
  gender: {
    type: String,
    default: '',
    maxlength: 50
  },
  profilePicture: {
    type: String,
    default: '',
    maxlength: 50
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function save (next) {
  try {
    if (!this.isModified('password')) {
      return next()
    }

    this.password = bcrypt.hashSync(this.password)

    return next()
  } catch (error) {
    return next(error)
  }
})

userSchema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'fname', 'lname', 'email', 'createdAt', 'role', 'aboutMe', 'city', 'country', 'company', 'school', 'hometown', 'language', 'phoneNumber', 'gender', 'profilePicture']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  },

  updateTransform () {
    const transformed = {}
    const fields = ['id', 'fname', 'lname', 'email', 'role', 'aboutMe', 'city', 'country', 'company', 'school', 'hometown', 'language', 'phoneNumber', 'gender', 'profilePicture']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  },

  passwordMatches (password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  roles,

  checkDuplicateEmailError (err) {
    if (err.code === 11000) {
      var error = new Error('Email already taken')
      error.errors = [{
        field: 'email',
        location: 'body',
        messages: ['Email already taken']
      }]
      error.status = httpStatus.CONFLICT
      return error
    }

    return err
  },

  async findAndGenerateToken (payload) {
    const {
      email,
      password
    } = payload
    if (!email) throw new APIError('Email must be provided for login')

    const user = await this.findOne({
      email
    }).exec()
    if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND)

    const passwordOK = await user.passwordMatches(password)

    if (!passwordOK) throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED)

    return user
  }
}

module.exports = mongoose.model('User', userSchema)
