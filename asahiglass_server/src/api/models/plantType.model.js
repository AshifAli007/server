const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');

const kpiModel = {
	plantTypeList:plantTypeList,
	checkId: checkId,
};

function plantTypeList(companyId){
	return new Promise((resolve, reject) => {
		let qry = `select * from plant_type_list`;
		db.query(qry, (error, rows, fields) => {
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
	return new Promise((resolve, reject) => {
		let condition = {id:id};
		let qry =`select * from plant_type_list where ?`;
		db.query(qry,[condition], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}else{
					reject({"success":false, "message":"Plant type id is invalid"});
				}
			}
		}); 
	});
}

module.exports = kpiModel;
