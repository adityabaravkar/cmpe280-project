'use strict'

const express = require('express')
const router = express.Router()
const bookingController = require('../../controllers/booking.controller')
const auth = require('../../middlewares/authorization')
const validator = require('express-validation')
const { create, fetch } = require('../../validations/booking.validation')

router.post('/create', auth(), validator(create), bookingController.create)
router.post('/fetch', auth(), validator(fetch), bookingController.fetch)

module.exports = router
