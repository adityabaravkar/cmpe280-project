'use strict'

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const propertySchema = new Schema({
  ownerId: {
    type: String,
    required: true,
    index: true
  },
  address: {
    type: String,
    maxlength: 50,
    required: true,
    index: true
  },
  headline: {
    type: String,
    maxlength: 50,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    maxlength: 50,
    required: true
  },
  bedroom: {
    type: Number,
    maxlength: 50,
    required: true
  },
  accomodate: {
    type: Number,
    maxlength: 50,
    required: true
  },
  bathroom: {
    type: Number,
    maxlength: 50,
    required: true
  },
  amenities: {
    type: String,
    maxlength: 50,
    required: true
  },
  area: {
    type: Number,
    maxlength: 50,
    required: true
  },
  startDate: {
    type: Number,
    maxlength: 50,
    required: true
  },
  endDate: {
    type: Number,
    maxlength: 50,
    required: true
  },
  currency: {
    type: String,
    maxlength: 50,
    required: true
  },
  minimumStayingNight: {
    type: Number,
    maxlength: 50,
    required: true
  },
  nightlyBaseRate: {
    type: Number,
    maxlength: 50,
    required: true
  },
  imageList: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

propertySchema.method({
  transform () {
    const transformed = {}
    const fields = ['ownerId', 'address', 'headline', 'description', 'type', 'bedroom', 'accomodate', 'bathroom', 'amenities', 'area', 'startDate', 'endDate', 'currency', 'minimumStayingSight', 'nightlyBaseRate', 'imageList']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  }
})

propertySchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Property', propertySchema)
