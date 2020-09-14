const mongoose = require('mongoose');
const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const NotificationDao = require('./../models/dao/notificationSchema');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const logger = require('../../config/logger');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
var {url} = require('../../config/config');
var _ = require('lodash');
const crypto = require('crypto');
const csv = require('../services/testBeaconService');
var mv = require('mv');


const zoneModel = {
	addZone:addZone,
	listZone:listZone,
	getZone: getZone,
	checkId: checkId,
	checkZoneName:checkZoneName,
	assignUser:assignUser,
	listAssignUser:listAssignUser,
	getReciver:getReciver,
	zoneusermappinglist:zoneusermappinglist,
	zoneDetail:zoneDetail,
	listEnteredAssets:listEnteredAssets,
	zoneNodeInfo:zoneNodeInfo,
	addNodeNeighbour:addNodeNeighbour,
	updateZone:updateZone,
	removeMapping:removeMapping,
	updateZoneType:updateZoneType
};

var notificationDao = new NotificationDao(mongoose);
var notificationModel = notificationDao.getModel();


function addZone(zone, image, companyId) {
	logger.info("User Data: " + JSON.stringify(zone));
	logger.debug("Zone Crood: " + typeof(zone.crood));
	logger.info("crood "+ JSON.stringify(zone.crood));
	return new Promise((resolve, reject) => {
		// var findZone = `select id from zone_detail_${companyId} where name='${zone.name}' `;
		companyId = parseInt(companyId);
		let condition = {name:zone.name};
		let qry = `select id from zone_detail_? where ?` ;
		logger.debug("findZone query: " + qry);
		db.query(qry,[companyId, condition], (err, rows, fields) => {
			if (err) {
				logger.error("Mysql error: ",err);
				dbFunc.connectionReleas;
				reject({"success":false, "message":err.sqlMessage});
			}
			else {
				var width = parseInt(zone.width);
				var height = parseInt(zone.height);
				// let qry = `select plantId from floor_plan_${companyId} where id=${zone.floorId}`;
				let condition = {id:zone.floorId};
				let qry = `select plantId from floor_plan_? where ?`;
				db.query(qry,[companyId,condition], (err, row, fields) => {
					if (err) {
						logger.error("Mysql error: ",err);
						dbFunc.connectionReleas;
						reject({"success":false, "message":err.sqlMessage});
					}
					else if(row.length > 0){
						var plantId = row[0].plantId;
						// var qry = `insert into zone_detail_${companyId} set name='${zone.name}',  zone_image='${image}', floorId='${zone.floorId}', plantId='${plantId}', zone_crood='${zone.crood}', zone_width=${width}, zone_height=${height}, networkId='${zone.networkId}' ,uniqueId='${crypto.randomBytes(2).toString('hex')}'`;
						let dataSet = {name:zone.name,  zone_image:image, floorId:zone.floorId, plantId:plantId, zone_crood:zone.crood, zone_width:width, zone_height:height, networkId:zone.networkId ,uniqueId:crypto.randomBytes(2).toString('hex')};
						let qry = `insert into zone_detail_? set ?`;
						logger.debug("Insert zone query: " + qry);
						db.query(qry,[companyId, dataSet], (err, rows, fields) => {
							if (err) {
								logger.error("Mysql error: ",err);
								dbFunc.connectionRelease;
								reject({"success":false, "message":err.sqlMessage});
							}else{
								resolve({"success":true, "message":"Zone configured successfully"});
							}
						});
					}else{
						reject({"success":false, "message":"Given floor is invalid"});
					}
				});
			}
		});
	});
}

function removeMapping(id, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let qry = `select * from asset_zone_mapping_? where id=?`;
		db.query(qry,[companyId ,id], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject({"success":false, "message":error.sqlMessage});
			} else if(rows.length > 0) {
				logger.debug("Search for relase id: ", JSON.stringify(rows));
				// let qry = `delete from asset_zone_mapping_${companyId} where id=${id}`
				let qry = `delete from asset_zone_mapping_? where id=?`;
				db.query(qry,[companyId ,id], (error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject({"success":false, "message":error.sqlMessage});
					}else{
						resolve({"success":true, "message":"Given asset and zone are released"});
					}
				});

			}else{
				reject({"success":false, "message":"Given Map id is invalid"});
			}
		});
	});
}

function listZone(companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let qry = `select Z.id, Z.name, Z.zone_image,Z.maxUsers, Z.uniqueId, Z.led, Z.zone_crood, Z.zone_width, Z.zone_height, Z.networkId, F.id as floorId,  F.name as floorName, F.floorNo from zone_detail_?  Z left join floor_plan_? F on Z.floorId=F.id`;
		db.query(qry,[companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject({"success":false, "message":error.sqlMessage});
			} else {
				dbFunc.connectionRelease;
				if(rows && rows.length > 0) {
					var result = rows.map((zone) => {
						zone.zone_image = zone.zone_image && `${url.baseUrl}${companyId}/zones/${zone.zone_image}`;
						return zone;
					});
					resolve({"success":true, "items": result, "message":""});
				}
				else {
					resolve({"success":true, "items": rows, "message":""});
				}
			}
		});
	});
}

function getZone(data, companyId){
	logger.info("data in model: " + JSON.stringify(data));
	return new Promise((resolve, reject) => {
		if(data.length > 0){
			data[0].zone_image = data[0].zone_image && `${url.baseUrl}${companyId}/zones/${data[0].zone_image}`;
			resolve({"success":true, "data": data, "message":""});
		}else{
			reject({"success":false, "message":"Zone id is invalid"});
		}
	});
}

function checkId(id, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		// let qry = `select Z.id, Z.name, Z.zone_image, Z.maxUsers, Z.zone_crood, Z.zone_width, Z.zone_height, Z.networkId, F.id as floorId, F.name as floorName, F.floorNo, P.id as plantId, P.name as plantName from zone_detail_${companyId} Z left join floor_plan_${companyId} F on Z.floorId=F.id left join plant_detail_${companyId} P on Z.plantId=P.id where Z.id='${id}'`
		let qry = `select Z.id, Z.name, Z.zone_image, Z.maxUsers, Z.zone_crood, Z.zone_width, Z.zone_height, Z.networkId, F.id as floorId, F.name as floorName, F.floorNo, P.id as plantId, P.name as plantName from zone_detail_? Z left join floor_plan_? F on Z.floorId=F.id left join plant_detail_? P on Z.plantId=P.id where Z.id=?`;
		db.query(qry,[companyId,companyId,companyId,id], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject({"success":false, "message":error.sqlMessage});
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}
				else {
					reject({"success":false, "message":"Zone id is invalid"});
				}
			}
		});
	});
}


function checkZoneName(zoneName, companyId, zoneId) {
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		if (zoneId) {
			var condition = [companyId,{name:zoneName},zoneId];
			// let qry = `select id from zone_detail_${companyId} where name='${zoneName}' AND id <> '${zoneId}'`;
			var qry = `select id from zone_detail_? where ? AND id <> ?`;
		}
		else {
			// let qry = `select id from zone_detail_${companyId} where name='${zoneName}'`;
			var condition = [companyId,{name:zoneName}];
			var qry = `select id from zone_detail_? where ?`;
		}
		logger.debug("FindZone: ", qry);
		db.query(qry,condition, (err, rows, fields) => {
			if (err) {
				logger.error("Mysql error: ",err);
				dbFunc.connectionReleas;
				reject({"success":false, "message":err.sqlMessage});
			}
			else if(rows.length > 0) {
				reject({"success":false, "message":"Zone name already exist ! try with different name"});
			}
			else {
				resolve(true);
			}
		});
	});
}


function getReciver(zoneId, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let paramList = [companyId,zoneId,companyId,zoneId];
		let qry = `select (select count(Distinct nodeId) from node_neighbour_? where zoneId= ?) as nonEdgeNode, (select count(Distinct neighbourNodeId) from node_neighbour_? where zoneId= ?) as edgeNode`;
		db.query(qry,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject({"success":false, "message":error.sqlMessage});
			}else if(rows.length>0){
				dbFunc.connectionRelease;
				resolve({"success":true, "data": rows, "message":""} )
			}else{
				reject({"success":false, "data": rows, "message":"Given zone don't have any user"});
			}
		});
	});
}

function assignUser(zoneId, data, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let condition = {id:data.userId};
		let qry = `select id from asset_detail_? where ?`;
		db.query(qry,[companyId,condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length>0){
					// let qry = `select * from asset_zone_mapping_${companyId} where assetId=${data.userId} and zoneId=${zoneId}`;
					let condition = [companyId,{assetId:data.userId},{zoneId:zoneId}];
					let qry = `select * from asset_zone_mapping_? where ? and ?`;
					db.query(qry,condition, (error, rows, fields) => {
						if (error) {
							dbFunc.connectionRelease;
							reject(error);
						}else if(rows.length > 0){
							reject({"success":false, "message":"Given user is already maped with zone"});
						}else{
							logger.info("Row: " + JSON.stringify(rows));
							// let qry = `insert into asset_zone_mapping_${companyId} set  assetId='${data.userId}' , zoneId='${zoneId}'`;
							let dataSet = {assetId:data.userId, zoneId:zoneId};
							let qry = `insert into asset_zone_mapping_? set ?`;
							db.query(qry,[companyId,dataSet], (error, rows, fields) => {
								if (error) {
									dbFunc.connectionRelease;
									reject(error);
								}else{
									resolve({"success":true,"message":"User assigned to zone"});
								}
							});
						}
					});

				}else{
					reject({"success":false, "message":"Given user id is invalid"});
				}
			}
		});
	});
}


function listAssignUser(zoneId, companyId){
	return new Promise((resolve, reject) => {
		let paramList = [companyId,companyId,companyId,zoneId];
		companyId = parseInt(companyId);
		let qry = `select mapUZ.id, mapUZ.assetId, E.name, mapUZ.zoneId, Z.name as zoneName from asset_zone_mapping_? mapUZ left join asset_detail_? E on mapUZ.assetId=E.id left join zone_detail_? Z on mapUZ.zoneId=Z.id where mapUZ.zoneId=?`;
		db.query(qry,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else if(rows.length>0){
				dbFunc.connectionRelease;
				resolve({"success":true, "data": rows, "message":""} )
			}else{
				reject({"success":false, "data": rows, "message":"Given zone don't have any user"});
			}
		});
	});
}

function zoneusermappinglist(companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let paramList= [companyId,companyId,companyId,companyId,companyId];
		let qry =`select  aT.assetTypeName, sT.name as subName, mapUZ.id, E.uniqueId, E.name as assetName,  E.type as assetType, mapUZ.zoneId, Z.name as zoneName from asset_zone_mapping_? mapUZ left join asset_detail_? E on mapUZ.assetId=E.id left join zone_detail_? Z on mapUZ.zoneId=Z.id left join asset_type_list_? aT on E.type=aT.id left join asset_subType_detail_? sT on E.subType= sT.id`;
		db.query(qry,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				resolve({"success":true, "data": rows, "message":""} );
			}
		});
	});
}

function zoneDetail(companyId, query){
	var assetTypeId = query && query.assetTypeId && query.assetTypeId.trim();
	return new Promise((resolve, reject) => {
		var qry;
		companyId = parseInt(companyId);
		var condition = {};
		if(query && query.floorId){
			condition = {floorId:query.floorId};
			qry = `select * from zone_detail_? where ?`;
		}else{
			qry = `select * from zone_detail_?`;
		}
		logger.debug("Qry for get zone detail: ", qry);
		db.query(qry,[companyId,condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else if(rows.length > 0) {
				var data = [];
				logger.info("Row Data: " + rows.length);
				rows.forEach(zone => {
					logger.info("Zone Data: " + JSON.stringify(zone.id));
					var findAssetCount;
					if(assetTypeId) {
						findAssetCount = {
							"zoneId":zone.id,
							"assetTypeId":assetTypeId,
							"isEntry" : true,
							"type" : 0,
							"companyId":companyId,
							"isMax":null,
							"isMaxTime":null,
							"isMin":null
						};
					}
					else {
						findAssetCount = {
							"zoneId":zone.id,
							"isEntry" : true,
							"type" : 0,
							"companyId":companyId,
							"isMax":null,
							"isMaxTime":null,
							"isMin":null
						};
					}
					notificationModel.find(findAssetCount).sort({"time":-1}).exec(function(err, result) {
						if (err) {
							reject({"success":false, "data": err, "message":""});
						}else{
							//logger.debug('First qry data: ' , JSON.stringify(result));
							var temObj = {};
							var dateOffset = (24*60*60*1000);
							var diffTime = new Date();
							diffTime.setTime(diffTime.getTime() - dateOffset);
							var diff = diffTime.getTime();
							var currentTime = Date.now();
							//logger.debug("Current Time: ", typeof(currentTime));
							//logger.debug("Diff Time: ", typeof(diff));
							let zoneVoilationQry;
							if(assetTypeId) {
								zoneVoilationQry = {
									"time":{$gte: JSON.stringify(diffTime), $lte: JSON.stringify(currentTime)},
									"isEntry" : true,
									"type":0,
									"zoneId" : JSON.stringify(zone.id),
									"assetTypeId":assetTypeId,
									"companyId":companyId,
									$or:[{"isAllowed" : 0}, {"isMax" : 1},{"isMaxTime":1}]
								};
							}
							else {
								zoneVoilationQry = {
									"time":{$gte: JSON.stringify(diffTime), $lte: JSON.stringify(currentTime)},
									"isEntry" : true,
									"type":0,
									"zoneId" : JSON.stringify(zone.id),
									"companyId":companyId,
									$or:[{"isAllowed" : 0}, {"isMax" : 1},{"isMaxTime":1}]
								};
							}
							notificationModel.find(zoneVoilationQry).sort({"time":-1}).exec(function(err, res) {
								if (err) {
									reject({"success":false, "data": err, "message":""});
								}else{
									if(res.length > 0 ){
										logger.debug("Count time: ", res[0]);
										temObj["voilation24hr"]= res.length;
										temObj["message"] = res[0].message;
									}else{
										logger.debug("Count time: ", res[0]);
										temObj["voilation24hr"]= 0;
										temObj["message"] = "";
									}

									if(result.length > 0){
										var allowedUsers = 0,
											notallowedUsers = 0;
										result.forEach(element => {
											if(element.isAllowed === 1){
												allowedUsers++;
											}else{
												notallowedUsers++;
											}
										});
										temObj["id"] = zone.id;
										temObj["name"] = zone.name;
										temObj["allowedUsers"] = allowedUsers;
										temObj["notallowedUsers"] = notallowedUsers;
										temObj["activeUser"] = allowedUsers + notallowedUsers;
										temObj["time"] = result[0].time;
									}else{
										temObj["id"] = zone.id;
										temObj["name"] = zone.name;
										temObj["allowedUsers"] = 0;
										temObj["notallowedUsers"] = 0;
										temObj["activeUser"] = 0;
										temObj["time"] = 0;
									}
									data.push(temObj);
									if(rows.length == data.length){
										data = _.orderBy(data, [zone => zone.name.toLowerCase()], ['asc']);
										resolve({"success":true, "items": data, "message":""});
									}
								}
							});
						}
					});
				});
			}
			else{
				resolve({"success":true, "items":[], "message":""});
			}
		});
		// db.query(qry, (error, rows, fields) => {
		// 	if (error) {
		// 		dbFunc.connectionRelease;
		// 		reject(error);
		// 	}
		// 	else if(rows.length > 0){
		// 		var data = [];
		// 		logger.info("Row Data: " + rows.length);
		// 		rows.forEach(zone => {
		// 			logger.info("Zone Data: " + JSON.stringify(zone.id));


		// 			notificationModel.find({"zoneId" : zone.id, "isEntry" : true, "type" : 0, "companyId":companyId, "isMax":null, "isMaxTime":null, "isMin":null}).sort({"time":-1}).exec(function(err, result) {
		// 				if (err) {

		// 					reject({"success":false, "data": err, "message":""});
		// 				}else{
		// 					var temObj = {};

		// 					if(result.length > 0){
		// 						var allowedUsers = 0,
		// 							notallowedUsers = 0;
		// 						result.forEach(element => {
		// 							if(element.isAllowed === 1){
		// 								allowedUsers++
		// 							}else{
		// 								notallowedUsers++
		// 							}
		// 						});
		// 						temObj["id"] = zone.id;
		// 						temObj["name"] = zone.name;
		// 						temObj["allowedUsers"] = allowedUsers;
		// 						temObj["notallowedUsers"] = notallowedUsers;
		// 						temObj["time"] = result[0].time;

		// 					}else{
		// 						temObj["id"] = zone.id;
		// 						temObj["name"] = zone.name;
		// 						temObj["allowedUsers"] = 0;
		// 						temObj["notallowedUsers"] = 0;
		// 						temObj["time"] = 0;
		// 					}
		// 					data.push(temObj);
		// 					if(rows.length == data.length){
		// 						data = _.orderBy(data, [zone => zone.name.toLowerCase()], ['asc']);
		// 						resolve({"success":true, "data": data, "message":""});
		// 					}

		// 				}
		// 			});
		// 		});

		// 	}else{
		// 		reject({"success":false,  "message":"Floor Id is invalid"});
		// 	}
		// });
	});
}


function getasset(zoneId){
   return new Promise((resolve, reject) => {
    notificationModel.find({"zoneId" : zoneId, "isEntry" : true, "type" : 0},(err,result)=>{
        if (err) {
            reject({"success":false,  "message":err});
        }else{
            resolve({"success":true, "data": result, "message":""});
        }
    });
   });
}


function listEnteredAssets(zoneId, companyId, assetTypeId){
	return new Promise((resolve, reject) => {
		let findAssetEntry;
		companyId = parseInt(companyId);
		if(assetTypeId) {
			findAssetEntry = {
				"zoneId":zoneId,
				"assetTypeId":assetTypeId,
				"isEntry" : true,
				"type" : 0,
				"companyId":companyId,
				"isMax":null,
				"isMaxTime":null,
				"isMin":null
			};
		}
		else {
			findAssetEntry = {
				"zoneId" : zoneId,
				"companyId": companyId,
				"isEntry" : true,
				"type":0,
				"isMax": null,
				"isMaxTime": null,
				"isMin":null
			};
		}
		notificationModel.find(findAssetEntry,(err,result)=>{
			if (err) {
				reject({"success":false, "data": err, "message":""});
			}else{
				var tempObj = [];
				if(result && result.length > 0){
					logger.debug("listEnteredAssets: ", JSON.stringify(result));
					var counter = 0;
					result.forEach(function(res) {
						counter++;
						//let qry = `select A.id, A.name, A.uniqueId, A.type, A.asset_image, A.attribute_value, A.subType, sT.name subTypeName, T.assetTypeName, T.icon from asset_detail_? A left join asset_type_list_? T on A.type=T.id left join asset_subType_detail_? sT on A.subType=sT.id where A.uniqueId=?`;
						var qry = `select A.id, A.name as assetName, A.uniqueId, A.type, A.asset_image, A.attribute_value, A.subType, sT.name subTypeName, T.assetTypeName, T.icon from asset_detail_? A left join asset_type_list_? T on A.type=T.id left join asset_subType_detail_? sT on A.subType=sT.id where A.uniqueId=?`;
						logger.debug("listEnteredAssets: ", qry);
						let paramList = [companyId,companyId,companyId,res.empId];
						db.query(qry,paramList, (error, row, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							}else if(row.length > 0){
								dbFunc.connectionRelease;
								logger.debug("Row data: ", JSON.stringify(row));
								if(row[0].asset_image != undefined){
									row[0].asset_image = row[0].asset_image && `${url.baseUrl}${companyId}/asset_image/${row[0].asset_image}`;

								}else{
									row[0].asset_image = row[0].icon;
								}
								row[0].beaconId = res.beaconId;
								row[0].entryTime = res.entryTime;
								row[0].message = res.message;
								row[0].isAllowed = res.isAllowed;
								tempObj.push(row[0]);
								if(tempObj.length === counter) {
									resolve({"success":true, "items": tempObj, "message":""});
								}
							}else{
								logger.warn("Asset is not added");
							}
						});
					});
				}
				else {
					resolve({"success":true, "items": tempObj, "message":"No records found"});
				}
			}
		});
	});
}

function zoneNodeInfo(zoneId, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let condition = {zoneId:zoneId};
		let qry = `select * from device_detail_? where ?`;
		db.query(qry,[companyId,condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject({"success":false, "message":error.sqlMessage});
			}else{
				dbFunc.connectionRelease;
				var centralNodeId = [];
				var neighbourNodeId = [];
				var result = {};
				if(rows.length > 0){
					rows.forEach(function(device, i) {
						if(device.nodeType === 1) {
							centralNodeId.push(device.nodeId);
						}
						else if (device.nodeType === 2) {
							neighbourNodeId.push(device.nodeId);
						}
						if(rows.length - 1 === i) {
							result['zoneId'] = zoneId;
							result['centralNodeId'] = centralNodeId;
							result['neighbourNodeId'] = neighbourNodeId;
							resolve({"success":true, "data": result, "message":""});
						}
					});
				}
				else {
					result['zoneId'] = zoneId;
					result['centralNodeId'] = centralNodeId;
					result['neighbourNodeId'] = neighbourNodeId;
					resolve({"success":true, "data": result, "message":""});
				}
			}
		});
	});
}

function addNodeNeighbour(zoneId, data, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		var discardedData = [];
		data.neighbourNodeId.forEach(function(id, i) {
			var tmpObj = {
				zoneId:zoneId,
				nodeId:data.centralNodeId,
				neighbourNodeId:id,
				gatewayId:data.gatewayId
			};
			let condition = [companyId,{zoneId:zoneId},{nodeId:tmpObj.nodeId},{neighbourNodeId:tmpObj.neighbourNodeId},{gatewayId:tmpObj.gatewayId}];
			let qry = `SELECT * FROM node_neighbour_detail_? where ? AND ? AND ? AND ?`;
			db.query(qry,condition,(err, rows, fields) => {
				if (err) {
					dbFunc.connectionRelease;
					reject({"success":false, "message":err.sqlMessage});
				}
				else if (rows.length > 0){
					discardedData.push(tmpObj.neighbourNodeId);
					if((data.neighbourNodeId.length - 1) === i) {
						resolve({suceess:true, message:'Inserted successfully'});
					}
				}
				else {
					let qry = `INSERT INTO node_neighbour_detail_? SET ?`;
					db.query(qry,[companyId,tmpObj], (err, rows, fields) => {
						if (err) {
							dbFunc.connectionRelease;
							reject({"success":false, "message":err.sqlMessage});
						}
						else {
							if((data.neighbourNodeId.length - 1) === i) {
								resolve({suceess:true, message:'Inserted suceessfully'});
							}
						}
					});
				}
			});
		});
	});
}

function updateZone(zone, image, companyId, oldZoneData, isImageUpload) {
	logger.info("New zone Data: " + JSON.stringify(zone));
	logger.debug("Zone Crood: " + typeof(zone.crood));
	logger.info("crood "+ JSON.stringify(zone.crood));
	return new Promise((resolve, reject) => {
		var width = parseInt(zone.width);
		var height = parseInt(zone.height);
		companyId = parseInt(companyId);
		var qry;
		var condition = {};
		var paramList = [];
		var dataSet = {};
		var imageName;
		if(isImageUpload == 1) {
			dataSet = {name:zone.name,  zone_image:image, floorId:zone.floorId, zone_crood:zone.crood, zone_width:width, zone_height:height, networkId:zone.networkId};
			condition = {id:oldZoneData.id};
			paramList = [companyId,dataSet,condition];
			// qry = `update zone_detail_${companyId} set name='${zone.name}',  zone_image='${image}', floorId='${zone.floorId}', zone_crood='${zone.crood}', zone_width=${width}, zone_height=${height}, networkId='${zone.networkId}' where id='${oldZoneData.id}'`;
			 qry = `update zone_detail_? set ? where ?`;

		}
		else {
			if(zone.name != oldZoneData.name) {
				var ext = oldZoneData.zone_image.substring(oldZoneData.zone_image.lastIndexOf(".")+1);
				imageName = zone.name + '.' + ext;
				// qry = `update zone_detail_${companyId} set name='${zone.name}', zone_image='${imageName}', floorId='${zone.floorId}', zone_crood='${zone.crood}', zone_width=${width}, zone_height=${height}, networkId='${zone.networkId}' where id='${oldZoneData.id}'`;
				dataSet = {name:zone.name, zone_image:imageName, floorId:zone.floorId, zone_crood:zone.crood, zone_width:width, zone_height:height, networkId:zone.networkId};
				condition = {id:oldZoneData.id};
				paramList = [companyId,dataSet,condition];
				qry = `update zone_detail_? set ? where ?`;
			}
			else {
				// qry = `update zone_detail_${companyId} set name='${zone.name}', floorId='${zone.floorId}', zone_crood='${zone.crood}', zone_width=${width}, zone_height=${height}, networkId='${zone.networkId}' where id='${oldZoneData.id}'`;
				dataSet = {name:zone.name, floorId:zone.floorId, zone_crood:zone.crood, zone_width:width, zone_height:height, networkId:zone.networkId};
				condition = {id:oldZoneData.id};
				paramList = [companyId,dataSet,condition];
				qry = `update zone_detail_? set ? where ?`;
			}
		}
		logger.debug("Update zone query: " + JSON.stringify(qry));
		db.query(qry,paramList, (err, rows, fields) => {
			if (err) {
				logger.error("Mysql error: ",err);
				dbFunc.connectionRelease;
				reject({"success":false, "message":err.sqlMessage});
			}else{
				dbFunc.connectionRelease;
				if((isImageUpload == 0) && (zone.name != oldZoneData.name)) {
					var oldPath = `${process.env.PWD}/uploads/${companyId}/zones/${oldZoneData.zone_image}`;
					var newPath = `${process.env.PWD}/uploads/${companyId}/zones/${imageName}`;
					logger.debug('oldPath:', oldPath, ',', 'newPath:', newPath);
					mv(oldPath, newPath, function(err) {
						if(err) {
							logger.error(err);
						}
						else {
							logger.debug('file name renamed for zone:', imageName);
							resolve({"success":true, "message":"Zone Data updated successfully"});
						}
					});
				}
				else {
					resolve({"success":true, "message":"Zone Data updated successfully"});
				}
			}
		});
	});
}

function updateZoneType(zoneId, zoneType, companyId) {
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let paramList =[companyId,zoneType,zoneId];
		let qry = `update device_detail_? set zoneType= ? where zoneId= ?`;
		logger.debug("Update zoneType query in device table: " + JSON.stringify(qry));
		db.query(qry,paramList, (err, result) => {
			if (err) {
				logger.error("Mysql error: ",err);
				dbFunc.connectionRelease;
				reject({"success":false, "message":err.sqlMessage});
			}else{
				dbFunc.connectionRelease;
				let paramList = [companyId,zoneType,zoneId];
				let qry = `update node_neighbour_detail_? set zoneType= ? where zoneId= ?`;
				logger.debug("Update zoneType query in node neighbour: " + JSON.stringify(qry));
				db.query(qry,paramList, (err, res) => {
					if (err) {
						logger.error("Mysql error: ",err);
						dbFunc.connectionRelease;
						reject({"success":false, "message":err.sqlMessage});
					}else{
						let qry = `select gatewayId from node_neighbour_detail_? where zoneId= ?`;
						logger.debug("Find gatewayId query from node neighbour: " + JSON.stringify(qry));
						db.query(qry,[companyId,zoneId], (err, rows, fields) => {
							if (err) {
								logger.error("Mysql error: ",err);
								dbFunc.connectionRelease;
								reject({"success":false, "message":err.sqlMessage});
							}else{
								if(rows.length > 0) {
									var data = {};
									data.gatewayId = rows[0].gatewayId;
									csv.generateCsv(data, companyId).then((result)=>{
										logger.info("Return data: ", JSON.stringify(result));
									}).catch((err) =>{
										logger.error(err);
									});
								}
								resolve({"success":true, "message":"Zone Type updated successfully"});
							}
						});
					}
				});
			}
		});
	});
}

/*function updateZoneType(zoneId, zoneType, companyId) {
	return new Promise((resolve, reject) => {
		var qry = `update device_detail_${companyId} set zoneType='${zoneType}' where zoneId='${zoneId}'`;
		logger.debug("Update zoneType query in device table: " + JSON.stringify(qry));
		db.query(qry, (err, result) => {
			if (err) {
				logger.error("Mysql error: ",err);
				dbFunc.connectionRelease;
				reject({"success":false, "message":err.sqlMessage});
			}else{
				dbFunc.connectionRelease;
				var query = `update node_neighbour_detail_${companyId} set zoneType='${zoneType}' where zoneId='${zoneId}'`;
				logger.debug("Update zoneType query in node neighbour: " + JSON.stringify(query));
				db.query(query, (err, res) => {
					if (err) {
						logger.error("Mysql error: ",err);
						dbFunc.connectionRelease;
						reject({"success":false, "message":err.sqlMessage});
					}else{
						var findQry = `select gatewayId from node_neighbour_detail_${companyId} where zoneId='${zoneId}'`;
						logger.debug("Find gatewayId query from node neighbour: " + JSON.stringify(findQry));
						db.query(findQry, (err, rows, fields) => {
							if (err) {
								logger.error("Mysql error: ",err);
								dbFunc.connectionRelease;
								reject({"success":false, "message":err.sqlMessage});
							}else{
								if(rows.length > 0) {
									var data = {};
									data.gatewayId = rows[0].gatewayId;
									var operation = 0;
									var offset = 0;
									var isDataExists = false;
									csv.generateJson(data, companyId, operation, offset, isDataExists).then((result)=>{
										logger.info("Return data: ", JSON.stringify(result));
									}).catch((err) =>{
										logger.error(err);
									});
								}
								resolve({"success":true, "message":"Zone Type updated successfully"});
							}
						});
					}
				});
			}
		});
	});
}*/

module.exports = zoneModel;
