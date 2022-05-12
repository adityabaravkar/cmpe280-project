'use strict'

const express = require('express')
const router = express.Router()
const authRouter = require('./auth.route')
const userRouter = require('./user.route')
const propertyRouter = require('./property.route')
const bookingRouter = require('./booking.route')
const documentRouter = require('./document.route')
const conversationRouter = require('./conversation.route')

// API status for testing
router.get('/status', (req, res) => { res.send({status: 'OK'}) })

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/property', propertyRouter)
router.use('/booking', bookingRouter)
router.use('/document', documentRouter)
router.use('/conversation', conversationRouter)

module.exports = router
