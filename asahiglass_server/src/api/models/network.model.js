const db = require('../../config/mysql');
const mongoose = require('mongoose');
var dbFunc = require('../../config/mysql-function');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuid = require('uuid/v4');
const logger = require('../../config/logger');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const crypto = require('crypto');
var _ = require('lodash');
var NetworkDao = require('./../models/dao/networkSchema');
var {url} = require('../../config/config');
const uniqueRandom = require('unique-random');


const networkModel = {
	createNetwork:createNetwork,
	networkList:networkList,
	checkId:checkId,
	updateNetwork:updateNetwork,
	deleteNetwork:deleteNetwork,
	zoneList:zoneList,
	getNetwork:getNetwork,
	updateProvisionerUuid:updateProvisionerUuid
};

var networkDao = new NetworkDao(mongoose);
var network = networkDao.getModel();


function createNetwork(name, companyId, creatorId) {
	logger.info("Network  Data: " + JSON.stringify(name));
	var networkName = new RegExp(["^", name, "$"].join(""), "i");
	return new Promise((resolve, reject) => {
		let condition = [{id:creatorId},{companyId:companyId}];
		// db.query(`select * from userInfo where id='${creatorId}' AND companyId='${companyId}'`, (error, rows, fields) => {
		db.query(`select * from userInfo where ? AND ?`,condition, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else if(rows.length > 0) {
				network.findOne({'networkName':networkName, 'companyId':companyId, isActive:true}).lean().exec(function(err,result){
					if (err) {
						reject(err);
					}else if (result){
						reject({"success":false,  "message":"Network name already exists for given companyId"});
					}
					else {
						const random = uniqueRandom(49152, 65279);
						var meshUuid = uuid().toUpperCase();
						var netKey =  crypto.randomBytes(16).toString('hex');
						var appKey = crypto.randomBytes(16).toString('hex');
						var provisionerUuid = uuid().toUpperCase();
						var networkData = {
							'networkName': name,
							'meshUuid': meshUuid,
							'companyId': companyId,
							'creatorId': creatorId,
							'netKeys': [{'meshUuid':meshUuid, 'name': 'network key 1','key': netKey}],
							'appKeys': [{'meshUuid':meshUuid, 'name': 'Application key 1','key': appKey}],
							'provisioners': [{'provisionerUuid':provisionerUuid, 'meshUuid':meshUuid, 'sequenceNumber':0}],
							'gatewaySubAddress': random().toString(16),
							'gatewayPubAddress': random().toString(16),
							'gatewayHealthAddress': random().toString(16),
						};
						var networkDataToDB = new network(networkData);
						networkDataToDB.save((err, res) => {
							if (err) {
								logger.error('Mongo write error for network model: ', err);
								reject({"success":false,  "message":"Interanl Server Error"});
							} else {
								var filtered = 	{	
									'id':res._id,
									'meshUuid': res.meshUuid,
									'networkName':res.networkName,
									'gatewaySubAddress':res.gatewaySubAddress,
									'gatewayPubAddress':res.gatewayPubAddress,
									'gatewayHealthAddress':res.gatewayHealthAddress,
									'netKeys':res.netKeys,
									'appKeys':res.appKeys,
									'provisioners':res.provisioners,
									'createdAt':res.createdAt
								};
								resolve({"success":true,data:filtered,"message":"Network created successfully"});
							}
						});
					}
				});
			}
			else{
				reject({"success":false,  "message":"Given user id in header is invalid"});
			}
		});
	});
}

function networkList(companyId, userId){
	return new Promise((resolve, reject) => {
		if(companyId && userId) {
			var qry = {
				'companyId': parseInt(companyId),
				'creatorId': parseInt(userId),
				'isActive': true
			};
		}
		else if(companyId && !userId) {
			var qry = {
				'companyId': parseInt(companyId),
				'isActive': true
			};
		}
		else {
			var qry = {
				'isActive': true
			};
		}
		network.find(qry).sort({'createdAt': 1}).lean().exec(function(err,res){
			if (err) {
				reject(err);
			}else{
				if(res.length > 0) {
					var filteredRes = res.map((obj) => {
						var filtered = 	{	
							'id':obj._id,
							'meshUuid': obj.meshUuid,
							'networkName':obj.networkName,
							'gatewaySubAddress':obj.gatewaySubAddress,
							'gatewayPubAddress':obj.gatewayPubAddress,
							'gatewayHealthAddress':obj.gatewayHealthAddress,
							'netKeys':obj.netKeys,
							'appKeys':obj.appKeys,
							'provisioners':obj.provisioners,
							'companyId':obj.companyId,
							'userId':obj.creatorId,
							'createdAt':obj.createdAt
						};
						return filtered;
					});
					resolve({"success":true,items:filteredRes,"message":""});
				}
				else {
					resolve({"success":true,items:res,"message":""});
				}
			}
		});
	});
}


function checkId(id, companyId){
	return new Promise((resolve, reject) => {
		if(mongoose.Types.ObjectId.isValid(id)) {
			network.findOne({'_id':id, companyId:companyId, isActive:true}).lean().exec(function(err,result){
				if (err) {
					reject(err);
				}else if (result){
					resolve(result);
				}
				else {
					reject({"success":false, "message":"Network Id is invalid"});
				}
			});
		}
		else {
			reject({"success":false, "message":"Invalid Object Id"});
		}
	});
}

function updateNetwork(id, name, companyId) {
	var networkName = new RegExp(["^", name, "$"].join(""), "i");
	return new Promise((resolve, reject) => {
		network.findOne({'_id':{$ne:id},'networkName':networkName, 'companyId':companyId, isActive:true}).lean().exec(function(err,result){
			if (err) {
				reject(err);
			}else if (result){
				reject({"success":false,  "message":"Network name already exists for given companyId"});
			}
			else {
				network.updateOne({'_id':id, 'companyId':companyId},{
					$set: {'networkName':name}
				}, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve({"success":true,  "message":"Network data updated successfully"});
					}
				});
			}
		});
	});
}

function deleteNetwork(id, companyId) {
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		network.updateOne({'_id':id, 'companyId':companyId},{
			$set: {'isActive':false}
		}, (err, result) => {
			if (err) {
				reject(err);
			} else {
				var temp = {
					networkId: null
				};
				let paramList = [companyId,temp,{networkId:id}];
				var qry = `update zone_detail_? SET ? where ?`;
				logger.debug("Query for zone Update for networkId: " + qry);
				db.query(qry, paramList, (error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					}else{
						resolve({"success":true,  "message":"Network data deleted successfully"});					}
				});
			}
		});
	});
}

function zoneList(networkId, companyId) {
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		let paramList = [companyId,companyId,{networkId:networkId}];
		var qry = `select Z.id, Z.name, Z.zone_image, Z.maxUsers, Z.networkId, F.name as floorName, F.floorNo from zone_detail_?  Z left join floor_plan_? F on Z.floorId=F.id where ?`;
		logger.debug("Query for zone list for networkId: " + qry);
		db.query(qry,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
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

function getNetwork(companyId, data){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		var networkId = data._id;
		var resArray = [];
		var filtered = 	{	
			'id':data._id,
			'meshUuid': data.meshUuid,
			'networkName':data.networkName,
			'gatewaySubAddress':data.gatewaySubAddress,
			'gatewayPubAddress':data.gatewayPubAddress,
			'gatewayHealthAddress':data.gatewayHealthAddress,
			'netKeys':data.netKeys,
			'appKeys':data.appKeys,
			'provisioners':data.provisioners,
			'companyId':data.companyId,
			'userId':data.creatorId,
			'createdAt':data.createdAt
		};
		let paramList = [companyId,{networkId:networkId}];
		var query = `select id, name, deviceType, serial as macAddress, gwSerial as gatewayMacAddress, nodeType, nodeId, zoneId, networkId, deviceKey, provisioningState from device_detail_? where (? AND deviceType=3 AND status=1)`;
		logger.debug("Query for gateway for networkId: " + query);
		db.query(query,paramList, (error, row, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else {
				filtered['gateway'] = row[0];
				let paramList = [companyId,{networkId:networkId}];
				var findRelayNodes = `select id, name, deviceType, serial as macAddress, gwSerial as gatewayMacAddress, nodeType, nodeId, zoneId, networkId, deviceKey, provisioningState from device_detail_? where (? AND deviceType=2 AND nodeType=4 AND status=1)`;
				logger.debug("Query for Relay nodes for networkId: " + findRelayNodes);
				db.query(findRelayNodes,paramList, (error, relayNodes, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					}else {
						if (relayNodes.length > 0) {
							filtered['relayNodes'] = relayNodes;
						}
						let paramList = [companyId,companyId,companyId,networkId];
						var qry = `select DISTINCT Z.id, Z.name, Z.zone_image, Z.maxUsers, Z.networkId, F.name as floorName, F.floorNo, D.zoneType from zone_detail_?  Z left join floor_plan_? F on Z.floorId=F.id left join device_detail_? D on Z.id=D.zoneId where Z.networkId=?`;
						logger.debug("Query for zone list for networkId: " + qry);
						db.query(qry,paramList, (error, rows, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							}else{
								if(rows && rows.length > 0) {
									var result = rows.map((zone) => {
										zone.zone_image = zone.zone_image && `${url.baseUrl}${companyId}/zones/${zone.zone_image}`;
										return zone;
									});
									logger.info('Zone data length:', result.length);
									var counter = 0;
									result.forEach(function(res) {
										let paramList = [companyId,{networkId:networkId},{zoneId:res.id}];
										var findNodes = `select id, name, deviceType, serial as macAddress, gwSerial as gatewayMacAddress, nodeType, nodeId, zoneId, networkId, deviceKey, provisioningState from device_detail_? where (? AND ? AND deviceType=2 AND status=1)`;
										logger.debug("Query for nodes list for networkId and zoneId: " + findNodes);
										db.query(findNodes,paramList, (error, results, fields) => {
											if (error) {
												dbFunc.connectionRelease;
												reject(error);
											}else{
												if(results && results.length > 0) {
													if(row.length > 0) {
														var gatewayId = row[0].id;
													}
													var b = [];
													var counter1 = 0;
													logger.info('Node data length:', results.length);
													results.forEach(function(node){
														let paramList = [companyId,{zoneId:res.id},{gatewayId:gatewayId},{zoneId:node.zoneId}];
														var findNeighbourNodes = `select neighbourNodeId, neighbourRssi as rssi from node_neighbour_detail_? where (? AND ? AND ?)`;
														logger.debug("Query for neighbour node list for nodeId, zoneId and gatewayId: " + findNeighbourNodes);
														db.query(findNeighbourNodes, (error, neighbourNodes, fields) => {
															if (error) {
																dbFunc.connectionRelease;
																reject(error);
															}else if(neighbourNodes.length > 0){
																var a = [];
																logger.info('neighbourNodes data length:', neighbourNodes.length);
																neighbourNodes.forEach(function(id){
																	a.push(id.neighbourNodeId);
																	node['rssi'] = id.rssi;

																});
																node['neighbourNodes'] = a;
																b.push(node);
																counter1++;
															}
															else {
																b.push(node);
																counter1++;
															}
															if(results.length == counter1) {
																counter++;
																res['nodes'] = b;
																resArray.push(res);
																if(result.length == counter) {
																	logger.debug('Result length:', result.length);
																	logger.debug('counter length:', counter);
																	filtered['zones'] = resArray;
																	resolve({"success":true, "data": filtered});
																}
															}
														});
													});
												}
												else {
													counter++;
													res['nodes'] = [];
													resArray.push(res);
													if(result.length == counter) {
														filtered['zones'] = resArray;
														resolve({"success":true, "data": filtered});
													}
												}
											}
										});
									});
								}
								else {
									filtered['zones'] = [];
									resolve({"success":true, "data": filtered});
								}
							}
						});
					}
				});
			}
		});
	});
}


function updateProvisionerUuid(networkId, provisionerUuid, sequenceNumber, companyId) {
	return new Promise((resolve, reject) => {
		network.updateOne({'_id': networkId, 'companyId':companyId, "provisioners.provisionerUuid": provisionerUuid}, {
			$set: { "provisioners.$.sequenceNumber": parseInt(sequenceNumber)}
		}, (err, res) => {
			if(err) {
				reject(err);
			}  
			else {
				resolve({"success":true, "data": {}, "message":""});
			}
		});
	});
}


module.exports = networkModel;
