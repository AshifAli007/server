const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const logger = require('../../config/logger');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const crypto = require('crypto');


const busModel = {
	addBus:addBus,
	busList:busList,
	checkId: checkId,
	getBus:getBus,
	updateBus:updateBus,
	addBusData:addBusData
};


function addBus(body, companyId) {
	companyId = parseInt(companyId);
	logger.info("Bus  Data: " + JSON.stringify(body));
	return new Promise((resolve, reject) => {
		let condition = [companyId, {busNo:body.busNo},{gatewayId:body.gatewayId}];
		var findBus = `select * from bus_detail_? where ? OR ?`;
		logger.debug('Find busNo query: '+findBus);
		db.query(findBus, condition, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else if(rows.length > 0) {
				reject({"success":false, "message":"Bus no. or gateway already exists"});
			}else{
				var dataSet = {
					busNo:body && body.busNo,
					venderName:body && body.venderName,
					uniqueId:crypto.randomBytes(3).toString('hex'),
					gatewayId:body.gatewayId
				};

				db.query(`INSERT INTO bus_detail_? SET ?`, [companyId, dataSet] ,(err, res) => {
					if (err) {			
						dbFunc.connectionRelease;
						reject(err);
					}
					else {
						resolve({"success":true,  "message":"Bus Data Saved Successfully"});
					}
				});
			}
		});
	});
}

function busList(companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let qry = `select BD.id, BD.busNo, BD.uniqueId, BD.venderName, BD.gatewayId, DD.name  from bus_detail_? BD left join device_detail_? DD on BD.gatewayId=DD.id`;
		db.query(qry,[companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}

function checkId(id, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let qry = `select * from bus_detail_? where ?`;
		let condition = {id:id};
		db.query(qry, [companyId, condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}else{
					reject({"success":false, "message":"Bus id is invalid"});
				}
			}
		}); 
	});
}

function getBus(data){
	logger.debug("data in model: " + JSON.stringify(data));
	return new Promise((resolve, reject) => {
		if(data.length > 0){
			resolve({"success":true, "data": data, "message":""});
		}else{
			reject({"success":false, "message":"Bus id is invalid"});
		}
	});
}


function updateBus(data, id, companyId){
	companyId = parseInt(companyId);
	logger.debug("Update Bus data: " + JSON.stringify(data));
	logger.debug("Update Bus id: " + JSON.stringify(id));
	return new Promise((resolve, reject) => {
		let findBus = `select * from bus_detail_? where ?`;
		let condition = {gatewayId:data.gatewayId};
		logger.debug('Find busNo query: '+findBus);
		db.query(findBus, [companyId, condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else if(rows.length > 0) {
				if (rows[0].id == id) {
					let dataSet = {
						busNo:data && data.busNo,
						venderName:data && data.venderName,
						gatewayId: data && data.gatewayId
					};
					let qry = `update bus_detail_? SET ? where ?`;
					let condition = {id:id};
					logger.debug("Query for Bus Update: " + qry);
					db.query(qry, [companyId,dataSet,condition], (error, rows, fields) => {
						if (error) {
							dbFunc.connectionRelease;
							reject(error);
						}else{
							resolve({"success":true,  "message":"Bus Data Updated Successfully"} );
						}
					});
				}
				else {
					reject({"success":false, "message":"Data already exists"});
				}
			}else{
				let dataSet = {
					busNo:data && data.busNo,
					venderName:data && data.venderName,
					gatewayId: data && data.gatewayId
				};
				let qry = `update bus_detail_? SET ? where ?`;
				let condition = {id:id};
				logger.debug("Query for Bus Update: " + qry);
				db.query(qry, [companyId,dataSet,condition], (error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					}else{
						resolve({"success":true,  "message":"Bus Data updated Successfully"} );
					}
				});
			}
		});
	});
}


function addBusData(busData, csvHeader, companyId) {
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		var discardedBusData = [];
		busData.forEach(function(data, i) {
			var tmpObj = {
				busNo:data[0] || null,
				venderName:data[1] || null,
				uniqueId:crypto.randomBytes(3).toString('hex')
			};
			var qry = `INSERT INTO bus_detail_? SET ?`;
			db.query(qry, [companyId, tmpObj],(err, res) => {
				if (err) {
					dbFunc.connectionRelease;
					tmpObj.errMessage = err.sqlMessage;
					discardedBusData.push(tmpObj);
				}
				if(busData.length - 1 === i) {
					if(discardedBusData.length > 0) {
						var totalLength = busData.length;
						var discardedLength = discardedBusData.length;
						var message = `${discardedLength} out of ${totalLength} Bus data discarded`;
						reject({success:false, list:discardedBusData,message:message});
					}
					else {
						resolve({success:true, message:'All Bus data inserted successfully'});
					}
				}
			});
		});
	});
}

module.exports = busModel;
