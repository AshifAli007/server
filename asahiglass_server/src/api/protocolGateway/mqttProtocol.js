var logger = require('./../../config/logger.js');
var {
	url
} = require('./../../config/config');
var _ = require('underscore');
var fs = require('fs');
var ruleEngineService = require('./../services/ruleEngineService');
var ruleService = require('./../services/ruleService');
var beaconDataService =  require('./../services/beaconDataService');
var rebootHandlerService = require('./../services/rebootHandlerService');
var NotificationDao = require('./../models/dao/notificationSchema');
var testBeaconService = require('./../services/testBeaconService.js');
var companyAndGatewayValidator = require('./../services/companyAndGatewayValidator.js');
var controlRoomZone = require('./../services/controllroomZoneService');
var notificationService = require('../services/notificationService');
var mqttPub = require('../protocolGateway/mqttProtocolpubliser');
var changeGw =require('../services/changeInGw');
const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
var mongoose;
var notificationDao, notificationModel;
var rfidDao,rfidModel;
var healthDao,healthModel;
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://0.0.0.0');
var md5File = require('md5-file');
var RfidDao = require('./../models/dao/rfidSchema');
const { crc32 } = require('crc');
var HealthDao = require('./../models/dao/healthSchema');
var events;
const csv = require('../services/testBeaconService');
//var emitter = new events.EventEmitter();
//var topicList = ['assetData/#','assetTracker/beacon/#','assetTracker/rssi/#'];
var topicList = ['assetData/#', 'assetTracker/#'];
var parserList = {};
var errHandler = function(err) {
	logger.error('ErrorHandler: ', err);
}

exports.mongo = function(mongoose){
	mongoose = mongoose;
	notificationDao = new NotificationDao(mongoose);
	notificationModel = notificationDao.getModel();
	rfidDao = new RfidDao(mongoose);
	rfidModel = rfidDao.getModel();
	healthDao = new HealthDao(mongoose);
	healthModel = healthDao.getModel();
}


var rfidMongoWrite = function(data) {
	var rfid = new rfidModel(data);
	logger.debug('Data to be write: ', rfid);
	rfid.save((err,result)=>{
		if(err) {
			logger.error('Mongo write error: ',err);
		}
		else { 
			logger.debug('Mongo write successful: ',result);
		}
	});
};

var missingBeacon = function(data){
	//logger.info("Missing beacon data", data);
	return new Promise (function(resolve, reject){
		notificationModel.findOne({'beaconId':data.beaconId,companyId:data.companyId,'isEntry':true},{"_id":0, "timeStamp":0}).lean().exec(function(err,value){
			if (err) {
				logger.error('Missing isEntry true for beaconId find error: ', err);
				resolve(false);
			} else if (value) {
				logger.debug("Missing data search: ", JSON.stringify(value));
				value.isEntry = 0,
				value.exitTime = data.exitTime;
				value.isMaxTime= false;
				value.isMax = false;
				value.isMissing = 1;
				value.message = "Asset is missing";
				value.time = data.exitTime;
				logger.debug("Missing data new: ", JSON.stringify(value));
				mongoInsertNewEntry(value);
				resolve(true);
			}
		});
	});
};


var mongoWrite = function(data){
	//logger.info("Inside mongo write: ", data);
	let filterTemp = {
		"zoneId": data.zoneId,
		"beaconId": data.beaconId,
		"isEntry": true,
		"companyId":data.companyId
	};
	if (data.isEntry == false) {
		logger.debug('IsEntry is false');
		var update;
		if(data.isMax){
			update = {
				"isEntry": 0,
				"exitTime": data.exitTime,
				"isMax": false,
				"time": data.exitTime
			};
		}else if(data.isMaxTime){
			update = {
				"isEntry": 0,
				"exitTime": data.exitTime,
				"isMaxTime": false,
				"time": data.exitTime
			};
		}else{
			update = {
				"isEntry": 0,
				"exitTime": data.exitTime,
				"isMaxTime": false,
				"isMax":false,
				"time": data.exitTime
			};
		}
		//logger.debug("Check is missing in update: ", data.isMissing )
		if(data.isMissing == 1){
			logger.debug("Check is missing in update: ", data.isMissing )
			//missingBeacon(data);
			missingBeacon(data).then(res => {
				if(res == false){
					logger.error("Can't able to update the missing");
				}else{
					notificationModel.updateMany(filterTemp, {
						$set: update
					}, (err, result) => {
						if (err) {
							logger.error('Update data error: ', err);
						} else {
							//logger.info('Data Updated :', result);
							//Send Notification
							//events.emit('dashboard', data);
							logger.debug("Update exit: ", data);
						}
					});
					
					notificationService.sendNotification(data, events).then(data => {
			
					});
				}
			});
		}else{
			notificationModel.updateMany(filterTemp, {
				$set: update
			}, (err, result) => {
				if (err) {
					logger.error('Update data error: ', err);
				} else {
					//logger.info('Data Updated :', result);
					//Send Notification
					//events.emit('dashboard', data);
					logger.debug("Update exit: ", data);
				}
			});
			
			notificationService.sendNotification(data, events).then(data => {
	
			});
		}

	} else {
		logger.debug('IsEntry is true');
		notificationModel.findOne({'beaconId':data.beaconId,companyId:data.companyId,'isEntry':true},(err, isEntry) => {
			if (err) {
				logger.error('isEntry true for beaconId find error: ', err);
			} else if (isEntry) {
				var updateTime = Date.now();
				var updateBeacon = {
					"isEntry": 0,
					"exitTime": updateTime,
					"time": updateTime
				};
				notificationModel.updateOne({'beaconId':data.beaconId,companyId:data.companyId,'isEntry':true},{
					$set: updateBeacon
				},  (err, res) => {
					if (err) {
						logger.error('Update  error for already entered beacon: ', err);
					}
					else {
						//logger.info('Update successful for already entered beacon: ', res);
						mongoInsertNewEntry(data);
					}
				});
			}
			else {
				mongoInsertNewEntry(data);
			}
		});
	}
};

var mongoInsertNewEntry = function(data) {
	var notification = new notificationModel(data);
	if(data.message == "Asset is missing"){
		logger.debug('Data to be write: ', data);
	}
	
	notification.save((err, result) => {
		if (err) {
			logger.error('Mongo write error: ', err);
		} else {
			logger.debug('Mongo write successful: ', result);
			//Send Notification
			//events.emit('dashboard', result);
			// logger.debug("Events msg: " , events);
			notificationService.sendNotification(result, events).then(data => {
				
			});
		}
	});
};





var dataValidator = function(topic, message) {
	logger.debug('dataValidator: ', topic, ' message: ', message);

	ruleService.accessValidator(message)
		.then(data => {
			//maxCount(data);
			mongoWrite(data);
		}, errHandler);

};

var beaconDataValidator = function(topic, message, restData) {
	logger.debug('beacon dataValidator: ', topic, ' message: ', message);
	let data = {};
	var res = message.split(',');
	var beaconId = res[0];
	var ismissing = res[1];
	
	data.beaconId = beaconId, data.gatewayId = restData.gatewaySerial, data.companyId = restData.companyId, data.zoneId = topic[0], data.isEntry = Number(topic[1]), data.isMissing = ismissing;
	
	
	logger.debug('data: ', data);

	beaconDataService.beaconValidator(data)
		.then(data => {
			logger.debug('beacon Validator response: ', data);
			if(data.isExist == true){
				var rE = ruleEngineService.ruleEngine(data);
				rE.on('ruleProcess', function (data) {
					//logger.info('Response form rule engine ', JSON.stringify(data));
					if(data.empId && data.message != null){
						mongoWrite(data);
					}
				});
			}else{
				logger.warn("Duplicate packet");
				changeGw.checkChange(data, events).then(res => {
					logger.debug("Res", res);
					if(res.success === false){
						logger.debug("checkChange gw msg is false: ", JSON.stringify(res.message));
					}else if(res.success === true){
						logger.debug("checkChange gw msg is true: ", JSON.stringify(res.message));
						var rE = ruleEngineService.ruleEngine(res.message);
						rE.on('ruleProcess', function (data) {
							logger.debug('Response from rule engine ', JSON.stringify(data));
							if(data.empId && data.message != null){
								mongoWrite(data);
							}
						});
					}
				});
			}
		}, errHandler);
};

var testBeaconValidator = function(topic, message, restData) {
	logger.debug('testBeacon dataValidator: ', topic, ' message RSSI: ', message);
	let data = {};
	data.rssi = message, data.gatewayId = restData.gatewaySerial, data.companyId = restData.companyId, data.nodeId = topic[0], data.beaconId = topic[1];
	logger.debug('data: ', data);
	ruleService.getCentreNode(data)
		.then(data => {
			logger.debug('getCenterNode response: ', data);
			ruleService.testDataValidator(data)
				.then(data => {
					logger.debug('testDataValidator response: ', data);
				}, errHandler);
		}, errHandler);

};

var fileNameValidator = function(topic, message, restData) {
	logger.debug('file Validator: ', ' message file: ', message);
	/*var dirPath = `${process.env.PWD}/uploads/${restData.companyId}/gateway/${restData.gatewaySerial}/${message}`;
	logger.debug('file path: ' + dirPath);
	if (!fs.existsSync(dirPath)) {
		logger.debug('File with name %s not found for company with id %s and gateway with serial %s', message, restData.companyId, restData.gatewaySerial);
	} else {
		logger.debug('File with name %s exists for company with id %s and gateway with serial %s', message, restData.companyId, restData.gatewaySerial);
		var stats = fs.statSync(dirPath),
			fileSize = stats.size,
			path = url.baseUrl + restData.companyId + "/gateway/" + restData.gatewaySerial + "/" + message,
			checksum = crc32(fs.readFileSync(dirPath, 'utf8')).toString(16);

		logger.debug("Url: " + path + " File Size: " + fileSize + " Checksum: " + checksum);
		var msg = path + "," + message + "," + fileSize + "," + checksum;
		var pubTopic = `${topic[0]}/${topic[1]}/${topic[2]}/${topic[3]}/response`;
		fs.readFile(dirPath, function(err, file) {
			if (err) throw err;
			mqttPub.MqttPub(pubTopic, msg);
		});
	}*/
};

var healthMoniter = function(topic, message, restData) {
	logger.debug("Health monitor node mac id: " + topic + ", Messgae: " + message);
	let data = {};
	data.companyId = topic[1];
	data.serial = topic[4];
	data.status = message;
	logger.debug("Data: " + JSON.stringify(data));
	ruleService.nodeStatus(data).then(result => {
		logger.debug("Node status return msg: " + result);
		events.emit('health', result);
	}, errHandler);
};


var batteryMonitor = function(topic, message, restData) {
	logger.debug("Battery monitor beacon mac id: " + topic + ", Messgae: " + message);
	let data = {};
	data.companyId = topic[1];
	data.serial = topic[4];
	data.batteryStatus = message;
	logger.debug("Data: " + JSON.stringify(data));
	ruleService.batteryStatus(data).then(result => {
		logger.debug("Battery status return Data: " +JSON.stringify(result));
		events.emit('battery', result);
	}, errHandler);
};


exports.deviceHealth= function(nodes, companyId) {
	logger.debug("Critical Node Health Data: "+JSON.stringify(nodes));
	nodes.forEach(function(node) {
		var data = {
			'serial':node.serial,
			'deviceType':node.deviceType,
			'zoneId':node.zoneId,
			'nodeId':node.nodeId,
			'companyId':companyId,
			'time':Date.now(),
			'zoneName':node.zoneName,
			'nodeStatus':node.nodeStatus,
			'nodeStatusTime':node.nodeStatusTime,
			'gwSerial':node.gwSerial,
			'message':'Device Health is critical'
		};
		var health = new healthModel(data);
		logger.debug('Data to be write: ', data);
		health.save((err,result)=>{
			if(err) {
				logger.error('Mongo write error: ',err);
			}
			else {
				logger.debug('Mongo write successful for Device Health: ',result);
				if (!node.nodeStatusTime) {
					var qry = `update device_detail_${companyId} SET nodeStatus=2 where id='${node.id}'`;
				}
				else {
					var qry = `update device_detail_${companyId} SET nodeStatus=0 where id='${node.id}'`;
				}
				logger.debug("Query for Device Health update : " + qry);
				db.query(qry,(error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						logger.error(error);
					}else{
						if (data.deviceType == 3) {
							resetGatewayData(data);
						}
						logger.debug('Device health status updated for serial: '+JSON.stringify(node.serial));
						events.emit('health', data);
					}
				});
			}
		});
	});
};


exports.resetBeaconBattery = function(beacons, companyId) {
	beacons.forEach(function(beacon) {
		var resetBatteryStatusQry = `update device_detail_${companyId} set batteryStatus=2 where id=${beacon.id}`;
		logger.debug('Update query for resetBeaconBattery', JSON.stringify(resetBatteryStatusQry));
		db.query(resetBatteryStatusQry, (err,result,fields)=>{
			if(err){
				dbFunc.connectionRelease;
				logger.error(err);
			}else{
				beacon.batteryStatus = 0;
				beacon.companyId = companyId;
				logger.debug("Battery status reset Data: " +JSON.stringify(beacon));
				events.emit('battery', beacon);
			}
		});
	});
};



function clearProv(serial, cId){
	logger.debug("Clear prov: ", serial);
	db.query(`delete from prov_scan_${cId} where deviceSerial='${serial}'`, (err, rows, fields) => {
		if (err) {
			logger.error("Mysql error: ",err);
			dbFunc.connectionReleas;
			
		}else{
			logger.debug("Scan Completed");
		}
	});
	
}




var resetGatewayData = function(data) {
	logger.debug('Inside Gateway Reset Data due to Critical Gateway health');
	let updateFilter = {
		"gatewayId": data.serial,
		"isEntry": true,
		"companyId":data.companyId
	};
	var exitTime = Date.now();
	logger.debug("Update Filter to Reset gatewaySerial data: " +JSON.stringify(updateFilter));
	notificationModel.updateMany(updateFilter, {
		$set: {
			"isEntry": 0,
			"exitTime": exitTime,
			"time": exitTime
		}
	},  (err, result) => {
		if (err) {
			logger.error('Gateway with serial %s data reset error: ', data.serial, err);
		} else {
			logger.debug('Gateway with serial %s data reset successfully :', data.serial, result);
			events.emit('notification', {success:true, type:"reset", companyId:data.companyId});
		}
	});
};


var intervalObject;

var bleProvision = function(topic, message, restData, startTimer, gwData, cId) {

	logger.debug("bleProvision mac id: " + topic + " , Messgae " + message + " , Start Timer: " + startTimer);

	var count = 0;
	var pipePro = false;

	if (startTimer.length > 0) {
		intervalObject = setInterval(function() {
			count++;
			logger.debug(count, 'seconds passed ');
			if (count == 60) {
				logger.debug('exiting');
				timer = 0;
				events.emit('provisioning', {
					"success": false,
					"message": "Time over please try again!",
					"companyId":cId
				});
				clearInterval(intervalObject);
				pipePro = false;
				clearProv(gwData, cId);
				
			}

		}, 1000);
	} else if (topic.length > 0) {
		pipePro = true;
		clearInterval(intervalObject);
	}
	logger.debug("pipePro: " + pipePro);

	if (pipePro == true) {
		var qry = `select name from device_detail_${topic[1]} where serial='${topic[4]}'`;
		db.query(qry, (err, rows, fields) => {
			if (err) {
				logger.error("Mysql error: ",err);
				dbFunc.connectionReleas;
				
			}else if(rows.length > 0){
				logger.debug("Rows: ", JSON.stringify(rows));
				events.emit('provisioning', {
					"success": true,
					"serialNo": topic[4],
					"companyId": topic[1],
					"name":rows[0].name,
					"timeStamp": message
				});

				clearProv(topic[2], topic[1]);
			}else{
				events.emit('provisioning', {
					"success": true,
					"serialNo": topic[4],
					"companyId": topic[1],
					"name":'',
					"timeStamp": message
				});
				clearProv(topic[2], topic[1]);
			}
		});

	}

};

var resetGateway = function(topic, message, restData, gwData) {
	logger.debug("Inside Reset Gateway Topic");
	let updateFilter = {
		"gatewayId": topic[2],
		"isEntry": true,
		"companyId":Number(topic[1])
	};
	var exitTime = Date.now();
	logger.debug("Update Filter to Reset gatewaySerial data: " +JSON.stringify(updateFilter));
	notificationModel.update(updateFilter, {
		$set: {
			"isEntry": 0,
			"exitTime": exitTime,
			"time": exitTime
		}
	},{multi:true}, (err, result) => {
		if (err) {
			logger.error('Gateway serial data reset error: ', err);
		} else {
			logger.debug('Gateway serial data reset successfully :', result);
			events.emit('notification', {success:true, type:"reset", companyId:topic[1]});
		}
	});
};

var rebootGateway = function(topic, message, restData, gwData){
	logger.debug("Inside Reboot Gateway Topic");
	logger.info("Rebbot message: ", message);
	logger.info("Rebbot Gateway id: ", topic[2]);
	logger.info("Reboot Company Id: ", restData.companyId)
	var messageSplit = message.split(",");
	let filter = {
		"gatewayId":topic[2],
		"rebootReason":messageSplit[0],
		"currentVersion":messageSplit[1],
		"companyId":restData.companyId
	};
	logger.info("Reboot filter Object: ", filter);

	//Reboot and version handler
	rebootHandlerService.rebootAndVersionHandler(filter).then(result => {
		
	},errHandler);
}

var rfidProvision = function(topic, message, restData, startTimer, gwData, gwId, cId) {

	logger.debug("rfidProvision mac id: " + topic + " , Messgae " + message + " , Start Timer: " + startTimer + " , Gateway Data: " + JSON.stringify(gwData));

	var count = 0;
	var pipePro = false;

	if(gwData.type === 9){
		if (startTimer.length > 0) {
			intervalObject = setInterval(function() {
				count++;
				logger.debug(count, 'seconds passed ');
				if (count == 60) {
					logger.debug('exiting');
					timer = 0;
					events.emit('provisioning', {
						"success": false,
						"message": "Time over please try again!",
						"companyId":cId
					});
					clearInterval(intervalObject);
					pipePro = false;
					clearProv(gwId, cId);
				}
	
			}, 1000);
		} else if (topic.length > 0) {
			pipePro = true;
			clearInterval(intervalObject);
		}
		logger.debug("pipePro: " + pipePro);
	
		if (pipePro == true) {
			var qry = `select name from device_detail_${topic[1]} where serial='${topic[4]}'`;
			db.query(qry, (err, rows, fields) => {
				if (err) {
					logger.error("Mysql error: ",err);
					dbFunc.connectionReleas;
					
				}else if(rows.length > 0){
					events.emit('provisioning', {
						"success": true,
						"serialNo": topic[4],
						"companyId": topic[1],
						"name":rows[0].name,
						"timeStamp": message
					});
					clearProv(topic[2], topic[1]);
				}else{
					events.emit('provisioning', {
						"success": true,
						"serialNo": topic[4],
						"companyId": topic[1],
						"name":'',
						"timeStamp": message
					});
					clearProv(topic[2], topic[1]);
				}
			});
		}
	}else{
		var data = {
			uuId: topic[4],
			gatewayId: topic[2],
			type: gwData.type,
			timeStamp: message
		};

		var qry = `select (select id from device_detail_${topic[1]} where serial='${topic[2]}') as gwId, (select deviceType from device_detail_${topic[1]} where serial='${topic[2]}') as type, (select assetId from device_detail_${topic[1]}  where serial='${topic[4]}') as assetId`;
		db.query(qry, (err, rows, fields) => {
			if (err) {
				logger.error("Mysql error: ",err);
				dbFunc.connectionReleas;
				
			}
			else if(rows.length > 0) {
				logger.debug("Responce data for Gw and device Id: " + JSON.stringify(rows));
				var assId = rows[0].assetId;
				data.assetId = assId;
				var rfidGwQry;
				if(rows[0].type === 6){
					rfidGwQry = `select * from bus_detail_${topic[1]} where gatewayId=${rows[0].gwId}`;
				}else if(rows[0].type === 7){
					rfidGwQry = `select * from food_cart_detail_${topic[1]} where gatewayId=${rows[0].gwId}`;
				}
				logger.debug("Query for table: " + rfidGwQry);
				db.query(rfidGwQry, (err, rows, fields) => {
					if (err) {
						logger.error("Mysql error: ",err);
						dbFunc.connectionReleas;
						
					}else if(rows.length > 0) {
						logger.debug("Bus/Foodcart Detail: " + JSON.stringify(rows));
						data.name = rows[0].busNo;
						data.venderName = rows[0].venderName;
						db.query(`select * from asset_detail_${topic[1]} as aD where id=${assId}`, (err,rows, fields) => {
							if (err) {
								logger.error("Mysql error: ",err);
								dbFunc.connectionReleas;
								
							}else if(rows.length > 0){
								data.assetName = rows[0].name;

								logger.debug("Complete Data for RFID: " + JSON.stringify(data));
								rfidMongoWrite(data);

							}
						});


					}
				});


			}
		});

		
	}


};


var provisionDataValidator = function(topic, message, restData, result) {
	logger.debug('Provision data Validator: ', ' message: ', message);
	var msg = message && JSON.parse(message);
	if(topic[4] == 'response') {
		logger.debug('Inside node neighbour response data from gateway to server with offset value:', message);
		if(!(msg.operation == 0 || msg.operation == 1) || (!msg.totalCount) || (!msg.offset)) {
			logger.error('Invalid message for provision response topic from gateway:',topic, 'Message: ', message);
		}
		else {
			var data = {};
			data.gatewayId = result.gwId;
			var isDataExists = false;
			csv.generateJson(data, result.cId, msg.operation, msg.offset, isDataExists, msg.totalCount).then((result)=>{
				logger.info("Return data: ", JSON.stringify(result));
			}).catch((err) =>{
				logger.error(err);
			});
		}
	}
};

var rejectedTopic = function(topic, message, restData, gwData) {
	logger.debug("rejected topic: " + topic + " , Messgae " + message + " " + "gwData", gwData);
	if (topic[3] === "provisioning" && message === "bleScan") {
		bleProvision('', '', '', 'startTimer', topic[2], topic[1]);
	} else if (topic[3] === "provisioning" && message === "rfidScan") {
		rfidProvision('', '', '', 'startTimer', gwData,  topic[2], topic[1]);
	}

};


var assetDataParser = function(topic, message) {
	message = JSON.parse(message);
	testBeaconService.generateCsv({});
	/*    logger.info("inside assetTopic parser: ",topic,' , message: ',message);
		topic = topic.slice(1);
		topic.length === 3?dataValidator(topic,message):logger.error('Insufficient parameters');*/
};

var assetTrackerParser = function(topic, message) {
	//logger.info("inside assetTracker parser: ", topic, ' , message: ', message);
	let subTopic = topic.slice(4);
	var dataToValidate = {
		'companyId': topic[1],
		'gatewaySerial': topic[2]
	};
	logger.debug('Topic: ', topic.length, ', subTopic: ', subTopic.length);
	companyAndGatewayValidator.companyAndGatewayValidator(dataToValidate).then((data) => {
		switch (topic[3]) {
			case 'beacon':
				subTopic.length == 2 ? beaconDataValidator(subTopic, message, dataToValidate) : logger.warn('Invalid Topic Beacon');
				break;
			case 'rssi':
				subTopic.length == 2 ? testBeaconValidator(subTopic, message, dataToValidate) : logger.warn('Invalid Topic RSSI');
				break;
			case 'file':
				subTopic.length == 1 ? fileNameValidator(topic, message, dataToValidate) : logger.warn('Invalid Topic File');
				break;
			case 'health':
				subTopic.length == 1 ? healthMoniter(topic, message, dataToValidate) : logger.warn('Invalid Topic Health');
				break;
			case 'ble':
				subTopic.length == 1 ? bleProvision(topic, message, dataToValidate, '','','') : logger.warn('Invalid Topic BLE');
				break;
			case 'rfid':
				subTopic.length == 1 ? rfidProvision(topic, message, dataToValidate, '', data, '','') : logger.warn('Invalid Topic RFID');
				break;
			case 'reset':
				topic.length == 4 ? resetGateway(topic, message, dataToValidate, '', data) : logger.warn('Invalid Topic Reset');
				break;
			case 'reboot':
				topic.length == 4 ? rebootGateway(topic, message, dataToValidate, '', data)	: logger.warn('Invalid Topic Reboot');
				break;
			case 'battery':
				subTopic.length == 1 ? batteryMonitor(topic, message, dataToValidate) : logger.warn('Invalid Topic Battery');
				break;
			case 'provision':
				subTopic.length == 1 ? provisionDataValidator(topic, message, dataToValidate, data) : logger.warn('Invalid Topic provision');
				break;
			default:
				subTopic.length == 0 ? rejectedTopic(topic, message, dataToValidate, data) : logger.debug('No appropriate sub topic found');
		}
	}).catch((err) => {
		logger.error(err);
	});
};



parserList.assetData = assetDataParser;
parserList.assetTracker = assetTrackerParser;

function MqttSub(client) {
	client.on('connect', function() {
		_.each(topicList, function(topic) {
			client.subscribe(topic);
		});
	});
	client.on('message', function(topic, message) {
		logger.info(topic);
		topic = topic.split('/');
		message = message.toString();

		parserList.hasOwnProperty(topic[0]) ? parserList[topic[0]](topic, message) : logger.warn('Topic Handler Not exist, Topic:', topic[0]);


	});


	// client.on('message', function (topic, message) {
	// 	client.publish('assetTracker/1/AC233FB24523/file/response', 'Hello mqtt');
	// 	console.log("publish send");
	// });

}

function mqttService(client, eventemitter) {
	MqttSub(client);
	events = eventemitter;
}
module.exports.init = mqttService;
