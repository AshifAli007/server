var db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
var logger = require('../../config/logger');
var {tableSchema} = require('../../config/config');


exports.createDynamicTable= function(name, id) { 
	return new Promise (function(resolve, reject){
		var tableName = name+'_'+id;
		var qry = `create table ${tableName}` + tableSchema[name];
		logger.info(`Create Table Query for ${tableName} :  ${qry}`);
		db.query(qry, (error, row, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}
			else {
				resolve(tableName);
			}
		});	
	});
};