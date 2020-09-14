
const httpStatus = require('http-status');
const { omit } = require('lodash');
const Rule = require('../models/rule.model');
var uploadFile = require('../helpers/uploadFile.js');
const logger = require('../../config/logger.js');



exports.load = async (req, res, next, id) => {
	logger.info("Rule id: " + id);
	Rule.checkId(id, req.headers.companyid).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return res.json(err);
	});
};

/**
 * Rule List
 * @public
 */
exports.ruleList = async (req, res, next) => {
	Rule.ruleList(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


/**
 * Save Rule List
 * @public
 */
exports.createRule = async (req, res, next) => {
	Rule.createRule(req.body, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.activeruleList = async(req, res, next) => {
	Rule.activeRuleList(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.assetRules = async(req, res, next) => {
	Rule.assetRules().then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.zoneRules = async(req, res, next) => {
	Rule.zoneRules().then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.removeRulemapping = async(req, res, next)=>{
	if(req.locals.data.length >0){
		var ruleId = req.locals.data[0].id;
		Rule.removeRulemapping(ruleId, req.headers.companyid).then((data)=>{
			return res.json(data);
		}).catch((err) => {
			logger.error("Error: " + err);
			return res.json(err);
		});
	}else{
		return res.json({"success":false, "message":"Rule id is invalid"});
	}
}