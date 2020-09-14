const mongoose = require('mongoose');
const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const NotificationDao = require('./../models/dao/notificationSchema');
const { omitBy, isNil } = require('lodash');
const _ = require('lodash');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const logger = require('../../config/logger');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');

const notificationsModel = {
	getNotifications:getNotifications,
	getUserCount:getUserCount,
	notifications:notifications
}
var notificationDao = new NotificationDao(mongoose);
var notificationModel = notificationDao.getModel();


function getNotifications(companyId, query){
	logger.info("Query in get notification: ", query);
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		var qry;
		var cid = parseInt(companyId);
		if(Object.keys(query).length > 0){
			qry = {$or:[{"isAllowed":0},{"isMax":1},{"isMaxTime":1},{"isMissing":1}], "time": {"$gte": query.startDate, "$lte": query.endDate},  "companyId":cid};
		}else{
			qry = {$or:[{"isAllowed":0},{"isMax":1},{"isMaxTime":1},{"isMissing":1}],   "companyId":cid};
		}
		logger.info("Query for notification: ", qry);
		notificationModel.find(qry).sort({"time":-1}).lean().exec(function(err,result){
			if (err) {
				reject(err);
			}else{
				var tempObj = [];
				logger.debug("Notification result: ", JSON.stringify(result));
				if(result && result.length > 0){
					
					var counter = 0;
					result.forEach(function(res) {
						var qry = `select aT.assetTypeName as type from asset_type_list_? aT left join asset_detail_? E on E.type=aT.id where E.uniqueId=?`;
						db.query(qry,[companyId,companyId,res.empId], (error, row, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							}else{
								counter++;
								dbFunc.connectionRelease;
								logger.debug("Row data: " + JSON.stringify(row));
								if(row.length > 0 ){
									res.assetTypeName = row[0].type;
								}else{
									res.assetTypeName = "";
								}
									
								tempObj.push(res);
								if(result.length === counter) {
									//logger.debug("Temp Obj: " + JSON.stringify(tempObj));
									tempObj =  _.orderBy(tempObj, [obj => obj.time], ['desc']);
									resolve({"success":true, "items": tempObj, "message":""});
								}
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


function getUserCount(companyId){
	
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);

		notificationModel.find({'type':0, 'isEntry':true, "companyId":companyId, "isMax":null, "isMaxTime":null, "isMin":null}, (err,result)=>{
			if (err) {
				reject(err);
			}else{
				var qry = `select count(id) as count from device_detail_? where assetId <> "NULL" and deviceType=1`;

			
				db.query(qry,[companyId], (error, row, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					}else{
						var userCount = {
							'allowedUser': 0,
							'notAllowedUser': 0,
							'totalUser': 0
						};
						logger.debug("All user data: ", row[0])
						userCount["allUser"] = row[0].count;
						if(result && result.length > 0) {

							var counter = 0;
							result.forEach(function(user) {
								counter++;
		
								if(user.isAllowed) {
									userCount.allowedUser++;
								}
								else {
									userCount.notAllowedUser++;
								}
								if (result.length === counter) {
		
									userCount.totalUser = result.length;
									console.log("data: " + userCount)
									resolve({"success":true, "data":userCount,  "message":""});  
								}
							});
						}
		
						else {
		
							console.log("data: " + userCount)
							resolve({"success":true, "data":userCount,  "message":""});  
						}
					}
				});
			}
		});
	});
}


function notifications(type){
	
	return new Promise((resolve, reject) => {
		notificationModel.find({"type" : type},(err,result)=>{
			if (err) {
				reject(err);
			}else{
				logger.info("data: " + result);
				resolve({"success":true, "data":result,  "message":""});
			}
		});
	});
}


module.exports = notificationsModel;
