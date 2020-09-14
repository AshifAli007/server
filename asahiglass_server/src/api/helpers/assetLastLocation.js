const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const logger = require('../../config/logger');
var {url} = require('../../config/config');
const mongoose = require('mongoose');
const NotificationDao = require('./../models/dao/notificationSchema');

var notificationDao = new NotificationDao(mongoose);
var notificationModel = notificationDao.getModel();


exports.assetLastLocation= function(query, companyId) { 
	return new Promise (function(resolve, reject){
		companyId = parseInt(companyId);
		notificationModel.findOne(query).sort({"entryTime":-1}).exec(function(err, res) {
			if (err) {
				reject({"success":false, "items": err, "message":""});
			}else if(res){
				var finalRes = [];
				logger.debug('Asset last entry found:',res);
				let paramList = [companyId,companyId,companyId,res.zoneId];
				// let qry = `select Z.id, Z.name, Z.zone_image, F.id as floorId, F.name as floorName, P.id as plantId, P.name as plantName from zone_detail_${companyId} Z left join floor_plan_${companyId} F on Z.floorId=F.id left join plant_detail_${companyId} P on Z.plantId=P.id where Z.id=?`;
				let qry = `select Z.id, Z.name, Z.zone_image, F.id as floorId, F.name as floorName, P.id as plantId, P.name as plantName from zone_detail_? Z left join floor_plan_? F on Z.floorId=F.id left join plant_detail_? P on Z.plantId=P.id where Z.id=?`;
				logger.debug('Find query for floor and plant of a zone:',qry);
				db.query(qry,paramList, (error, row, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					} else if(row.length > 0) {
						logger.debug('Zone data:',row[0]);
						row[0].zone_image = row[0].zone_image && `${url.baseUrl}${companyId}/zones/${row[0].zone_image}`;
						let paramList = [companyId,companyId,companyId,res.empId];
						let findAsset = `select A.id as assetId, A.name as assetName, A.uniqueId, A.type, A.asset_image, A.attribute_value, A.subType, sT.name subTypeName, T.assetTypeName, T.icon from asset_detail_${companyId} A left join asset_type_list_${companyId} T on A.type=T.id left join asset_subType_detail_${companyId} sT on A.subType=sT.id where A.uniqueId=?`;
						logger.debug('Search asset detail query:',findAsset);
						db.query(findAsset,paramList, (error, result, fields) => {
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
				reject({"success":false, "items":[],"message":"Asset entry not found"});
			}
		});
	});
};