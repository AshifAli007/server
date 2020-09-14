const mongoose = require('mongoose');
const logger = require('../../config/logger.js');
const db = require('../../config/mysql');
var _= require('underscore');
var dbFunc = require('../../config/mysql-function');
var NotificationDao = require('../models/dao/notificationSchema');
var notificationDao, notificationModel;


var notificationDao = new NotificationDao(mongoose);
var notificationModel = notificationDao.getModel();

exports.beaconValidator = function(req){
	logger.debug('Inside beaconValidator: ',req);
	var data = req/*.payload*/;
	data.time = new Date().getTime();
	if(data.isEntry == true){
		data.entryTime = new Date().getTime();
	}else{
		data.exitTime = new Date().getTime();
	}
	logger.debug("Data : ", data);
	return new Promise (function(resolve, reject){
		var companyId = parseInt(data.companyId);
		//Query for search Beacon and its Attached Asset Data
		let paramlist = [companyId,companyId,companyId,companyId,{serial:data.beaconId}];
		// let findUser = `select Dd.id, Dd.serial as beaconId, Dd.deviceType, Dd.name, Dd.batteryStatus, Dd.assetId, Ad.name as empName, Ad.uniqueId, At.assetTypeName as assetTypeName, Asub.name as assetSubTypeName, Asub.id as assetSubTypeId, At.id as assetTypeId from device_detail_${data.companyId} as Dd left join asset_detail_${data.companyId} Ad on Dd.assetId=Ad.id left join asset_type_list_${data.companyId} At on Ad.type=At.id left join asset_subType_detail_${data.companyId} Asub on Ad.subType= Asub.id  where serial='${data.beaconId}' AND Dd.deviceType=1`;
		let findUser = `select Dd.id, Dd.serial as beaconId, Dd.deviceType, Dd.name, Dd.batteryStatus, Dd.assetId, Ad.name as empName, Ad.uniqueId, At.assetTypeName as assetTypeName, Asub.name as assetSubTypeName, Asub.id as assetSubTypeId, At.id as assetTypeId from device_detail_? as Dd left join asset_detail_? Ad on Dd.assetId=Ad.id left join asset_type_list_? At on Ad.type=At.id left join asset_subType_detail_? Asub on Ad.subType= Asub.id  where ? AND Dd.deviceType=1`;
		logger.debug('findUser qry: ',findUser);
		db.query(findUser,paramlist, (err, result, fields)=>{
			if(err){
				logger.error('Mysql error: ',err);
				reject('Mysql error');
			}else if(!err && result.length){
				logger.debug("Result of beacon Inside beaconValidator", JSON.stringify(result));
				let paramlist=[companyId,{id:data.zoneId}];
				// var qry = `select name as zoneName, floorId, plantId, uniqueId, maxUsers, minUsers from zone_detail_${data.companyId} where id=${data.zoneId}`;
				var qry = `select name as zoneName, floorId, plantId, uniqueId, maxUsers, minUsers from zone_detail_? where ?`;
				logger.debug("Query for zone: ", qry);
				db.query(qry,paramlist, (err, rows, fields)=>{
					if(err){
						logger.error('Mysql error: ', err);
						reject('Mysql error');
					}else if(rows.length >0){
						logger.debug("Hi admin");
						logger.debug("Zone data: " , rows[0].zoneName);
						data.empId = result[0].uniqueId;
						data.empName = result[0].empName;
						data.assetUid = result[0].uniqueId;
						data.maxCount = rows[0].maxUsers;
						data.minCount = rows[0].minUsers;
						data.zoneName = rows[0].zoneName;
						data.floorId = rows[0].floorId;
						data.plantId = rows[0].plantId;
						data.zoneUid = rows[0].uniqueId;
						data.assetTypeName = result[0].assetTypeName;
						data.assetTypeId = result[0].assetTypeId;
						data.assetSubTypeName = result[0].assetSubTypeName;
						data.assetSubTypeId = result[0].assetSubTypeId;
						data.assetId = result[0].assetId;
						logger.debug("Response data of beacon Inside beaconValidator", JSON.stringify(data));
						let filterTemp = {
							"zoneId": data.zoneId,
							"beaconId": data.beaconId,
							"isEntry": true,
							"companyId":data.companyId
						};
						logger.debug("Filter data in ", filterTemp);
						notificationModel.findOne(filterTemp, (err, res) => {
							if (err) {
								logger.error('Mongo find error: ', err);
							} else if(res){
								logger.debug('Data for res in beacon validation1: ', res);
								logger.debug("Res IsEntry: ", typeof(res.isEntry));
								logger.debug("Data Is Entry: ", typeof(data.isEntry));
								var dataIsEntry;
								if(data.isEntry === 1){
									dataIsEntry = true;
								}else{
									dataIsEntry = false;
								}

								if(res.isEntry === dataIsEntry){
									data.isExist = false;
								}else{
									data.isExist = true;
								}
								
							}else{
								logger.debug('Data for res in beacon validation2: ', res);
								data.isExist = true;
							}
							resolve(data);
						});
					}else{
						logger.debug("Zone id is invalid");
						reject('Zone id not exist');
					}
				});
			}else{
				logger.debug('Data not exist');
				reject('Data not exist');
			}
		});
	});
};

