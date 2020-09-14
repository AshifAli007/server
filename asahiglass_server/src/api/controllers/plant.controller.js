var logger = require('./../../config/logger.js');
var Plant = require('../models/plant.model');

/**
 * Load user and append to req.
 * @public
 */

exports.load = async (req, res, next, id) => {
	logger.info("Plant id: " + id);
	Plant.checkId(id, req.headers.companyid).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return res.json(err);
	});
};

/**
 * Create new Plant 
 */
exports.create = async (req, res, next) => {
	logger.debug("Add Plant requested data: " + req);
	Plant.addPlant(req.body, req.headers.companyid).then((data)=>{
		logger.debug("Response Data: " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + JSON.stringify(err));
		return res.json(err);
	});
};

exports.plantList = async (req, res, next) => {
	Plant.plantList(req.headers.companyid).then((data)=>{
		logger.info("Plant Data:  " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.log("Error: " + err);
		return res.json(err);
	});
};

exports.getPlant = async (req,res, next) => {
	logger.debug("req: " + req);
	Plant.getPlant(req.locals.data).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.getPlantFloors = async (req, res, next) =>{
	Plant.getPlantFloors(req.locals.data, req.headers.companyid).then((data)=>{
		logger.info("Plant data with image:  " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.log("Error: " + err);
		return res.json(err);
	});
};

exports.getPlantDetail = async(req, res, next) =>{
	let assetTypeId = req && req.query && req.query.assetTypeId;
	if(assetTypeId && isNaN(assetTypeId) ) {
		return res.json({"success":false,"items":[],"message":"Asset Type Id must be a number"});
	}
	Plant.getPlantDetail(req, req.headers.companyid).then((data)=>{
		logger.info("Plant data:  " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.log("Error: " + err);
		return res.json(err);
	});
};

exports.updatePlant = async (req,res, next) => {
	logger.debug("Update Plant req: " + JSON.stringify(req.body));
	logger.debug("Req Plant id: " + JSON.stringify(req.locals.data[0].id));
	let plantId = req.locals.data[0].id;
	logger.debug("Plant Id: " + plantId);
	Plant.updatePlant(req.body, plantId, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		return res.json(err);
	});
};


