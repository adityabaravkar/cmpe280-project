'use strict'

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// User validation rules
module.exports = {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      fname: Joi.string().max(128).required(),
      lname: Joi.string().max(128).required(),
      aboutMe: Joi.string().max(12800),
      city: Joi.string().max(128),
      country: Joi.string().max(128),
      company: Joi.string().max(128),
      school: Joi.string().max(128),
      hometown: Joi.string().max(128),
      language: Joi.string().max(128),
      phoneNumber: Joi.string().max(128),
      gender: Joi.string().max(128),
      profilePicture: Joi.string().max(12800)
    }
  },
  update: {
    body: {
      id: Joi.objectId().required(),
      email: Joi.string().email().required(),
      fname: Joi.string().max(128).required(),
      lname: Joi.string().max(128).required(),
      aboutMe: Joi.string().max(12800).allow('').optional(),
      city: Joi.string().max(128).allow('').optional(),
      country: Joi.string().max(128).allow('').optional(),
      company: Joi.string().max(128).allow('').optional(),
      school: Joi.string().max(128).allow('').optional(),
      hometown: Joi.string().max(128).allow('').optional(),
      language: Joi.string().max(128).allow('').optional(),
      phoneNumber: Joi.string().max(128).allow('').optional(),
      gender: Joi.string().max(128).allow('').optional(),
      profilePicture: Joi.string().max(12800).allow('').optional()
    }
  }
}
