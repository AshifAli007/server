const httpStatus = require('http-status');
const { omit } = require('lodash');
//const Emp = require('../models/emp.model');
const testBeacon = require('../services/testBeaconService');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	console.log("Zone id: " + id);
	Emp.checkId(id).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		console.log("err: " + err);
		return next(err);
	});
};


/**
 * Start Test Beacon
 * @public
 */
exports.startTest = async (req, res, next) => {
	console.log("Start Test: " + JSON.stringify(req.body));
	testBeacon.startTest(req.body, req.headers.companyid).then((data)=>{
		console.log("Retun data from promise: " + data);
		return res.json(data);
	},(err)=>{//console.log('error:',err)})/*.catch((err) =>{
		return res.json(err);
	});

};


/**
 * Stop Test Beacon
 * @public
 */
exports.stopTest = async (req, res, next) => {
	console.log("Stop Test: " + JSON.stringify(req.body));
	testBeacon.stopTest(req.body, req.headers.companyid).then((data)=>{
		console.log("Retun data from promise: " + data);
		return res.json(data);
	}).catch((err) =>{
		return res.json(err);
	});
};


/**
 * Genrate CSV
 * @public
 */
exports.genrateCsv = async (req, res, next) => {
	console.log("Stop Test: " + JSON.stringify(req.body));
	testBeacon.generateCsv(req.body, req.headers.companyid).then((data)=>{
		console.log("Return data from promise: " + data);
		return res.json(data);
	}).catch((err) =>{
		return res.json(err);
	});
};

