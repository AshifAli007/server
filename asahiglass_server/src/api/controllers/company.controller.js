const httpStatus = require('http-status');
const { omit } = require('lodash');
const Company = require('../models/company.model');
const logger = require('./../../config/logger.js');
const csv = require('fast-csv');
var _ = require('lodash');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	Company.checkId(id).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return next(err);
	});
};


/**
 * Create new Company
 */
 
exports.create = async (req, res, next) => {
	logger.info("Add company requested data: " +JSON.stringify(req.body));
	Company.createCompany(req.body).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + JSON.stringify(err));
		return res.json(err);
	});
};

/**
 * Get Company List
 */

exports.CompanyList = async (req, res, next) => {
	Company.listCompany().then((data)=>{
		return res.json(data);
	}).catch((err) => {
		return  res.json(err);
	});
};

exports.getCompany = async (req, res, next) => {
	Company.getCompany(req.params.companyId).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		return  res.json(err);
	});
};