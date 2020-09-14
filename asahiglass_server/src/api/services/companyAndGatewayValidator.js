const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const httpStatus = require('http-status');
const logger = require('../../config/logger');

exports.companyAndGatewayValidator = function (data) {
	return new Promise((resolve, reject) => {
		let companyId = parseInt(data.companyId);
		// var tableName = 'device_detail'+'_'+data.companyId;
		let paramList = [{id:data.companyId},companyId,{serial:data.gatewaySerial},companyId,{serial:data.gatewaySerial}];
		// var query = "select (select id from company_detail where ?) as cId, (select id from "+tableName+" where serial='"+data.gatewaySerial+"') as gwId, (select deviceType from "+tableName+" where serial='"+data.gatewaySerial+"') as type";
		var query = "select (select id from company_detail where ?) as cId, (select id from device_detail_? where ?) as gwId, (select deviceType from device_detail_? where ?) as type";
		logger.debug("Query for search company id and gateway id: " + query);
		db.query(query,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					logger.debug("Device Data from database: ", JSON.stringify(rows));
					if(rows[0].cId && rows[0].gwId) {
						if(rows[0].type == 3){
							resolve(rows[0]);
						}else{
							reject({"success":false,"message": "Invalid Gateway"});
						}
						
					}
					else {
						reject({"success":false,"message": "Invalid Data"});
					}
				}else{
					reject({"success":false, "message":"Data not found"});
				}
			}
		}); 
	});
};