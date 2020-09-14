const logger = require('./../../config/logger.js');
const foodCart = require('../models/foodCart.model');
var uploadFile = require('../helpers/uploadFile.js');
var fs = require('fs');
var csv = require('fast-csv');

/**
 * Load user and append to req.
 * @public
 */

exports.load = async (req, res, next, id) => {
	logger.info("Food Cart id: " + id);
	foodCart.checkId(id, req.headers.companyid).then((data)=>{
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
	logger.debug("Add Food Cart requested data: " + req);
	foodCart.addFoodCart(req.body, req.headers.companyid).then((data)=>{
		logger.debug("Response Data: " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


exports.foodCartList = async (req, res, next) => {
	foodCart.foodCartList(req.headers.companyid).then((data)=>{
		logger.info("Food Cart Data:  " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.log("Error: " + err);
		return res.json(err);
	});
};


exports.getfoodCart = async (req,res, next) => {
	logger.debug("req: " + req);
	foodCart.getfoodCart(req.locals.data).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.updateFoodCart = async (req,res, next) => {
	logger.debug("Update Food Cart req: " + JSON.stringify(req.body));
	logger.debug("Req foodCart id: " + JSON.stringify(req.locals.data[0].id));
	let foodCartId = req.locals.data[0].id;
	logger.debug("Bus Id: " + foodCartId);
	foodCart.updateFoodCart(req.body, foodCartId, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		return res.json(err);
	});
};

exports.uploadCsv = async (req, res, next) => {
	var type = "csv";
	if(!req.query.name) {
		req.query.name = "foodCart";
	}
	uploadFile.uploadFile(req, res, type).then((file)=> {
		var stream = fs.createReadStream(file);
		var foodCartData = [];
		var csvStream = csv
		.parse()
		.on("data", function (data) {
			foodCartData.push(data);
		})
		.on("end", function () {
			var csvHeader = foodCartData.shift();
			if(csvHeader[0] !== "foodCartNo") {
				fs.unlink(file);
				return res.json({
					"success":false,
					"message":"Invalid csv file", 
					"csvFormat":["foodCartNo"]
				});
			}
			foodCart.addFoodCartData(foodCartData, csvHeader, req.headers.companyid).then((data)=>{
				logger.debug("Food Cart Data successfully added");
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

