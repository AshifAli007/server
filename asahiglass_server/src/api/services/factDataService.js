const logger = require('./../../config/logger.js');
const db = require('../../config/mysql');
var _= require('underscore');
var waterfall = require('async/waterfall');
var dbFunc = require('../../config/mysql-function');
var NotificationDao = require('./../models/dao/notificationSchema');
const mongoose = require('mongoose');
var notificationDao = new NotificationDao(mongoose);
var notificationModel = notificationDao.getModel();

var assetTime = function(aId,cId){
	return new Promise(function(resolve, reject){
        cId = parseInt(cId);
		let paramList = [cId,{id:aId}];
		// var qry = `select allowedTime from asset_detail_${cId} where id=${aId}`;
		var qry = `select allowedTime from asset_detail_? where ?`;
		db.query(qry,paramList,(error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				logger.error(error);
				reject(false);
			}else{
				if(rows.length > 0){
					logger.debug("Asset allowed time: ", JSON.stringify(rows));
					var time = rows[0].allowedTime;
					logger.info("Asset allowed time: " , time);
					resolve(time);
				}else{
					resolve();
				}

			}
		});
	});
};


var zoneMaxTime = function(zId,cId){
	return new Promise(function(resolve, reject){
        cId = parseInt(cId);
        let paramList = [cId,{id:zId}];
		// var qry = `select allowed_time from zone_detail_${cId} where id=${zId}`;
		let qry = `select allowed_time from zone_detail_? where ?`;
		db.query(qry,paramList,(error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				logger.error(error);
				reject(false);
			}else{
				logger.debug("Zone max allowed time: ", JSON.stringify(rows));
				var time = rows[0].allowed_time;
				logger.info("Zone max allowed time: " , time);
				resolve(time);
			}
		});
	});
};

var zoneAssetCount = function(zId,cId){
	return new Promise (function(resolve, reject){
		notificationModel.find({"zoneId" : zId, "isEntry" : true, "companyId":cId}, (err, res) => {
			if (err) {
				logger.error('Mongo find error fact: ', err);
				reject(false); 
			} else {
				logger.debug("Zone count: " + JSON.stringify(res));
				Count = parseInt(res.length) + 1;
				logger.debug("Fact data: ", JSON.stringify(Count));
				resolve(Count);
			}
		});
	});

};

var assetMapZone = function(assetId, cId){
	return new Promise(function(resolve, reject){
        cId = parseInt(cId);
        let paramList = [cId,{assetId:assetId}];
		// var qry = `select zoneId from asset_zone_mapping_${cId} where assetId=${assetId}`;
		let qry = `select zoneId from asset_zone_mapping_? where ?`;
		db.query(qry,paramList,(error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				logger.error(error);
				reject(false);
			}else{
				logger.debug("List of mapped: ", JSON.stringify(rows));
				var factObj = {};
				rows.forEach(row => {
					factObj[row.zoneId] = row.zoneId;
				});
				logger.info("Asset Fact data: ", factObj);
				if(Object.keys(factObj).length == rows.length){
					resolve(factObj);
				}
			}
		});
	});
};

exports.getFactData = function(req){
	logger.debug("Inside get fact data: ", req);
	var factData = {};
	return new Promise (function(resolve, reject){
		//Calling Zone Count
		waterfall([
			function(callback) {
				logger.info("Zone Count: ", req.assetId, " ad ", req.companyId);
				zoneAssetCount(req.zoneId, req.companyId).then((data)=>{
					logger.info("Zone Count: ", data);
					factData.Count = data;
					callback(null, factData);
				}).catch((err) => {
					logger.error("Error in zone fact data: " + err);
					callback(err);
				});
			},function(factData, callback) {
				logger.info("Asset map data: ", req.assetId, " ad ", req.companyId);
				assetMapZone(req.assetId, req.companyId).then((data)=>{
					logger.info("Asset map data: ", data);
					factData.map = data;
					callback(null, factData);
				}).catch((err) => {
					logger.error("Error in asset fact data: " + err);
					callback(err);
				});
			},function(factData, callback){
				zoneMaxTime(req.zoneId, req.companyId).then((data)=>{
					logger.info("Asset map data: ", data);
					factData.zoneTime = data;
					callback(null, factData);
				}).catch((err) => {
					logger.error("Error in zone fact max time: " + err);
					callback(err);
				});
			},function(factData, callback){
				assetTime(req.assetId, req.companyId).then((data)=>{
					logger.info("Asset map data: ", data);
					factData.assetTime = data;
					callback(null, factData);
				}).catch((err) => {
					logger.error("Error in asset fact max time: " + err);
					callback(err);
				});
			},

		], function (err, result) {
			if(err){
				reject(false);
			}else{
				logger.debug("Mushir 1: ", JSON.stringify(factData));
				logger.debug("Musir 2: ", Object.keys(factData).length);
				if(Object.keys(factData).length == 4){
					logger.debug("Fact data : ", factData);
					resolve(factData);
				}
			}
		});
	});

};