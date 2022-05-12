"use strict";

const httpStatus = require("http-status");
const Property = require("../models/property.model");

exports.create = async (req, res, next) => {
  try {
    const property = new Property(req.body);
    const savedProperty = await property.save();
    res.status(httpStatus.CREATED);
    res.send(savedProperty.transform());
  } catch (error) {
    return next(error);
  }
};

exports.fetch = async (req, res, next) => {
  try {
    const filter = {};
    const criteria = req.body;
    if (criteria.id) {
      filter._id = criteria.id;
    }
    if (criteria.ownerId) {
      filter.ownerId = criteria.ownerId;
    }
    if (criteria.address) {
      filter.address = {
        $regex: criteria.address,
        $options: "i",
      };
    }
    if (criteria.bedroom) {
      filter.bedroom = criteria.bedroom;
    }
    if (criteria.accomodate) {
      filter.accomodate = criteria.accomodate;
    }
    if (criteria.startDate) {
      filter.startDate = {
        $gte: criteria.startDate,
      };
    }
    if (criteria.endDate) {
      filter.endDate = {
        $lte: criteria.endDate,
      };
    }
    if (criteria.priceFrom) {
      if (!filter.nightlyBaseRate) filter.nightlyBaseRate = {};
      filter.nightlyBaseRate["$gte"] = criteria.priceFrom;
    }
    if (criteria.priceTo) {
      if (!filter.nightlyBaseRate) filter.nightlyBaseRate = {};
      filter.nightlyBaseRate["$lte"] = criteria.priceTo;
    }
    const pager = { page: criteria.page, limit: 10 };
    const propertyList = await Property.paginate(filter, pager);
    const response = {};
    response.payLoad = propertyList.docs;
    const { total, limit, page, pages } = propertyList;
    response.pager = { total, limit, page, pages };
    res.status(httpStatus.OK);
    res.send(response);
  } catch (error) {
    next(error);
  }
};
