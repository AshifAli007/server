var logger = require('./../../config/logger.js');
var plantType = require('../models/plantType.model');

/**
 * Load user and append to req.
 * @public
 */

exports.load = async (req, res, next, id) => {
	logger.info("Plant type id: " + id);
	plantType.checkId(id, req.headers.companyid).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return next(err);
	});
};




exports.plantTypeList = async (req, res, next) => {
	plantType.plantTypeList(req.headers.companyid, req.query.type).then((data)=>{
		logger.info("Plant Type  Data:  " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.log("Error: " + err);
		return res.json(err);
	});
};



