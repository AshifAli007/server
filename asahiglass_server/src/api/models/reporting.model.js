const mongoose = require('mongoose');
const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const NotificationDao = require('./dao/notificationSchema');
const { omitBy, isNil } = require('lodash');
const _ = require('lodash');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const logger = require('../../config/logger');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
var async = require('async');
var fs = require('fs');
var waterfall = require('async/waterfall');

const reportingModel = {
	getReporting:getReporting,
	getReportToday:getReportToday,
	getReportDatewise:getReportDatewise,
	getReportingData:getReportingData,
	checkKpiData:checkKpiData,
	KPI:KPI,
	getViolationStats:getViolationStats,
	getPopulationStats:getPopulationStats,
	getAssetTypeViolationStats:getAssetTypeViolationStats,
	getZoneProductivity:getZoneProductivity,
	detailedKPIData:detailedKPIData
};

var notificationDao = new NotificationDao(mongoose);
var notificationModel = notificationDao.getModel();

function getReporting(companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		notificationModel.find({"type":0}).lean().exec(function(err,result){
			if (err) {
				reject(err);
			}else{
				var tempObj = [];
				if(result && result.length > 0) {
					var counter = 0;
					result.forEach(function(res) {
						let condition = {uniqueId:res.empId};
						let qry = `select type from asset_detail_? where ?`;
						db.query(qry,[companyId,condition], (error, row, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							}else{
								counter++;
								dbFunc.connectionRelease;
								res.assetType = row[0].type;
								tempObj.push(res);
								if(result.length === counter) {
									resolve({"success":true, "items": tempObj, "message":""});
								}
							}
						});
					});
				}
				else {
					resolve({"success":true, "items":result,  "message":""});
				}
			}
		});
	});
}

function getReportToday(data, companyId){
	var endDate = Math.round(new Date().getTime() / 1000);
	var startDate = endDate - (24 * 3600);
	var dataLen = Object.keys(data).length
	return new Promise((resolve, reject) => {
		console.log("Data: " + JSON.stringify(data));
		console.log('start Date: ' + startDate);
		console.log('endDate: ' + endDate);
		companyId = parseInt(companyId);
		var qry;
		var filter;
		if(dataLen == 0){
			qry =[{$and:[{'time':{$lte:endDate}},{'time':{$gte:startDate}},{"type":0}]}];
			console.log("Log 1");
		}else{
			if(data.zId && !data.eId){

				qry = [{$and:[{'time':{$lte:endDate}},{'time':{$gte:startDate}},{"zoneId" : data.zId},{"type":0}]}];

				console.log("Log 2");
			}else if(!data.zId && data.eId){
				qry = [{$and:[{'time':{$lte:endDate}},{'time':{$gte:startDate}}, {"empId" : data.eId},{"type":0}]}]
			}
			else{
				console.log("Log 3");
				qry = [{$and:[{'time':{$lte:endDate}},{'time':{$gte:startDate}},{"zoneId" : data.zId}, {"empId" : data.eId}]}]
			}
		}

		console.log("Query: " + JSON.stringify(qry));
		notificationModel.find(qry[0]).lean().exec(function(err,result){
			console.log(qry[0]);
			if (err) {
				reject(err);
			}else{
				var tempObj = [];
				if(result && result.length > 0) {
					var counter = 0;
					result.forEach(function(res) {
						let condition = {uniqueId:res.empId};
						let qry = `select type from asset_detail_? where ?`;
						db.query(qry,[companyId, condition], (error, row, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							}else{
								counter++;
								dbFunc.connectionRelease;
								res.assetType = row[0].type;
								tempObj.push(res);
								if(result.length === counter) {
									resolve({"success":true, "items": tempObj, "message":""});
								}
							}
						});
					});
				}
				else {
					resolve({"success":true, "items":result,  "message":""});
				}
			}
		});
	});
}

function getReportDatewise(data, companyId){

	var dataLen = Object.keys(data).length;
	companyId = parseInt(companyId);
	console.log("Date parms length: " + dataLen);
	return new Promise((resolve, reject) => {
		if(dataLen > 0){

			if(data.sDate == undefined){
				reject({"success":false,  "message":"Please enter start date"});
			}

			var startDate = new Date(parseInt(data.sDate)).setHours(24,0,0);
			var endDate = new Date(parseInt(data.eDate)).setHours(23,50,0);
			console.log("edate: " + startDate);

			var qry;
			if(data.zId && !data.eId){
				console.log("Log 1");
				qry = [{$and:[{'time':{$lte:endDate}},{'time':{$gte:startDate}},{"zoneId" : data.zId},{"type":0}]}];

			}else if(!data.zId && data.eId){
				console.log("Log 2");
				qry = [{$and:[{'time':{$lte:endDate}},{'time':{$gte:startDate}}, {"empId" : data.eId},{"type":0}]}]

			}else if(!data.zId && !data.eId){
				console.log("Log 3");
				qry =[{$and:[{'time':{$lte:endDate}},{'time':{$gte:startDate}},{"type":0}]}];

			}else{
				console.log("Log 4");
				qry = [{$and:[{'time':{$lte:endDate}},{'time':{$gte:startDate}},{"zoneId" : data.zId}, {"empId" : data.eId},{"type":0}]}]

			}
			console.log("Query: " + JSON.stringify(qry));
			notificationModel.find(qry[0],qry[1]).lean().exec(function(err,result){
				if (err) {
					reject(err);
				}else{
					var tempObj = [];
					if(result && result.length > 0) {
						var counter = 0;
						result.forEach(function(res) {
							let condition = {uniqueId:res.empId};
							var qry = `select type from asset_detail_? where ?`;
							db.query(qry,[companyId, condition], (error, row, fields) => {
								if (error) {
									dbFunc.connectionRelease;
									reject(error);
								}else{
									counter++;
									dbFunc.connectionRelease;
									res.assetType = row[0].type;
									tempObj.push(res);
									if(result.length === counter) {
										resolve({"success":true, "items": tempObj, "message":""});
									}
								}
							});
						});
					}
					else {
						resolve({"success":true, "items":result,  "message":""});
					}
				}
			});
		}else{
			reject({"success":false,  "message":"Please enter start & end date"});
		}
	});
}


function getReportingData(companyId, req){
	return new Promise((resolve, reject) => {
		var finalResponse = [];
		req.kpi.forEach(function(kpiId, index) {
			waterfall([
				function(callback) {
					if(kpiId == 'KC001') {
						req.kpiId = kpiId;
						zoneUnAuthorisedAccessCount(companyId, req).then((data)=>{
							let newObj = Object.assign({kpiId: req.kpiId}, data);
							finalResponse.push(newObj);
							logger.debug(req.kpiId+':' +JSON.stringify(finalResponse));
							callback(null, finalResponse);
						}).
						catch((err)=> {
							callback(err);
						});
					}
				}
			], function (err, result) {
				if(err) {
					reject(err);
				}
				else {
					if(req.kpi.length - 1 === index) {
						resolve({"success":true, "items":result, "message":""});
					}
				}
			});
		});
	});
}

function zoneUnAuthorisedAccessCount(companyId, data) {
	var dataLen = Object.keys(data).length;
	logger.debug("Data params length: " + JSON.stringify(dataLen));
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let qry = `select * from kpi_detail_? where ?`;
		let condition = {kpiId:data.kpiId};
		db.query(qry,[companyId, condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else {
				if(dataLen > 0){

					if(!data.startDate || !data.endDate){
						reject({"success":false,  "message":"Please select Date"});
					}
					/*if(data.zoneId) {
						var qry = [{"isAllowed":0,"companyId":companyId,"zoneId":data.zoneId,'type':0,'time':{$lte:data.endDate, $gte:data.startDate}}];
					}
					else {
						var qry = [{"isAllowed":0,"companyId":companyId,'type':0,'time':{$lte:data.endDate, $gte:data.startDate}}];
					}*/
					var qry = JSON.parse(rows[0].query);
					Object.keys(data).forEach(function(key) {
    					if(!data[key]) {
    						delete qry[key];
    						delete data[key];
						}
					});
					Object.keys(qry).forEach(function(resu) {
						if (resu in data) {
							qry[resu] = data[resu];
						}
					});
					qry.isAllowed = 0;
					qry.companyId = companyId;
					qry.type = 0;
					qry.time = {
						"$lte":data.endDate,
						"$gte":data.startDate
					};
					logger.debug("Query: " + JSON.stringify(qry));
					notificationModel.find(qry).lean().exec(function(err,result){
						if (err) {
							reject(err);
						}else{
							if(result && result.length > 0) {
								var res= {} ;
								var resu = _(result)
											.groupBy(x => x.zoneName)
											.map((value, key) => ({zoneName: key, count: value.length, items: value}))
											.value();
								res[data.kpiId] = resu;
								resolve(res);

							}
							else {
								var res= {} ;
								var resu = [{"zoneName":"","count":0,"items":result}];
								res[data.kpiId] = resu;
								resolve(res);
							}
						}
					});
				}else{
					reject({"success":false,  "message":"Please enter start & end date"});
				}
			}
		});
	});
}

// function KPI(companyId, data, rows) {
// 	var dataLen = Object.keys(data).length;
// 	var tmp = data.kpiId;
// 	var type = rows[0].type;
// 	var finalArray;
// 	logger.debug("Data params length: " + JSON.stringify(dataLen));
// 	return new Promise((resolve, reject) => {
// 		var qry = JSON.parse(rows[0].query);
// 		Object.keys(data).forEach(function(key) {
// 			if(!data[key]) {
// 				delete qry[key];
// 				//delete data[key];
// 			}
// 		});
// 		Object.keys(qry).forEach(function(resu) {
// 			if (resu in data) {
// 				qry[resu] = data[resu];
// 			}
// 		});
// 		//qry.isAllowed = 0;
// 		if(tmp == 'KC001' || tmp == 'KC004' || tmp == 'KC005' || tmp == 'KC006' || tmp == 'KC007' || tmp == 'KA002' || tmp == 'KA007') {
// 			qry.companyId = Number(companyId);
// 			qry.type = 0;
// 			qry.time = {
// 				"$lte":data.endDate,
// 				"$gte":data.startDate
// 			};
// 			logger.debug("Query: " + JSON.stringify(qry));
// 			notificationModel.find(qry).lean().exec(function(err,result){
// 				if (err) {
// 					reject(err);
// 				}else{
// 					if(result && result.length > 0) {
// 						var res= {} ;
// 						if(type == 1) {
// 							var resu = _(result)
// 								.groupBy(x => x.zoneName)
// 								.map((value, key) => ({name: key, kpiValue: value.length, time_field:false, items: value}))
// 								.value();
// 						}
// 						else if(type == 2) {
// 							var resu = _(result)
// 								.groupBy(x => x.empId)
// 								.map((value, key) => ({name: key, kpiValue: value.length, time_field:false, items: value}))
// 								.value();
// 						}
// 						res[tmp] = resu;
// 						resolve(res);

// 					}
// 					else {
// 						var res= {} ;
// 						var resu = [{"name":"","kpiValue":0, "items":result}];
// 						res[tmp] = resu;
// 						resolve(res);
// 					}
// 				}
// 			});
// 		}
// 		else if(tmp == 'KC002' || tmp == 'KC003' || tmp == 'KA001' || tmp == 'KA003' || tmp == 'KA004' || tmp == 'KA005' || tmp == 'KA006') {
// 			qry.companyId = Number(companyId);
// 			qry.type = 0;
// 			qry.time = {
// 				"$lte":data.endDate,
// 				"$gte":data.startDate
// 			};
// 			logger.debug("Query: " + JSON.stringify(qry));
// 			notificationModel.find(qry).lean().exec(function(err,result){
// 				if (err) {
// 					reject(err);
// 				}else{
// 					if (result && result.length > 0) {
// 						finalArray = result.map((allowedData) => {
// 							if(!allowedData.isEntry) {
// 								var start = moment(new Date(Number(allowedData.exitTime)).getTime());
// 							}
// 							else {
// 								start = moment(new Date().getTime());
// 							}
// 							let end =   moment(new Date(Number(allowedData.entryTime)).getTime());
// 							let duration = moment.duration(start.diff(end));
// 							let timeSpent = duration.asSeconds().toFixed(3);
// 							allowedData.timeSpent = timeSpent;
// 							return allowedData;
// 						});
// 						if(finalArray && finalArray.length > 0) {
// 							var res= {} ;
// 							if(type == 1) {
// 								var resu = _(finalArray)
// 									.groupBy(x => x.zoneName)
// 									.map((value, key) => ({name: key, kpiValue:0, time_field:true, items: value}))
// 									.value();
// 							}
// 							else if (type == 2) {
// 								var resu = _(finalArray)
// 									.groupBy(x => x.empId)
// 									.map((value, key) => ({name: key, kpiValue:0, time_field:true, items: value}))
// 									.value();
// 							}
// 							resu.forEach(function(zone, index) {
// 								var maxValObject = _.maxBy(zone.items, 'timeSpent');
// 								var minValObject = _.minBy(zone.items, 'timeSpent');
// 								zone.items.forEach(function(zoneData) {
// 									if(tmp == 'KA003' || tmp == 'KA006') {
// 										zone.kpiValue = parseFloat(maxValObject.timeSpent);
// 									}
// 									else if(tmp == 'KA004') {
// 										zone.kpiValue = parseFloat(minValObject.timeSpent);
// 									}
// 									else {
// 										zone.kpiValue = parseFloat(zone.kpiValue) + parseFloat(zoneData.timeSpent);
// 										zone.kpiValue = parseFloat(zone.kpiValue.toFixed(3));
// 									}
// 									if(resu.length - 1 == index) {
// 										res[tmp] = resu;
// 										resolve(res);
// 									}
// 								});
// 							});
// 						}
// 					}
// 					else {
// 						var res= {} ;
// 						var resu = [{"name":"","kpiValue":0, "items":result}];
// 						res[tmp] = resu;
// 						resolve(res);
// 					}
// 				}
// 			});
// 		}
// 	});
// }

var collectData = function(qry){
	return new Promise((resolve, reject) => {
		notificationModel.find(qry).lean().exec(function(err,result){
			if (err) {
				reject(err);
			}else{
				resolve(result);
			}
		});
	});
};



var reportingData = function(qrys, zones, kpis, companyId, filters, kpi, isTime, kpiType, kpiName, assets){
	var array = [];
	var resultType = filters.resultType;
	logger.debug('Zone Array length:', zones.length);
	logger.debug('Assets Data length:', assets.length);
	return new Promise((resolve, reject) => {
		zones.forEach(zone => {
			var zoneId = zone.id;
			var zonename = zone.name;
			var counter  = 0;
			var valueCount = 0;
			var zoneObj = {};
			var zoneRes = [];
			qrys.forEach(function(qry) {
				qry["zoneId"] = zoneId;
				logger.debug("Per Qry with zone id: ", JSON.stringify(qry));
				collectData(qry).then((data)=>{
					var startDate = qry.time;
					var endDate = qry.time;
					var filterAsset = [];
					startDate = startDate.$gte;
					endDate = endDate.$lte;
					counter++;
					if(!isTime){
						//KPI Type Count Calculation
						//logger.debug("KPI Count Calculation");
						if(data.length > 0){
							var timeSpentArray = data.map((allowedData) => {
								if(!allowedData.isEntry) {
									var start = moment(new Date(Number(allowedData.exitTime)).getTime());
								}
								else {
									start = moment(new Date(Number(endDate)).getTime());
								}
								let end =   moment(new Date(Number(allowedData.entryTime)).getTime());
								let duration = moment.duration(start.diff(end));
								let timeSpent = Math.round(duration.asSeconds());
								timeSpent = Math.round(timeSpent/60);
								allowedData.timeSpent = parseInt(timeSpent);
								return allowedData;
							});

							var resu = _(timeSpentArray)
								.groupBy(x => x.empId)
								.map((value, key) => ({ startDate:startDate, endDate:endDate, name: value[0].empName, empId:value[0].empId, value: value.length, detailedData:value}))
								.value();
							resu.forEach(function(res,i) {
								valueCount = valueCount + res.value;
								var empId = res.empId;
								//logger.debug('Emp Id:', empId);
								if(filterAsset.length > 0) {
									filterAsset = filterAsset.filter(function(obj) {
										return obj.uniqueId !== empId;
									});
								}
								else {
									filterAsset = assets.filter(function(obj) {
										return obj.uniqueId !== empId;
									});
								}
								if(resu.length - 1 == i) {
									//logger.debug('filter asset array:', filterAsset);
								}
							});
							if(filterAsset.length > 0) {
								filterAsset.forEach(asset => {
									var assetData = {};
									assetData['startDate'] = startDate;
									assetData['endDate'] = endDate;
									assetData['name'] = asset.name;
									assetData['empId'] = asset.uniqueId;
									assetData['value'] = 0;
									assetData['detailedData'] = [];
									resu.push(assetData);
								});
							}
							zoneRes = zoneRes.concat(resu);
							//logger.debug("Qrys lng: ", qrys.length);
							//logger.debug("counter lng: ", counter);
							if(qrys.length == counter){
								zoneRes = _.orderBy(zoneRes, [obj => obj.startDate], ['asc']);
								zoneObj["name"] = zonename;
								zoneObj["zoneId"] = zoneId;
								zoneObj["time_field"] = false;
								zoneObj["kpiValue"] = valueCount;
								//zoneObj["type"] = 1;
								var b = _(zoneRes)
									.groupBy(x => x.startDate)
									.map((value, key) => ({date:key, endDate:value[0].endDate,totalValue:0,result:value}))
									.value();
								if(kpiType == 1) {
									b = b.map((item) => {
										item.result.forEach(function(zoneData){
											item.totalValue = item.totalValue + zoneData.value;
										});
										return item;
									});
								}
								if(resultType == 1) {
									b = b.map((item) => {
										item.result.forEach(function(zoneData){
											zoneData.detailedData = [];
										});
										return item;
									});
								}
								zoneObj["items"] = b;
								array.push(zoneObj);
								if(zones.length == array.length) {
									resolve(array);
								}
								//fs.writeFileSync("/home/wavenet/Documents/AsahiGlass/asahiglass_server/uploads/logfile.txt", JSON.stringify(array))
							}
						}else{
							assets.forEach(asset => {
								var emptyObj = {
									"startDate":startDate,
									"endDate":endDate,
									"name": asset.name,
									"empId": asset.uniqueId,
									"value":0,
									"detailedData":[]
								};
								zoneRes.push(emptyObj);
							});
							//logger.debug("Qrys lng in else: ", qrys.length);
							//logger.debug("counter lng in else: ", counter);
							if(qrys.length == counter){
								zoneRes = _.orderBy(zoneRes, [obj => obj.startDate], ['asc']);
								zoneObj["name"] = zonename;
								zoneObj["zoneId"] = zoneId;
								zoneObj["time_field"] = false;
								zoneObj["kpiValue"] = valueCount;
								var c = _(zoneRes)
									.groupBy(x => x.startDate)
									.map((value, key) => ({date:key,endDate:value[0].endDate,totalValue:0,result:value}))
									.value();
								if(kpiType == 1) {
									c = c.map((item) => {
										item.result.forEach(function(zoneData){
											item.totalValue = item.totalValue + zoneData.value;
										});
										return item;
									});
								}
								if(resultType == 1) {
									c = c.map((item) => {
										item.result.forEach(function(zoneData){
											zoneData.detailedData = [];
										});
										return item;
									});
								}
								zoneObj["items"] = c;
								array.push(zoneObj);
								if(zones.length == array.length) {
									resolve(array);
								}
								//fs.writeFileSync("/home/wavenet/Documents/AsahiGlass/asahiglass_server/uploads/logfile.txt", JSON.stringify(array))
							}
						}
					}else{
						//KPI Type Time Calculation
						//logger.debug("Kpi Time Calculation");
						if(data.length > 0){
							var timeSpentArray = data.map((allowedData) => {
								if(!allowedData.isEntry) {
									var start = moment(new Date(Number(allowedData.exitTime)).getTime());
								}
								else {
									start = moment(new Date(Number(endDate)).getTime());
								}
								let end = moment(new Date(Number(allowedData.entryTime)).getTime());
								let duration = moment.duration(start.diff(end));
								let timeSpent = Math.round(duration.asSeconds());
								timeSpent = Math.round(timeSpent/60);
								allowedData.timeSpent = parseInt(timeSpent);
								return allowedData;
							});

							var resu = _(timeSpentArray)
								.groupBy(x => x.empId)
								.map((value, key) => ({ startDate:startDate, endDate:endDate, name: value[0].empName, empId:value[0].empId, value: 0, detailedData:value}))
								.value();

							resu.forEach(function(res, index) {
								res.detailedData.forEach(function(data) {
									//logger.debug("Per detail data: ", data);
									if(kpi == 'KC002' || kpi == 'KC003' || kpi == 'KA001'|| kpi == 'KA005') {
										res.value = res.value + data.timeSpent;
										valueCount = valueCount + data.timeSpent;
									}
									if(resu.length - 1  == index){
										var empId = res.empId;
										//logger.debug('Emp Id:', empId);
										if(filterAsset.length > 0) {
											filterAsset = filterAsset.filter(function(obj) {
												return obj.uniqueId !== empId;
											});
										}
										else {
											filterAsset = assets.filter(function(obj) {
												return obj.uniqueId !== empId;
											});
										}
									}
								});
							});


							resu.forEach(function(res, index){
								if(kpi == 'KA003' || kpi == 'KA006') {
									var maxValObject = _.maxBy(res.detailedData, 'timeSpent');
									res.value = maxValObject.timeSpent;
									logger.debug("Alim Max", JSON.stringify(maxValObject));
									// logger.debug('Max value object:', maxValObject.value, 'valueCount:', valueCount);
									// if(valueCount < maxValObject.value) {
									// 	valueCount = maxValObject.value;
									// 	logger.debug('value count:', valueCount);
									// }
								}

								if(kpi == 'KA004') {
									var minValObject = _.minBy(res.detailedData, 'timeSpent');
									res.value = minValObject.timeSpent;
									logger.debug("Alim Min", JSON.stringify(minValObject));
									//logger.debug('min value object:', minValObject.value, 'valueCount:', valueCount);
									// if(valueCount == 0 || minValObject.value < valueCount) {
									// 	valueCount = minValObject.value;
									// 	logger.debug('value count:', valueCount);
									// }
								}
							});



							//logger.debug("Final rseu: ", JSON.stringify(resu[0]));
							if(filterAsset.length > 0) {
								filterAsset.forEach(asset => {
									var assetData = {};
									assetData['startDate'] = startDate;
									assetData['endDate'] = endDate;
									assetData['name'] = asset.name;
									assetData['empId'] = asset.uniqueId;
									assetData['value'] = 0;
									assetData['detailedData'] = [];
									resu.push(assetData);
								});
							}
							zoneRes = zoneRes.concat(resu);

							if(qrys.length == counter){
								zoneRes = _.orderBy(zoneRes, [obj => obj.startDate], ['asc']);
								zoneObj["name"] = zonename;
								zoneObj["zoneId"] = zoneId;
								zoneObj["time_field"] = true;
								zoneObj["kpiValue"] = valueCount;

								var b = _(zoneRes)
									.groupBy(x => x.startDate)
									.map((value, key) => ({date:key,endDate:value[0].endDate,totalValue:0,result:value}))
									.value();

								if(kpiType == 1) {
									b = b.map((item) => {
										item.result.forEach(function(zoneData){
											item.totalValue = item.totalValue + zoneData.value;
										});
										return item;
									});
								}
								if(resultType == 1) {
									b = b.map((item) => {
										item.result.forEach(function(zoneData){
											zoneData.detailedData = [];
										});
										return item;
									});
								}
								zoneObj["items"] = b;
								array.push(zoneObj);
								logger.debug("Zone lng: ", zones.length);
								logger.debug("array lng: ", array.length);
								if(zones.length == array.length) {
									resolve(array);
								}
							}
						}else{
							assets.forEach(asset => {
								var emptyObj = {
									"startDate":startDate,
									"endDate":endDate,
									"name": asset.name,
									"empId": asset.uniqueId,
									"value":0,
									"detailedData":[]
								};
								zoneRes.push(emptyObj);
							});

							if(qrys.length == counter){
								zoneRes = _.orderBy(zoneRes, [obj => obj.startDate], ['asc']);
								zoneObj["name"] = zonename;
								zoneObj["zoneId"] = zoneId;
								zoneObj["time_field"] = true;
								zoneObj["kpiValue"] = valueCount;
								var c = _(zoneRes)
									.groupBy(x => x.startDate)
									.map((value, key) => ({date:key,endDate:value[0].endDate,totalValue:0,result:value}))
									.value();
								if(kpiType == 1) {
									c = c.map((item) => {
										item.result.forEach(function(zoneData){
											item.totalValue = item.totalValue + zoneData.value;
										});
										return item;
									});
								}
								if(resultType == 1) {
									c = c.map((item) => {
										item.result.forEach(function(zoneData){
											zoneData.detailedData = [];
										});
										return item;
									});
								}
								zoneObj["items"] = c;
								array.push(zoneObj);
								if(zones.length == array.length) {
									resolve(array);
								}
								//fs.writeFileSync("/home/wavenet/Documents/AsahiGlass/asahiglass_server/uploads/logfile.txt", JSON.stringify(array))
							}
						}
					}
				}).catch((err) => {
					reject(err);
				});
			});
		});
	});
};


var countReporting = function(companyId, filters, kpis, zones, qry, kpiType, type, kpi, isTime, kpiName, assets){
	logger.debug("qry", qry);
	return new Promise((resolve, reject) => {
		if(type == 1){
			logger.debug("Daily Data");
			var startDate = moment(parseInt(filters.startDate));
			var endDate = moment(parseInt(filters.endDate));
			var endOfDay = moment(parseInt(filters.endDate)).endOf("day").utcOffset("+05:30");
			logger.debug('end of end Date:', endOfDay);
			var duration = moment.duration(endOfDay.diff(startDate));
			logger.debug('Duration:', duration.asDays());
			var days = Math.floor(duration.asDays()) + 1;
			logger.debug("Days: ", days);
			var start,end;
			var daysData = [];
			for(var i = 0; i < days; i++){
				var tempObj = {};
				if(i == 0){
					start = startDate;
					if(i == days - 1) {
						end = endDate;
					}
					else {
						end = moment(startDate).endOf("day").utcOffset("+05:30");
					}
				}else if(i == days - 1 ){
					logger.debug("Ends");
					start = moment(endDate).startOf('day').utcOffset("+05:30");
					end = endDate;
				} else {
					start = moment(startDate).add('days', i).startOf('day').utcOffset("+05:30");
					end = moment(startDate).add('days', i).endOf('day').utcOffset("+05:30");
				}
				var a ={};
				var time = {
					"$lte":JSON.stringify(new Date(end).getTime()),
					"$gte":JSON.stringify(new Date(start).getTime())
				};
				qry["time"] = time;
				a = Object.assign({}, qry);
				daysData.push(a);
				if(days == daysData.length){
					logger.info("Days array in reporting: ", JSON.stringify(daysData));
					reportingData(daysData, zones, kpis, companyId, filters, kpi, isTime, kpiType, kpiName, assets).then((res)=>{
						resolve(res);
					}).catch((err) => {
						reject(err);
					});
				}
			}
		}else if(type == 2){
			//Weekly Report
			var startDate = moment(parseInt(filters.startDate));
			var endDate = moment(parseInt(filters.endDate));
			var endOfDay = moment(parseInt(filters.endDate)).endOf("day").utcOffset("+05:30");
			var duration = moment.duration(endOfDay.diff(startDate));
			var days = Math.ceil(duration.asDays());
			var weeks = Math.ceil(duration.asWeeks());
			if(days < 7){
				reject({success:false, message:"selected duration is less than a week"});
			}else{
				logger.debug("Days Count: ", days);
				logger.debug("Weeks count: ", weeks);
				var start,end;
				var daysData = [];
				for(var i = 0; i < weeks; i++){
					var tempObj = {};
					if(i == 0){
						start = startDate;

						if(i == weeks - 1) {
							end = endDate;
						}
						else {
							end = moment(startDate).add('days', 6).endOf("day").utcOffset("+05:30");
						}
					}else if(i == weeks - 1 ){
						logger.debug("Ends");
						start = moment(end).add('days', 1).startOf('day').utcOffset("+05:30");
						end = endDate;
					} else {
						start = moment(end).add('days', 1).startOf('day').utcOffset("+05:30");
						end = moment(start).add('days', 6).endOf("day").utcOffset("+05:30");
					}
					var a ={};
					var time = {
						"$lte":JSON.stringify(new Date(end).getTime()),
						"$gte":JSON.stringify(new Date(start).getTime())
					};
					qry["time"] = time;
					a = Object.assign({}, qry);
					daysData.push(a);
					if(weeks == daysData.length){
						logger.info("Week array in reporting: ", JSON.stringify(daysData));
						reportingData(daysData, zones, kpis, companyId, filters, kpi, isTime, kpiType, kpiName, assets).then((res)=>{
							resolve(res);
						}).catch((err) => {
							reject(err);
						});
					}
				}
			}

		}else if(type == 3){
			//Monthly Report
			var startDate = moment(parseInt(filters.startDate));
			var endDate = moment(parseInt(filters.endDate));
			var endOfDay = moment(parseInt(filters.endDate)).endOf("day").utcOffset("+05:30");
			var duration = moment.duration(endOfDay.diff(startDate));
			var days = Math.ceil(duration.asDays());
			var month = Math.ceil(duration.asMonths());

			if(days < 30){
				reject({success:false, message:"selected duration is less than a month"});
			}else{
				logger.debug("Month: ", month);
				var start,end;
				var daysData = [];
				for(var i = 0; i < month; i++){
					var tempObj = {};
					if(i == 0){
						start = startDate;

						if(i == month - 1) {
							end = endDate;
						}
						else {
							end = moment(startDate).add('days', 29).endOf("day").utcOffset("+05:30");
						}
					}else if(i == month - 1 ){
						logger.debug("Ends");
						start = moment(end).add('days', 1).startOf('day').utcOffset("+05:30");
						end = endDate;
					} else {
						start = moment(end).add('days', 1).startOf('day').utcOffset("+05:30");
						end = moment(start).add('days', 29).endOf("day").utcOffset("+05:30");
					}
					var a ={};
					var time = {
						"$lte":JSON.stringify(new Date(end).getTime()),
						"$gte":JSON.stringify(new Date(start).getTime())
					};
					qry["time"] = time;
					a = Object.assign({}, qry);
					daysData.push(a);
					if(month == daysData.length){
						logger.info("Month array in reporting: ", JSON.stringify(daysData));
						reportingData(daysData, zones, kpis, companyId, filters, kpi, isTime, kpiType, kpiName, assets).then((res)=>{
							resolve(res);
						}).catch((err) => {
							reject(err);
						});
					}
				}
			}
		}else{
			reject({success:false, message:"Reporting filter is invalid"});
		}
	});
};



function KPI(companyId, filters, kpis, zones, kpiName, assets) {
	return new Promise((resolve, reject) => {
		logger.debug("companyId", companyId, " ,filters: ", JSON.stringify(filters), " ,KPI List: ", JSON.stringify(kpis), " ,Zones: ", JSON.stringify(zones));
		var tmp = filters.kpiId;
		var kpiType = kpis[0].type;
		var qry = JSON.parse(kpis[0].query);
		Object.keys(filters).forEach(function(key) {
			if(!filters[key]) {
				delete qry[key];
				//delete data[key];
			}
		});

		Object.keys(qry).forEach(function(resu) {
			if (resu in filters) {
				qry[resu] = filters[resu];
			}
		});

		qry.companyId = Number(companyId);
		qry.plantId = Number(filters.plantId);
		qry.type = 0;
		qry.isMissing = 0;
		// qry.time = {
		// 	"$lte":filters.endDate,
		// 	"$gte":filters.startDate
		// };
		logger.debug("tmp: ", tmp, " type: ", kpiType);

		if(tmp == 'KC001' || tmp == 'KC004' || tmp == 'KC005' || tmp == 'KC006' || tmp == 'KC007' || tmp == 'KA002' || tmp == 'KA007')
		{
			countReporting(companyId, filters, kpis, zones, qry, kpiType, filters.type, tmp, false, kpiName, assets).then((res)=>{
				//logger.debug("Reporting: ", JSON.stringify(res));
				var finalRes = {};
				finalRes[tmp] = res;
				resolve(finalRes);
			}).catch((err) => {
				reject(err);
			});
		}
		else if(tmp == 'KC002' || tmp == 'KC003' || tmp == 'KA001' || tmp == 'KA003' || tmp == 'KA004' || tmp == 'KA005' || tmp == 'KA006')
		{
			//var res_countReportingTime = countReporting(companyId, filters, kpis, zones, qry, kpiType, filters.type, tmp, true, kpiName, assets);
			countReporting(companyId, filters, kpis, zones, qry, kpiType, filters.type, tmp, true, kpiName, assets).then((res)=>{
				//logger.debug("Reporting: ", JSON.stringify(res));
				var finalRes = {};
				finalRes[tmp] = res;
				resolve(finalRes);
			}).catch((err) => {
				reject(err);
			});
		}
	});
}

function detailedKPIData(companyId, filters, kpis) {
	return new Promise((resolve, reject) => {
		var zoneId = filters.zoneId;
		logger.debug("companyId", companyId, " ,filters: ", JSON.stringify(filters), " ,KPI List: ", JSON.stringify(kpis));
		var qry = JSON.parse(kpis[0].query);
		Object.keys(filters).forEach(function(key) {
			if(!filters[key]) {
				delete qry[key];
				//delete data[key];
			}
		});

		Object.keys(qry).forEach(function(resu) {
			if (resu in filters) {
				qry[resu] = filters[resu];
			}
		});

		qry.companyId = Number(companyId);
		qry.plantId = Number(filters.plantId);
		qry.type = 0;
		qry.isMissing = 0;
		qry["zoneId"] = zoneId;
		var time = {
			"$lte":filters.endDate,
			"$gte":filters.startDate
		};
		qry["time"] = time;
		var startDate = qry.time;
		var endDate = qry.time;
		startDate = startDate.$gte;
		endDate = endDate.$lte;
		logger.debug("Qry for kpiId: ", filters.kpiId, ',Query: ', JSON.stringify(qry));
		notificationModel.find(qry).lean().exec(function(err,data){
			if (err) {
				reject(err);
			}else{
				if(data.length > 0){
					var result = data.map((allowedData) => {
						if(!allowedData.isEntry) {
							var start = moment(new Date(Number(allowedData.exitTime)).getTime());
						}
						else {
							start = moment(new Date(Number(endDate)).getTime());
						}
						let end =   moment(new Date(Number(allowedData.entryTime)).getTime());
						let duration = moment.duration(start.diff(end));
						let timeSpent = Math.round(duration.asSeconds());
						timeSpent = Math.round(timeSpent/60);
						allowedData.timeSpent = parseInt(timeSpent);
						return allowedData;
					});
					resolve(result);
				}else {
					var emptyData = [];
					resolve(emptyData);
				}
			}
		});
	});
}




function checkKpiData(companyId, kpi) {
	return new Promise((resolve, reject) => {
		// let qry = `select * from kpi_detail_${companyId} where kpiId='${kpi}'`;
		companyId = parseInt(companyId);
		let qry = `select * from kpi_detail_? where ?`;
		let condition = {kpiId:kpi};
		db.query(qry,[companyId,condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else {
				if(rows.length > 0) {
					resolve(rows);
				}
				else {
					reject(false);
				}
			}
		});
	});
}


function getViolationStats(query, companyId){
	return new Promise((resolve, reject) => {
		var resArray = [];
		// let qry = `select * from plant_detail_${companyId} where id=${query.plantId}`;
		let condition = {id:query.plantId};
		companyId = parseInt(companyId);
		let qry = `select * from plant_detail_? where ?`;
		db.query(qry,[companyId,condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					// let qry = `select * from zone_detail_${companyId} where plantId=${query.plantId}`;
					let condition = {plantId:query.plantId};
					let qry = `select * from zone_detail_? where ?`;
					db.query(qry,[companyId, condition], (error, results, fields) => {
						if (error) {
							dbFunc.connectionRelease;
							reject(error);
						}else if(results.length > 0) {
							var startDate = Date.now();
							var endDate = startDate - 24*60*60*1000;
							var counter = 0;
							var totalCount = 0;
							results.forEach(function(zone) {
								var tempObj = {};
								var qry = {"type" :0, "isMissing":0, "time": {"$gte": endDate, "$lte": startDate}, "companyId":Number(companyId), "plantId":Number(query.plantId), "zoneId":JSON.stringify(zone.id), $or:[{"isAllowed":0},{"isMax":1},{"isMaxTime":1}]};
								logger.debug('Mongo query: ', JSON.stringify(qry));
								notificationModel.find(qry).lean().exec(function(err,result){
									if (err) {
										reject(err);
									}else if (result.length > 0) {
										counter++;
										tempObj['name'] = zone.name;
										tempObj['zoneId'] = zone.id;
										tempObj['count'] = result.length;
										totalCount = totalCount + result.length;
										resArray.push(tempObj);
									}
									else {
										counter++;
										tempObj['name'] = zone.name;
										tempObj['zoneId'] = zone.id;
										tempObj['count'] = 0;
										resArray.push(tempObj);
									}
									if(results.length == counter) {
										var finalResponse = {};
										var maxViolation = _.maxBy(resArray, 'count');
										finalResponse.name = maxViolation.name;
										finalResponse.zoneId = maxViolation.zoneId;
										finalResponse.totalCount = totalCount;
										finalResponse.violationCount = maxViolation.count;
										notificationModel.find({"zoneId" : JSON.stringify(maxViolation.zoneId), "isEntry" : true, "type" : 0,  "companyId":companyId, "isMax":null, "isMaxTime":null}).sort({"time":-1}).exec(function(err, resu) {
											if (err) {
												reject({"success":false, "data": err, "message":""});
											}else{
												if(resu.length > 0){
													var allowedUsers = 0,
														notallowedUsers = 0;
													resu.forEach(element => {
														if(element.isAllowed == 1){
															allowedUsers++;
														}else{
															notallowedUsers++;
														}
													});
													finalResponse["allowedUsers"] = allowedUsers;
													finalResponse["notAllowedUsers"] = notallowedUsers;
													finalResponse["activeUsers"] = allowedUsers + notallowedUsers;
													finalResponse.items = _.orderBy(resArray, [zone => zone.count], ['desc']);
													resolve({"success":true, "data":finalResponse, "message":""});
												}else {
													finalResponse["allowedUsers"] = 0;
													finalResponse["notAllowedUsers"] = 0;
													finalResponse["activeUsers"] = 0;
													finalResponse.items = _.orderBy(resArray, [zone => zone.count], ['desc']);
													resolve({"success":true, "data":finalResponse, "message":""});
												}
											}
										});
									}
								});
							});
						}
						else {
							reject({"success":false, "message":"No Zone found"});
						}
					});
				}
				else {
					reject({"success":false, "message":"Plant id is invalid"});
				}
			}
		});
	});
}


function getPopulationStats(query, companyId){
	return new Promise((resolve, reject) => {
		var resArray = [];
		companyId = parseInt(companyId);
		// let qry = `select * from plant_detail_${companyId} where id=${query.plantId}`;
		let condition = {id:query.plantId};
		let qry = `select * from plant_detail_? where ?`;
		db.query(qry,[companyId, condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					// let qry = `select * from zone_detail_${companyId} where plantId=${query.plantId}`;
					let condition = {plantId:query.plantId};
					let qry = `select * from zone_detail_? where ?`;
					db.query(qry,[companyId, condition], (error, results, fields) => {
						if (error) {
							dbFunc.connectionRelease;
							reject(error);
						}else if(results.length > 0) {
							var startDate = Date.now();
							var endDate = startDate - 24*60*60*1000;
							var counter = 0;
							results.forEach(function(zone) {
								var tempObj = {};
								var totalPop = 0;
								var qry = {"type" :0, "isMissing":0, "time": {"$gte": endDate, "$lte": startDate}, "companyId":Number(companyId), "plantId":Number(query.plantId), "zoneId":JSON.stringify(zone.id), "isEntry": true};
								logger.debug('Mongo query: ', JSON.stringify(qry));
								notificationModel.find(qry).sort({"time":-1}).lean().exec(function(err,result){
									if (err) {
										reject(err);
									}else if (result.length > 0) {
										counter++;
										tempObj['name'] = zone.name;
										tempObj['zoneId'] = zone.id;
										tempObj['count'] = result.length;
										totalPop = totalPop + result.length;
										tempObj['time'] = result[0].time;
										resArray.push(tempObj);
									}
									else {
										counter++;
										tempObj['name'] = zone.name;
										tempObj['zoneId'] = zone.id;
										tempObj['count'] = 0;
										tempObj['time'] = 0;
										resArray.push(tempObj);
									}
									if(results.length == counter) {
										var finalResponse = {};
										var maxViolation = _.maxBy(resArray, 'count');
										finalResponse.name = maxViolation.name;
										finalResponse.zoneId = maxViolation.zoneId;
										finalResponse.populationCount = maxViolation.count;
										finalResponse.totalCount = totalPop;
										finalResponse.time = maxViolation.time;
										notificationModel.find({"zoneId" : JSON.stringify(maxViolation.zoneId), "isEntry" : true, "type" : 0, "companyId":companyId, "isMax":null, "isMaxTime":null}).sort({"time":-1}).exec(function(err, resu) {
											if (err) {
												reject({"success":false, "data": err, "message":""});
											}else{
												if(resu.length > 0){
													var allowedUsers = 0,
														notallowedUsers = 0;
													resu.forEach(element => {
														if(element.isAllowed == 1){
															allowedUsers++;
														}else{
															notallowedUsers++;
														}
													});
													finalResponse["allowedUsers"] = allowedUsers;
													finalResponse["notAllowedUsers"] = notallowedUsers;
													finalResponse["activeUsers"] = allowedUsers + notallowedUsers;
													finalResponse.items = _.orderBy(resArray, [zone => zone.count], ['desc']);
													resolve({"success":true, "data":finalResponse, "message":""});
												}else {
													finalResponse["allowedUsers"] = 0;
													finalResponse["notAllowedUsers"] = 0;
													finalResponse["activeUsers"] = 0;
													finalResponse.items = _.orderBy(resArray, [zone => zone.count], ['desc']);
													resolve({"success":true, "data":finalResponse, "message":""});
												}
											}
										});
									}
								});
							});
						}
						else {
							reject({"success":false, "message":"No Zone found"});
						}
					});
				}
				else {
					reject({"success":false, "message":"Plant id is invalid"});
				}
			}
		});
	});
}


function getAssetTypeViolationStats(query, companyId){
	return new Promise((resolve, reject) => {
		var resArray = [];
		let condition = {id:query.plantId};
		companyId = parseInt(companyId);
		// let qry = `select * from plant_detail_${companyId} where id=${query.plantId}`;
		let qry = `select * from plant_detail_? where ?`;
		db.query(qry,[companyId,condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					let qry = `select * from asset_type_list_?`;
					db.query(qry,[companyId], (error, results, fields) => {
						if (error) {
							dbFunc.connectionRelease;
							reject(error);
						}else if(results.length > 0) {
							var startDate = Date.now();
							var endDate = startDate - 24*60*60*1000;
							var counter = 0;
							results.forEach(function(assetType) {
								var tempObj = {};
								var qry = {"type" :0, "isMissing":0, "time": {"$gte":endDate, "$lte":startDate}, "companyId":Number(companyId), "plantId":Number(query.plantId), "assetTypeId":JSON.stringify(assetType.id), $or:[{"isAllowed":0},{"isMax":1},{"isMaxTime":1}]};
								logger.debug('Mongo query: ', JSON.stringify(qry));
								notificationModel.find(qry).lean().exec(function(err,result){
									if (err) {
										reject(err);
									}else if (result.length > 0) {
										counter++;
										tempObj['assetType'] = assetType.assetTypeName;
										tempObj['icon'] = assetType.icon;
										tempObj['count'] = result.length;
										resArray.push(tempObj);
									}
									else {
										counter++;
										tempObj['assetType'] = assetType.assetTypeName;
										tempObj['icon'] = assetType.icon;
										tempObj['count'] = 0;
										resArray.push(tempObj);
									}
									if(results.length == counter) {
										var finalResponse = {};
										var maxViolation = _.maxBy(resArray, 'count');
										finalResponse.name = maxViolation.assetType;
										finalResponse.icon = maxViolation.icon;
										finalResponse.count = maxViolation.count;
										finalResponse.items = _.orderBy(resArray, [zone => zone.count], ['desc']);
										resolve({"success":true, "data":finalResponse, "message":""});
									}
								});
							});
						}
						else {
							reject({"success":false, "message":"No Asset Type found"});
						}
					});
				}
				else {
					reject({"success":false, "message":"Plant id is invalid"});
				}
			}
		});
	});
}


function getZoneProductivity(query, companyId){
	return new Promise((resolve, reject) => {
		var resArray = [];
		let condition = {id:query.plantId};
		companyId = parseInt(companyId);
		// let qry = `select * from plant_detail_${companyId} where id=${query.plantId}`;
		let qry = `select * from plant_detail_? where ?`;
		db.query(qry,[companyId, condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					// let qry = `select * from zone_detail_${companyId} where plantId=${query.plantId}`;
					let condition = {plantId:query.plantId};
					let qry = `select * from zone_detail_? where ?`;
					db.query(qry,[companyId, condition], (error, results, fields) => {
						if (error) {
							dbFunc.connectionRelease;
							reject(error);
						}else if(results.length > 0) {
							var startDate = Date.now();
							var endDate = startDate - 24*60*60*1000;
							var counter = 0;
							results.forEach(function(zone) {
								var tempObj = {};
								var qry = {"type" :0, "isMissing":0, "time": {"$gte":endDate, "$lte":startDate}, "companyId":Number(companyId), "plantId":Number(query.plantId), "zoneId":JSON.stringify(zone.id), "isAllowed": 1};
								logger.debug('Mongo query: ', JSON.stringify(qry));
								notificationModel.find(qry).lean().exec(function(err,result){
									if (err) {
										reject(err);
									}else if (result.length > 0) {
										var time = 0;
										counter++;
										result.forEach((allowedData, index) => {
											if(!allowedData.isEntry) {
												var start = moment(new Date(Number(allowedData.exitTime)).getTime());
											}
											else {
												start = moment(new Date(Number(startDate)).getTime());
											}
											let end =   moment(new Date(Number(allowedData.entryTime)).getTime());
											let duration = moment.duration(start.diff(end));
											let timeSpent = Math.round(duration.asSeconds());
											timeSpent = Math.round(timeSpent / 60);
											time = time + timeSpent;
											if(result.length - 1 === index) {
												tempObj['name'] = zone.name;
												tempObj['duration'] =  time;
												tempObj['zoneId'] = zone.id;
												resArray.push(tempObj);

											}
										});
									}
									else {
										counter++;
										tempObj['name'] = zone.name;
										tempObj['zoneId'] = zone.id;
										tempObj['duration'] = 0;
										resArray.push(tempObj);
									}
									if(results.length == counter) {
										var finalResponse = {};
										var maxProductivity = _.maxBy(resArray, 'duration');
										finalResponse.name = maxProductivity.name;
										finalResponse.zoneId = maxProductivity.zoneId;
										finalResponse.duration = maxProductivity.duration;
										finalResponse.items = _.orderBy(resArray, [zone => zone.duration], ['desc']);
										resolve({"success":true, "data":finalResponse, "message":""});
									}
								});
							});
						}
						else {
							reject({"success":false, "message":"No Zone found"});
						}
					});
				}
				else {
					reject({"success":false, "message":"Plant id is invalid"});
				}
			}
		});
	});
}


module.exports = reportingModel;
