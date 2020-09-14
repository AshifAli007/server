
const httpStatus = require('http-status');
const { omit } = require('lodash');
var multer = require('multer');
var fs = require('fs');
const logger = require('./../../config/logger.js');
const Area = require('../models/area.model');
const User = require('../models/notification.model');
var uploadFile = require('../helpers/uploadFile.js');

/**
 * Load user and append to req.
 * @public
 */

exports.load = async (req, res, next, id) => {
	logger.info("Area id: " + id);
	Area.checkId(id, req.headers.companyid).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return next(err);
	});
};

var storage =   multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads');
	},
	filename: function (req, file, callback) {
		console.log("FIle name: " + file.originalname);
		callback(null, file.originalname);
	}
})

/**
 * Create new zone
 * @public
 */
exports.create = async (req, res, next) => {
	Area.addArea(req, res).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};



/**
 * get user count area wise
 * @public
 */
exports.userCount = async (req, res, next) => {
	User.getUserCount(req.headers.companyid).then((data)=>{
		logger.info("User count in area:  " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


/**
 * upload area image
 * @public
 */
exports.uploadAreaImage = async (req, res, next) => {
	var type = "image";
	var folderName = "floors";
	req.query.name = req && req.query && req.query.name && req.query.name.trim();
	Area.checkAreaName(req.query.name, req.headers['companyid'], req.headers['userid']).then(()=>{
		uploadFile.uploadFile(req, res, type, folderName).then((file)=> {
			Area.addAreaImage(req,file,req.headers['companyid']).then((data)=>{
				logger.info("Floor Image successfully uploaded");
				return res.json(data);
			}).catch((err) => {
				logger.error("Error: " + err);
				return res.json(err);
			});
		}).catch((err) => {
			logger.error("Error: " + err);
			return res.json(err);
		});
	}).catch((err) => {
		res.json(err);
	});
};

exports.getArea = async (req, res, next) => {
	Area.getArea(req.locals.data, req.headers.companyid).then((data)=>{
		logger.info("Floor data with image:  " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.log("Error: " + err);
		return res.json(err);
	});
};

exports.floorList = async (req, res, next) => {
	let assetTypeId = req && req.query && req.query.assetTypeId;
	if(assetTypeId && isNaN(assetTypeId) ) {
		return res.json({"success":false,"items":[],"message":"Asset Type Id must be a number"});
	}
	Area.floorList(req.headers.companyid, req.query).then((data)=>{
		logger.info("Floor data with image:  " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.log("Error: " + err);
		return res.json(err);
	});
};

exports.getAreaZone = async (req, res, next) =>{
	Area.getAreaZone(req.locals.data, req.headers.companyid).then((data)=>{
		logger.info("Floor data with image:  " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.log("Error: " + err);
		return res.json(err);
	});
};

exports.getZoneHeatMap = async (req, res, next) =>{
	Area.getZoneHeatMap(req.locals.data, req.headers.companyid).then((data)=>{
		logger.info("Zone data with image:  " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.log("Error: " + err);
		return res.json(err);
	});
};

exports.updateFloor = async (req,res, next) => {
	var type = "image";
	var folderName = "floors";
	req.query.name = req && req.query && req.query.name && req.query.name.trim();
	logger.info("Update Floor req: " + JSON.stringify(req.body));
	logger.info("Req Floor id: " + JSON.stringify(req.locals.data[0].id));
	let floorData = req.locals.data[0];
	logger.info("Floor Data: ", JSON.stringify(floorData));
	Area.checkAreaName(req.query.name, req.headers['companyid'], req.headers['userid'], floorData.id).then(()=>{
		if(req.query.isImageUpload == 1) {
			uploadFile.uploadFile(req, res, type, folderName).then((file)=> {
				if(floorData.floor_image != file) {
					var dirPath = `./uploads/${req.headers.companyid}/${folderName}/${floorData.floor_image}`;
					fs.unlink(dirPath, function(err) {
						if (err) {
							logger.error(err);
						}
					});
				}
				Area.updateFloor(req,file,req.headers['companyid'], floorData, req.query.isImageUpload).then((data)=>{
					logger.info("Floor Image successfully updated");
					return res.json(data);
				}).catch((err) => {
					logger.error("Error: " + err);
					return res.json(err);
				});
			}).catch((err) => {
				logger.error("Error: " + err);
				return res.json(err);
			});
		}
		else {
			var file = floorData.floor_image;
			Area.updateFloor(req,file,req.headers['companyid'], floorData, req.query.isImageUpload).then((data)=>{
				logger.info("Floor Image successfully updated");
				return res.json(data);
			}).catch((err) => {
				logger.error("Error: " + err);
				return res.json(err);
			});
		}
	}).catch((err) => {
		logger.log("Error: " + err);
		res.json(err);
	});
};
