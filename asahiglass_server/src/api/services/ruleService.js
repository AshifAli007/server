const logger = require('./../../config/logger.js');
const db = require('../../config/mysql');
var _= require('underscore');
var dbFunc = require('../../config/mysql-function');
//const MAX_EMP_COUNT = 5;
var zone = {};
let primaryNodeId = 9;// default primary node...

//Sample Data format...
var NODE_TO_ZONE = {'node1':'zone1','node2':'zone1','node3':'zone2','node4':'zone2'};
var ZONE_TO_BEACON = {'zone1':['beacon1','beacon2','beacon5'],'zone2':['beacon3','beacon4','beacon5']};
var BEACON_TO_EMP = {'beacon1':{},'beacon2':{},'beacon3':{},'beacon4':{},'beacon5':{}};
BEACON_TO_EMP.beacon1 = {'empId':'W001','name':'Vijay'},BEACON_TO_EMP.beacon2 = {'empId':'W002','name':'Mushir'},
BEACON_TO_EMP.beacon3 = {'empId':'W003','name':'Rohit'},BEACON_TO_EMP.beacon4 = {'empId':'W004','name':'Gaurav'},
BEACON_TO_EMP.beacon5 = {'empId':'W005','name':'Ajay'};


exports.maxCount = function(req){
	logger.debug('Inside maxCountMethod: ',req);
	console.log(req.isEntry);
	let zoneId = req.zoneId , MAX_EMP_COUNT = req.maxUsers;
	logger.debug('MAX_COUNT: ',MAX_EMP_COUNT);logger.debug('req.maxUsers: ',req);
	logger.debug("Max Count zone data: " + JSON.stringify(zone));
	if(zone.hasOwnProperty(zoneId)){
		req.isEntry?zone[zoneId] = zone[zoneId] + 1:(zone[zoneId]>0 ?zone[zoneId] = zone[zoneId] - 1:zone[zoneId]=  0);
	}else {
		req.isEntry?zone[zoneId] = 1:zone[zoneId] = 0;
	}
	logger.debug('Zone List Count:- ',zone);
	return new Promise (function(resolve, reject){
		zone[zoneId]>MAX_EMP_COUNT?resolve(0):reject(-1);
	});

}

exports.accessValidator = function(req){
	logger.debug('Inside accessValidator: ',req);
	var data = req/*.payload*/;
	data.time = new Date().getTime();
	if(data.isEntry == true){
		data.entryTime = new Date().getTime();
	}else{
		data.exitTime = new Date().getTime();
	}
	var companyId = data.companyId;
	console.log(data);
	// let findUser = `select d.serial as beaconId,d.deviceType,d.name, e.uniqueId, e.name as empName,map.zoneId as zoneId,z.name as zoneName,z.maxUsers, aT.assetTypeName as assetType
	// from device_detail_${data.companyId} as d left join asset_detail_${data.companyId} as e on e.id=d.assetId left join asset_zone_mapping_${data.companyId} map on
	// e.id = map.assetId left join zone_detail_${data.companyId} as z on  map.zoneId = z.id left join asset_type_list_${data.companyId} aT on e.type=aT.id where d.serial = '${data.beaconId}' AND d.deviceType=1`;
	let findUser = `select d.serial as beaconId,d.deviceType,d.name, e.uniqueId, e.name as empName,map.zoneId as zoneId,z.name as zoneName,z.maxUsers, aT.assetTypeName as assetType
	from device_detail_? as d left join asset_detail_? as e on e.id=d.assetId left join asset_zone_mapping_? map on
	e.id = map.assetId left join zone_detail_? as z on  map.zoneId = z.id left join asset_type_list_? aT on e.type=aT.id where d.serial = ? AND d.deviceType=1`;
	logger.debug('findUser qry: ',findUser);
	return new Promise (function(resolve, reject){
		let paramList = [companyId,{id:data.zoneId}];
		// let findZone= `select id,name,maxUsers from zone_detail_${data.companyId} where id = ${data.zoneId}`;
		let findZone= `select id,name,maxUsers from zone_detail_? where ?`;
		logger.debug('Find Zone qry:', findZone);
		db.query(findZone,paramList, (err, result, fields)=>{
			if(err){
				logger.error('Mysql error: ',err);
				reject('Mysql error');
			}else if(!err && result.length){
				let paramList = [companyId,companyId,companyId,companyId,companyId,data.beaconId];
				logger.debug('Zone max count: ', result[0].maxUsers);
				logger.debug('Count max count: ', data.maxUsers);
				db.query(findUser,paramList, (err, rows, fields) => {
					if(err){
						logger.error('Mysql error: ',err);
						reject('Mysql error');
					}else if(!err && rows.length){
						logger.debug('Result for zone details: ', JSON.stringify(result));
						data.empId = rows[0].uniqueId,
						data.empName = rows[0].empName;
						data.zoneName = result[0].name;
						data.assetType = rows[0].assetType;
						data.isAllowed = 0,data.maxUsers =result[0].maxUsers;
						let finalMessage = {type:0,data:data};
						_.each(rows,(ack, index)=>{
							logger.debug('ack: ',ack);
							logger.debug('index: ',index);
							if(ack.zoneId == data.zoneId){
								data.isAllowed = 1;
							}
							if(index == (rows.length-1)){
								data.isAllowed?finalMessage.data.message = 'Authorized Access':finalMessage.data.message = 'Unauthorized Access';
								logger.debug('Result Data: ',finalMessage);
								resolve(finalMessage);
							}
						});
					}else{
						logger.debug('Data not exist');
						reject('Data not exist');
					}
				});
			}else{
				reject('Zone Not Exist');
			}
		});
	});
};

exports.testDataValidator = function(req){
	logger.debug('Inside test data Validator: ',req);
	return new Promise (function(resolve, reject){
		var companyId = parseInt(req.companyId);
		let paramList = [companyId,{nodeId:req.primaryNodeId},{neighbourNodeId:req.nodeId},companyId,{serial:req.gatewayId}];
		// let findQry = `select id ,nodeId, neighbourNodeId, neighbourRssi from node_neighbour_detail_${req.companyId} where nodeId = ${req.primaryNodeId} and neighbourNodeId = ${req.nodeId} AND gatewayId =(select id from device_detail_${req.companyId} where serial = '${req.gatewayId}')`;
		let findQry = `select id ,nodeId, neighbourNodeId, neighbourRssi from node_neighbour_detail_? where ? and ? AND gatewayId =(select id from device_detail_? where ?)`;
		logger.debug('Find neighbour qry: ',findQry);
		  db.query(findQry,paramList, (err,result,fields)=>{
			if(err){
				reject('Mysql error: ', err);
			}else if(!err && result.length){
				logger.debug('Result: ',result);
				if(result[0].neighbourRssi ==null || result[0].neighbourRssi < req.rssi){
					let id = result[0].id;
					let paramList = [companyId,{neighbourRssi:req.rssi},{id:id}];
					// let updateQry = `update node_neighbour_detail_${req.companyId} set neighbourRssi = ${req.rssi} where id= ${id}`;
					let updateQry = `update node_neighbour_detail_? set ? where ?`;
					logger.debug('Update Qry: ',updateQry);
					db.query(updateQry,paramList, (err,result)=>{
						if(err){
							logger.error('mysql update err: ',err);
							reject('mysql update err: ',err);
						}else{
							logger.debug('Data Updated');
							resolve('Data Updated');
						}
					});
				}

			}else{
				reject('Data not found');
			}
		});
	});
};

exports.getCentreNode = function(req){
	logger.debug('Inside getCentreNode method: ',req);
	return new Promise (function(resolve, reject){
		let companyId= parseInt(req.companyId);
		let paramList = [companyId,companyId,{serial: req.beaconId} ,companyId,{serial: req.gatewayId}];
		// let findQry = `select nodeId from map_testBeacon_receiver_${req.companyId} where testBeaconId =(select id from device_detail_${req.companyId} where serial = '${req.beaconId}') AND gatewayId =(select id from device_detail_${req.companyId} where serial = '${req.gatewayId}') limit 1`;
		let findQry = `select nodeId from map_testBeacon_receiver_? where testBeaconId =(select id from device_detail_? where ?) AND gatewayId =(select id from device_detail_? where ?') limit 1`;
		logger.debug('Find nodeId qry: ',findQry);
		db.query(findQry,paramList, (err,result,fields)=>{
			if(err){
				reject('Mysql error: ', err);
			}else if(!err && result.length){
				logger.debug('Result: ',result);
				req.primaryNodeId = result[0].nodeId;
				resolve(req);

			}else{
				reject('Data not found');
			}
		});
	});
};

exports.nodeStatus = function(req){
	logger.debug("Inside node status method: " + JSON.stringify(req));
	return new Promise(function(resolve, reject){
		var companyId = parseInt(req.companyId);
		let paramList = [companyId,{serial:req.serial}];
		// let findQry = `select id from device_detail_${req.companyId} where serial ='${req.serial}'`;
		let findQry = `select id from device_detail_? where ?`;
		db.query(findQry,paramList, (err,result,fields)=>{
			if(err){
				reject('Mysql error: ', err);
			}else if(!err && result.length){
				logger.debug('Result for nodeStatus update: ',result);
				let nodeStatusTime = Date.now();
				let paramList = [companyId,{nodeStatus:req.status, nodeStatusTime:nodeStatusTime},{id:result[0].id}];
				// let updateStatus = `update device_detail_${req.companyId} set nodeStatus=${req.status}, nodeStatusTime=${nodeStatusTime} where id=${result[0].id}`;
				let updateStatus = `update device_detail_? set ? where ?`;
				db.query(updateStatus,paramList, (err,result,fields)=>{
					if(err){
						reject('Mysql error: ', err);
					}else{
						resolve(req);
					}
				});
			}else{
				reject('Data not found: ' +req.serial);
			}
		});
	});
};


exports.batteryStatus = function(req){
	logger.debug("Inside beacon battery status method: " + JSON.stringify(req));
	return new Promise(function(resolve, reject){
		var companyId = parseInt(req.companyId);
		let paramList = [companyId,companyId,{serial:req.serial}];
		// let findQry = `select D.id, D.deviceType, D.name, D.serial, D.assetId, D.isBuzz, D.createDate, D.genericId, D.batteryStatus, D.batteryStatusTime, E.name as assetName, E.type as assetType, E.uniqueId from device_detail_${req.companyId} D left join asset_detail_${req.companyId} E on D.assetId=E.id where serial ='${req.serial}'`;
		let findQry = `select D.id, D.deviceType, D.name, D.serial, D.assetId, D.isBuzz, D.createDate, D.genericId, D.batteryStatus, D.batteryStatusTime, E.name as assetName, E.type as assetType, E.uniqueId from device_detail_? D left join asset_detail_? E on D.assetId=E.id where ? AND deviceType=1`;
		db.query(findQry,paramList, (err,rows,fields)=>{
			if(err){
				reject('Mysql error: ', err);
			}else if(!err && rows.length){
				logger.debug('Result Data for batteryStatus: ',rows);
				var batteryStatusTime = Date.now();
				let paramList = [companyId,{batteryStatus:req.batteryStatus, batteryStatusTime:batteryStatusTime},{id:rows[0].id}];
				// var updateBatteryStatus = `update device_detail_${req.companyId} set batteryStatus=${req.batteryStatus}, batteryStatusTime=${batteryStatusTime} where id=${rows[0].id}`;
				var updateBatteryStatus = `update device_detail_? set ? where ?`;
				db.query(updateBatteryStatus,paramList, (err,result,fields)=>{
					if(err){
						reject('Mysql error: ', err);
					}else{
						rows[0].batteryStatus = parseInt(req.batteryStatus);
						rows[0].batteryStatusTime = batteryStatusTime;
						rows[0].companyId = req.companyId;
						resolve(rows[0]);
					}
				});
			
			}else{
				reject('Invalid Beacon Device MacId: ' +req.serial);
			}
		});
	});
};

//qry to get empDetail:- select d.serial as beaconId,d.deviceType,d.name, e.empId, e.fullName as empName from device_detail as d inner join employee_detail as e on e.id=d.empId ;
//qry to fetch zoneInfo:- select z.zoneName,z.maxUsers from zone_detail as z inner join map_user_zone map on z.id=map.zId where z.id = 1 and map.empId = 8;
