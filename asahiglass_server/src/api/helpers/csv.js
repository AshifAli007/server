const logger = require('./../../config/logger.js');
const db = require('../../config/mysql');
var _ = require('lodash');
var dbFunc = require('../../config/mysql-function');
var csvjson = require('csvjson');
var fs = require('fs');
var modifyCsvNotification = require('./modifyCsvNotification');

exports.findJsonFromDb = (req)=>{
	let qry = req.query;
	let paramList = [req.companyId,req.gatewayId];
	return new Promise (function(resolve, reject){
		logger.debug('Find Json qry:', qry);
		db.query(qry,paramList, (err, result, fields)=>{
			if(err){
				logger.error('Mysql error: ',err);
				reject('Mysql error');
			}else if(!err && result.length){
				logger.debug('Data found: ',JSON.stringify(result));
				var res = result.map((node) => {
					if (node.nodeId) {
						node.nodeId = parseInt(node.nodeId/3);
					}
					if (node.neighbourNodeId) {
						node.neighbourNodeId = parseInt(node.neighbourNodeId/3);
					}
					return node;
				});
				res = _.orderBy(res, [zone => zone.zoneId], ['asc']);
				resolve(res);
			}else{
				//reject('Data not found');
				res =  [];
				resolve(res);
			}
		});
	});
};

exports.findNodeNeighbourJsonFromDb = (req)=>{
	let qry = req.query;
	let lengthQry = req.lengthQry;
	var resObj = {};
	let paramList = [req.companyId,req.gatewayId];
	return new Promise (function(resolve, reject){
		logger.debug('Find Json qry:', qry);
		db.query(lengthQry,paramList, (err, rows, fields)=>{
			if(err){
				logger.error('Mysql error: ',err);
				reject('Mysql error');
			}else if(!err && rows.length){
				db.query(qry,paramList, (err, result, fields)=>{
					if(err){
						logger.error('Mysql error: ',err);
						reject('Mysql error');
					}else if(!err && result.length){
						logger.debug('Data found: ',JSON.stringify(result));
						var res = result.map((node) => {
							if (node.nodeId) {
								node.nodeId = parseInt(node.nodeId/3);
							}
							if (node.neighbourId) {
								node.neighbourId = parseInt(node.neighbourId/3);
							}
							return node;
						});
						//res = _.orderBy(res, [zone => zone.nodeId], ['asc']);
						res = _.orderBy(res, [zone => zone.id], ['asc']);
						if(req.isDataExists) {
							resObj['totalCount'] = rows.length - req.offset;
						}
						else {
							resObj['totalCount'] = rows.length;
						}
						if((req.operation == 1) && (req.totalCount > 0)) {
							resObj['totalCount'] = parseInt(req.totalCount);
						}
						resObj['startIndex'] = res[0].id - 1;
						res.map(function(item) { 
							delete item.id; 
							return item; 
						});
						resObj['items'] = res;
						resolve(resObj);
					}
					else {
						reject(false);
					}
				});
			}
			else {
				resObj['totalCount'] = 0;
				resObj['items'] = [];
				resolve(resObj);
			}
		});
	});
};

exports.convertJsonToCsv = (req)=>{
	return new Promise (function(resolve, reject){
		let json = req.json;
		var options = {
			delimiter   : ",",
			wrap        : false,
			headers : "none"
		};
		let csv = csvjson.toCSV(json, options);
		logger.info('Converted csv: ',csv);
		logger.info('Converted csv type: ',typeof csv);
		//const path = `/home/wavenet/Documents/AsahiGlass/asahiglass_server/CSV_Files/neighbourNode.csv`;
		//const path = `${process.env.PWD}/CSV_Files/neighbourNode.csv`;
		const path = `./uploads/${req.cId}/gateway/${req.gWId}/neighbourNode.csv`;
		logger.debug('Path: ',path);
		fs.writeFile(path, csv.trim(), function(err, data){
			if (err) {
				reject(err);
			}
			else { 
				logger.info("Neighbour nodes data successfully written to file for gateway serial:", req.gWId);
				modifyCsvNotification.modifyCsvNotification(req).then((data)=>{
					resolve(data);
				}).catch((err) =>{
					return reject(err);
				});
			}
		});
	});
};