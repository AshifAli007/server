const httpStatus = require('http-status');
const { omit } = require('lodash');
const Zone = require('../models/zone.model');
var uploadFile = require('../helpers/uploadFile.js');
const logger = require('./../../config/logger.js');
var fs = require('fs');
const {zoneType} = require('./../../config/config');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	logger.info("Zone id: " + id);
	Zone.checkId(id, req.headers.companyid).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return res.json(err);
	});
};


/**
 * Create new zone
 * @public
 */
exports.create = async (req, res, next) => {
	var type = "image";
	var folderName = "zones";
	req.query.name = req && req.query && req.query.name && req.query.name.trim();
	Zone.checkZoneName(req.query.name, req.headers.companyid).then(()=>{
		uploadFile.uploadFile(req, res, type, folderName).then((file)=> {
			Zone.addZone(req.query, file, req.headers.companyid).then((data)=>{
				logger.info("Zone Image successfully uploaded");
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
		return res.json({success:false,message:"Zone name already exist ! try with different name"});
	});
};

/**
 * Zone List
 * @public
 */
exports.zoneList = async (req, res, next) => {
	Zone.listZone(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

/**
 * Get Zone List
 * @public
 */
exports.zoneList = async (req, res, next) => {
  Zone.listZone(req.headers.companyid).then((data)=>{
	return res.json(data);
  }).catch((err) => {
	console.log("Error: " + err);
	return res.json(err);
 });
};

/**
 * Get Zone 
 * @public
 */
exports.getZone = async (req,res, next) => {
  console.log("req: " + req)
  Zone.getZone(req.locals.data, req.headers.companyid).then((data)=>{
	return res.json(data);
  }).catch((err) => {
	console.log("Error: " + err);
	return res.json(err);
 });
}




exports.getReciver = async(req, res, next) =>{
  if(req.locals.data.length >0){
	var zoneId = req.locals.data[0].id;
	Zone.getReciver(zoneId, req.headers.companyid).then((data)=>{
	  return res.json(data);
	}).catch((err) => {
	  console.log("Error: " + err);
	  return res.json(err);
   });
  }else{
	return res.json({"success":false, "message":"Zone id is invalid"});
  }
}

exports.assignUser = async(req, res, next) =>{
  if(req.locals.data.length >0){
	var zoneId = req.locals.data[0].id;
	Zone.assignUser(zoneId, req.body, req.headers.companyid).then((data)=>{
	  return res.json(data);
	}).catch((err) => {
	  console.log("Error: " + err);
	  return res.json(err);
   });
   }else{
	return res.json({"success":false, "message":"Zone id is invalid"})
  }
}


exports.removeMapping = async(req, res, next) =>{
	logger.debug("req.parms: ", req.params.id)
	Zone.removeMapping(req.params.id, req.headers.companyid).then((data)=>{
	  return res.json(data);
	}).catch((err) => {
	  console.log("Error: " + err);
	  return res.json(err);
   });
}

exports.ListassignUser = async(req, res, next) =>{
  if(req.locals.data.length >0){
	var zoneId = req.locals.data[0].id;
	Zone.listAssignUser(zoneId, req.headers.companyid).then((data)=>{
	  return res.json(data);
	}).catch((err) => {
	  console.log("Error: " + err);
	  return res.json(err);
   });
  }else{
	return res.json({"success":false, "message":"Zone id is invalid"})
  }
}


exports.zoneusermappinglist = async (req,res, next) => {
  console.log("req: " + req)
  Zone.zoneusermappinglist(req.headers.companyid).then((data)=>{
	return res.json(data);
  }).catch((err) => {
	console.log("Error: " + err);
	return res.json(err);
 });
}

exports.zoneDetail = async(req,res, next) => {
	let assetTypeId = req && req.query && req.query.assetTypeId;
	if(assetTypeId && isNaN(assetTypeId) ) {
		return res.json({"success":false,"items":[],"message":"Asset Type Id must be a number"});
	}
	Zone.zoneDetail(req.headers.companyid, req.query).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: ", err);
		return res.json(err);
	});
};


exports.listEnteredAssets = async(req, res, next) =>{
	if(req.locals.data.length >0){
		var zoneId = req.locals.data[0].id;
		let assetTypeId = req && req.query && req.query.assetTypeId && req.query.assetTypeId.trim();
		if(assetTypeId && isNaN(assetTypeId) ) {
			return res.json({"success":false,"items":[],"message":"Asset Type Id must be a number"});
		}
		Zone.listEnteredAssets(zoneId, req.headers.companyid, assetTypeId).then((data)=>{
			return res.json(data);
		}).catch((err) => {
			logger.error("Error: " + err);
			return res.json(err);
		});
	}else{
		return res.json({"success":false, "message":"Zone id is invalid"});
	}
};

exports.zoneNodeInfo = async(req, res, next) =>{
	if(req.locals.data.length >0){
		var zoneId = req.locals.data[0].id;
		Zone.zoneNodeInfo(zoneId, req.headers.companyid).then((data)=>{
			return res.json(data);
		}).catch((err) => {
			logger.error("Error: " + err);
			return res.json(err);
		});
	}else{
		return res.json({"success":false, "message":"Zone id is invalid"});
	}
};

exports.addNodeNeighbour = async(req, res, next) =>{
	if(req.locals.data.length >0){
		var zoneId = req.locals.data[0].id;
		if(!req.body.centralNodeId || !req.body.gatewayId || (req.body.neighbourNodeId.length === 0)) {
			return res.json({"success":false, "message":"Enter required data"});
		}
		Zone.addNodeNeighbour(zoneId, req.body, req.headers.companyid).then((data)=>{
			return res.json(data);
		}).catch((err) => {
			logger.error("Error: " + err);
			return res.json(err);
		});
	}else{
		return res.json({"success":false, "message":"Zone id is invalid"});
	}
};

exports.updateZone = async (req,res, next) => {
	var type = "image";
	var folderName = "zones";
	req.query.name = req && req.query && req.query.name && req.query.name.trim();
	logger.info("Update Zone req: " + JSON.stringify(req.body));
	logger.info("Req Zone id: " + JSON.stringify(req.locals.data[0].id));
	let zoneData = req.locals.data[0];
	logger.info("Zone Data: ", JSON.stringify(zoneData));
	Zone.checkZoneName(req.query.name, req.headers['companyid'], zoneData.id).then(()=>{
		if(req.query.isImageUpload == 1) {
			logger.info('Zone image also to be updated');
			uploadFile.uploadFile(req, res, type, folderName).then((file)=> {
				if(zoneData.zone_image != file) {
					var dirPath = `./uploads/${req.headers.companyid}/${folderName}/${zoneData.zone_image}`;
					fs.unlink(dirPath, function(err) {
						if (err) {
							logger.error(err);
						}
					});
				}
				Zone.updateZone(req.query,file,req.headers['companyid'], zoneData, req.query.isImageUpload).then((data)=>{
					logger.info("Zone Image successfully updated");
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
			var file = zoneData.zone_image;
			Zone.updateZone(req.query, file, req.headers['companyid'], zoneData, req.query.isImageUpload).then((data)=>{
				logger.info("Zone Image successfully updated");
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


exports.zoneType = async(req,res, next) => {
	logger.debug('Zone type list:' +JSON.stringify(zoneType));
	var items = [];
	if(zoneType) {
		Object.keys(zoneType).forEach(function(key) {
			var tmpObj = {};
			tmpObj.name = key;
			tmpObj.code = zoneType[key];
			items.push(tmpObj);
		});
		return res.json({'success': true, 'items':items, 'message':""});
	}
	else {
		return res.json({'success': false, 'items':items, 'message':""});
	}
};


exports.updateZoneType = async(req, res, next) =>{
	if(req.locals.data.length >0){
		var zoneId = req.locals.data[0].id;
		var zoneType = req.body.zoneType;
		var companyId = req.headers.companyid;
		if(!zoneType) {
			return res.json({'success':false, 'message':'Zone Type is required field'});
		}
		Zone.updateZoneType(zoneId, zoneType, companyId).then((data)=>{
			return res.json(data);
		}).catch((err) => {
			logger.error("Error: " + err);
			return res.json(err);
		});
	}else{
		return res.json({"success":false, "message":"Zone Id is invalid"});
	}
};