const logger = require('./../../config/logger.js');
const db = require('../../config/mysql');
var _= require('underscore');
var dbFunc = require('../../config/mysql-function');
var csv = require('./../helpers/csv.js');
var modifyCsvNotification = require('../helpers/modifyCsvNotification');
var errHandler = function(err) {
	logger.error('ErrorHandler: ', err);
};

/*exports.startTest = (req, companyId)=>{
	let insertQry = `insert into map_testBeacon_receiver_${companyId} set beaconId = ${req.beaconId},
					 receiverId = ${req.receiverId}`;
	logger.debug('Insert Map test beacon with receiver qry: ',insertQry);
	return new Promise (function(resolve, reject){
		db.query(insertQry, (err, result, fields)=>{
			if(err){
				reject({"success":false,  "message":"Please try again"});
			}else{
				resolve({"success":true,  "message":"Test Started"});
			}
		});
	});
};*/

exports.startTest = (req, companyId)=>{
	companyId = parseInt(companyId);
	// let insertQry = `insert into map_testBeacon_receiver_${companyId} set testBeaconId = ${req.beaconId},
	// nodeId = ${req.nodeId}, gatewayId = ${req.gatewayId}`;
	let paramList = [companyId,{testBeaconId:req.beaconId,nodeId:req.nodeId, gatewayId:req.gatewayId}];
	let insertQry = `insert into map_testBeacon_receiver_? set ?`;
	logger.debug('Insert Map test beacon with receiver qry: ',insertQry);
	return new Promise (function(resolve, reject){
		db.query(insertQry,paramList, (err, result, fields)=>{
			if(err){
				reject({"success":false,  "message":"Please try again"});
			}else{
				resolve({"success":true,  "message":"Test Started"});
			}
		});
	});
};

/*exports.stopTest = (req, companyId)=>{
	// let deleteQry = `delete from map_testBeacon_receiver where beaconId = ${req.beaconId}
	//                  and receiverId = ${req.receiverId}`;
	// logger.debug('Stop test qry: ',deleteQry);
	// return new Promise (function(resolve, reject){
	//     db.query(deleteQry, (err, result, fields)=>{
	//         if(err){
	//             reject({"success":false,  "message":"Please try again"});
	//         }else{
				var updateMsg = {
					"cId":1,
					"gWId":"30aea41efae5"
				};
				modifyCsvNotification.modifyCsvNotification(updateMsg).then((data)=>{
					if(data == false){
						reject({"success":false,  "message":"Please try again"});
					}
						resolve({"success":true,  "message":"Test Stopped"});
				});
			   // resolve({"success":true,  "message":"Test Stopped"});
		//     }
		// });
   // });
}*/

exports.stopTest = (req, companyId)=>{
	companyId = parseInt(companyId);
	let paramList = [companyId,req.beaconId,req.nodeId,req.gatewayId];
	// let deleteQry = `delete from map_testBeacon_receiver_${companyId} where testBeaconId = ${req.beaconId}
	// 				AND nodeId = ${req.nodeId} AND gatewayId = ${req.gatewayId}`;
	let deleteQry = `delete from map_testBeacon_receiver_? where testBeaconId = ? AND nodeId = ? AND gatewayId = ?`;
	logger.debug('Stop test qry: ',deleteQry);
	return new Promise (function(resolve, reject){
		db.query(deleteQry,paramList, (err, result, fields)=>{
			if(err){
				reject({"success":false,  "message":"Please try again"});
			}else{
				resolve({"success":true,  "message":"Test Stopped"});
			}
		});
	});
};

/*exports.generateCsv = (req, companyId)=>{
	logger.info("inside generate CSV method");
	//let req = {};
	req.query = `select nodeId,neighbourNodeId,neighbourRssi,zoneId from node_neighbour_detail_${companyId}`;
	return new Promise (function(resolve, reject){
		csv.findJsonFromDb(req)
		.then(result=> {
			logger.debug('db data:',result);
			req.json = result;
			csv.convertJsonToCsv(req).then(result =>{
				logger.debug(result);
				resolve({"success":true,  "message":"Csv Created"})
			},function(err) {
				logger.error('ErrorHandler1: ', err);
				reject({"success":false,  "message":err + '. Please try again'})
			});
		},function(err) {
			logger.error('ErrorHandler2: ', err);
			reject({"success":false,  "message":err + '. Please try again'})
		});
	});
}*/


exports.generateCsv = (req, companyId)=>{
	logger.info("Inside generate CSV method");
	companyId = parseInt(companyId);
	req.companyId = companyId;
	req.query = `select nodeId,neighbourNodeId,neighbourRssi as rssi,zoneId,zoneType from node_neighbour_detail_? where gatewayId=?`;
	// req.query = `select nodeId,neighbourNodeId,neighbourRssi as rssi,zoneId,zoneType from node_neighbour_detail_${companyId} where gatewayId=${req.gatewayId}`;
	var qry = `select * from device_detail_? where id=?`;
	return new Promise (function(resolve, reject){
		let paramList = [companyId,req.gatewayId];
		db.query(qry,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					req.cId = companyId;
					req.gWId = rows[0].serial;
					csv.findJsonFromDb(req).then(result=> {
						logger.debug('db data:',result);
						req.json = result;
						csv.convertJsonToCsv(req).then(result =>{
							logger.debug(result);
							resolve({"success":true,  "message":"CSV created"});
						},function(err) {
							logger.error('ErrorHandler1: ', err);
							reject({"success":false,  "message":err + '. Please try again'});
						});
					},function(err) {
						logger.error('ErrorHandler2: ', err);
						reject({"success":false,  "message":'Node Neighbour Data does not exist'});
					});
				}else{
					reject({"success":false, "message":"Device not Found"});
				}
			}
		}); 
	});
};

exports.generateJson = (req, companyId, operation, offset, isDataExists, totalCount)=>{
	logger.info("Inside generate JSON method");
	var limit = 2;
	req.isUpdate = operation;
	req.offset = offset;
	req.isDataExists = isDataExists;
	req.totalCount = totalCount;
	companyId = parseInt(companyId);
	// req.lengthQry = `select id from node_neighbour_detail_${companyId} where gatewayId=${req.gatewayId}`;
	req.lengthQry = `select id from node_neighbour_detail_? where gatewayId=?`;
	req.query = `select id,nodeId,neighbourNodeId as neighbourId,neighbourRssi as rssi,zoneId,zoneType from node_neighbour_detail_? where gatewayId=? limit ${limit} offset ${offset}`;
	// req.query = `select id,nodeId,neighbourNodeId as neighbourId,neighbourRssi as rssi,zoneId,zoneType from node_neighbour_detail_${companyId} where gatewayId=${req.gatewayId} limit ${limit} offset ${offset}`;
	var qry = `select * from device_detail_? where id=?`;
	return new Promise (function(resolve, reject){
		let paramList = [companyId,req.gatewayId];
		db.query(qry,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					req.cId = companyId;
					req.gWId = rows[0].serial;
					csv.findNodeNeighbourJsonFromDb(req).then(result=> {
						logger.debug('db data:',result);
						let newObj = Object.assign({timeStamp:rows[0].createDate,operation:operation}, result);
						req.json = newObj;
						modifyCsvNotification.modifyJsonNotification(req).then((data)=>{
							resolve(data);
						}).catch((err) =>{
							return reject(err);
						});
					},function(err) {
						logger.error('ErrorHandler2: ', err);
						reject({"success":false,"message":"Node Neighbour Data does not exist"});
					});
				}else{
					reject({"success":false,"message":"Device data not Found"});
				}
			}
		}); 
	});
};


