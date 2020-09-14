const db = require('../../config/mysql');
const dbFunc = require('../../config/mysql-function');
const config = require('../../config/config');
const logger = require('../../config/logger');
const schedule = require('node-schedule');
const deviceHealth = require('./../protocolGateway/mqttProtocol'); 




exports.deviceHealthScheduler= function() {
	schedule.scheduleJob(config.cronInterval, function(){
		logger.debug('Crone Job Running for Device Health');
		db.query(`select id from company_detail`, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				logger.error(error);
			}else {
				dbFunc.connectionRelease;
				if(rows.length > 0) {
					logger.debug("Company Id List: "+JSON.stringify(rows));
					var timeDiff = Date.now() - 5*60*1000;
					rows.forEach(function(company){
						logger.debug("Company Id: " +JSON.stringify(company.id));
						db.query(`select D.id, D.deviceType, D.name, D.serial, D.nodeStatus, D.nodeStatusTime, D.gwSerial, D.zoneId, D.nodeId, Z.name as zoneName from device_detail_${company.id} D left join zone_detail_${company.id} Z on D.zoneId=Z.id where ((D.deviceType=2 OR D.deviceType=3) AND (D.nodeStatusTime < ${timeDiff} OR D.nodeStatusTime IS NULL))`, (error, row, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								logger.error(error);
							}else {
								dbFunc.connectionRelease;
								logger.debug("Device with critical Health: "+JSON.stringify(row));
								if(row.length > 0){
									deviceHealth.deviceHealth(row, company.id);
								}
							}
						});
					});
				}
			}
		});
	});
};


exports.resetBeaconBatteryScheduler= function() {
	schedule.scheduleJob('00 25 03 * * *', function(){
		logger.debug('Crone Job Running to Reset Beacon Battery');
		db.query(`select id from company_detail`, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				logger.error(error);
			}else {
				dbFunc.connectionRelease;
				if(rows.length > 0) {
					logger.debug("Company Id List: "+JSON.stringify(rows));
					rows.forEach(function(company){
						logger.debug("Company Id: " +JSON.stringify(company.id));
						db.query(`select D.id, D.deviceType, D.name, D.serial, D.assetId, D.isBuzz, D.createDate, D.genericId, D.batteryStatus, D.batteryStatusTime, E.name as assetName, E.type as assetType, E.uniqueId from device_detail_${company.id} D left join asset_detail_${company.id} E on D.assetId=E.id where (D.deviceType=1 AND D.batteryStatusTime is NULL)`, (error, row, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								logger.error(error);
							} else {
								dbFunc.connectionRelease;
								logger.info("Reset Beacon Battery Status for company with companyId %s: ", company.id, row);
								if(row.length > 0){
									deviceHealth.resetBeaconBattery(row, company.id);
								}
							}
						});
					});
				}
			}
		});
	});
};