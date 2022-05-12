"use strict";

const httpStatus = require("http-status");
const APIError = require("../utils/APIError");
const path = require("path");
const fs = require("fs");

exports.download = async (req, res, next) => {
  try {
    if (!req.params.file) {
      throw new APIError("Filename must be provided in parameters");
    }
    const response = { payLoad: [] };
    const fileList = req.params.file.split(",");
    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      var fileLocation = path.join(path.join(__dirname, "/../uploads"), file);
      var img = fs.readFileSync(fileLocation);
      var base64img = Buffer.from(img).toString("base64");
      response.payLoad.push(base64img);
    }
    res.status(httpStatus.OK);
    res.send(response);
  } catch (error) {
    return next(error);
  }
};

exports.upload = async (req, res, next) => {
  try {
    if (!req.files) {
      throw new APIError("File is not recived");
    }
    const response = { payLoad: [] };
    for (let index = 0; index < req.files.length; index++) {
      const element = req.files[index];
      response.payLoad.push(element.key);
    }
    res.status(httpStatus.CREATED);
    res.send(response);
  } catch (error) {
    next(error);
  }
};
