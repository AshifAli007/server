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

const foodCartModel = {
	addFoodCart:addFoodCart,
	foodCartList:foodCartList,
	checkId: checkId,
	getfoodCart:getfoodCart,
	updateFoodCart:updateFoodCart,
	addFoodCartData:addFoodCartData
};


function addFoodCart(body, companyId) {
	logger.debug("Food Cart Data: " + JSON.stringify(body));
	return new Promise((resolve, reject) => {
		companyId=parseInt(companyId);
		let paramList = [companyId,{foodCartNo:body.foodCartNo},{gatewayId:body.gatewayId}];
		var qry = `select * from food_cart_detail_? where ? OR ?`;
		logger.debug('Find foodCartNo query: '+qry);
		db.query(qry,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else if(rows.length > 0) {
				reject({"success":false, "message":"Data already exist"});
			}else{
				var foodCartData = {
					foodCartNo:body && body.foodCartNo,
					venderName:body && body.venderName,
					uniqueId:crypto.randomBytes(3).toString('hex'),
					gatewayId:body.gatewayId
				};

				db.query(`INSERT INTO food_cart_detail_? SET ?`, [companyId,foodCartData] ,(err, res) => {
					if (err) {			
						dbFunc.connectionRelease;
						reject({"success":false,  "message":err.sqlMessage});
					}
					else {
						resolve({"success":true,  "message":"Food Cart Data Saved Successfully"});
					}
				});
			}
		});
	});
}

function foodCartList(companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		db.query(`select FC.id, FC.foodCartNo, FC.uniqueId, FC.venderName, FC.gatewayId, DD.name  from food_cart_detail_? FC left join device_detail_? DD on FC.gatewayId=DD.id`,[companyId,companyId], (error, rows, fields) => {
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
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		db.query(`select * from food_cart_detail_? where ?`,[companyId,{id:id}], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}else{
					reject({"success":false, "message":"Food Cart id is invalid"});
				}
			}
		}); 
	});
}

function getfoodCart(data){
	logger.debug("data in model: " + JSON.stringify(data));
	return new Promise((resolve, reject) => {
		if(data.length > 0){
			resolve({"success":true, "data": data, "message":""});
		}else{
			reject({"success":false, "message":"Food Cart id is invalid"});
		}
	});
}

function updateFoodCart(data, id, companyId){
	logger.debug("Update Food Cart data: " + JSON.stringify(data));
	logger.debug("Update foodCart id: " + JSON.stringify(id));
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let paramList = [companyId,{gatewayId:data.gatewayId}];
		var findQry = `select * from food_cart_detail_? where ?`;
		logger.debug('Find Food Cart query: '+findQry);
		db.query(findQry,paramList, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else if(rows.length > 0) {
				if (rows[0].id == id) {
					var foodCartData = {
						foodCartNo:data && data.foodCartNo,
						venderName:data && data.venderName,
						gatewayId:data && data.gatewayId
					};
					let paramList =[companyId,foodCartData,{id:id}];
					var qry = `update food_cart_detail_? SET ? where ?`;
					logger.debug("Query for Bus Update: " + qry);
					db.query(qry, paramList, (error, rows, fields) => {
						if (error) {
							dbFunc.connectionRelease;
							reject(error);
						}else{
							resolve({"success":true,  "message":"Food Cart Data updated Successfully"} );
						}
					});
				}
				else {
					reject({"success":false, "message":"Gateway already assigned to different Food Cart"});
				}
			}else{
				var foodCartData = {
					foodCartNo:data && data.foodCartNo,
					venderName:data && data.venderName,
					gatewayId:data && data.gatewayId
				};
				let paramList = [companyId,foodCartData,{id:id}];
				var qry = `update food_cart_detail_? SET ? where ?`;
				logger.debug("Query for Bus Update: " + qry);
				db.query(qry, paramList, (error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					}else{
						resolve({"success":true,  "message":"Food Cart Data Updated Successfully"} );
					}
				});
			}
		});
	});
}


function addFoodCartData(foodCartData, csvHeader, companyId) {
	return new Promise((resolve, reject) => {
		var discardedData = [];
		foodCartData.forEach(function(data, i) {
			var tmpObj = {
				foodCartNo:data[0] || null,
				venderName:data[1] || null,
				uniqueId:crypto.randomBytes(3).toString('hex')
			};
			var qry = `INSERT INTO food_cart_detail_? SET ?`;
			db.query(qry, [companyId,tmpObj] ,(err, res) => {
				if (err) {
					dbFunc.connectionRelease;
					tmpObj.errMessage = err.sqlMessage;
					discardedData.push(tmpObj);
				}
				if(foodCartData.length - 1 === i) {
					if(discardedData.length > 0) {
						var totalLength = foodCartData.length;
						var discardedLength = discardedData.length;
						var message = `${discardedLength} out of ${totalLength} Food Cart data discarded`;
						reject({success:false, list:discardedData,message:message});
					}
					else {
						resolve({success:true, message:'All Food Cart data inserted successfully'});
					}
				}
			});
		});
	});
}

module.exports = foodCartModel;
