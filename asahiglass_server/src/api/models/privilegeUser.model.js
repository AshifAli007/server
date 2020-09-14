const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
var waterfall = require('async/waterfall');
const logger = require('../../config/logger');
const APIError = require('../utils/APIError');
const Userauth = require('./userauth.model');
const bruteForceAttackHandler = require('../../../vulnerabilities/bruteForceAttackHandler');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');


const privilegeUserModel = {
	privilegeUserCreate:privilegeUserCreate,
	loginUser:loginUser
};


function privilegeUserCreate(user) {
	return new Promise((resolve, reject) => {
		logger.debug("Data for create privlage user: " + JSON.stringify(user));
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				reject(err);
			}
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) {
					reject(err);
				}
				user.password = hash;
				let condition = {email:user.email};
				let qry = "select email from privilegeUser where ?";
				logger.debug("Query for Select: ",qry);
				db.query(qry,condition, (error, rows, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					} else if(rows.length>0) {
						dbFunc.connectionRelease;
						reject({"success":false,"message":"User email already exist ! try with different email"});
					} else {
						let dataSet = {fullName:user.fullName, email:user.email,password:user.password, userType:user.userType};
						let qry = "insert into privilegeUser set ?";
						logger.debug("Query for Insert: ",qry);
						db.query(qry,dataSet, (error, rows, fields) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							} else {
								dbFunc.connectionRelease;
								resolve({"success":true,"message":"Privilege User created successfully"});
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
		let paramList = [condition];
		let qry = `SELECT * FROM privilegeUser WHERE ?`;
		logger.info("Query for select : " + qry);
		db.query(qry,paramList, (error, rows, fields) => {
			if (error) {
				reject(error);
			} else {
				logger.info("User password: " + rows[0]);
				if(rows.length > 0){
					bruteForceAttackHandler.checkFailAttempt({type:0,user:user})
						.then(result=>{
							bcrypt.compare(user.password, rows[0].password, function (err, isMatch) {
								if (err) {
									reject(error);
								} 
								else if (isMatch) {
									bruteForceAttackHandler.resetFailAttempt({type:0,user:user});
									const res = {
										"success":true,
										"email": rows[0].email,
										"id": rows[0].id,
										"name": rows[0].fullName,
										"userType": rows[0].userType
									};
									resolve(res);
								}
								else {
									bruteForceAttackHandler.updateFailAttempt({type:0,user:user})
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
						error=>{
							reject({"successs":false,"message":`Too many attempts!!!,try after ${new Date(error)}`});
						});
				}else{
					reject({"success":false,"message":"Email doesn't exist ! please give the correct email"});
				}
			}
		});
	});
}

module.exports = privilegeUserModel;
