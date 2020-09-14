const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const logger = require('../../config/logger');


exports.addNodeNeighbourDetail= function(nodeNeighbour, companyId) { 
	return new Promise (function(resolve, reject){
		logger.info('Inside add node neighbour detail');
		companyId=parseInt(companyId);
		// let qry =`select id from device_detail_${companyId} where serial='${nodeNeighbour[0].gwSerial}' AND status=1`;
		let paramList=[companyId,nodeNeighbour[0].gwSerial];
		let qry =`select id from device_detail_? where serial=? AND status=1`;
		db.query(qry,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				logger.error(error);
			}else if(rows.length > 0) {
				//var counter = 0;
				logger.debug('gatewayId:', rows[0].id);
				nodeNeighbour.forEach(function(nodeData, i) {
					//counter++;
					var neighbourNodes = nodeData.nodeNeighbours.split("/");
					neighbourNodes.forEach(function(neighbourNodeId) {
						var data = {
							'nodeId':nodeData.nodeId,
							'neighbourNodeId':neighbourNodeId,
							'neighbourRssi':nodeData.neighbourRssi,
							'zoneId':nodeData.zoneId,
							'gatewayId':rows[0].id,
							'zoneType':nodeData.zoneType,
							'nodeType':nodeData.nodeType,
							'deviceId':nodeData.deviceId
						};
						// var findQry = `select id from node_neighbour_detail_${companyId} where nodeId='${data.nodeId}' AND neighbourNodeId='${data.neighbourNodeId}' AND zoneId='${data.zoneId}' AND gatewayId='${data.gatewayId}'`;
						let paramList=[companyId,data.nodeId,data.neighbourNodeId,data.zoneId,data.gatewayId];
						var findQry = `select id from node_neighbour_detail_? where nodeId=? AND neighbourNodeId=? AND zoneId=? AND gatewayId=?`;
						db.query(findQry, paramList, (error, result, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								logger.error(error);
							}else if (result.length > 0) {
								logger.info('Node neighbour data already exist:', data);
								if(nodeNeighbour.length - 1 == i) {
									var req = {
										'gatewayId':rows[0].id
									};
									resolve(req);
								}
							}
							else {
								var qry = `INSERT INTO node_neighbour_detail_? SET ?`;
								logger.debug("Query for insert Node neighbour detail Data: " + qry);
								db.query(qry, [companyId,data], (error, row, fields) => {
									if (error) {
										dbFunc.connectionRelease;
										logger.error(error);
									}else{
										if(nodeNeighbour.length - 1 == i) {
											var req = {
												'gatewayId':rows[0].id
											};
											resolve(req);
										}
									}
								});
							}
						});
					});
				});
			}
		});
	});
};

exports.resetNodeNeighbourDetail= function(deviceId, companyId) { 
	return new Promise (function(resolve, reject){
		logger.info('Inside reset node neighbour detail');
		companyId=parseInt(companyId);
		let paramList = [companyId,deviceId];
		var deleteQry = `delete from node_neighbour_detail_? where deviceId=?`;
		db.query(deleteQry,paramList, (error, result, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				logger.error(error);
			}
			else {
				resolve(true);
			}
		});
	});
};
