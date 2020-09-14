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


const kpiModel = {
	kpiList:kpiList,
	checkId: checkId,
};

function kpiList(companyId,type){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		db.query(`select * from kpi_detail_? where type=?`,[companyId,type], (error, rows, fields) => {
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
	id = parseInt(id);
	return new Promise((resolve, reject) => {
		db.query(`select * from kpi_detail_? where id=?`,[companyId,id], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}else{
					reject({"success":false, "message":"KPI id is invalid"});
				}
			}
		}); 
	});
}

module.exports = kpiModel;
