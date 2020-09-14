const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const logger = require('../../config/logger');


exports.findGatewayOfNetwork= function(networkId, companyId) { 
	return new Promise (function(resolve, reject){
		logger.info('Inside find gateway of network:', networkId);
		companyId=parseInt(companyId);
		let paramList = [companyId,networkId];
		var qry = `select id from device_detail_? where networkId=? AND deviceType=3`;
		db.query(qry,paramList, (error, result, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				logger.error(error);
			}
			else if(result.length > 0){
				var req = {
					'gatewayId':result[0].id
				};
				resolve(req);
			}
			else {
				reject(false);
			}
		});
	});
};

exports.findNeighbourNodesOfGateway= function(networkId, companyId) { 
	return new Promise (function(resolve, reject){
		logger.info('Inside find neighbour nodes of gateway for network:', networkId);
		companyId=parseInt(companyId);
		let paramList = [companyId,networkId];
		var qry = `select id from device_detail_? where networkId=? AND deviceType=3`;
		db.query(qry,paramList, (error, result, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				logger.error(error);
			}
			else if(result.length > 0){
				let gatewayId = result[0].id;
				let paramList = [companyId,gatewayId];
				let findQry = `select * from node_neighbour_detail_? where gatewayId=?`;
				db.query(findQry,paramList, (error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						logger.error(error);
					}
					else if(rows.length > 0){
						resolve(rows);
					}
					else {
						resolve(rows);
					}
				});
			}
			else {
				reject({"success":false, "message":"Device not found"});
			}
		});
	});
};