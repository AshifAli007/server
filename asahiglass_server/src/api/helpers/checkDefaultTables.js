const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const logger = require('../../config/logger');
var createDefaultTables = require('./createDefaultTables');


exports.defaultTableList= function(table) { 
	return new Promise (function(resolve, reject){
		table.defaultTables.forEach(function(name) {
			checkDefaultTables(name).then((name)=> {
				createDefaultTables.createDefaultTables(name);
			}).catch((error)=> {
				logger.error(`${name} Table Already Exist`);
			});
		});
	});
}


checkDefaultTables= function(name) { 
	return new Promise (function(resolve, reject){
		var qry = "SHOW TABLES  LIKE '"+name+"'";
		db.query(qry, (error, row, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else if(row.length > 0) {
				reject(`${name} Table Already Exist`);
			}else {
				resolve(name);
			}
		});
	});
};