'use strict'

const express = require('express')
const router = express.Router()
const conversation = require('../../controllers/conversation.controller')
const auth = require('../../middlewares/authorization')
const validator = require('express-validation')
const { create, fetch } = require('../../validations/conversation.validation')

router.post('/create', auth(), validator(create), conversation.create)
router.post('/fetch', auth(), validator(fetch), conversation.fetch)

module.exports = router
