'use strict'

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// Booking validation rules
module.exports = {
  create: {
    body: {
      ownerId: Joi.objectId().required(),
      travellerId: Joi.objectId().required(),
      propertyId: Joi.objectId().required(),
      startDate: Joi.number().required(),
      endDate: Joi.number().required(),
      price: Joi.number().required()
    }
  },
  fetch: {
    body: {
      id: Joi.objectId(),
      ownerId: Joi.objectId(),
      travellerId: Joi.objectId(),
      propertyId: Joi.objectId(),
      startDate: Joi.number(),
      endDate: Joi.number(),
      price: Joi.number(),
      page: Joi.number().min(1).default(1)
    }
  }
}
