const logger = require('./../../config/logger.js');
const db = require('../../config/mysql');
var _= require('underscore');
var factService = require('../services/factDataService');
var dbFunc = require('../../config/mysql-function');
var RuleEngine = require('node-rules');
var jsonLogic = require('json-logic-js');
var NotificationDao = require('./../models/dao/notificationSchema');
const mongoose = require('mongoose');
var notificationDao = new NotificationDao(mongoose);
var notificationModel = notificationDao.getModel();
var emitter = require('events').EventEmitter;

var errHandler = function(err) {
	logger.error('ErrorHandler: ', err);
};


var findForTimer = function(req){
	return new Promise (function(resolve, reject){
		var zId = req.zoneId;
		cId = req.companyId,
		aId = req.empId;
		notificationModel.findOne({"zoneId" : zId, "isEntry" : true, "companyId":cId, "empId":aId}, (err, res) => {
			if (err) {
				logger.error('Mongo find error rule exe time: ', err);
				reject(false); 
    
			} else if(res){
				if(Object.keys(res).length>0){
					logger.debug("Res data from mongo: ", JSON.stringify(res));
					resolve(res);
				}
			}
		});
	});

};

var ruleTimerExe = function(maxTime, req){
	return new Promise (function(resolve, reject){
		logger.debug("Rule time exe max time: ", maxTime, "req: ", JSON.stringify(req));
		setTimeout(function(){
			findForTimer(req).then(res => {
				logger.info("Return From findForTimer: ", JSON.stringify(res));
				if(Object.keys(res).length){
					resolve(res);
				}
			});
		}, maxTime);
	});
};


var ruleExecute = function(type, vmsg,nvmsg, comparelist, opretor, factData){
	// logger.info("Inside Rule execute: ", JSON.stringify(exe));
	return new Promise (function(resolve, reject){
		if(type == 1){
			//Rule Exe for in or !in Asset
			logger.info("Rule for asset in or !in runs");
			var ruleCallback = comparelist.zoneId in factData.map;
			logger.debug("Type 1 return: ", ruleCallback);
			if(ruleCallback == true){
				resolve({isAllowed:true, msg:nvmsg});
			}else{
				resolve({isAllowed:false, msg:vmsg});
			}
		}else if(type == 2){
			//Rule Exe for counts
			logger.info("Rule for count runs");
			var ruleCallback = eval(factData.Count+opretor+comparelist.maxCount);  
			logger.debug("Type 2 return: ", ruleCallback);  
			if(ruleCallback == true){
				resolve({isMax:true, msg:vmsg});
			}
			else{
				resolve({isMax:false, msg:nvmsg});
			}
		}else if(type == 3){
			//Rule Exe for time
			logger.info("Rule for time runs");
			if(factData.zoneTime  != null){
				logger.debug("Fact data for timer: ", factData.zoneTime);
				var maxTime = factData.zoneTime;
				ruleTimerExe(maxTime, comparelist).then((data)=>{
					if(Object.keys(data).length > 0){
						resolve({isMaxTime: true, msg:vmsg});
					}
				});
			}


		}
        
	});
};

exports.ruleEngine = function(req){
	var e = new emitter();
	factService.getFactData(req).then(data => {
		logger.debug("Fact data retun: ", JSON.stringify(data));
		var factData = data;
		//Get Rule for zone and asset
		var arry = [];
		// var reqLng = Object.keys(req).length;
		for (var key in req) {
			if (req.hasOwnProperty(key)) {
				if(key == "zoneUid" || key == "assetUid"){
					logger.info(key + " -> " + req[key]);
					arry.push(req[key]);
				}
			}
		}
		logger.debug("Array: ", arry);
		if(arry.length == 2){
			logger.debug("Uids array: ", arry);
			var companyId = parseInt(req.companyId);
			arry.forEach(uid => {
				let paramList = [companyId,uid];
				// var qry = `select * from policy_list_${req.companyId} PA left join rule PL on PA.rule_id=PL.id where identifier='${uid}'`; 
				var qry = `select * from policy_list_? PA left join rule PL on PA.rule_id=PL.id where identifier=?`; 
				db.query(qry,paramList, (err, result, fields)=>{
					if(err){
						logger.error('Mysql error: ',err);
						reject('Mysql error');
					}else if(!err && result.length){
						logger.debug("result lng, ", result);
						result.forEach(element => {
							// logger.debug("Rule data result, ", JSON.stringify(element));
							// logger.debug("Fact data: ", JSON.stringify(factData));
							ruleExecute(element.type,element.violationMsg, element.nonViolationMessage, req, element.opretor, factData).then((data)=>{
								logger.debug("Retun data from rule exe: ", JSON.stringify(data));
								req.isAllowed = data.isAllowed;
								req.message = data.msg;
								req.isMax = data.isMax;
								req.type = data.type;
								req.isMaxTime = data.isMaxTime;
								logger.debug("Final req Msg, ", JSON.stringify(req));
								e.emit('ruleProcess', req);
								// resolve(req);
							});
						});
                        
					}else{
						logger.debug("Beacon dont have any rule: ", uid);
						// var mapData = factData.map;
						// if(Object.keys(mapData).length > 0){
						//     var baseRule = req.zoneId in factData.map;
						//     logger.info("Base Rule: ", baseRule)
						//     if(baseRule ==  true){
						//         req.isAllowed = true;
						//         req.message = "Allowed in zone";
						//     }else{
						//         req.isAllowed = false;
						//         req.message = "Not allowed in zone";
						//     }
						// }else{
						//         req.isAllowed = false;
						//         req.message = "Not allowed in zone";
						// }

						// e.emit('ruleProcess', req);
					}
				});
			});
		}
	});
   
	return e;
};





