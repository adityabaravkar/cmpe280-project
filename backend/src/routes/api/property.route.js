"use strict";

const express = require("express");
const router = express.Router();
const propertyController = require("../../controllers/property.controller");
const auth = require("../../middlewares/authorization");
const validator = require("express-validation");
const { create, fetch } = require("../../validations/property.validation");

router.post("/create", auth(), validator(create), propertyController.create);
router.post("/fetch", validator(fetch), propertyController.fetch);

module.exports = router;
