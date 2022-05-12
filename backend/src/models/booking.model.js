'use strict'

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
  travellerId: {
    type: String,
    required: true,
    index: true
  },
  ownerId: {
    type: String,
    required: true,
    index: true
  },
  propertyId: {
    type: String,
    required: true,
    index: true
  },
  startDate: {
    type: Number,
    required: true,
    index: true
  },
  endDate: {
    type: Number,
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

bookingSchema.method({
  transform () {
    const transformed = {}
    const fields = ['travellerId', 'ownerId', 'propertyId', 'startDate', 'endDate', 'price']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  }
})

bookingSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Booking', bookingSchema)
