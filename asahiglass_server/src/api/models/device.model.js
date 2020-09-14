const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
var fs = require('fs');
const logger = require('../../config/logger');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
var createGatewaySerialFolder = require('../helpers/createGatewaySerialFolder');
var controlRoomZone = require('../services/controllroomZoneService');
var mqttPub = require('../protocolGateway/mqttProtocolpubliser');
var renameGatewayFolder = require('../helpers/renameGatewayFolder');
var nodeNeighbour = require('../helpers/nodeNeighbour');
const csv = require('../services/testBeaconService');
const findGateway = require('../helpers/findGateway');

const deviceModel = {
	addDevice:addDevice,
	listDevice:listDevice,
	checkId: checkId,
	getDevice:getDevice,
	getBeacon:getBeacon,
	getReciver:getReciver,
	getGateway:getGateway,
	updateDevice:updateDevice,
	addDeviceData:addDeviceData,
	getDevices:getDevices,
	mapAssetAndDevice:mapAssetAndDevice,
	getmapAssetDevice:getmapAssetDevice,
	getRfidCards:getRfidCards,
	mapAssetAndDeviceByCsv:mapAssetAndDeviceByCsv,
	getProvisioningDevice:getProvisioningDevice,
	createAndMapDevice:createAndMapDevice,
	getBusGateway:getBusGateway,
	getFoodCartGateway:getFoodCartGateway,
	getProvisioning:getProvisioning,
	testBeaconList:testBeaconList,
	nodeNeighbourDetail:nodeNeighbourDetail,
	deviceHealth:deviceHealth,
	beaconBatteryStatus:beaconBatteryStatus,
	provisionNodeAndGateway:provisionNodeAndGateway,
	updateNodeRssi:updateNodeRssi
};
 


function addDevice(device, cId, creatorId) {
	logger.info("Device Data: " + JSON.stringify(device));
	cId = parseInt(cId);
	return new Promise((resolve, reject) => {
		// let qry = `select serial from device_detail_${cId} where serial='${device.serial}'`;
		let condition = {serial:device.serial};
		let qry = `select serial from device_detail_? where ?`;
		db.query(qry,[cId,condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else if(rows.length > 0) {
				reject({"success":false, "message":"Given device serial already exists"});
			}else{

				if(device.deviceType == 2) {
					var dataSet = {
						name:device.name,
						serial:device.serial,
						deviceType:device.deviceType,
						createDate:Date.now(),
						gwSerial:device.gatewayMacId,
						nodeType:device.nodeType || null,
						nodeId:device.nodeId || null,
						networkId:device.networkId || null,
						x_axis:device.x_axis || null,
						y_axis:device.y_axis || null,
						z_axis:device.z_axis || null,
						zoneId:device.zoneId || null,
						isBuzz:device.isBuzz || 0
					};
				}
				else if(device.deviceType == 3) { 
					var dataSet = {
						name:device.name,
						serial:device.serial,
						deviceType:device.deviceType,
						subAddress:device.subAddress,
						pubAddress:device.pubAddress,
						healthAddress:device.healthAddress,
						isBuzz:device.isBuzz || 0,
						genericId:device.genericId || null,
						createDate:Date.now()
					};
				}	
				else {
					var dataSet = {
						name:device.name,
						serial:device.serial,
						deviceType:device.deviceType,
						isBuzz:device.isBuzz || 0,
						genericId:device.genericId || null,
						createDate:Date.now()
					};
				}
				var qry = `INSERT INTO device_detail_? SET ?`;
				logger.debug("Query for insert Device Data: " + qry);
				db.query(qry, [cId,dataSet], (error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					}else{
						if(device.deviceType == 3) {
							createGatewaySerialFolder.createGatewaySerialFolder(cId, device.serial).then((data)=>{
								logger.debug("Gateway folder created: " + device.serial);
							});
						}
						/*else if(device.deviceType == 8){
							logger.debug("Device Zones: ",  device.zones)
							controlRoomZone.mapControlRoomZone(cId,rows.insertId, device.zones).then((data => {
								logger.debug("Control room  created: " + device.serial);
							}));
						}*/
						logger.debug("Rows data in device: " + JSON.stringify(rows));
						resolve({"success":true,  "message":"Device Data Saved Successfully"});
					}
				});
			}
		}); 
	});
}

function listDevice(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select D.id, D.deviceType, D.name, D.serial, D.assetId, D.isBuzz, D.createDate, D.genericId, E.name as assetName from device_detail_?  D left join asset_detail_? E on D.assetId=E.id`,[companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else {
				dbFunc.connectionRelease;
				resolve({"success":true, "data": rows, "message":""});
			}
		}); 
	});
}

function checkId(id, companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		let condition = [companyId,{id:id},{serial:id}];
		// var query = `select * from device_detail_${companyId} where id='${id}' OR serial='${id}'`;
		let qry = `select * from device_detail_? where ? OR ?`;
		db.query(qry,condition, (error, rows, fields) => {
			if(error){
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}else{
					reject({"success":false, "message":"Device not Found"});
				}
			}
		}); 
	});
}

function getDevice(data, companyId){
	companyId = parseInt(companyId);
	logger.debug("data in model: " + JSON.stringify(data));
	return new Promise((resolve, reject) => {
		if(data.length > 0){
			var result = [];
			let condition = [companyId,{gwSerial:data[0].serial},{deviceType:2}];
			// var query = `select * from device_detail_${companyId} where gwSerial='${data[0].serial}' AND deviceType=2`;
			let qry = `select * from device_detail_? where ? AND ?`;
			db.query(qry,condition, (error, rows, fields) => {
				if (error) {
					dbFunc.connectionRelease;
					reject(error);
				}else{
					dbFunc.connectionRelease;
					if(rows.length > 0){
						rows.forEach(function(device, i) {
							var tmpObj = {
								nodeId:device.nodeId,
								nodeMacId:device.serial
							};
							result.push(tmpObj);
							if(rows.length - 1 === i) {
								data[0].associatedNodes = result;
								resolve({"success":true, "data": data[0], "message":""});
							}
						});
					}
					else {
						data[0].associatedNodes = result;
						resolve({"success":true, "data": data[0], "message":""});
					} 
				}
			});
		}else{
			reject({"success":false, "message":"Device not Found"});
		}
	});
}

function getBeacon(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select D.id, D.deviceType, D.name, D.serial, D.assetId, D.isBuzz, D.createDate, D.genericId, E.name as assetName, E.type as assetType from device_detail_? D left join asset_detail_? E on D.assetId=E.id where D.deviceType=1`,[companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				logger.info("Get Beacon: " + JSON.stringify(rows));
				resolve({"success":true, "data": rows, "message":""} );
			}
		}); 
	});
}


/*function getReciver(companyId){
	return new Promise((resolve, reject) => { 
		db.query(`select D.id, D.deviceType, D.name, D.serial, D.isBuzz, D.createDate, D.genericId from device_detail_${companyId} D left join asset_detail_${companyId} E on D.assetId=E.id where D.deviceType=2`, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				resolve({"success":true, "data": rows, "message":""} );
			}
		}); 
	});
}*/


function getReciver(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => { 
		db.query(`select * from device_detail_? where deviceType=2`,[companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}

function getProvisioning(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => { 
		db.query(`select dd.id deviceId, ad.id assetId, dd.serial, dd.name as deviceName, dd.deviceType, ad.name from device_detail_? as dd left join asset_detail_? ad on dd.assetId= ad.id where (deviceType= 1 OR deviceType= 5) AND (dd.assetId is not null)`,[companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}

function getGateway(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select * from device_detail_? where deviceType=3`,[companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}

function updateDevice(data, oldData, companyId){
	logger.debug("Update Device data: " + JSON.stringify(data));
	logger.debug("Update Device id: " + JSON.stringify(oldData.id));
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		var dataSet = {
			name:data.name,
			deviceType:data.deviceType,
			serial:data.serial,
			assetId:data.assetId || null,
			nodeId:data.nodeId || null,
			networkId:data.networkId || null,
			network_key:data.network_key || null,
			subAddress:data.subAddress || null,
			pubAddress:data.pubAddress || null,
			healthAddress:data.healthAddress || null,
			isBuzz:data.isBuzz || 0,
		};
		let condition1 = {id:oldData.id};
		let condition2 = {serial:JSON.stringify(oldData.id)};
		let paramList = [companyId,dataSet,condition1,condition2];
		// var qry = `update device_detail_${companyId} SET ? where id='${oldData.id}' OR serial='${oldData.id}'`;
		var qry = `update device_detail_? SET ? where ? OR ?`;
		logger.debug("Query for device Update: " + qry);
		db.query(qry, paramList, (error, rows, fields) => {
			if (error) {
				logger.error("Mysql error: ",error);
				dbFunc.connectionReleas;
				reject({"success":false, "message":error.sqlMessage});
			}else{
				if(dataSet.deviceType == 3 && (dataSet.serial != oldData.serial)) {
					logger.debug('Inside renaming gateway folder');
					renameGatewayFolder.renameGatewayFolder(companyId, oldData.serial, dataSet.serial).then((data)=>{
						logger.debug('Gateway folder renamed from %s to %s', oldData.serial, dataSet.serial);
					}).catch((err) => {
						logger.error(err);
				  	});
				}
				resolve({"success":true,"message":"Device Updated Successfully"});
			}
		});
	});
}


function addDeviceData(deviceData, csvHeader, companyId) {
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		var discardedDevice = [];
		var counter = 0;
		deviceData.forEach(function(data) {
			var tmpObj = {
				name:data[0],
				serial:data[1],
				deviceType:data[2],
				nodeId:data[3] || null,
				isBuzz:data[4] || 0,
				genericId:data[5] || null,
				subAddress:data[6] || null,
				pubAddress:data[7] || null,
				healthAddress:data[8] || null,
				createDate:Date.now()
			};
			//var qry = `INSERT INTO device_detail_${companyId} (name, serial, deviceType, nodeId, isBuzz, genericId, createDate) VALUES (?,?,?,?,?,?,?)`;
			let qry = `INSERT INTO device_detail_? SET ?`;
			db.query(qry, [companyId, tmpObj] ,(err, res) => {
				counter++;
				if (err) {
					dbFunc.connectionRelease;
					var errData = {};
					errData.name = tmpObj.name;
					errData.serial = tmpObj.serial;
					errData.errMessage = err.sqlMessage;
					//tmpObj.errMessage = err.sqlMessage;
					discardedDevice.push(errData);
				}
				else{
					if(tmpObj.deviceType == 3) {
						createGatewaySerialFolder.createGatewaySerialFolder(companyId, tmpObj.serial).then((data)=>{
							logger.debug("Gateway folder created: " + tmpObj.serial);
						});
					}
				}
				if(deviceData.length == counter) {
					if(discardedDevice.length > 0) {
						reject({success:false, list:discardedDevice,message:'Device data discarded'});
					}
					else {
						resolve({success:true, message:'All Device data inserted suceessfully'});
					}
				}
			});
		});
	});
}

function getDevices(companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		db.query(`select * from device_detail_?`,[companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}


function mapAssetAndDevice(deviceId, data, companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		// let qry = `select id from asset_detail_${companyId} where id='${data.assetId}'`;
		let condition = {id:data.assetId};
		let qry = `select id from asset_detail_? where ?`;
		db.query(qry,[companyId, condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length>0){
					let condition = {id:deviceId};
					let qry = `select * from device_detail_? where ?`;
					db.query(qry,[companyId, condition], (error, rows, fields) => {
						if (error) {
							dbFunc.connectionRelease;
							reject(error);
						}else {
							if(rows[0].assetId) {
								reject({"success":false, "message":"Given Device is already mapped with an asset"});
							}
							else{
								let dataSet = {assetId:data.assetId};
								let condition = {id:deviceId};
								let paramList = [companyId,dataSet,condition];
								// let qry = `update device_detail_${companyId} set assetId='${data.assetId}' where id= '${deviceId}'`
								let qry = `update device_detail_? set ? where ?`
								db.query(qry,paramList, (error, rows, fields) => {
									if (error) {
										dbFunc.connectionRelease;
										reject(error);
									}else{
										resolve({"success":true,"message":"Asset mapped with device Successfully"});
									}
								});
							}
						}
					});
				}else{
					reject({"success":false, "message":"Given asset id is invalid"});
				}
			}
		}); 
	});
}

function getmapAssetDevice(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select D.id, D.deviceType, D.name, D.serial, D.assetId, D.isBuzz, D.createDate, D.genericId, E.name as assetName, E.type as assetType from device_detail_? D left join asset_detail_? E on D.assetId=E.id where D.deviceType=1 AND E.name <> 'NULL'`,[companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
			
				resolve({"success":true, "data": rows, "message":""} );
			}
		}); 
	});
}

function getRfidCards(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select D.id, D.deviceType, D.name, D.serial, D.isBuzz, D.createDate, D.genericId, E.name as assetName from device_detail_? D left join asset_detail_? E on D.assetId=E.id where D.deviceType=5`,[companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}

function getProvisioningDevice(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select D.id, D.deviceType, D.name, D.serial, D.isBuzz, D.createDate, D.genericId, E.name as assetName from device_detail_? D left join asset_detail_? E on D.assetId=E.id where D.deviceType=9`,[companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}

function mapAssetAndDeviceByCsv(deviceData, companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		var discardedDevice = [];
		deviceData.forEach(function(data, i) {
			let qry = `select id from asset_detail_? where ?`;
			let condition = {id:data.uniqueId};
			db.query(qry,[companyId,condition],(err, rows, fields) => {
				if (err) {
					dbFunc.connectionRelease;
					data.errMessage = err.sqlMessage;
					discardedDevice.push(data);
				}
				else{
					dbFunc.connectionRelease;
					let condition = [companyId,{serial:data.serial},{deviceType:data.deviceType}];
					let qry = `select * from device_detail_? where ? AND ?`;
					db.query(qry,condition, (error, rows, fields) => {
						if (error) {
							dbFunc.connectionRelease;
							reject(error);
						}else {
							if(rows[0].assetId) {
								data.errMessage = "Given Device is already mapped with an asset";
								discardedDevice.push(data);
							}
							else{
								// let qry = `update device_detail_${companyId} set assetId='${data.assetId}' where id= '${rows[0].id}'`;
								let dataSet = {assetId:data.assetId};
								let condition = {id:rows[0].id};
								let paramList = [companyId,dataSet,condition];
								let qry = `update device_detail_? set ? where ?`;
								db.query(qry,paramList, (error, rows, fields) => {
									if (error) {
										dbFunc.connectionRelease;
										reject(error);
									}else{
										if(deviceData.length - 1 === i) {
											if(discardedDevice.length > 0) {
												reject({success:false, list:discardedDevice,message:'Device data discarded'});
											}
											else {
												resolve({success:true, message:'All Device data inserted suceessfully'});
											}
										}
									}
								});
							}
						}
					});
				}
			});
		});
	});
}


function createAndMapDevice(body, companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		// let qry = `select (select id from device_detail_${companyId} where serial='${body.serial}' AND deviceType='${body.deviceType}') as dId, (select id from device_detail_${companyId} where assetId='${body.assetId}' AND deviceType='${body.deviceType}') as aId`;
		let condition = [companyId,{serial:body.serial},{deviceType:body.deviceType},companyId,{assetId:body.assetId},{deviceType:body.deviceType}];
		let qry = `select (select id from device_detail_? where ? AND ?) as dId, (select id from device_detail_? where ? AND ?) as aId`;
		db.query(qry,condition, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject({"success": false, "message":error.sqlMessage});
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					if(rows[0].dId && !rows[0].aId) {
						let dataSet = {assetId:body.assetId, name:body.name};
						let condition = {id:rows[0].dId};
						let paramList = [companyId,dataSet,condition];
						// let qry = `update device_detail_${companyId} set assetId='${body.assetId}', name='${body.name}' where id= '${rows[0].dId}'`;
						let qry = `update device_detail_? set ? where ?`;
						logger.debug('Map assetId to Device Query: ' +qry);
						db.query(qry,paramList, (error, rows, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject({"success": false, "message":error.sqlMessage});
							}else{
								dbFunc.connectionRelease;
								resolve({success:true, message:'Device Mapped with Asset Successfully'});
							}
						});
					}
					else if(rows[0].aId && !rows[0].dId) {
						var temp = null;
						let dataSet = {assetId:temp, name:body.name};
						let condition = {id:rows[0].aId};
						let paramList = [companyId,dataSet,condition];
						// var qry = `update device_detail_${companyId} SET assetId=${temp}, name='${body.name}' where id='${rows[0].aId}'`;
						let qry = `update device_detail_? SET ? where ?`;
						db.query(qry,paramList, (error, rows, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject({"success": false, "message":error.sqlMessage});
							}else{
								dbFunc.connectionRelease;
								let dataSet = {
									name:body.name,
									serial:body.serial,
									deviceType:body.deviceType,
									isBuzz:body.isBuzz || 0,
									assetId:body.assetId,
									createDate:Date.now()
								};

								// let qry = `INSERT INTO device_detail_${companyId} (name, serial, deviceType, isBuzz, assetId, createDate) VALUES (?,?,?,?,?,?)`;
								let qry = `INSERT INTO device_detail_? set ?`;
								logger.debug("Query for insert Device Data: " + qry);
								db.query(qry, [companyId,dataSet] , (error, rows, fields) => {
									if (error) {
										dbFunc.connectionRelease;
										reject({"success": false, "message":error.sqlMessage});
									}else{
										resolve({"success":true,  "message":"Device Data Saved and Mapped with Asset Id Successfully"});
									}
								});
							}
						});
					}
					else if(!rows[0].dId && !rows[0].aId) {
						dbFunc.connectionRelease;
						let dataSet = {
							name:body.name,
							serial:body.serial,
							deviceType:body.deviceType,
							isBuzz:body.isBuzz || 0,
							assetId:body.assetId,
							createDate:Date.now()
						};

						// var insertQry = `INSERT INTO device_detail_${companyId} (name, serial, deviceType, isBuzz, assetId, createDate) VALUES (?,?,?,?,?,?)`;
						let qry = `INSERT INTO device_detail_? set ?`;
						logger.debug("Query for insert Device Data: " + qry);
						db.query(qry, [companyId,dataSet] , (error, rows, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject({"success": false, "message":error.sqlMessage});
							}else{
								resolve({"success":true,  "message":"Device Data with Asset Id Saved Successfully"});
							}
						});
					}
					else if(rows[0].dId && rows[0].aId) {
						if(rows[0].dId === rows[0].aId) {
							resolve({"success":false,  "message":"Device already mapped with given asset"});
						}
						else {
							// var findQry = `select * from device_detail_${companyId} where id='${rows[0].aId}'`;
							let condition = {id:rows[0].aId};
							let qry = `select * from device_detail_? where ?`;
							db.query(qry,[companyId,condition], (error, res, fields) => {
								if (error) {
									dbFunc.connectionRelease;
									reject({"success": false, "message":error.sqlMessage});
								}else{
									// var findQry = `select * from device_detail_${companyId} where id='${rows[0].dId}'`;
									let condition = {id:rows[0].dId};
									let qry = `select * from device_detail_? where ?`;
									db.query(qry,[companyId,condition], (error, resu, fields) => {
										if (error) {
											dbFunc.connectionRelease;
											reject({"success": false, "message":error.sqlMessage});
										}else{
											var temp = null;
											let paramList= [companyId,{assetId:temp},{id:rows[0].aId}];
											// var qry = `update device_detail_${companyId} SET assetId=${temp} where id='${rows[0].aId}'`;
											let qry = `update device_detail_? SET ? where ?`;
											db.query(qry,paramList, (error, row, fields) => {
												if (error) {
													dbFunc.connectionRelease;
													reject({"success": false, "message":error.sqlMessage});
												}else{
													dbFunc.connectionRelease;
													let dataSet = {assetId:body.assetId, name:body.name};
													let condition = {id:rows[0].dId};
													let paramList = [companyId,dataSet,condition];
													// var qry = `update device_detail_${companyId} SET assetId=${body.assetId}, name='${body.name}' where id='${rows[0].dId}'`;
													let qry = `update device_detail_? SET ? where ?`;
													db.query(qry,paramList, (error, row, fields) => {
														if (error) {
															dbFunc.connectionRelease;
															reject({"success": false, "message":error.sqlMessage});
														}else{
															dbFunc.connectionRelease;
															resolve({"success":true,  "message":"Device Serial mapped with new Asset"});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					}
				}
			}
		});
	});
}


function getBusGateway(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select * from device_detail_? where deviceType=6`,[companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}


function getFoodCartGateway(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select * from device_detail_? where deviceType=7`,[companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}


function testBeaconList(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => { 
		db.query(`select id, name, serial, deviceType from device_detail_? where deviceType=4`,[companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}

function nodeNeighbourDetail(deviceId, companyId){
	return new Promise((resolve, reject) => { 
		let qry = `select N.id, N.nodeId, N.neighbourNodeId, N.neighbourRssi, N.zoneId, N.gatewayId, 
		          D.name as centralNodeName, D.serial as centralNodeSerial, D.nodeType from node_neighbour_detail_${companyId} N 
		          left join device_detail_${companyId} D on N.nodeId=D.nodeId AND D.nodeType=1 AND N.zoneId=D.zoneId where gatewayId=${deviceId}`;
		let finalQry = `select N.*, d.name as neighbourNodeName, d.serial as neighbourNodeSerial, d.nodeType as neighbourNodeType from
						(${qry}) as N inner join device_detail_${companyId} d on N.neighbourNodeId = d.nodeId AND N.zoneId=d.zoneId where d.nodeType = 2`;
		logger.info('finalQry : ', finalQry);
		db.query(finalQry, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}

function deviceHealth(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select D.id, D.deviceType, D.name, D.serial, D.nodeStatus, D.nodeStatusTime, D.gwSerial, D.zoneId, D.nodeId, Z.name as zoneName from device_detail_? D left join zone_detail_? Z on D.zoneId=Z.id where D.deviceType=2 OR D.deviceType=3 `,[companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}

function beaconBatteryStatus(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select D.id, D.deviceType, D.name, D.serial, D.assetId, D.isBuzz, D.createDate, D.genericId, D.batteryStatus, D.batteryStatusTime, E.name as assetName, E.type as assetType, E.uniqueId from device_detail_? D left join asset_detail_? E on D.assetId=E.id where D.deviceType=1`,[companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				logger.info("Beacon Battery Status: " + JSON.stringify(rows));
				resolve({"success":true, "data": rows, "message":""} );
			}
		}); 
	});
}


function provisionNodeAndGateway(deviceData, csvHeader, companyId) {
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		var discardedDevice = [];
		var nodeNeighbourDetail = [];
		var counter = 0;
		var networkId;
		var resetNodeArray = [];
		var resetCounter = 0;
		deviceData.forEach(function(res) {
			if(res[0] == 2 && res[12] == 0 && (res[4] == 1 || res[4] == 3)) {
				resetNodeArray.push(res);
			}
		});
		deviceData.forEach(function(data) {
			var tmpObj = {
				deviceType:data[0],
				name:data[1],
				serial:data[2],
				gwSerial:data[3] || null,
				nodeType:data[4] || null,
				nodeId:data[5] || null,
				zoneId:data[6] || null,
				zoneType:data[7] || null,
				networkId:data[8] || null,
				x_axis:data[9] || null,
				y_axis:data[10] || null,
				z_axis:data[11] || null,
				status:data[12] || 1,
				deviceKey:data[14] || null,
				provisioningState:data[16] || null,
				createDate:Date.now()
			};
			networkId = tmpObj.networkId;
			if (tmpObj.status == 0) {
				//var qry = `update device_detail_${companyId} SET status=0 where serial='${tmpObj.serial}'`;
				var qry = `delete from device_detail_? where ?`;
				var paramList = [companyId,{serial:tmpObj.serial}];
				if((tmpObj.nodeType == 1 || tmpObj.nodeType == 3) && tmpObj.deviceType == 2 && tmpObj.status == 0) {
					let findQry = `select id from device_detail_? where serial= ? AND deviceType=2`;
					db.query(findQry,[companyId,tmpObj.serial],(err, result) => {
						if (err) {
							logger.error(err.sqlMessage);
							dbFunc.connectionRelease;
						}
						else if(result.length > 0){
							resetCounter++;
							let deviceId = result[0].id;
							nodeNeighbour.resetNodeNeighbourDetail(deviceId, companyId).then((data)=>{
								logger.info('Node neighbour data reset successfully for:', tmpObj);
								if(resetNodeArray.length == resetCounter) {
									findGateway.findGatewayOfNetwork(networkId,companyId).then((data)=>{
										csv.generateCsv(data, companyId).then((result)=>{
											logger.info("Return data: ", JSON.stringify(result));
										}).catch((err) =>{
											logger.error(err);
										});
									}).catch((err) =>{
										logger.error(err);
									});
								}
							}).catch((err) => {
								logger.error(err);
							});
						}
					});
				}
			}
			else {
				var qry = `INSERT INTO device_detail_? SET ?`;
				var paramList = [companyId,tmpObj];
			}
			db.query(qry,paramList,(err, res) => {
				counter++;
				if (err) {
					logger.error(err.sqlMessage);
					dbFunc.connectionRelease;
					tmpObj.errMessage = err.sqlMessage;
					discardedDevice.push(tmpObj);
				}
				else{
					if((tmpObj.nodeType == 1 || tmpObj.nodeType == 3) && tmpObj.status == 1) {
						var nodeData = Object.assign({}, tmpObj);
						if(data[13]) {
							nodeData.nodeNeighbours = data[13];
							nodeData.neighbourRssi = data[15];
							nodeData.deviceId =  res.insertId;
							nodeNeighbourDetail.push(nodeData);
						}
						//logger.debug('node neighbour:', nodeNeighbourDetail);
					}
					if(tmpObj.deviceType == 3 && tmpObj.status == 1) {
						createGatewaySerialFolder.createGatewaySerialFolder(companyId, tmpObj.serial).then((data)=>{
							logger.debug("Gateway folder created: " + tmpObj.serial);
						});
					}
				}
				if(deviceData.length == counter) {
					if(discardedDevice.length > 0) {
						logger.debug('Discarded Device List:', discardedDevice);
					}
					if(nodeNeighbourDetail.length > 0) {
						nodeNeighbour.addNodeNeighbourDetail(nodeNeighbourDetail, companyId).then((data)=>{
							resolve({success:true, message:'Devices Added Suceessfully'});	
							csv.generateCsv(data, companyId).then((result)=>{
								logger.info("Return data: ", JSON.stringify(result));
							}).catch((err) =>{
								logger.error(err);
							});
						}).catch((err) => {
							reject(err);
						});
					}
					else {
						resolve({success:true, message:'Devices Added Successfully'});
					}
				}
			});
		});
	});
}

/*function provisionNodeAndGateway(deviceData, csvHeader, companyId) {
	return new Promise((resolve, reject) => {
		var discardedDevice = [];
		var nodeNeighbourDetail = [];
		var counter = 0;
		var networkId;
		var resetNodeArray = [];
		var resetCounter = 0;
		deviceData.forEach(function(res) {
			if(res[0] == 2 && res[12] == 0 && (res[4] == 1 || res[4] == 3)) {
				resetNodeArray.push(res);
			}
		});
		deviceData.forEach(function(data) {
			var tmpObj = {
				deviceType:data[0],
				name:data[1],
				serial:data[2],
				gwSerial:data[3] || null,
				nodeType:data[4] || null,
				nodeId:data[5] || null,
				zoneId:data[6] || null,
				zoneType:data[7] || null,
				networkId:data[8] || null,
				x_axis:data[9] || null,
				y_axis:data[10] || null,
				z_axis:data[11] || null,
				status:data[12] || 1,
				deviceKey:data[14] || null,
				provisioningState:data[16] || null,
				createDate:Date.now()
			};
			networkId = tmpObj.networkId;
			if (tmpObj.status == 0) {
				//var qry = `update device_detail_${companyId} SET status=0 where serial='${tmpObj.serial}'`;
				var qry = `delete from device_detail_${companyId} where serial='${tmpObj.serial}'`;
				if((tmpObj.nodeType == 1 || tmpObj.nodeType == 3) && tmpObj.deviceType == 2 && tmpObj.status == 0) {
					var findQry = `select id from device_detail_${companyId} where serial='${tmpObj.serial}' AND deviceType=2`;
					db.query(findQry,(err, result) => {
						if (err) {
							logger.error(err.sqlMessage);
							dbFunc.connectionRelease;
						}
						else if(result.length > 0){
							resetCounter++;
							let deviceId = result[0].id;
							nodeNeighbour.resetNodeNeighbourDetail(deviceId, companyId).then((data)=>{
								logger.info('Node neighbour data reset successfully for:', tmpObj);
								if(resetNodeArray.length == resetCounter) {
									findGateway.findGatewayOfNetwork(networkId,companyId).then((data)=>{
										var operation = 0;
										var offset = 0;
										var isDataExists = false;
										csv.generateJson(data, companyId, operation, offset, isDataExists).then((result)=>{
											logger.info("Return data: ", JSON.stringify(result));
										}).catch((err) =>{
											logger.error(err);
										});
									}).catch((err) =>{
										logger.error(err);
									});
								}
							}).catch((err) => {
								logger.error(err);
							});
						}
					});
				}
			}
			else {
				var qry = `INSERT INTO device_detail_${companyId} SET ?`;
			}
			db.query(qry,tmpObj,(err, res) => {
				counter++;
				if (err) {
					logger.error(err.sqlMessage);
					dbFunc.connectionRelease;
					tmpObj.errMessage = err.sqlMessage;
					discardedDevice.push(tmpObj);
				}
				else{
					if((tmpObj.nodeType == 1 || tmpObj.nodeType == 3) && tmpObj.status == 1) {
						var nodeData = Object.assign({}, tmpObj);
						if(data[13]) {
							nodeData.nodeNeighbours = data[13];
							nodeData.neighbourRssi = data[15];
							nodeData.deviceId =  res.insertId;
							nodeNeighbourDetail.push(nodeData);
						}
						//logger.debug('node neighbour:', nodeNeighbourDetail);
					}
					if(tmpObj.deviceType == 3 && tmpObj.status == 1) {
						createGatewaySerialFolder.createGatewaySerialFolder(companyId, tmpObj.serial).then((data)=>{
							logger.debug("Gateway folder created: " + tmpObj.serial);
						});
					}
				}
				if(deviceData.length == counter) {
					if(discardedDevice.length > 0) {
						logger.debug('Discarded Device List:', discardedDevice);
					}
					if(nodeNeighbourDetail.length > 0) {
						findGateway.findNeighbourNodesOfGateway(networkId,companyId).then((resu)=>{
							nodeNeighbour.addNodeNeighbourDetail(nodeNeighbourDetail, companyId).then((data)=>{
								resolve({success:true, message:'Devices Added Suceessfully'});
								var operation;
								var offset;
								var isDataExists;
								if(resu.length > 0) {
									operation = 1;
									offset = resu.length;
									isDataExists = true;
								}
								else {
									operation = 0;
									offset = 0;
									isDataExists = false;	
								}
								csv.generateJson(data, companyId, operation, offset, isDataExists).then((result)=>{
									logger.info("Return data: ", JSON.stringify(result));
								}).catch((err) =>{
									logger.error(err);
								});
							}).catch((err) => {
								reject(err);
							});
						}).catch((err) => {
							reject(err);
						});
					}
					else {
						resolve({success:true, message:'Devices Added Successfully'});
					}
				}
			});
		});
	});
}*/

function updateNodeRssi(deviceData, rssi, companyId) {
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let paramList = [companyId,{neighbourRssi:rssi},{zoneId:deviceData.zoneId},{nodeId:deviceData.nodeId}];
		// let qry = `update node_neighbour_detail_${companyId} set neighbourRssi=${rssi} where zoneId='${zoneId}'AND nodeId='${nodeId}'`;
		let qry = `update node_neighbour_detail_? set ? where ? AND ?`;
		db.query(qry,paramList, (error, res, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject({"success":false, "message":error.sqlMessage});
			}else{
				resolve({"success":true, "data": {}, "message":"Node rssi updated successfully"});
			}
		});
	});
}

module.exports = deviceModel;
