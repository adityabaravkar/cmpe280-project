'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const message = require('./message.model')

const conversationSchema = new Schema({
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
  message: {
    type: [message.messageSchema]
  }
}, {
  timestamps: true
})

conversationSchema.method({
  transform () {
    const transformed = {}
    const fields = ['travellerId', 'ownerId', 'message']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  }
})

module.exports = mongoose.model('Conversation', conversationSchema)
