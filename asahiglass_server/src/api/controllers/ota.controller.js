
const httpStatus = require('http-status');
const { omit } = require('lodash');
var multer = require('multer');
var fs = require('fs');
const logger = require('../../config/logger.js');
const Ota = require('../models/ota.model');
const User = require('../models/notification.model');
var uploadFile = require('../helpers/uploadFile.js');
var checkFolder = require('../helpers/createSoftwareFolder');
var checkFilename = require('../helpers/checkSoftwareFileName');
/**
 * Load user and append to req.
 * @public
 */

exports.load = async (req, res, next, id) => {
	logger.info("OTA id: " + id);
	Ota.checkId(id).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return next(err);
	});
};


/**
 * Create new OTA
 * @public
 */
exports.create = async (req, res, next) => {
	logger.debug("Inside OTA Controller", req.query)
	 //{ type: '3', description: 'XYZ', name: 'wi_node_1.0.0.bin' }
	 var parm = req.query;
	 if(Object.keys(parm).length < 4 || Object.keys(parm).length > 4){
		return res.json({success:false,message:"Some Parameter are missing"}); 
	 }else{
		 var type = "software";
		 var fileType = parm.type;
		 var folderName;
		 if(fileType > 3){
			return res.json({success:false,message:"File type is invalid"}); 
		 }else{
			checkFilename.checkSoftwareFilename(req.query).then((versionNo)=>{
				checkFolder.createSoftwareFolder(req).then((checkRes)=>{
					logger.debug("Responce for check software: ", checkRes);
					switch(fileType) {
						case '1':
						folderName = "node";
						break;
						case '2':
						folderName = "nodeGateway";
						break;
						default:
						folderName = "gateway";
					} 
					
				Ota.checkOtaFileName(req.query).then((data)=>{
					logger.debug("Res from check ota fiile name: ", data);
					uploadFile.uploadFile(req, res, type, folderName).then((file)=> {
						logger.debug("Upload file response: ", file)
						parm["versionno"] = versionNo;
						parm["size"] = file.size;
						logger.debug("Parm added versionNo: ", parm);
						Ota.addOtaData(parm).then((data)=>{
							return res.json(data);
						}).catch((err) =>{
							logger.error("addOtaData Error: " + err);
							return res.json(err);
						});
					}).catch((err) => {
							logger.error("uploadFile Error: " + err);
							return res.json(err);
					});
				}).catch((err) => {
					return res.json({success:false,message:"File name already exist !!!"});
				});
					
						
				});
			}).catch((err) => {
				if(err == 0){
					return res.json({success:false,message:"File name is invalid !!!"});
				}
				return res.json({success:false,message:"File type & file name not match !!!"});
			});

		 }
	 }
};


/**
 * Get All OTA files
 * @public
 */
exports.otaList = async (req, res, next) => {
	Ota.getAllota().then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("getAllota Error: " + err);
		return res.json({success:false,message:err})
	});
};

/**
 * Get Node OTA files
 * @public
 */
exports.nodeOtaList = async (req, res, next) =>{
	Ota.getnodeAllota().then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("getAllota Error: " + err);
		return res.json({success:false,message:err})
	});
};


/**
 * Get Node Gateway OTA files
 * @public
 */
exports.nodegatewayOtaList = async (req, res, next) =>{
	Ota.getnodegatewayOtaList().then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("getAllota Error: " + err);
		return res.json({success:false,message:err})
	});
};


/**
 * Get Gateway OTA files
 * @public
 */
exports.gatewayOtaList = async (req, res, next) =>{
	Ota.getGatewayOtaList().then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("getAllota Error: " + err);
		return res.json({success:false,message:err})
	});
};

/**
 * Add OTA files to device
 * @public
 */
exports.otaDownload = async(req, res, next) =>{
	Ota.otaDownload(req.body).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("getAllota Error: " + err);
		return res.json({success:false,message:err})
	});
}


/**
 * Get device List with versions
 * @public
 */
exports.getDeviceList = async(req, res, next) =>{
	var query = req.query;
	Ota.getDeviceList(query).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("getAllota Error: " + err);
		return res.json({success:false,message:err})
	});
}

 
