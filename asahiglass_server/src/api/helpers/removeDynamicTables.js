var db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');

exports.removeDynamicTable= function(tableArray) { 
	return new Promise (function(resolve, reject){
		tableArray.forEach(function(name, i) {
			var qry = "drop table "+name+"";
			db.query(qry, (error, row, fields) => {
				if (error) {
					dbFunc.connectionRelease;
					reject(error);
				}
				else {
					if(tableArray.length - 1 === i){
						resolve({suceess:false, message:'Please contact to Admin ! All Dynamic tables removed due to error'});
					}
				}
			});	
		});
	});
};