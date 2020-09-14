const httpStatus = require('http-status');
const { omit } = require('lodash');
const Emp = require('../models/emp.model');
var fs = require('fs');
const logger = require('./../../config/logger.js');
const csv = require('fast-csv');
var uploadFile = require('../helpers/uploadFile.js');
var _ = require('lodash');
const AssetType = require('../models/assetType.model');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	logger.debug("Emp id: " + id);
	Emp.checkId(id, req.headers.companyid).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return res.json(err);
	});
};


/**
 * Create new emp
 * @public
 */
exports.createEmp = async (req, res, next) => {
	Emp.createEmp(req.headers.userid, req.body, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

/**
 * Emp List
 * @public
 */
exports.empList = async (req, res, next) => {
	Emp.empList(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

/**
 * Get Emp 
 * @public
 */
exports.getEmp = async (req,res, next) => {
	logger.debug("req: " + req);
	Emp.getEmp(req.locals.data, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


exports.uploadCsv = async (req, res, next) => {
	var type = "csv";
	if(!req.query.name) {
		req.query.name = "employee";
	}
	uploadFile.uploadFile(req, res, type).then((file)=> {
		AssetType.checkId(req.query.assetTypeId, req.headers.companyid).then((result)=>{
			var stream = fs.createReadStream(file);
			var employeeData = [];
			var csvStream = csv
			.parse()
			.on("data", function (data) {
				employeeData.push(data);
			})
			.on("end", function () {
				var csvHeader = employeeData.shift();
				var array1 = result[0] && result[0].attribute_key && JSON.parse(result[0].attribute_key);
				var array2 = ["name","uniqueId","type","subType"];
				var csvFormat = Array.from(new Set(array2.concat(array1)));
				if(csvHeader[0] !== "name" || csvHeader[1] !== "uniqueId" || csvHeader[2] !== "type" || csvHeader[3] !== "subType") {
				  fs.unlink(file);
				  return res.json({
					"success":false,
					"message":"Invalid CSV headers format",
					"csvHeadersFormat":csvFormat
				  });
				}
				Emp.addEmployeeData(employeeData, req.headers.userid, req.headers.companyid, csvFormat).then((data)=>{
					logger.info("Employee Data successfully added by uploading CSV");
					fs.unlink(file);
					return res.json(data);
				}).catch((err) => {
					fs.unlink(file);
					logger.error("Error: " + err);
					return res.json(err);
				});
			});
			stream.pipe(csvStream);
	 	}).catch((err) => {
	 		fs.unlink(file);
			logger.error("Error: " + err);
			return res.json(err);
	  	});
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


exports.updateEmp = async (req,res,next) => {
	logger.debug("Update Emp req: " + JSON.stringify(req.body));
	logger.debug("Req Emp id: " + JSON.stringify(req.locals.data[0].id));
	let empData = req.locals.data[0];
	logger.debug("Emp Data From DB: " + JSON.stringify(empData));
	Emp.updateEmp(req.headers.userid, req.body, empData, req.headers.companyid, req.query.isImageUpload).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		return res.json(err);
	});
};

/**
 * Search Online Asset 
 * @public
 */
exports.searchOnlineAsset = async (req,res, next) => {
	logger.debug("req: ",req.query);
	if(!req.query.name){
		return res.json({"success":false,  "message":"Empty search field"});
	}
	if(req.query.name.length < 2){
		return res.json({"success":false,  "message":"Search key must have two characters"});
	}
	let name = req && req.query && req.query.name && req.query.name.trim();
	name = new RegExp(name, "i");
	//name = new RegExp("^" + name + "$", "i");
	Emp.searchOnlineAsset(name, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: ", err);
		return res.json(err);
	});
};


/**
 * Asset Current Location 
 * @public
 */
exports.assetCurrentLocation = async (req,res, next) => {
	logger.debug("req: ",req.query);
	if(!req.query.empId || !req.query.beaconId){
		return res.json({"success":false,  "message":"Please pass required fields"});
	}
	Emp.assetCurrentLocation(req.query, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: ", err);
		return res.json(err);
	});
};


