const mongoose = require('mongoose');
const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const NotificationDao = require('./../models/dao/notificationSchema');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const logger = require('../../config/logger');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const MqttPublishService = require('../protocolGateway/mqttProtocolpubliser');
var {fileUrl} = require('../../config/config');
var _ = require('lodash');
const crypto = require('crypto');
const csv = require('../services/testBeaconService');
var mv = require('mv');

const otaModel = {
	checkOtaFileName:checkOtaFileName,
	addOtaData:addOtaData,
	getAllota:getAllota,
	getnodeAllota:getnodeAllota,
	getnodegatewayOtaList:getnodegatewayOtaList,
	getGatewayOtaList:getGatewayOtaList,
	checkId: checkId,
	otaDownload:otaDownload,
	getDeviceList:getDeviceList
}

function checkId(id){
	return new Promise((resolve, reject) => {
		let condition = {id:id};
	
		let qry = `select * from software where ?`;
		db.query(qry,[condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}else{
					reject({"success":false, "message":"Software id is invalid"});
				}
			}
		}); 
	});
}

function checkOtaFileName(req) {
    return new Promise((resolve, reject) => {
        logger.info("Software update file name: ", req.name)
        let condition = {filename:req.name};
		var qry = `select id from software where ?`;
		db.query(qry, condition ,(err, res) => {
			if (err) {			
				dbFunc.connectionRelease;
				reject({"success":false, "message":err.sqlMessage});
			}
			else {
                if(res.length > 0){
                    reject({"success":false, "message":"Given file alredy exits !!!"});
                }
				resolve(res);
			}
		});
	});
}

function addOtaData(req){
	return new Promise((resolve, reject) => {
		var check = 0;
		if(!req.type){
			reject({"success":false, "message":"Please select software type"});
			check = 1;
		}else if(!req.name){
			reject({"success":false, "message":"Software name is missing"});
			check = 1;
		}else if(!req.crc){
			reject({"success":false, "message":"CRC is missing"});
			check = 1;
		}

		if(check == 0){
			var uplodedOn = new Date().getTime();
			let dataSet = {
				'type': req.type,
				'version': req.versionno,
				'description':req.description,
				'filename': req.name,
				'size':req.size,
				'crc':req.crc,
				'uploadedOn':uplodedOn
			}; 

			var qry = `insert into software set ?`;
			db.query(qry, [dataSet], (err, rows, fields) => { 
				if (err) {
					logger.error("Mysql error: ",err);
					dbFunc.connectionRelease;
					reject(err);
				}else{
					resolve({"success":true, "message":"Software added successfully"});
				}
			});
		}
	});
}

function getAllota(){
	return new Promise((resolve, reject) => {
		var qry = `select * from software`;
		db.query(qry, (err, rows, fields) => { 
			if (err) {
				logger.error("Mysql error: ",err);
				dbFunc.connectionRelease;
				reject(err);
			}else{
				resolve({"success":true, "items":rows, "message":""});
			}
		});
	});
}
		
function getnodeAllota(){
	return new Promise((resolve, reject) => {
		condition = [{type:1}];	
		var qry = `select * from software where ?`;
		db.query(qry, condition, (err, rows, fields) => { 
			if (err) {
				logger.error("Mysql error: ",err);
				dbFunc.connectionRelease;
				reject(err);
			}else{
				resolve({"success":true, "items":rows, "message":""});
			}
		});
	});
}

function getnodegatewayOtaList(){
	return new Promise((resolve, reject) => {
		condition = [{type:2}];	
		var qry = `select * from software where ?`;
		db.query(qry, condition, (err, rows, fields) => { 
			if (err) {
				logger.error("Mysql error: ",err);
				dbFunc.connectionRelease;
				reject(err);
			}else{
				resolve({"success":true, "items":rows, "message":""});
			}
		});
	});
}

function getGatewayOtaList(){
	return new Promise((resolve, reject) => {
		condition = [{type:3}];	
		var qry = `select * from software where ?`;
		db.query(qry, condition, (err, rows, fields) => { 
			if (err) {
				logger.error("Mysql error: ",err);
				dbFunc.connectionRelease;
				reject(err);
			}else{
				resolve({"success":true, "items":rows, "message":""});
			}
		});
	});
}

function otaDownload(req){
	return new Promise((resolve, reject) => {
	logger.debug("Request for ota download", req);
	var check =0;
	//Search Company
	conditionCompany = [{id:req.company}];
	var searchCompany = `select * from company_detail where ?`;
	db.query(searchCompany, conditionCompany, (err, rows, fields) => { 
		if (err) {
			logger.error("Mysql error: ",err);
			dbFunc.connectionRelease;
			reject(err);
		}else{
			logger.debug("Company data: ", rows);
			if(rows.length> 0 ){
				conditionSoftware = [{id:req.software}];
				var searchSoftware = `select * from software where ?`;
				db.query(searchSoftware, conditionSoftware, (err, rows, fields) => { 
					if (err) {
						logger.error("Mysql error: ",err);
						dbFunc.connectionRelease;
						reject(err);
					}else{
						if(rows.length> 0 ){
							var filename = rows[0].filename;
							var size = rows[0].size;
							var crc = rows[0].crc;
							if(req.type > 3){
								reject("Software type is invalid !!!");
							}else{
								var gateways = req.gateways;
								var companyId = parseInt(req.company);
								var resLng = [];
								gateways.forEach(gatewayId => {
									let condition = {id:gatewayId};
									let dataSet = {
										"softwareId": req.software
									}
									var paramList = [companyId,dataSet,condition]
									var deviceSearchQry = `select serial from device_detail_? where ?`;
									db.query(deviceSearchQry,[companyId, condition] , (err, res, fields) => { 
										if (err) {
											logger.error("Mysql error: ",err);
											dbFunc.connectionRelease;
											reject(err);
										}else{
											var deviceId = res[0].serial;
											logger.info("Device serial: ", JSON.stringify(deviceId));
											var updateSoftwareqry = `update device_detail_? set ? where ?`;
											db.query(updateSoftwareqry, paramList, (err, rows, fields) => { 
												if (err) {
													logger.error("Mysql error: ",err);
													dbFunc.connectionRelease;
													reject(err);
												}else{
													resLng.push(deviceId);
													var pubTopic = `assetTracker/${companyId}/${deviceId}/ota`;
													var folder;
													if(req.type == 1){
														folder = 'node';
													}else if(req.type == 2){
														folder = 'nodeGateway';
													}else{
														folder = 'gateway';
													}
													var Url = `${fileUrl.baseUrl}${folder}/${filename}`;
													let message = `${req.type},${Url},${filename},${size},${crc}`;
													logger.debug("message with url: ", message);
													logger.debug("Topic: ", pubTopic);
													//Sending data to publish
													MqttPublishService.MqttPub(pubTopic, message);
													if(resLng.length == gateways.length){
														resolve({"success":true,  "message":"OTA start"});
													}
												}
											});
										}
									});

								});
							}
						}else{
							reject("Software is invalid !!!");
						}
					}
				});

			}else{
				reject("Company is invalid !!!");
			}
		}
	});
});
}

function getDeviceList(query){
	return new Promise((resolve, reject) => {
		var companyId = parseInt(query.companyId);
		logger.debug("companyId: ", companyId);
		var condition = {"deviceType":3};
		var paramList = [companyId,condition];
		var qry = `select DD.id deviceId, DD.serial, DD.currentVersion, S.version as newversion from device_detail_? DD left join software S on DD.softwareId=S.id where ?`;
		db.query(qry, paramList, (err, rows, fields) => { 
			if (err) {
				logger.error("Mysql error: ",err);
				dbFunc.connectionRelease;
				reject(err);
			}else{
				resolve({"success":true, "items":rows, "message":""});
			}
		});
	});
}
module.exports = otaModel;
