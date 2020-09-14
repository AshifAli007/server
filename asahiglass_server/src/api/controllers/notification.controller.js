
const httpStatus = require('http-status');
const { omit } = require('lodash');
const logger = require('../../config/logger');
const notification = require('../models/notification.model');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
//   Device.checkId(id).then((data)=>{
//     req.locals = { data };
//     return next();
//   }).catch((err) => {
//     console.log("err: " + err);
//     return next(err);
//  });
};


/**
 * Notification List
 */
exports.getNotifications = async (req, res, next) => {
    logger.debug("Request in Notification1: " + JSON.stringify(req.query));
    notification.getNotifications(req.headers.companyid, req.query).then((data)=>{
    return res.json(data);
  }).catch((err) => {
    console.log("Error: " + err);
    return res.json(err);
 });
};


/**
 * Notification List on the basis of type
 */

exports.Notifications = async (req, res, next) => {
    logger.info("Request in Notification2: " + res);
    notification.notifications(req.params.type).then((data)=>{
    return res.json(data);
  }).catch((err) => {
    logger.error("Error: " + err);
    return res.json(err);
 });
};