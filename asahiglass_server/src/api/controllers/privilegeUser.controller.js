const httpStatus = require('http-status');
const { omit } = require('lodash');
const PrivilegeUser = require('../models/privilegeUser.model');
const jwt = require('jsonwebtoken');
const logger = require('./../../config/logger.js');
var _ = require('lodash');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	PrivilegeUser.checkId(id).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return next(err);
	});
};


/**
 * Create new Device
 */
exports.create = async (req, res, next) => {
	PrivilegeUser.privilegeUserCreate(req.body).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.login = async (req, res, next) => {

	PrivilegeUser.loginUser(req.body).then((data)=>{
		var email = req.body.email;
		logger.debug("Req email: " + email);
		const token = jwt.sign({email},'my_secret_key',{ expiresIn: 60*60*24 });
		logger.debug("Responce from model: " + JSON.stringify(data));
		data.token =  jwt.sign({email},'my_secret_key',{ expiresIn: 60*60*24*30 });
		logger.debug("Responce from model: " + JSON.stringify(data));
		return res.json({"success":true, "data":data});
		
	}).catch((err) => {
		logger.error("Errors: " + JSON.stringify(err));
		return res.json(err);
	});
};