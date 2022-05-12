'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const auth = require('../../middlewares/authorization')
const validator = require('express-validation')
const { update } = require('../../validations/user.validation')

router.get('/detail/:userid', auth(), userController.detail)
router.post('/update', auth(), validator(update), userController.update)

module.exports = router
