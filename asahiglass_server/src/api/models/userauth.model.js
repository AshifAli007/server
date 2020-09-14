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
var {url} = require('../../config/config');
const bruteForceAttackHandler = require('../../../vulnerabilities/bruteForceAttackHandler');


const userModel = {
	addUser:addUser,
	loginUser: loginUser
};

function addUser(user, id) {
	tableName = 'userInfo';
	logger.debug("User Data: " + JSON.stringify(user));
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return next(err);
			}
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) {
					return next(err);
				}
				user.password = hash;
				let condition = {email:user.email};
				let qry = `select email from ${tableName} where ?`;
				db.query(qry,condition, (error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					} else if(rows.length>0) {
						dbFunc.connectionRelease;
						reject({"success":false,"message":"user already exist ! try with different user"});
					} else {
						let dataSet ={fullName:user.fullName, email:user.email, password:user.password, contactNo:user.contactNo, userType:user.userType, address:user.address,companyId:id};
						let qry = "insert into "+tableName+" set ?";
						logger.info("Query for insert : " + qry);
						db.query(qry,dataSet, (error, rows, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							} else {
								dbFunc.connectionRelease;
								resolve(rows);
							}
						});
					}
				});
			});
		});
	});
}

function loginUser(user){
	logger.info("Requested data in login model: " + JSON.stringify(user));
	return new Promise((resolve, reject) => {
		let condition = {email:user.email};
		var qry = `SELECT * FROM userInfo WHERE ?`;
		logger.info("Query for select : " + qry);
		db.query(qry,condition, (error, rows, fields) => {
			if (error) {
				reject(error);
			} else {
				logger.info("User password: " + rows[0]);
				if(rows.length > 0){
					bruteForceAttackHandler.checkFailAttempt({type:1,user:user})
						.then(result=>{
							bcrypt.compare(user.password, rows[0].password, function (err, isMatch) {
								if (err) {
									reject(error);
								} else if (isMatch) {
									bruteForceAttackHandler.resetFailAttempt({type:1,user:user});
									let condition = {id:rows[0].companyId};
									let qry = "select * from company_detail where ?";
									db.query(qry,condition, (error, result, fields) => {
										if (error) {
											dbFunc.connectionRelease;
											reject(error);
										}else{
											if(result.length > 0){
												result[0].logo = result[0].logo && `${url.baseUrl}${rows[0].companyId}/logo/${result[0].logo}`;
												const res = {
													
													"email": rows[0].email,
													"id": rows[0].id,
													"name": rows[0].fullName,
													"userType": rows[0].userType,
													"company": result[0]
												};
												resolve(res);
											}
											else {
												reject({"success":false,"message":"Company doesn't exist ! please provide the correct companyId"});
											}
										}
									});
								}
								else {
									bruteForceAttackHandler.updateFailAttempt({type:1,user:user})
										.then(result=>{
											if(result.failCount > 2){
												reject({"successs":false,"message":`Too many attempts!!!,try after ${new Date(result.apiEnableTime)}`});
											}
											reject({"success":false,"message":"Incorrect Password"});
								
										},
										error=>{logger.debug("updateFailAttempt error:",error);});

								}
							});
						},
						error =>{reject({"successs":false,"message":`Too many attempts!!!,try after ${new Date(error)}`});
						});
				}
				else {
					reject({"success":false,"message":"Email doesn't exist ! please give the correct email"});
				}
			}
		});
	});
}

module.exports = userModel;
