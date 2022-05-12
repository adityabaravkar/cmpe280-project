'use strict'

const httpStatus = require('http-status')
const Conversation = require('../models/conversation.model')
const messageModel = require('../models/message.model')

exports.create = async (req, res, next) => {
  try {
    const {
      ownerId,
      travellerId,
      sender,
      text
    } = req.body
    const message = new messageModel.Message({
      sender,
      text
    })
    let chat = await Conversation.find({
      ownerId,
      travellerId
    }).exec()
    if (chat.length === 0) {
      const newConversation = new Conversation({
        ownerId,
        travellerId,
        message
      })
      chat = await newConversation.save()
    } else {
      chat = await Conversation.findOneAndUpdate({
        ownerId,
        travellerId
      }, {
        $push: {
          message: message
        }
      }, {new: true}).exec()
    }
    res.status(httpStatus.CREATED)
    res.send(chat)
  } catch (error) {
    return next(error)
  }
}

exports.fetch = async (req, res, next) => {
  try {
    const filter = {}
    const criteria = req.body
    if (criteria.id) {
      filter._id = criteria.id
    }
    if (criteria.ownerId) {
      filter.ownerId = criteria.ownerId
    }
    if (criteria.travellerId) {
      filter.travellerId = criteria.travellerId
    }
    const response = {}
    response.payLoad = await Conversation.find(filter).exec()
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
