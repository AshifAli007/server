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
var base64Converter = require('../helpers/createBase64Image');
var {url} = require('../../config/config');
const mongoose = require('mongoose');
const NotificationDao = require('./../models/dao/notificationSchema');
var assetLocation = require('../helpers/assetLastLocation');

const zoneModel = {
	createEmp:createEmp,
	empList:empList,
	checkId:checkId,
	getEmp:getEmp,
	addEmployeeData:addEmployeeData,
	updateEmp:updateEmp,
	searchOnlineAsset:searchOnlineAsset,
	assetCurrentLocation:assetCurrentLocation
};

var notificationDao = new NotificationDao(mongoose);
var notificationModel = notificationDao.getModel();

function createEmp(creatorId, emp, companyId) {
	logger.debug("Emp Data: " + JSON.stringify(emp));
	return new Promise((resolve, reject) => {
		var empName = emp.attributes.name;
		var empId = emp.attributes.uniqueId;
		companyId = parseInt(companyId);
		emp.attributes = JSON.stringify(emp.attributes);
		// db.query(`select * from userInfo where id='${creatorId}' AND companyId='${companyId}'`, (error, rows, fields) => {
		db.query(`select * from userInfo where id=? AND companyId=?`,[creatorId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else if(rows.length > 0) {
				
				// db.query(`select uniqueId from asset_detail_${companyId} where uniqueId='${empId}'`, (error, rows, fields) => {
				db.query(`select uniqueId from asset_detail_? where uniqueId=?`,[companyId,empId], (error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					} else if(rows.length > 0) {
						reject({"success":false,  "message":"Given Asset uniqueId already exists"} );
					}else{
						var empData = {
							name:empName,
							uniqueId:empId,
							type:emp && emp.assetType,
							subType:emp && emp.assetSubType || null,
							creatorId:creatorId,
							createDate:Date.now(),
							attribute_value:emp.attributes
						};
						
						//var query =`insert into asset_detail_${companyId} set name='${name}', uniqueId='${uniqueId}', type='${emp.assetType}', subType='${emp.assetSubType}', creatorId='${creatorId}', createDate='${Date.now()}', attribute_value='${emp.attributes}'`;
						db.query(`INSERT INTO asset_detail_? SET ?`, [companyId,empData] , (error, res) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							}else{
								if(emp && emp.asset_image && emp.asset_image.base64) {
									var type = 'asset_image';
									base64Converter.base64ImageConverter(emp.asset_image, companyId, type, res.insertId).then((data)=>{
										logger.debug("Asset Image: " + data);
									
										let paramList = [companyId,{asset_image:data},{id:res.insertId}];
										// var qry = `update asset_detail_${companyId} set asset_image='${data}' where id='${res.insertId}'`;
										var qry = `update asset_detail_? set ? where ?`;
										logger.debug("Asset Image update query:" + qry);
										db.query(qry,paramList, (error, row, fields) => {
											if (error) {
												dbFunc.connectionRelease;
												reject(error);
											}
											else {
												logger.debug("Asset Image uploaded successfully");
											}
										});
									});
								}
								resolve({"success":true,  "message":"Asset data saved successfully"} );
							}
						});
					}
				});
			}else{
				reject({"success":false,  "message":"Given user id in header is invalid"} );
			}
		}); 
	});
}

function empList(companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select A.id, A.name, A.uniqueId, A.type, A.subType, A.attribute_value, A.createDate, A.asset_image, T.assetTypeName, T.icon, sT.name as assetSubTypeName from asset_detail_? A left join asset_type_list_? T on A.type=T.id left join asset_subType_detail_? sT on A.subType=sT.id`,[companyId,companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				if(rows.length > 0){
					var result = rows.map((emp) => {
						if(emp.asset_image == 'NULL'){
							emp.asset_image = emp.icon;
						}else {
							emp.asset_image = emp.asset_image && `${url.baseUrl}${companyId}/asset_image/${emp.asset_image}`; 
						}
						return emp;
					});
					resolve({"success":true, "items": result, "message":""} );
				} 
				else {
					resolve({"success":true, "items": rows, "message":""} );
				}
			}
		}); 
	});
}



function getEmp(data, companyId){
	logger.debug("data in model: " + JSON.stringify(data));
	return new Promise((resolve, reject) => {
		if(data.length > 0){
			data[0].asset_image = data[0].asset_image && `${url.baseUrl}${companyId}/asset_image/${data[0].asset_image}`;
			resolve({"success":true, "data": data, "message":""});
		}else{
			reject({"success":false, "message":"emp id is invalid"});
		}
	});
}

function checkId(id, companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select A.id, A.name, A.uniqueId, A.type, A.subType, A.attribute_value, A.createDate, A.asset_image, T.assetTypeName, T.icon, sT.name as assetSubTypeName from asset_detail_? A left join asset_type_list_? T on A.type=T.id left join asset_subType_detail_? sT on A.subType=sT.id where A.id=?`,[companyId,companyId,companyId,id], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}else{
					reject({"success":false, "message":"Emp id is invalid"});
				}
			}
		}); 
	});
}

//*************Currently not in use*****************

/*

function assignReciver(zoneId, data){
	return new Promise((resolve, reject) => {
		db.query("select id, bleType from device_detail where id="+data.deviceId+"", (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				
				if(rows.length>0){
					console.log("Row: " + JSON.stringify(rows));
					if(rows[0].bleType == 2){
						db.query("insert into map_device_zone set  dId="+data.deviceId+" ,zId="+zoneId+" , isEdge="+data.isEdge+"", (error, rows, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							}else{
								resolve({"success":true,"message":"Device assigned to zone"});
							}
						});
					}else{
						reject({"success":false, "message":"Given device is not a reciver"})
					}

				}else{
					reject({"success":false, "message":"Given device id is invalid"});
				}
			}
		}); 
	});
}

function listAssignReciver(zoneId){
	return new Promise((resolve, reject) => {
		db.query("select mapDz.id, mapDz.dId, mapDz.zId, mapDz.isEdge, Z.zoneName, D.name as reciverName  from map_device_zone mapDz left join device_zone Z  on mapDz.zId=Z.id left join device_detail D on mapDz.dId=D.id where mapDz.zId="+zoneId+"", (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else if(rows.length>0){
				dbFunc.connectionRelease;
				resolve({"success":true, "data": rows, "message":""} )
			}else{
				reject({"success":false, "data": rows, "message":"Given zone don't have any reciver"});
			}
		});
	});
}

function assignUser(zoneId, data){
	return new Promise((resolve, reject) => {
		db.query("select id from userInfo where id="+data.userId+"", (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				
				if(rows.length>0){
					console.log("Row: " + JSON.stringify(rows));
						db.query("insert into map_user_zone set  uId="+data.userId+" ,zId="+zoneId+"", (error, rows, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							}else{
								resolve({"success":true,"message":"User assigned to zone"});
							}
						});
				}else{
					reject({"success":false, "message":"Given user id is invalid"});
				}
			}
		}); 
	  });
}

function listAssignUser(zoneId){
	return new Promise((resolve, reject) => {
		db.query("select mapU.id, U.id as userId, Z.id as zoneId, U.fullName, Z.zoneName from map_user_zone mapU left join userInfo U on mapU.uId=U.id left join device_zone Z on mapU.zId=Z.id where mapU.zId="+zoneId+"", (error, rows, fields) => {
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


*/

/*function addEmployeeData(employeeData, creatorId, companyId) {
	return new Promise((resolve, reject) => {
		employeeData.forEach(function(data) {
			data.push(creatorId);
		});
		var query = `INSERT INTO asset_detail_${companyId} (name, uniqueId, type, email, address, contactNo, creatorId) VALUES ?`;
		
		db.query(query, [employeeData], (err, res) => {
			if (err) {
				dbFunc.connectionRelease;
				reject(err);
			}else{
				resolve({"success":true,  "message":"Asset data added sucessfully"});
			}   
		});
	});
}*/

function addEmployeeData(employeeData, creatorId, companyId, array) {
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		var discardedData = [];
		var attributes = {};
		array.forEach(function(key) {
			attributes[key] = "";
		});
		logger.debug('attribute_key object:', attributes);
		var dataLen = Object.keys(attributes).length;
		db.query(`select * from userInfo where id=? AND companyId=?`,[creatorId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else if(rows.length > 0) {
				employeeData.forEach(function(data, i) {
					var tmpObj = {
						name:data[0] || null,
						uniqueId:data[1] || null,
						type:data[2] || null,
						subType:data[3] || null,
						creatorId:creatorId,
						createDate:Date.now()
					};
					var j = 0;
					Object.keys(attributes).forEach(function(res) {
						attributes[res] = data[j] || null;
						j++;
					});
					var obj = {};
					obj = Object.assign({}, attributes);
					delete obj['type'];
					delete obj['subType'];
					tmpObj.attribute_value = JSON.stringify(obj);
					//logger.info('Data to be inserted in DB: ', tmpObj);
					var qry = `INSERT INTO asset_detail_? SET ?`;
					db.query(qry, [companyId,tmpObj], (err, res) => {
						if (err) {
							dbFunc.connectionRelease;
							tmpObj.errMessage = err.sqlMessage;
							discardedData.push(tmpObj);
						}
						if(employeeData.length - 1 === i) {
							if(discardedData.length > 0) {
								reject({success:true, discardedData:discardedData,message:'Emp data discarded'});
							}
							else {
								resolve({success:true, message:'All Emp data inserted successfully'});
							}
						}
					});
				});
			}else{
				reject({"success":false,  "message":"Given user id in header is invalid"} );
			}
		});
	});
}


function updateEmp(creatorId, emp, empData, companyId, isImageUpload){
	logger.debug("Emp Data: " + JSON.stringify(emp));
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		var empName = emp.attributes.name;
		var uniqueId = emp.attributes.uniqueId;
		emp.attributes = JSON.stringify(emp.attributes);
		db.query(`select * from userInfo where id=? AND companyId=?`,[creatorId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else if(rows.length > 0) {
				
				db.query(`select * from asset_detail_? where uniqueId=? AND id <> ?`,[companyId,uniqueId,empData.id], (error, row, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					} else if(row.length > 0) {
						reject({"success":false,  "message":"Given Asset uniqueId already exists"} );
					}else{
						var empUpdateData = {
							name:empName,
							uniqueId:uniqueId,
							type:emp && emp.assetType,
							subType:emp && emp.assetSubType || null,
							attribute_value:emp.attributes
						};
						var query =`update asset_detail_? SET ? where id= ?`;
						db.query(query, [companyId,empUpdateData,empData.id], (error, rows, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							}else{
								if(isImageUpload == 1) {
									if(emp && emp.asset_image && emp.asset_image.base64) {
										var type = 'asset_image';
										base64Converter.base64ImageConverter(emp.asset_image, companyId, type, empData.id).then((data)=>{
											logger.debug("Asset Image: " + data);
											companyId = parseInt(companyId);
											var qry = `update asset_detail_? set asset_image=? where id=?`;
											logger.debug("Asset Image update query:" + qry);
											db.query(qry,[companyId,data,empData.id], (error, row, fields) => {
												if (error) {
													dbFunc.connectionRelease;
													reject(error);
												}
												else {
													logger.debug("Asset Image updated successfully");
													resolve({"success":true,  "message":"Asset data updated successfully"});
													if(empData.asset_image != data) {
														var dirPath = `./uploads/${companyId}/asset_image/${empData.asset_image}`;
														fs.unlink(dirPath, function(err) {
															if (err) {
																logger.error(err);
															}
														});
													}
												}
											});
										});
									}
								}
								else {
									resolve({"success":true,  "message":"Asset data updated successfully"});
								}
							}
						});
					}
				});
			}else{
				reject({"success":false,  "message":"Given user id in header is invalid"} );
			}
		}); 
	});
}

function searchOnlineAsset(query,companyId){
	return new Promise((resolve, reject) => {
		let findQry = {
			$or:[
				{"empName":query},
				{"empId":query},
				{"beaconId":query}
			],
			"isEntry":true,"companyId":companyId,"type":0
		};
		logger.debug('Search Online Asset query:',findQry);
		let returnFields = {
			'_id':0,
			'beaconId':1,
			'empId':1,
			'empName':1,
		};
		notificationModel.find(findQry,returnFields).exec(function(err, res) {
			if (err) {
				reject({"success":false, "items": err, "message":""});
			}else if(res.length > 0){
				resolve({"success":true,items:res,"message":""});
			}
			else {
				reject({"success":false, "items":[],"message":""});
			}
		});
	});
}

function assetCurrentLocation(query,companyId){
	let empId = query && query.empId && query.empId.trim();
	let beaconId = query && query.beaconId && query.beaconId.trim();
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		let findQry = {
			"empId":empId,
			"beaconId":beaconId,
			"isEntry":true,
			"companyId":companyId,
			"type":0
		};
		logger.debug('Asset current location query:',findQry);
		notificationModel.findOne(findQry).exec(function(err, res) {
			if (err) {
				reject({"success":false, "items": err, "message":""});
			}else if(res){
				var finalRes = [];
				logger.debug('Asset entry found:',res);
				let qry = `select Z.id, Z.name, Z.zone_image, F.id as floorId, F.name as floorName, P.id as plantId, P.name as plantName from zone_detail_? Z left join floor_plan_? F on Z.floorId=F.id left join plant_detail_? P on Z.plantId=P.id where Z.id=?`;
				logger.debug('Find query for floor and plant of a zone:',qry);
				db.query(qry, [companyId,companyId,companyId,res.zoneId], (error, row, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					} else if(row.length > 0) {
						logger.debug('Zone data:',row[0]);
						row[0].zone_image = row[0].zone_image && `${url.baseUrl}${companyId}/zones/${row[0].zone_image}`;
						let findAsset = `select A.id as assetId, A.name as assetName, A.uniqueId, A.type, A.asset_image, A.attribute_value, A.subType, sT.name subTypeName, T.assetTypeName, T.icon from asset_detail_? A left join asset_type_list_? T on A.type=T.id left join asset_subType_detail_? sT on A.subType=sT.id where A.uniqueId=?`;
						logger.debug('Search asset detail query:',findAsset);
						db.query(findAsset, [companyId,companyId,companyId,res.empId], (error, result, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							}else if(result.length > 0){
								dbFunc.connectionRelease;
								logger.debug("Asset detail data: ", JSON.stringify(result[0]));
								if(result[0].asset_image != undefined){
									result[0].asset_image = result[0].asset_image && `${url.baseUrl}${companyId}/asset_image/${result[0].asset_image}`;
								
								}else{
									result[0].asset_image = result[0].icon;
								}
								let finalObj = { ...row[0], ...result[0] };
								finalObj['beaconId'] = res.beaconId;
								finalObj['entryTime'] = res.entryTime;
								finalObj['exitTime'] = res.exitTime;
								finalObj['isEntry'] = res.isEntry;
								finalObj['message'] = res.message;
								finalObj['isAllowed'] = res.isAllowed;
								finalObj['isMissing'] = res.isMissing;
								finalRes.push(finalObj);
								resolve({"success":true,"items":finalRes,"message":""});
							}
							else {
								reject({"success":false, "items":[],"message":"Asset not found"});
							}
						});
					}else{
						reject({"success":false, "items":[],"message":""});
					}
				});
			}
			else {
				let findQry = {
					"empId":empId,
					"beaconId":beaconId,
					"companyId":companyId,
					"type":0
				};
				logger.debug('Asset last location query:',findQry);
				assetLocation.assetLastLocation(findQry, companyId).then((data)=>{
					resolve(data);
				}).catch((err) => {
					logger.error("Error: ", err);
					reject(err);
				});
			}
		});
	});
}

module.exports = zoneModel;
