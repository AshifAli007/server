const mongoose = require('mongoose');
const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const NotificationDao = require('./dao/notificationSchema');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const logger = require('../../config/logger');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
var {url} = require('../../config/config');

const ruleModel = {
	ruleList:ruleList,
	createRule:createRule,
	activeRuleList:activeRuleList,
	assetRules:assetRules,
	zoneRules:zoneRules,
	checkId:checkId,
	removeRulemapping:removeRulemapping
};



function checkId(id, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		// let qry = `select * from policy_list_${companyId} where id=${id}`;
		let qry = `select * from policy_list_? where id= ?`;
		db.query(qry,[companyId,id], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}
				else {
					reject({"success":false, "message":"Rule id is invalid"});
				}
			}
		}); 
	});
}

function removeRulemapping(id, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		// let qry = `delete from policy_list_${companyId} where id=${id}`;
		let qry = `delete from policy_list_? where id= ?`;
		db.query(qry,[companyId,id], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				logger.debug("Rule mapping removed: ", rows);
				resolve({"success":true, "message":"Policy Removed"});
			}
		}); 
	});
}

function ruleList(cId){
	return new Promise((resolve, reject) => {
		cId = parseInt(cId);
		//var qry = `select * from policy_list_${cId} Pl left join rule R on Pl.rule_id=R.id`;
		var qry = `select Pl.id as id, Pl.identifier, Pl.type as ruletype, Ad.name as assetName, Zd.name as zoneName, R.name as ruleName, R.arrgumentColumn, R.id as ruleId, Zd.maxUsers, Zd.minUsers, Zd.allowed_time, Ad.allowedTime from policy_list_? Pl left join rule R on Pl.rule_id=R.id left join asset_detail_? Ad on Ad.uniqueId=Pl.identifier left join zone_detail_? Zd on Zd.uniqueId=Pl.identifier;`;
		let paramList = [cId,cId,cId];
		db.query(qry,paramList, (error, rows, fields) => {
			if(error){
				dbFunc.connectionRelease;
				logger.debug("Mysql error rule list", error);
				reject(error);
			}else if(rows.length > 0){
				logger.debug("Rule list row data: ", JSON.stringify(rows));
				var arry = [];
				rows.forEach(row => {
					var temObj = {};
					temObj.id = row.id;
					temObj.ruleId = row.ruleId;
					temObj.type = row.ruletype;
					temObj.ruleName = row.ruleName;
					temObj.identifierId = row.identifier;
					if(!row.zoneName){
						temObj.identifier = row.assetName;
					}else{
						temObj.identifier = row.zoneName;
					}

					switch(row.arrgumentColumn) {
						case 'maxUsers':
						temObj.arrgument = row.maxUsers;
						  break;
						case 'minUsers':
						temObj.arrgument = row.minUsers;
						  break;
						case 'allowed_time':
						temObj.arrgument = row.allowed_time;
						  break;
						case 'allowedTime':
						temObj.arrgument = row.allowedTime;
						  break;  	  
						default:
						temObj.arrgument = null;
					  }

					arry.push(temObj);
					if(arry.length == rows.length){
						resolve({success:true, items:arry,  message:""});
					}
				});
			}else{
				reject({success:true, items:[],  message:"Please try again"});
			}
		});

	});
}

function activeRuleList(cId){
	return new Promise((resolve, reject) => {
		cId = parseInt(cId);
		let paramList = [cId,cId,cId];
		let qry = `select PA.id, ZD.name as identifier1, AD.name as identifier2, PL.name, PL.type, PA.argument from policy_argument_list_? PA left join zone_detail_? ZD on PA.identifier = ZD.id left join asset_detail_? AD on PA.identifier = AD.uniqueId left join policy_list PL on PA.policy_list_id=PL.id`;
		db.query(qry,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else{
				dbFunc.connectionRelease;
				if(rows && rows.length > 0) {
					logger.debug("Active Rules", JSON.stringify(rows));
					var arr = [];
					
					rows.forEach(data => {
						var res ={};
						console.log("Mushir: ", data.argument)
						res.id = data.id;
						res.ruleName = data.name;
						res.argument = data.argument;
						res.type = data.type;
						if(data.identifier1 == null){
							res.identifier = data.identifier2;
						}else if(data.identifier2 == null){
							res.identifier = data.identifier1;
						}
						arr.push(res);
					});
					if(rows.length === arr.length){
						logger.debug("Responce data: ", JSON.stringify(arr));
						resolve({"success":true, "items": arr, "message":""});
					}
					//resolve({"success":true, "items": rows, "message":""});
				}
			
			}
		}); 
	});
}

function assetRules(){
	return new Promise((resolve, reject) => {
		// var qry = `select * from rule where type=1 or type=6`;
		let condition = [{type:1},{type:6}];
		let qry = `select * from rule where ? or ?`;
		db.query(qry,condition, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				if(rows && rows.length > 0) {
					resolve({"success":true, "items": rows, "message":""});
				}
				else {
					resolve({"success":true, "items": rows, "message":""});
				}
			}
		}); 
	});
}

function zoneRules(){
	return new Promise((resolve, reject) => {
		let qry = `select * from rule where type=2 or type=3 or type=4`;
		db.query(qry, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				if(rows && rows.length > 0) {
					resolve({"success":true, "items": rows, "message":""});
				}
				else {
					resolve({"success":true, "items": rows, "message":""});
				}
			}
		}); 
	});
}



function saveRule(table, rules, identifier, type, companyId){
	return new Promise((resolve, reject) => {
		var aary = [];
		companyId = parseInt(companyId);
		rules.forEach(rule => {
			if(rule.arrgument){
				logger.info("Rule for zone", JSON.stringify(rule));
				// let qry = `update ${table} set ${rule.column}=${rule.arrgument} where uniqueId='${identifier}'`;
				let dataSet = {[rule.column]:rule.arrgument};
				let condition = {uniqueId:identifier};
				let paramList = [dataSet,condition];
				let qry = `update ${table} set ? where ?`;
				logger.debug("Update arrgument qry: ", qry);
				db.query(qry,paramList, (error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						logger.debug("Mysql erro rule model", error);
						reject (false);
					}else{
						// let qry = `insert into policy_list_${companyId} set rule_id=${rule.ruleId}, identifier='${identifier}', type=${type}`;
						let dataSet = {rule_id:rule.ruleId, identifier:identifier, type:type};
						let qry = `insert into policy_list_? set ?`;
						logger.debug("Insert rule qry: ", qry);
						db.query(qry,[companyId,dataSet], (error, rows, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								logger.debug("Mysql erro rule model", error);
								reject (false);
							}else{
								logger.debug("Rule saved, ", rule.ruleId)
								aary.push(rule.ruleId);
								logger.debug("Array lng: ", aary.length);
								if(aary.length === rules.length){
									resolve({"success":true,  "message":"Rule's Saved"});
								}
							}
						});
					}
				});
			}else{
				let dataSet = {rule_id:rule.ruleId, identifier:identifier, type:type};
				// let qry = `insert into policy_list_${companyId} set rule_id=${rule.ruleId}, identifier='${identifier}',  type=${type}`;
				let qry = `insert into policy_list_? set ?`;
				logger.debug("Insert rule qry: ", qry);
				db.query(qry,[companyId,dataSet], (error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						logger.debug("Mysql erro rule model", error);
						reject (false);
					}else{
						logger.debug("Rule saved, ", rule.ruleId)
						aary.push(rule.ruleId);
						logger.debug("Array lng: ", aary.length)
						if(aary.length === rules.length){
							resolve({"success":true,  "message":"Rule's Saved"});
						}
					}
				});
			}
		});
	});
}

function checkRuleCreted(rulesdata, cId){
	return new Promise((resolve, reject) => {
		logger.debug("rulesdata: ", JSON.stringify(rulesdata));
		var identifier = rulesdata.identifier;
		var rules = rulesdata.rules;
		cId = parseInt(cId);
		var obj = {};
		var i = 0;
		rules.forEach(rule => {
			let condition =[cId,{rule_id:rule.ruleId},{identifier:identifier}];
			// var qry = `select * from policy_list_${cId} where rule_id=${rule.ruleId} AND identifier="${identifier}"`;
			let qry = `select * from policy_list_? where ? AND ?`;
			logger.debug('query for check rule created', qry);
			db.query(qry,condition, (error, rows, fields) => {
				if(error){
					dbFunc.connectionRelease;
					logger.debug("Mysql erro rule model", error);

					obj[0] = 0;
				}else if(rows.length > 0){
					logger.debug("Row data1: " , JSON.stringify(rows));

					obj[0] = 0;
				}else{
					logger.debug("Row data2: " , JSON.stringify(rows));
					i++;
					logger.debug("value of i: ", i);
					obj[i] = i;
				}
				logger.debug("Obj data: ", JSON.stringify(obj));
				logger.debug("Obj length: ", Object.keys(obj).length);
				logger.debug("Rule length: ", rules.length);
				if(rules.length === Object.keys(obj).length){
					
					var check = '0' in obj;
					logger.debug("Check : ", check);
					resolve(check);
				}else{
					resolve(true);
				}
				// else{
				// 	logger.debug("Reject")
				// 	reject({success:false, message:"Some rule from the given rule list is already assigned"});
				// }
			});

		});
	});
};



function createRule(ruleData, companyId){
	return new Promise((resolve, reject) => {
		logger.debug("Rule Data: " + JSON.stringify(ruleData));
		companyId = parseInt(companyId);
		checkRuleCreted(ruleData, companyId).then((data)=>{
			logger.debug("Return form checkRuleCreted: ", data);
			if(data === true){
				reject({success:false, message:"One rule from the given rule list is already assigned"});
			}else{
				var type;
				let condition = [companyId,{uniqueId:ruleData.identifier},companyId,{uniqueId:ruleData.identifier}];
				let qry = `select (select uniqueId from zone_detail_? where ?) as zone, (select uniqueId from asset_detail_? where ?) as asset`;
				db.query(qry,condition, (error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						logger.debug("Mysql erro rule model", error);
						reject (true);
					}else{
						logger.debug("type of qry: ", JSON.stringify(rows));
						if(rows[0].zone){
							type = 1;
						}else if(rows[0].asset){
							type = 2;
						}else{
							type = false;
						}
					}
					logger.debug("type of rule: ", type);
					if(type == false){
						reject({"success":false,  "message":"Please give a correct identifier"});
					}else{
						var identifier = ruleData.identifier;
						var ruletype = ruleData.type;
						var rules = ruleData.rules;
						if(type === 1){
							logger.info("Zone type rule");							
							var table = `zone_detail_${companyId}`;
							saveRule(table, rules,identifier, ruletype, companyId).then((data)=>{
								logger.debug("Return from save rule: ", data)
								resolve(data)
							});

						}else if(type === 2){
							logger.info("Asset type rule");
							var table = `asset_detail_${companyId}`;
							saveRule(table, rules,identifier, ruletype, companyId).then((data)=>{
								logger.debug("Return from save rule: ", data)
								resolve(data)
							});

						}
					}
				});
			}			
		}).catch((err) => {
			logger.error("Error mushir: " + err);
			reject(err);
		});
	});
}
				
module.exports = ruleModel;
