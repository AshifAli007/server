const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const mongoose = require('mongoose');
const NotificationDao = require('./../models/dao/notificationSchema');
const logger = require('../../config/logger');
var {url} = require('../../config/config');
var _ = require('lodash');


const plantModel = {
	addPlant:addPlant,
	plantList:plantList,
	checkId: checkId,
	getPlant:getPlant,
	getPlantFloors:getPlantFloors,
	getPlantDetail:getPlantDetail,
	updatePlant:updatePlant
};

var notificationDao = new NotificationDao(mongoose);
var notificationModel = notificationDao.getModel();

function addPlant(body, companyId) {
	logger.info("Plant  Data: " + JSON.stringify(body));
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		var dataSet = {
			name:body && body.name,
			address:body && body.address,
			latitude:body && body.latitude,
			longitude:body && body.longitude,
			plantType:body && body.plantType
		};
		let qry = `INSERT INTO plant_detail_? SET ?`;
		logger.info("Query for Insert:",qry);
		db.query(qry, [companyId,dataSet] ,(err, res) => {
			if (err) {
				dbFunc.connectionRelease;
				reject({"success":false, "message":err.sqlMessage});
			}
			else {
				resolve({"success":true,  "message":"Facility Data Saved Successfully"});
			}
		});
	});
}

function plantList(companyId){
	return new Promise((resolve, reject) => {
		let qry = `select P.id, P.name, P.address, P.latitude, P.longitude, P.plantType, PT.name as plantTypeName from plant_detail_${companyId}  P left join plant_type_list PT on P.plantType=PT.id`;
		db.query(qry, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else {
				dbFunc.connectionRelease;
				if(rows.length > 0) {
					var result = _.orderBy(rows, [plant => plant.name.toLowerCase()], ['asc']);
					resolve({"success":true, "data": result, "message":""});
				}
				else {
					resolve({"success":true, "items": rows, "message":""});
				}
			}
		});
	});
}

function checkId(id, companyId){
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		let qry = `select P.id, P.name, P.address, P.latitude, P.longitude, P.plantType, PT.name as plantTypeName from plant_detail_?  P left join plant_type_list PT on P.plantType=PT.id where P.id=?`;
		db.query(qry,[companyId,id], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}else{
					reject({"success":false, "message":"Facility id is invalid"});
				}
			}
		});
	});
}

function getPlant(data){
	logger.debug("data in model: " + JSON.stringify(data));
	return new Promise((resolve, reject) => {
		if(data.length > 0){
			resolve({"success":true, "data": data, "message":""});
		}else{
			reject({"success":false, "message":"Facility id is invalid"});
		}
	});
}

function getPlantFloors(data, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		if(data.length > 0){
			let condition = {plantId:data[0].id};
			let qry = `select * from floor_plan_? where ?`;
			db.query(qry,[companyId, condition], (error, rows, fields) => {
				if (error) {
					dbFunc.connectionRelease;
					reject(error);
				}else{
					if(rows && rows.length > 0) {
						var result = rows.map((floor) => {
							floor.floor_image = floor.floor_image && `${url.baseUrl}${companyId}/floors/${floor.floor_image}`;
							return floor;
						});
						resolve({"success":true, "items": result, "message":""});
					}
					else {
						resolve({"success":true, "items": rows, "message":""});
					}
				}
			});
		}else{
			reject({"success":false, "message":"Floor id is invalid"});
		}
	});
}

function getPlantDetail(data, companyId){
	var assetTypeId = data && data.query && data.query.assetTypeId && data.query.assetTypeId.trim();
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let qry = `select P.id, P.name, P.address, P.latitude, P.longitude, P.plantType, PT.name as plantTypeName from plant_detail_?  P left join plant_type_list PT on P.plantType=PT.id`;
		db.query(qry,[companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject({"success":false, "message":error.sqlMessage});
			}else if(rows.length > 0){
				var resData = [];
				rows.forEach(row => {
					var temObj = {};
					temObj.id = row.id;
					temObj.name = row.name;
					temObj.latitude = row.latitude;
					temObj.longitude = row.longitude;
					temObj.address = row.address;
					temObj.plantType = row.plantType;
					temObj.plantTypeName = row.plantTypeName;
					let condition = {plantId:row.id}
					let qry = `select * from floor_plan_? where ?`;
					db.query(qry,[companyId, condition], (error, result, fields) => {
						if (error) {
							dbFunc.connectionRelease;
							logger.debug("Floor count error: ", error);
							reject({"success":false, "message":error.sqlMessage});
						}else {
							temObj['floorCount'] = result.length;
							let condition = {plantId:row.id};
							let qry = `select count(*) as zoneCount from zone_detail_? where ?`;
							db.query(qry,[companyId, condition], (error, results, fields) => {
								if (error) {
									dbFunc.connectionRelease;
									logger.debug("Floor count error: ", error);
									reject({"success":false, "message":error.sqlMessage});
								}else{
									temObj['zoneCount'] = results[0].zoneCount;
									var findAssetCount;
									if(assetTypeId) {
										findAssetCount = {
											"plantId" : row.id,
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
											"plantId" : row.id,
											"isEntry" : true,
											"type" : 0,
											"companyId":companyId,
											"isMax":null,
											"isMaxTime":null,
											"isMin":null
										};
									}
									logger.debug('find online asset count query:',findAssetCount);
									notificationModel.find(findAssetCount).sort({"time":-1}).exec(function(err, data) {
										if(err){
											reject({"success":false,  "message":"Please try again or contact with admin"});
											logger.debug("Mongo err: ", err);
										}else{
											logger.debug("mongo results: ", JSON.stringify(data));
											temObj["assetCount"]= data.length;
											let plantVoilationQry;
											if(assetTypeId) {
												plantVoilationQry = {
													"plantId" : row.id,
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
												plantVoilationQry = {
													"plantId" : row.id,
													"isEntry" : true,
													"isAllowed":false,
													"type" : 0,
													"companyId":companyId,
													"isMax":null,
													"isMaxTime":null,
													"isMin":null
												};
											}
											notificationModel.find(plantVoilationQry).sort({"time":-1}).exec(function(err, datas) {
												if (err) {
													logger.debug("Mongo err: ", err);
													reject({"success":false,  "message":"Please try again or contact with admin"});
												}else{
													temObj["plantVoilation"]= datas.length;
													resData.push(temObj);
													if(resData.length === rows.length){
														logger.debug("Plant data: ", JSON.stringify(resData));
														var result = _.orderBy(resData, [plant => plant.name.toLowerCase()], ['asc']);
														resolve({"success":true, "items": result, "message":""});
													}
												}
											});
										}
									});
								}
							});
						}
					});
				});
			}else{
				resolve({"success":true, "items":[], "message":""});
			}
		});
	});
}

function updatePlant(body, plantId, companyId) {
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let condition = [companyId,{name:body.name},plantId];
		var qry = `select id from plant_detail_? where ? AND id <> ?`;
		db.query(qry,condition, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					reject({"success":false, "message":"Facility name already exist ! try with different name"});
				}else{
					var dataSet = {
						name:body && body.name,
						address:body && body.address || null,
						latitude:body && body.latitude || null,
						longitude:body && body.longitude || null,
						plantType:body && body.plantType

					};
					let condition = {id:plantId};
					let paramList = [companyId,dataSet,condition];
					let qry = `update plant_detail_? SET ? where ?`;
					logger.debug("Query for Plant Update: " + qry);
					db.query(qry, paramList ,(err, res) => {
						if (err) {
							dbFunc.connectionRelease;
							reject({"success":false, "message":err.sqlMessage});
						}
						else {
							resolve({"success":true,  "message":"Facility Data updated Successfully"});
						}
					});
				}
			}
		});
	});
}

module.exports = plantModel;
