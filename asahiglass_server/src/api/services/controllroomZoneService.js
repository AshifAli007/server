const logger = require('./../../config/logger.js');
const db = require('../../config/mysql');
var _= require('underscore');
var dbFunc = require('../../config/mysql-function');

exports.mapControlRoomZone = function(cId,deviceId, zones){
	return new Promise (function(resolve, reject){
		cId = parseInt(cId);
		logger.debug("Zones data in map con: ", zones);
		zones.forEach(element => {
			logger.debug("Zone ids in mapControlRoomZone: ", element);
			let dataSet = {controllroomId:deviceId , zoneId:element};
			// var qry = `insert into map_controlroomgw_zone_${cId} set controllroomId=${deviceId} , zoneId=${element}`;
			var qry = `insert into map_controlroomgw_zone_? set ?`;
			logger.debug("Insert mapping qry: ", qry);
			db.query(qry,[cId,dataSet], (error, rows, fields) => {
				if (error) {
					dbFunc.connectionRelease;
					reject(error);
				}else{
					logger.debug("Mappig saved", element);
					resolve(true);
				}
			});
		});
	});
};

exports.controlRooomValidator = function(data){
	return new Promise (function(resolve, reject){
		logger.debug("Inside controlRooomValidator1: ", JSON.stringify(data));
		var zoneId = parseInt(data.zoneId);
		var cId = parseInt(data.companyId);
		let paramList = [cId,cId,cId,zoneId];
		// var qry = `select Zd.led, Dd.serial from zone_detail_${cId} Zd left join map_controlroomgw_zone_${cId} Cz on Zd.id=Cz.zoneId left join device_detail_${cId} Dd on Cz.controllroomId=Dd.id where Zd.id=${zoneId}`;
		var qry = `select Zd.led, Dd.serial from zone_detail_? Zd left join map_controlroomgw_zone_? Cz on Zd.id=Cz.zoneId left join device_detail_? Dd on Cz.controllroomId=Dd.id where Zd.id=?`;
		logger.debug("controlRooomValidator qry", qry);
		db.query(qry,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else if(rows.length >0){
				logger.debug("Inside controlRooomValidator2: ", JSON.stringify(rows));
				var row = rows[0];
				if(row.led  && row.serial ){
					var res = {
						"companyId":cId,
						"serial":row.serial,
						"msg": row.led
					};
					logger.debug("Topic & msg: ", JSON.stringify(res));
					resolve(res);
				}else{
					reject(false);
					logger.debug("Drop Packet");
				}
				//logger.debug("Mappig saved", element);
				//resolve(true);
			}else{
				reject(false);
				logger.debug("Drop Packet");
			}
		});
	});
};