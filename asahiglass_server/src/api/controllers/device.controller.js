const httpStatus = require('http-status');
const { omit } = require('lodash');
const Device = require('../models/device.model');
var fs = require('fs');
const logger = require('./../../config/logger.js');
const csv = require('fast-csv');
var uploadFile = require('../helpers/uploadFile.js');
var _ = require('lodash');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	Device.checkId(id,req.headers.companyid).then((data)=>{
		req.locals = { data };
		return next();
	}).catch((err) => {
		logger.error("err: " + err);
		return res.json(err);
	});
};


/**
 * Create new Device
 */
exports.create = async (req, res, next) => {
	logger.debug("Add device requested data: " + req);
	Device.addDevice(req.body, req.headers.companyid, req.headers.userid).then((data)=>{
		logger.debug("Id check: " + JSON.stringify(data));
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


/**
 * Device List
 */
exports.deviceList = async (req, res, next) => {
	logger.info('Inside deviceList');
	Device.listDevice(req.headers.companyid, req.query.gatewayMacId).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

/**
 * Beacon device List
 */
exports.getBeacons = async (req, res, next) => {
	Device.getBeacon(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


/**
 * Reciver device List
 */
exports.getRecivers = async (req, res, next) => {
	Device.getReciver(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


/**
 * Provising device List
 */
exports.getProvisioning = async (req, res, next) => {
	Device.getProvisioning(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

/**
 * Gateway device List
 */
exports.getGateways = async (req, res, next) => {
	Device.getGateway(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


/**
 * get device info
 */

exports.getDevice = async (req,res, next) => {
	logger.debug("req: " + req);
	Device.getDevice(req.locals.data, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


/**
 * Update device info
 */

exports.updateDevice = async (req,res, next) => {
  	logger.debug("Update device req: " + JSON.stringify(req.body));
  	logger.debug("Req Device id: " + JSON.stringify(req.locals.data[0].id));
  	let deviceData = req.locals.data[0];
  	logger.debug("Device Data: " + deviceData);
	Device.updateDevice(req.body, deviceData, req.headers.companyid).then((data)=>{
		logger.debug(data);
		return res.json(data);
  	}).catch((err) => {
		return res.json(err);
  	});
}


exports.uploadCsv = async (req, res, next) => {
	var type = "csv";
	if(!req.query.name) {
		req.query.name = "device";
	}
	uploadFile.uploadFile(req, res, type).then((file)=> {
		var stream = fs.createReadStream(file);
		var deviceData = [];
		var csvStream = csv
		.parse()
    	.on("data", function (data) {
        	deviceData.push(data);
        })
    	.on("end", function () {
    		var csvHeader = deviceData.shift();
    		if(csvHeader[0] !== "name" || csvHeader[1] !== "serial" || csvHeader[2] !== "deviceType") {
    			fs.unlink(file);
    			return res.json({
    				"success":false,
    				"message":"Invalid csv file", 
    				"csvFormat":["name","serial","deviceType","nodeId","isBuzz"]
    			});
    		}
			Device.addDeviceData(deviceData, csvHeader, req.headers.companyid).then((data)=>{
				logger.info("Device Data successfully added");
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

exports.getDevices = async (req, res, next) => {
	Device.getDevices(req.headers.companyid).then((data)=>{
		logger.info(data);
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.mapAssetAndDevice = async(req, res, next) =>{
	if(req.locals.data.length >0){
		var deviceId = req.locals.data[0].id;
		Device.mapAssetAndDevice(deviceId, req.body, req.headers.companyid).then((data)=>{
			return res.json(data);
		}).catch((err) => {
			logger.error("Error: " + err);
			return res.json(err);
		});
	}else{
		return res.json({"success":false, "message":"Device id is invalid"});
	}
};

exports.getmapAssetDevice = async(req, res, next) =>{
	Device.getmapAssetDevice(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.getRfidCards = async(req, res, next) =>{
	Device.getRfidCards(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


exports.mapAssetAndDeviceByCsv = async(req, res, next) =>{

	var type = "csv";
	if(!req.query.name) {
		req.query.name = "device";
	}
	uploadFile.uploadFile(req, res, type).then((file)=> {
		var stream = fs.createReadStream(file);
		var deviceData = [];
		var csvStream = csv
		.parse()
    	.on("data", function (data) {
        	deviceData.push(data);
        })
    	.on("end", function () {
    		var csvHeader = deviceData.shift();
    		if(csvHeader[0] !== "serial" || csvHeader[1] !== "deviceType" || csvHeader[2] !== "uniqueId") {
    			fs.unlink(file);
    			return res.json({
    				"success":false,
    				"message":"Invalid csv file", 
    				"csvFormat":["serial","deviceType","uniqueId"]
    			});
    		}
			Device.mapAssetAndDeviceByCsv(deviceData, req.headers.companyid).then((data)=>{
				logger.info("Asset and Device Data mapped successfully");
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


exports.createAndMapDevice = async(req, res, next) =>{
	logger.info(req.body);
	logger.debug("Create and map Device Req Data: " + JSON.stringify(req.body));
	Device.createAndMapDevice(req.body, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


exports.getProvisioningDevice = async(req, res, next) =>{
	Device.getProvisioningDevice(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};


exports.getBusGateway = async(req, res, next) =>{
	Device.getBusGateway(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.getFoodCartGateway = async(req, res, next) =>{
	Device.getFoodCartGateway(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.testBeaconList = async(req, res, next) =>{
	Device.testBeaconList(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.nodeNeighbourDetail = async (req,res, next) => {
	logger.debug("Req Device id: " + JSON.stringify(req.locals.data[0].id));
	let deviceId = req.locals.data[0].id;
	logger.debug("Device Id: " + deviceId);
	Device.nodeNeighbourDetail(deviceId, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		return res.json(err);
	});
};

exports.deviceHealth = async(req, res, next) =>{
	Device.deviceHealth(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.beaconBatteryStatus = async (req, res, next) => {
	Device.beaconBatteryStatus(req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + err);
		return res.json(err);
	});
};

exports.provision = async (req, res, next) => {
	var type = "csv";
	if(!req.query.name) {
		req.query.name = "device";
	}
	uploadFile.uploadFile(req, res, type).then((file)=> {
		var stream = fs.createReadStream(file);
		var deviceData = [];
		var csvStream = csv
			.parse()
			.on("data", function (data) {
				deviceData.push(data);
			})
			.on("end", function () {
				var csvHeader = deviceData.shift();
				if(!deviceData.length) {
					fs.unlink(file, function(err) {
						if (err) {
							logger.error(err);
						}
					});
					return res.json({"success":false,"message":"Blank csv file!"});
				}
				logger.debug('Provising node and gateway device csv headers: ', csvHeader);
				if(csvHeader[0] !== "deviceType" || csvHeader[1] !== "name" || csvHeader[2] !== "uuid" || csvHeader[3] !== "gatewayUuid" || csvHeader[4] !== "nodeType" || csvHeader[5] !== "nodeId" || csvHeader[6] !== "zoneId" || csvHeader[7] !== "zoneType" || csvHeader[8] !== "networkId" || csvHeader[9] !== "x_axis" || csvHeader[10] !== "y_axis" || csvHeader[11] !== "z_axis" || csvHeader[12] !== "status" || csvHeader[13] !== "neighbourNodes") {
					fs.unlink(file, function(err) {
						if (err) {
							logger.error(err);
						}
					});
					return res.json({
						"success":false,
						"message":"Invalid csv file", 
						"csvFormat":["deviceType","name","uuid","gatewayUuid","nodeType","nodeId","zoneId","zoneType","networkId","x_axis","y_axis","z_axis","status","neighbourNodes"]
					});
				}
				Device.provisionNodeAndGateway(deviceData, csvHeader, req.headers.companyid).then((data)=>{
					logger.debug("Device Data successfully provisioned");
					fs.unlink(file, function(err) {
						if (err) {
							logger.error(err);
						}
					});
					return res.json(data);
				}).catch((err) => {
					logger.error("Error: " +JSON.stringify(err));
					return res.json(err);
				});
			});
		stream.pipe(csvStream);
	}).catch((err) => {
		logger.error("Error: " +JSON.stringify(err));
		return res.json(err);
	});
};

exports.updateNodeRssi = async (req,res, next) => {
	logger.debug("Req Device id: " + JSON.stringify(req.locals.data[0].id));
  	let deviceData = req.locals.data[0];
  	logger.debug("Device Data: " + deviceData);
	let companyId = req.headers['companyid'];
	logger.debug("CompanyId: " + companyId); 
	if(!req.body.rssi) {
		return res.json({"success": false, "message": "Node rssi is required"});
	}
	var rssi = req && req.body && req.body.rssi;
	Device.updateNodeRssi(deviceData, rssi, companyId).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + JSON.stringify(err));
		return res.json(err);
	});
};

