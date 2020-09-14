const AssetType = require('../models/assetType.model');
const logger = require('./../../config/logger.js');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	logger.debug("AssetType id: " + id);
	AssetType.checkId(id, req.headers.companyid).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return res.json(err);
	});
};


exports.create = async (req, res, next) => {
	AssetType.checkAssetTypeName(req.body.assetTypeName, req.headers['companyid']).then(()=>{
		AssetType.create(req.body, req.headers.companyid).then((data)=>{
			return res.json(data);
		}).catch((err) => {
			logger.error("Error: " + err);
			return res.json(err);
		});
	}).catch((err) => {
		res.json(err);
	});
};

exports.listAssetType = async (req, res, next) => {
	AssetType.listAssetType(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


exports.getAssetType = async (req,res, next) => {
	AssetType.getAssetType(req.locals.data).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


exports.assetSubType = async (req,res, next) => {
	AssetType.assetSubType(req.locals.data, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


exports.createAssetSubType = async (req,res, next) => {
	AssetType.createAssetSubType(req.locals.data, req.body, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + JSON.stringify(err));
		return res.json(err);
	});
};

exports.assetTypeDetail = async (req,res, next) => {
	AssetType.assetTypeDetail(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.updateAssetType = async (req, res, next) => {
	logger.info("Update Asset Type req: " + JSON.stringify(req.body));
	let assetTypeData = req.locals.data[0];
	logger.info("Asset Type Data: " + JSON.stringify(assetTypeData));
	AssetType.checkAssetTypeName(req.body.assetTypeName, req.headers['companyid'], assetTypeData.id).then(()=>{
		AssetType.updateAssetType(req.body, req.headers.companyid, assetTypeData).then((data)=>{
			return res.json(data);
		}).catch((err) => {
			logger.error("Error: " + err);
			return res.json(err);
		});
	}).catch((err) => {
		res.json(err);
	});
};

exports.updateAssetSubType = async (req, res, next) => {
	logger.info("Update Asset Sub Type req: " + JSON.stringify(req.body));
	let assetTypeId = req.locals.data[0].id;
	let assetSubTypeId = req.params.subTypeId;
	logger.info("Asset Sub Type Id: " + JSON.stringify(assetSubTypeId));
	AssetType.updateAssetSubType(assetTypeId, req.body, req.headers.companyid, assetSubTypeId).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


