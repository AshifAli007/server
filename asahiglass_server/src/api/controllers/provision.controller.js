
const httpStatus = require('http-status');
const { omit } = require('lodash');
const logger = require('../../config/logger');
const provision = require('../models/provision.model');

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
 * Post Provision
 */
exports.postProvision = async (req, res, next) => {
      console.log("Request in postProvision: " + JSON.stringify(req.body));
      provision.postProvision(req.body , req.headers.companyid).then((data)=>{
            return res.json(data);  
      }).catch((err) => {
            console.log("Error: " + err);
            return res.json(err);
      });
};

exports.getProvision = async(req, res, next) => {
      provision.getProvision(req.query, req.headers.companyid).then((data)=>{
            return res.json(data);  
      }).catch((err) => {
            console.log("Error: " + err);
            return res.json(err);
      });
};


