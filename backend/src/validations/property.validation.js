'use strict'

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// Property validation rules
module.exports = {
  create: {
    body: {
      ownerId: Joi.objectId().required(),
      address: Joi.string().required(),
      headline: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.string().required(),
      bedroom: Joi.number().required(),
      accomodate: Joi.number().required(),
      bathroom: Joi.number().required(),
      amenities: Joi.string().required(),
      area: Joi.number().required(),
      startDate: Joi.number().required(),
      endDate: Joi.number().required(),
      currency: Joi.string().required(),
      minimumStayingNight: Joi.number().required(),
      nightlyBaseRate: Joi.number().required(),
      imageList: Joi.string().required()
    }
  },
  fetch: {
    body: {
      id: Joi.objectId(),
      ownerId: Joi.objectId(),
      address: Joi.string(),
      bedroom: Joi.number(),
      accomodate: Joi.number(),
      startDate: Joi.number(),
      endDate: Joi.number(),
      priceFrom: Joi.number(),
      priceTo: Joi.number(),
      page: Joi.number().min(1).default(1)
    }
  }
}
