var logger = require('./../../config/logger.js');
var Bus = require('../models/bus.model');
var uploadFile = require('../helpers/uploadFile.js');
var fs = require('fs');
var csv = require('fast-csv');

/**
 * Load user and append to req.
 * @public
 */

exports.load = async (req, res, next, id) => {
	logger.info("Bus id: " + id);
	Bus.checkId(id, req.headers.companyid).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return next(err);
	});
};

/**
 * Create new Bus
 */
exports.create = async (req, res, next) => {
	logger.debug("Add Bus requested data: " + req);
	Bus.addBus(req.body, req.headers.companyid).then((data)=>{
		logger.debug("Response Data: " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


exports.busList = async (req, res, next) => {
	Bus.busList(req.headers.companyid).then((data)=>{
		logger.info("Bus Data:  " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.log("Error: " + err);
		return res.json(err);
	});
};


exports.getBus = async (req,res, next) => {
	logger.debug("req: " + req);
	Bus.getBus(req.locals.data).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


exports.updateBus = async (req,res, next) => {
	logger.debug("Update Bus req: " + JSON.stringify(req.body));
	logger.debug("Req bus id: " + JSON.stringify(req.locals.data[0].id));
	let busId = req.locals.data[0].id;
	logger.debug("Bus Id: " + busId);
	Bus.updateBus(req.body, busId, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		return res.json(err);
	});
};


exports.uploadCsv = async (req, res, next) => {
	var type = "csv";
	if(!req.query.name) {
		req.query.name = "bus";
	}
	uploadFile.uploadFile(req, res, type).then((file)=> {
		var stream = fs.createReadStream(file);
		var busData = [];
		var csvStream = csv
		.parse()
		.on("data", function (data) {
			busData.push(data);
		})
		.on("end", function () {
			var csvHeader = busData.shift();
			if(csvHeader[0] !== "busNo") {
				fs.unlink(file);
				return res.json({
					"success":false,
					"message":"Invalid csv file", 
					"csvFormat":["busNo","venderName"]
				});
			}
			Bus.addBusData(busData, csvHeader, req.headers.companyid).then((data)=>{
				logger.debug("Bus Data successfully added");
				fs.unlink(file);
				return res.json(data);
			}).catch((err) => {
				logger.error("Error: " + err);
				return res.json(err);
			});
		});
		stream.pipe(csvStream);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

