const Network = require('../models/network.model');
const logger = require('./../../config/logger.js');
const Company = require('../models/company.model');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	var companyId = req.headers['companyid'];
	logger.debug("CompanyId: " + companyId); 
	if(companyId) {
		Company.checkId(companyId).then((data)=>{
			Network.checkId(id, companyId).then((data)=>{
				req.locals = { data };
				return next();
			}).catch((err) => {
				logger.error("err: " + err);
				return res.json(err);
			});
		}).catch((err) => {
			logger.error("err: " + err);
			return res.json(err);
		});
	} else {
		return res.json({
			"status":500,
			"message":"No CompanyId Provided",
			"error":"CompanyId must be provided in header for endpoint access"
		});
	}
};


/**
 * Create new Network
 */

exports.create = async (req, res, next) => {
	logger.info("Add network requested data: " +JSON.stringify(req.body));
	var companyId = req.headers['companyid'];
	logger.debug("CompanyId: " + companyId); 
	if(companyId) {
		Company.checkId(companyId).then((data)=>{
			if(!req.body.networkName) {
				return res.json({"success": false, "message": "Network Name is required field"});
			}
			var name = req && req.body && req.body.networkName && req.body.networkName.trim();
			Network.createNetwork(name, req.headers.companyid, req.headers.userid).then((data)=>{
				return res.json(data);
			}).catch((err) => {
				logger.error("Error: " + JSON.stringify(err));
				return res.json(err);
			});
		}).catch((err) => {
			logger.error("err: " + err);
			return res.json(err);
		});
	} else {
		return res.json({
			"status":500,
			"message":"No CompanyId Provided",
			"error":"CompanyId must be provided in header for endpoint access"
		});
	}
};

/**
 * Get Network List
 */
exports.networkList = async (req, res, next) => {
	var companyId = req.headers.companyid;
	var userId = req.headers.userid;
	Network.networkList(companyId, userId).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		return  res.json(err);
	});
};

/**
 * Get Network Detail
 */

exports.getNetwork = async (req, res, next) => {
	var companyId = req.headers.companyid;
	logger.debug("Req network id: " + JSON.stringify(req.locals.data._id));
	var networkData = req.locals.data;
	Network.getNetwork(companyId, networkData).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		return  res.json(err);
	});
};

/**
 * Update Network Detail
 */

exports.updateNetwork = async (req,res, next) => {
	logger.debug("Update Network req: " + JSON.stringify(req.body));
	logger.debug("Req network id: " + JSON.stringify(req.locals.data._id));
	let networkId = req.locals.data._id;
	logger.debug("Network Id: " + networkId);
	var companyId = req.headers['companyid'];
	logger.debug("CompanyId: " + companyId); 
	if(!req.body.networkName) {
		return res.json({"success": false, "message": "Network Name is required field"});
	}
	var name = req && req.body && req.body.networkName && req.body.networkName.trim();
	Network.updateNetwork(networkId, name, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + JSON.stringify(err));
		return res.json(err);
	});
		
};


/**
 * Delete Network Data
 */

exports.deleteNetwork = async (req,res, next) => {
	logger.debug("Req network id: " + JSON.stringify(req.locals.data._id));
	let networkId = req.locals.data._id;
	logger.debug("Network Id: " + networkId);
	var companyId = req.headers['companyid'];
	logger.debug("CompanyId: " + companyId); 
	Network.deleteNetwork(networkId, companyId).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + JSON.stringify(err));
		return res.json(err);
	});
};

/**
 * Get Zone List on the basis of networkId
 */

exports.zoneList = async (req,res, next) => {
	logger.debug("Req network id: " + JSON.stringify(req.locals.data._id));
	let networkId = req.locals.data._id;
	logger.debug("Network Id: " + networkId);
	var companyId = req.headers['companyid'];
	logger.debug("CompanyId: " + companyId); 
	Network.zoneList(networkId, companyId).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + JSON.stringify(err));
		return res.json(err);
	});
};

exports.updateProvisionerUuid = async (req,res, next) => {
	logger.info("Req network id: " + JSON.stringify(req.locals.data._id));
	logger.info('Req network provisionerUuid: ' + JSON.stringify(req.params.provisionerUuid));
	let networkId = req.locals.data._id;
	let provisionerUuid = req.params.provisionerUuid;
	logger.debug("Network Id: " + networkId);
	var companyId = req.headers['companyid'];
	logger.debug("CompanyId: " + companyId); 
	if(!req.body.sequenceNumber) {
		return res.json({"success": false, "message": "sequenceNumber is required"});
	}
	var sequenceNumber = req && req.body && req.body.sequenceNumber;
	Network.updateProvisionerUuid(networkId, provisionerUuid, sequenceNumber, companyId).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + JSON.stringify(err));
		return res.json(err);
	});
};

