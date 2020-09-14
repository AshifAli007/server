var logger = require('./../../config/logger.js');
var Kpi = require('../models/kpi.model');

/**
 * Load user and append to req.
 * @public
 */

exports.load = async (req, res, next, id) => {
	logger.info("Bus id: " + id);
	Kpi.checkId(id, req.headers.companyid).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return next(err);
	});
};




exports.kpiList = async (req, res, next) => {
	Kpi.kpiList(req.headers.companyid, req.query.type).then((data)=>{
		logger.info("KPI Data:  " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.log("Error: " + err);
		return res.json(err);
	});
};



