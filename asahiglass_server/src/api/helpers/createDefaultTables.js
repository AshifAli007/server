const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
const logger = require('../../config/logger');
var {tableSchema} = require('../../config/config');


exports.createDefaultTables= function(name) { 
	var qry = tableSchema[name];
	logger.info(`Create Table Query for ${name} :  ${qry}`);
	db.query(qry, (error, row, fields) => {
		if (error) {
			dbFunc.connectionRelease;
			logger.error(error);
		}
		else {
			logger.info(`${name} Table Created Successfully`);
		}
	});	
};