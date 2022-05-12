'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  sender: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

messageSchema.method({
  transform () {
    const transformed = {}
    const fields = ['sender', 'text']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  }
})

module.exports = {
  'Message': mongoose.model('Message', messageSchema),
  'messageSchema': messageSchema
}
