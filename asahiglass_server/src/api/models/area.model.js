const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const NotificationDao = require('./../models/dao/notificationSchema');
const logger = require('../../config/logger');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
var multer = require('multer');
const formidable = require('formidable');
const fs = require('fs');
var {url} = require('../../config/config');
var mv = require('mv');
var _ = require('lodash');
const centroid = require('polygon-centroid');


const zoneModel = {
	addArea:addArea,
	addAreaImage:addAreaImage,
	checkAreaName:checkAreaName,
	checkId: checkId,
	getArea:getArea,
	getAreaZone:getAreaZone,
	getZoneHeatMap:getZoneHeatMap,
	floorList:floorList,
	updateFloor:updateFloor
};

var notificationDao = new NotificationDao(mongoose);
var notificationModel = notificationDao.getModel();

var storage =   multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads');
	},
	filename: function (req, file, callback) {
		console.log("FIle name: " + file.originalname);
		callback(null, file.originalname);
	}
});

function addArea(req, res) {
	return new Promise((resolve, reject) => {
		var upload = multer({ storage : storage}).single('userFile');
		upload(req,res,function(err) {
			if(err) {
				console.log("Error: " + JSON.stringify(err));
				reject({"success":false, "message":"Please try again"});
			}
			resolve({"success":true,  "message":"Image uploded"});
		});
	});
}

function addAreaImage(req, image, companyId) {
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let condition = {id:req.query.plantId};
		let findQry = `select * from plant_detail_? where ?`;
		db.query(findQry, [companyId, condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else if(rows.length > 0) {
				let dataSet = {
					'name':req.query.name,
					'floor_image':image,
					'floorNo':req.query.floorNo,
					'creatorId':req.headers.userid,
					'plantId':req.query.plantId

				};
				var qry = `insert into floor_plan_? set ?`;
				db.query(qry, [companyId, dataSet], (err, rows, fields) => {
					if (err) {
						logger.error("Mysql error: ",err);
						dbFunc.connectionRelease;
						reject(err);
					}else{
						resolve({"success":true, "message":"Floor data added successfully"});
					}
				});
			}else {
				reject({"success":false,  "message":"Given Plant Id is invalid"} );
			}
		});
	});
}

function checkAreaName(areaName, companyId, creatorId, floorId) {
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let condition = [{id:creatorId},{companyId:companyId}];
		let qry = `select * from userInfo where ? AND ?`;
		db.query(qry, condition, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else if(rows.length > 0) {
				var condition;
				var findArea;
				if (floorId) {
					condition = [companyId,{name:areaName},floorId];
					findArea = `select id from floor_plan_? where ? AND id <> ?`;
				}
				else {
					condition = [companyId,{name:areaName}];
					findArea = `select id from floor_plan_? where ?`;
				}
				db.query(findArea, condition, (err, rows, fields) => {
					if (err) {
						logger.error("Mysql error: ",err);
						dbFunc.connectionReleas;
						reject(err);
					}
					else if(rows.length > 0) {
						reject({"success":false, "message":"Floor name already exists"});
					}
					else {
						resolve(true);
					}
				});
			}else{
				reject({"success":false,  "message":"Given user id in header is invalid"} );
			}
		});
	});
}


function checkId(id, companyId){
	return new Promise((resolve, reject) => {
		let condition = {id:id};
		companyId = parseInt(companyId);
		let qry = `select * from floor_plan_? where ?`;
		db.query(qry,[companyId, condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}else{
					reject({"success":false, "message":"Floor id is invalid"});
				}
			}
		});
	});
}


function getArea(data, companyId){
	return new Promise((resolve, reject) => {
		if(data.length > 0){
			data[0].floor_image = data[0].floor_image && `${url.baseUrl}${companyId}/floors/${data[0].floor_image}`;
			resolve({"success":true, "data": data[0], "message":""});
		}else{
			reject({"success":false, "message":"Floor id is invalid"});
		}
	});
}


function floorList(companyId, query){
	return new Promise((resolve, reject) => {
		var qry;
		companyId = parseInt(companyId);
		var assetTypeId = query && query.assetTypeId && query.assetTypeId.trim();
		if(query.id){
			var condition = [companyId,companyId,{plantId:query.id}];
			qry = `select F.id, F.name, F.floorNo, F.floor_image, F.creatorId, F.plantId, P.name as plantName from floor_plan_?  F left join plant_detail_? P on F.plantId=P.id where ?`;
		}else{
			var condition = [companyId,companyId];
			qry= `select F.id, F.name, F.floorNo, F.floor_image, F.creatorId, F.plantId, P.name as plantName from floor_plan_?  F left join plant_detail_? P on F.plantId=P.id`;
		}
		logger.debug("Query for floor list: ", qry);
		db.query(qry, condition, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject({"success":false,  "message":error.sqlMessage});
			}else{
				dbFunc.connectionRelease;
				var resData = [];
				logger.debug("Floors: ", JSON.stringify(rows));
				if(rows.length > 0){

					rows.forEach(row => {

						var temObj = {};
						temObj.id = row.id;
						temObj.name = row.name;
						temObj.floorNo = row.floorNo;
						temObj.plantId = row.plantId;
						temObj.plantName = row.plantName;
						temObj.floor_image = `${url.baseUrl}${companyId}/floors/${row.floor_image}`;
						let condition = {floorId:row.id};
						let zoneCountQry =  `select count(id) as zoneCount from zone_detail_? where ?`;
						db.query(zoneCountQry, [companyId, condition], (error, result, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject({"success":false,  "message":error.sqlMessage});

							}else{
								//logger.debug("Zone count as per floor: ", JSON.stringify(rows), " ,Floor no. ", row.name);
								temObj["zoneCount"]= result[0].zoneCount;
								var findAssetCount;
								if(assetTypeId) {
									findAssetCount = {
										"floorId":row.id,
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
										"floorId":row.id,
										"isEntry" : true,
										"type" : 0,
										"companyId":companyId,
										"isMax":null,
										"isMaxTime":null,
										"isMin":null
									};
								}
								notificationModel.find(findAssetCount).sort({"time":-1}).exec(function(err, results) {
									if (err) {
										reject({"success":false,  "message":"Please try again or contact with admin"});
										logger.debug("Mongo err: ", err);
									}else{
										logger.debug("mongo results: ", JSON.stringify(results.length));
										temObj["assetCount"]= results.length;
										let floorVoilationQry;
										if(assetTypeId) {
											floorVoilationQry = {
												"floorId" : row.id,
												"assetTypeId":assetTypeId,
												"isEntry" : true,
												"isAllowed":false,
												"type" : 0,
												"companyId":companyId,
												"isMax":null,
												"isMaxTime":null,
												"isMin":null
											};
										}
										else {
											floorVoilationQry = {
												"floorId" : row.id,
												"isEntry" : true,
												"isAllowed":false,
												"type" : 0,
												"companyId":companyId,
												"isMax":null,
												"isMaxTime":null,
												"isMin":null
											};
										}
										notificationModel.find(floorVoilationQry).sort({"time":-1}).exec(function(err, results) {
											if (err) {
												logger.debug("Mongo err: ", err);
												reject({"success":false,  "message":"Please try again or contact with admin"});
											}else{
												temObj["floorVoilation"]= results.length;
												resData.push(temObj);
												if(resData.length === rows.length){
													logger.debug("Floor data: ", JSON.stringify(resData));
													var result = _.orderBy(resData, [floor => floor.name.toLowerCase()], ['asc']);
													resolve({"success":true, "items": result, "message":""});
												}
											}
										});
									}
								});
							}
						});
					});
				}else{
					resolve({"success":true, "items": resData, "message":""});
				}

			}
		});
	});
}

function getAreaZone(data, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		if(data.length > 0){
			var floorData = data[0];
			floorData.floor_image = data[0].floor_image && `${url.baseUrl}${companyId}/floors/${data[0].floor_image}`;
			let condition = {floorId:floorData.id};
			let qry = `select * from zone_detail_? where ?`;
			db.query(qry, [companyId, condition], (error, rows, fields) => {
				if (error) {
					dbFunc.connectionRelease;
					reject(error);
				}else{
					dbFunc.connectionRelease;
					logger.debug("Zone Data: " + JSON.stringify(rows));
					floorData.zones = rows;
					resolve({"success":true, "data": floorData, "message":""});
				}
			});

		}else{
			reject({"success":false, "message":"Floor id is invalid"});
		}
	});
}

function getZoneHeatMap(data, companyId){
	return new Promise((resolve, reject) => {
		logger.info("Inside getZoneHeatMap");
		companyId = parseInt(companyId);
		if(data.length > 0){
			var floorData = data[0];
			floorData.floor_image = data[0].floor_image && `${url.baseUrl}${companyId}/floors/${data[0].floor_image}`;
			let condition = {floorId:floorData.id};
			let qry = `select * from zone_detail_? where ?`;
			logger.info(qry);
			db.query(qry, [companyId, condition], (error, rows, fields) => {
				if (error) {
					dbFunc.connectionRelease;
					reject(error);
				}else{
					dbFunc.connectionRelease;
					logger.debug("Zone Data: " + JSON.stringify(rows));
					// findCentroid(JSON.parse(rows[0].zone_crood));
					logger.info(Object.keys(rows));
					var counter = 0;
					rows.forEach((Area)=>{
						// logger.info(Object.keys(Area));
						var center = centroid(JSON.parse(Area.zone_crood));
						Area.centroid = {x:Math.floor(center.x),y:Math.floor(center.y)};
						let findAssetEntry = {
							"zoneId": JSON.stringify(Area.id),
							"floorId":floorData.id,
							"isEntry": true,
							"companyId": companyId
						};
						logger.debug('find qry:',findAssetEntry);
						notificationModel.countDocuments(findAssetEntry,(err,result)=>{ // Chage find query to get count query....
							logger.debug("inside model");
							if (err) {
								logger.debug(err);
								reject({"success":false, "data": err, "message":""});
							}else{
								counter++;
								console.log('Result:', result);
								logger.info(result);
								Area.value = result?result:0;
							}

							if(rows.length == counter){
								floorData.zones = rows;
								resolve({"success":true, "data": floorData, "message":""});
							}


						});


					});

				}
			});
		}else{
			reject({"success":false, "message":"Floor id is invalid"});
		}
	});
}

function updateFloor(req, image, companyId, floorData, isImageUpload) {
	return new Promise((resolve, reject) => {
		var qry;
		companyId = parseInt(companyId);
		var imageName;
		let condition = {id:req.query.plantId};
		let findQry = `select * from plant_detail_? where ?`;
		db.query(findQry, [companyId, condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else if(rows.length > 0) {
				var condition;
				var dataSet;
				if(isImageUpload == 1) {
					dataSet = {
						"name":req.query.name,
						"floor_image":image,
						"floorNo":req.query.floorNo,
						"creatorId":req.headers.userid,
						"plantId":req.query.plantId

					};
					condition = {id:floorData.id};
					qry = `update floor_plan_? set ? where ?`;
				}
				else {
					if(req.query.name != floorData.name) {
						var ext = floorData.floor_image.substring(floorData.floor_image.lastIndexOf(".")+1);
						imageName = req.query.name.trim() + '.' + ext;
						dataSet = {
							"name":req.query.name,
							"floor_image":imageName,
							"floorNo":req.query.floorNo,
							"creatorId":req.headers.userid,
							"plantId":req.query.plantId

						};
						condition = {id:floorData.id};
						qry = `update floor_plan_? set ? where ?`;					}
					else {
						dataSet = {
							"name":req.query.name,
							"floorNo":req.query.floorNo,
							"creatorId":req.headers.userid,
							"plantId":req.query.plantId

						};
						condition = {id:floorData.id};
						qry = `update floor_plan_? set ? where ?`;					}
				}
				db.query(qry, [companyId, dataSet,condition], (err, rows, fields) => {
					if (err) {
						logger.error("Mysql error: ",err);
						dbFunc.connectionRelease;
						reject(err);
					}else{
						if((isImageUpload == 0) && (req.query.name != floorData.name)) {
							var oldPath = `${process.env.PWD}/uploads/${companyId}/floors/${floorData.floor_image}`;
							var newPath = `${process.env.PWD}/uploads/${companyId}/floors/${imageName}`;
							logger.debug('oldPath:', oldPath, ',', 'newPath:', newPath);
							mv(oldPath, newPath, function(err) {
								if(err) {
									logger.error(err);
								}
								else {
									logger.debug('file name renamed for floor:', imageName);
									resolve({"success":true, "message":"Floor Data updated successfully"});
								}
							});
						}
						else {
							resolve({"success":true, "message":"Floor Data updated successfully"});
						}
					}
				});
			}else{
				reject({"success":false,  "message":"Given Plant Id is invalid"});
			}
		});
	});
}

module.exports = zoneModel;
