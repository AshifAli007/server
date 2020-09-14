const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const logger = require('../../config/logger');

exports.zoneData= function(companyId, zoneId, plantId) { 
	return new Promise (function(resolve, reject){
		companyId = parseInt(companyId);
		logger.info('Inside get zone detail for reporting', plantId);
		if(plantId){
			let paramList = [companyId,plantId];
			var findPlant = `select * from plant_detail_? where id=? `;
			db.query(findPlant,paramList, (error, result, fields) => {
				if (error) {
					dbFunc.connectionRelease;
					logger.error(error);
				}else if(result.length > 0) {
					if(zoneId) {
						var paramList = [companyId,plantId,zoneId];
						var qry = `select id, name from zone_detail_? where plantId=? AND id=?`;
					}
					else {
						var paramList = [companyId,plantId];
						var qry = `select id, name from zone_detail_? where plantId=? `;
					}
					logger.debug("Query for zones: ", qry);
					db.query(qry,paramList, (error, rows, fields) => {
						if (error) {
							dbFunc.connectionRelease;
							logger.error(error);
						}else if(rows.length > 0) {
							resolve(rows);
						}else {
							reject({"success":false, "message":"Zone not found"});
						}
					});
				}else {
					reject({"success":false, "message":"Plant not found"});
				}
			});
		}else{
			reject({"success":false, "message":"Please select Plant"});
		}

	});
};

exports.assetData= function(companyId, assetTypeId, empId) {
	logger.debug('Asset Type:', assetTypeId);
	return new Promise (function(resolve, reject){
		var qry;
		companyId=parseInt(companyId);
		var paramList = [];
		logger.info('Inside get asset list for reporting', companyId);
		if(empId) {
			paramList=[companyId,companyId,empId];
			qry = `select distinct  D.assetId, A.type, A.uniqueId, A.name from device_detail_? D left join asset_detail_? A on D.assetId=A.id where ((assetId is not NULL) AND (A.uniqueId=?))`;
		}
		else {
			if(assetTypeId) {
				paramList=[companyId,companyId,assetTypeId];
				qry = `select distinct  D.assetId, A.type, A.uniqueId, A.name from device_detail_? D left join asset_detail_? A on D.assetId=A.id where ((assetId is not NULL) AND (type=?))`;
			}
			else {
				paramList=[companyId,companyId];
				qry = `select distinct  D.assetId, A.type, A.uniqueId, A.name from device_detail_? D left join asset_detail_? A on D.assetId=A.id where assetId is not NULL`;
			}
		}
		
		logger.debug("Query for Assets: ", qry);
		db.query(qry,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				logger.error(error);
			}else if(rows.length > 0) {
				resolve(rows);
			}else {
				reject({"success":false, "message":"Asset data not found"});
			}
		});

	});
};

