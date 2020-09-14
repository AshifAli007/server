const httpStatus = require('http-status');
const { omit } = require('lodash');
const ControlRoom = require('../models/controlroom.model');
const logger = require('../../config/logger.js');
var fs = require('fs');






/**
 * Get Control Room Data List
 * @public
 */
exports.getControlRoom = async (req, res, next) => {
	logger.debug("Inside get control room ")
	ControlRoom.ControlRoom(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};



