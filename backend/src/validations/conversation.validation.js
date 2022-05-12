'use strict'

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// Conversation validation rules
module.exports = {
  create: {
    body: {
      ownerId: Joi.objectId().required(),
      travellerId: Joi.objectId().required(),
      sender: Joi.string().required(),
      text: Joi.string().required()
    }
  },
  fetch: {
    body: {
      id: Joi.objectId(),
      ownerId: Joi.objectId(),
      travellerId: Joi.objectId()
    }
  }
}
