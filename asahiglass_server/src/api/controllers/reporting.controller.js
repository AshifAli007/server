const httpStatus = require('http-status');
const { omit } = require('lodash');
const logger = require('../../config/logger');
const reporting = require('../models/reporting.model');
const zone = require('../helpers/zoneReporting.js');
const _ = require('lodash');
/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	console.log("loads: " + id)
	if(id == 1 || id ==2){
		req.locals = id;
		return next();
	}else{
	   var err = {"success":false,  "message":"Given reporting type is invalid"}; 
	   return next(err);
	}
	
};


/**
 * Notification List
 */
/*exports.getReporting = async (req, res, next) => {
	console.log("Request in reporting: " + res);
	reporting.getReporting(req.headers.companyid).then((data)=>{
	return res.json(data);
	}).catch((err) => {
	console.log("Error: " + err);
	return res.json(err);
 });
};*/

exports.getReportToday = async (req, res, next) => {
	console.log("Request in reporting: " + res + " , " + req.locals);
	if(req.locals == 1){
		reporting.getReportToday(req.query, req.headers.companyid).then((data)=>{
		return res.json(data);
		}).catch((err) => {
		console.log("Error: " + err);
		return res.json(err);
		});
	}else{
		console.log("Date wise reporting: " + JSON.stringify(req.query));
		reporting.getReportDatewise(req.query, req.headers.companyid).then((data)=>{
			return res.json(data);
			}).catch((err) => {
			console.log("Error: " + err);
			return res.json(err);
			});
		
	}

};


/*exports.getReportingData = async (req, res, next) => {
	var finalResponse = [];
	var isError = false;
	var counter = 0;
	var errCounter = 0;
	logger.debug("Request in reporting: " + req);
	if(req.query.kpi) {
		try {
			req.query.kpi = req.query.kpi.replace(/'/g, '"');
			req.query.kpi = JSON.parse(req.query.kpi);
		} catch(e) {
			return res.json({'success':false, 'message':'Invalid KPI format'}); 
		}
	}
	else {
		return res.json({'success':false, 'message':'KPI are required'}); 
	}
	if(!req.query.kpi.length) {
		return res.json({'success':false, 'message':'KPIs are required field'});
	}
	if(!req.query.startDate || !req.query.endDate){
		return res.json({"success":false,  "message":"Please select Date"});
	}
	req.query.kpi.forEach(function(kpi, index) {
		reporting.checkKpiData(req.headers.companyid, kpi).then((result)=>{
			req.query.kpiId = kpi;
			var kpiName = result[0] && result[0].kpiName;
			reporting.KPI(req.headers.companyid, req.query, result).then((data)=>{
				counter++;
				let newObj = Object.assign({kpiId: kpi, kpiName: kpiName}, data);
				finalResponse.push(newObj);
				if(!isError && (req.query.kpi.length  === counter)) {
					return res.json({"success":true, "items":finalResponse, "message":""});
				}
			}).catch((err) => {
				errCounter++;
				logger.error("Error: " + JSON.stringify(err));
				if(req.query.kpi.length  === (counter + errCounter)) {
					return res.json({"success":false, "items":[], "message":"Internal Server Error"});
				}
			});
		}).catch((err) => {
			isError = true;
			return res.json({"success":false, "items":[], "message":"Invalid kpiId"});
		});
	});
};*/

exports.getReportingData = async (req, res, next) => {
	var finalResponse = [];
	var isError = false;
	var counter = 0;
	var errCounter = 0;
	logger.debug("Request in reporting: " + req);
	if(req.query.kpi) {
		try {
			req.query.kpi = req.query.kpi.replace(/'/g, '"');
			req.query.kpi = JSON.parse(req.query.kpi);
		} catch(e) {
			return res.json({'success':false, 'message':'Invalid KPI format'}); 
		}
	}
	else {
		return res.json({'success':false, 'message':'KPI are required'}); 
	}
	if(!req.query.kpi.length) {
		return res.json({'success':false, 'message':'KPIs are required field'});
	}
	if(!req.query.startDate || !req.query.endDate){
		return res.json({"success":false,  "message":"Please select Date"});
	}
	if(!req.query.resultType){
		req.query.resultType = 1;
	}
	zone.zoneData(req.headers.companyid, req.query.zoneId, req.query.plantId).then((resu)=>{
		zone.assetData(req.headers.companyid, req.query.assetTypeId, req.query.empId).then((assets)=>{
			logger.debug('Zone Data For Reporting: ' +JSON.stringify(resu));
			req.query.kpi.forEach(function(kpi, index) {
				reporting.checkKpiData(req.headers.companyid, kpi).then((result)=>{
					req.query.kpiId = kpi;
					var kpiName = result[0] && result[0].kpiName;
					reporting.KPI(req.headers.companyid, req.query, result, resu, kpiName, assets).then((data)=>{
						//logger.debug("Return from kpi: ", JSON.stringify(data));
						counter++;
						let newObj = Object.assign({kpiId: kpi, kpiName: kpiName}, data);
						finalResponse.push(newObj);
						if(!isError && (req.query.kpi.length === counter)) {
							return res.json({"success":true, "items":finalResponse, "message":""});
						}
					}).catch((err) => {
						errCounter++;
						logger.error("Error: " + JSON.stringify(err));
						if(req.query.kpi.length  === (counter + errCounter)) {
							return res.json(err);
						}
					});
				}).catch((err) => {
					isError = true;
					return res.json({"success":false, "items":[], "message":"Invalid kpiId"});
				});
			});
		}).catch((err) => {
			return res.json(err);
		});
	}).catch((err) => {
		return res.json(err);
	});
};


exports.getViolationStats = async (req, res, next) => {
	logger.debug("Request in reporting for violation stats: " + req);
	if(!req.query.plantId) {
		return res.json({'success':false, 'message':'Plant id is required'});
	}
	reporting.getViolationStats(req.query, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + JSON.stringify(err));
		return res.json(err);
	});
};


exports.getPopulationStats = async (req, res, next) => {
	logger.debug("Request in reporting for zone population stats: " + req);
	if(!req.query.plantId) {
		return res.json({'success':false, 'message':'Plant id is required'});
	}
	reporting.getPopulationStats(req.query, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + JSON.stringify(err));
		return res.json(err);
	});
};


exports.getAssetTypeViolationStats = async (req, res, next) => {
	logger.debug("Request in reporting for Asset Type violation stats: " + req);
	if(!req.query.plantId) {
		return res.json({'success':false, 'message':'Plant id is required'});
	}
	reporting.getAssetTypeViolationStats(req.query, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + JSON.stringify(err));
		return res.json(err);
	});
};

exports.getZoneProductivity = async (req, res, next) => {
	logger.debug("Request in reporting for Zone Productivity stats: " + req);
	if(!req.query.plantId) {
		return res.json({'success':false, 'message':'Plant id is required'});
	}
	reporting.getZoneProductivity(req.query, req.headers.companyid).then((data)=>{
		return res.json(data);
	}).catch((err) => {
		logger.error("Error: " + JSON.stringify(err));
		return res.json(err);
	});
};

exports.detailReportingData = async (req, res, next) => {
	var finalResponse = [];
	var isError = false;
	var counter = 0;
	var errCounter = 0;
	logger.debug("Request in detail reporting: " + req);
	if(req.query.kpi) {
		try {
			req.query.kpi = req.query.kpi.replace(/'/g, '"');
			req.query.kpi = JSON.parse(req.query.kpi);
		} catch(e) {
			return res.json({'success':false, 'message':'Invalid KPI format'}); 
		}
	}
	else {
		return res.json({'success':false, 'message':'KPI are required'}); 
	}
	if(!req.query.kpi.length) {
		return res.json({'success':false, 'message':'KPIs are required field'});
	}
	if(!req.query.startDate || !req.query.endDate){
		return res.json({"success":false,  "message":"Please select Date"});
	}
	req.query.kpi.forEach(function(kpi, index) {
		reporting.checkKpiData(req.headers.companyid, kpi).then((result)=>{
			req.query.kpiId = kpi;
			//var kpiName = result[0] && result[0].kpiName;
			reporting.detailedKPIData(req.headers.companyid, req.query, result).then((data)=>{
				counter++;
				Array.prototype.push.apply(finalResponse,data);
				if(!isError && (req.query.kpi.length === counter)) {
					var resu = _.uniqWith(finalResponse, _.isEqual);
					return res.json({"success":true, "items":resu, "message":""});
				}
			}).catch((err) => {
				errCounter++;
				logger.error("Error: " + JSON.stringify(err));
				if(req.query.kpi.length  === (counter + errCounter)) {
					return res.json(err);
				}
			});
		}).catch((err) => {
			isError = true;
			return res.json({"success":false, "items":[], "message":"Invalid kpiId"});
		});
	});
};