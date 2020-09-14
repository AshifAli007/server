const mongoose = require('mongoose');
const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const NotificationDao = require('./dao/notificationSchema');
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
const controlroomModel = {
	ControlRoom:ControlRoom,

}

var notificationDao = new NotificationDao(mongoose);
var notificationModel = notificationDao.getModel();

function ControlRoom(cId) {
	logger.info("Inside Control room model ", cId);
	cId = parseInt(cId);
	return new Promise((resolve, reject) => {
		db.query(`select * from zone_detail_?`,[cId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				var data = [];
				logger.info("Row Data: " + rows.length);
				rows.forEach(zone => {
					logger.info("Zone Data: " + JSON.stringify(zone.id));
			  
					
					notificationModel.find({"zoneId" : zone.id, "isEntry" : true, "type" : 0, "companyId":cId, "isMax":null, "isMaxTime":null}).sort({"time":-1}).exec(function(err, result) {
						if (err) {
						  
							reject({"success":false, "data": err, "message":""});
						}else{
							logger.debug('First qry data: ' , JSON.stringify(result));
							var temObj = {};
							var dateOffset = (24*60*60*1000); 
							var diffTime = new Date();
							diffTime.setTime(diffTime.getTime() - dateOffset);
							var diff = diffTime.getTime();
							var currentTime = Date.now();
							logger.debug("Current Time: ", typeof(currentTime));
							logger.debug("Diff Time: ", typeof(diff));
							notificationModel.find({"time":{$gte: JSON.stringify(diffTime), $lte: JSON.stringify(currentTime)}, "isEntry" : true, "zoneId" : JSON.stringify(zone.id), "companyId":cId,  $or:[{"isAllowed" : 0}, {"isMax" : 1},{"isMaxTime":1}]}).sort({"time":-1}).exec(function(err, res) {
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
												allowedUsers++
											}else{
												notallowedUsers++
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
										data = _.orderBy(data, [zone => zone.time], ['desc']);
										resolve({"success":true, "items": data, "message":""});
									}
								}
							});



							
						}
					});
				});
				
			}
		}); 
	});
};
					
module.exports = controlroomModel;
