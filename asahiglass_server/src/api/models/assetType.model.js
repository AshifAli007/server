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


const assetTypeModel = {
	create:create,
	listAssetType:listAssetType,
	checkId:checkId,
	checkAssetTypeName:checkAssetTypeName,
	getAssetType:getAssetType,
	assetSubType:assetSubType,
	createAssetSubType:createAssetSubType,
	assetTypeDetail:assetTypeDetail,
	updateAssetType:updateAssetType,
	updateAssetSubType:updateAssetSubType
};


function create(data, companyId) {
	logger.debug("Data: " + JSON.stringify(data));
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		data.attributes = JSON.stringify(data.attributes);
		let dataSet = {
			assetTypeName:data.assetTypeName,
			icon:data.icon || null,
			uniqueId:crypto.randomBytes(2).toString('hex')
		};
		var query = `INSERT INTO asset_type_list_? SET ?`;
		db.query(query, [companyId, dataSet], (error, res) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				let dataSet = {
					attribute_key:data.attributes
				};
				var qry = `insert into asset_attributes_key_? set ?`;
				db.query(qry, [companyId, dataSet], (error, result) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					}else{
						let dataSet = {
							attributes_id:result.insertId
						};
						let condition = {id:res.insertId};
						let qry = `update asset_type_list_? set ? where ?`;
						db.query(qry, [companyId,dataSet,condition], (error, result) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							}else{
								dbFunc.connectionRelease;
								resolve({"success":true,  "message":"Asset type name saved successfully"} );
							}
						});
					}
				});
			}
		});
	});
}

function getAssetType(data){
	logger.debug("data in model: " + JSON.stringify(data));
	return new Promise((resolve, reject) => {
		if(data.length > 0){
			resolve({"success":true, "data": data, "message":""});
		}else{
			reject({"success":false, "message":"assetType id is invalid"});
		}
	});
}

function checkId(id, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let paramlist = [companyId,companyId,id];
		let qry = `select T.id, T.assetTypeName, T.icon, T.attributes_id, A.attribute_key from asset_type_list_? T left join asset_attributes_key_? A on T.attributes_id=A.id where T.id=?`;
		db.query(qry, paramlist, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}else{
					reject({"success":false, "message":"assetType Id is invalid"});
				}
			}
		}); 
	});
}

function checkAssetTypeName(assetTypeName, companyId, assetTypeId) {
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		if (assetTypeId) {
			var qry = `select * from asset_type_list_? where ? AND id <> ?`;
		}
		else {
			var qry = `select * from asset_type_list_? where ?`;
		}
		var condition = {assetTypeName:assetTypeName};
		logger.debug('Find asset type query: ' +qry);
		db.query(qry, [companyId, condition,assetTypeId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} 
			else if(rows.length > 0) {
				reject({"success":false,  "message":"Asset type name already exists ! try with different name"});
			}
			else {
				resolve(true);
			}
		});
	});
}

function listAssetType(companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let qry = `select T.id, T.assetTypeName as name, T.icon, A.attribute_key from asset_type_list_? T left join asset_attributes_key_? A on T.attributes_id=A.id`;
		db.query(qry,[companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else {
				dbFunc.connectionRelease;
				resolve({"success":true, "items": rows, "message":""} );
			}
		}); 
	});
}


function assetSubType(data, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		if(data.length > 0){
			companyId=parseInt(companyId);
			var assetTypeData = data[0];
			let qry = `select * from asset_subType_detail_? where ?`;
			let condition = {assetTypeId:assetTypeData.id};
			db.query(qry, [companyId, condition], (error, rows, fields) => {
				if (error) {
					dbFunc.connectionRelease;
					reject(error);
				}else{
					dbFunc.connectionRelease;
					logger.debug("Asset Sub Type Data: " + JSON.stringify(rows));
					assetTypeData.subType = rows;
					resolve({"success":true, "data": assetTypeData, "message":""});
				}
			});
		}else{
			reject({"success":false, "message":"Asset Type Id is invalid"});
		}
	});
}


function createAssetSubType(data, body, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		if(data.length > 0){
			let qry = `select * from asset_subType_detail_? where ?`;
			let condition = {name:body.name};
			logger.debug('Find asset subType query: ' +qry);
			db.query(qry, [companyId, condition],(error, rows, fields) => {
				if (error) {
					dbFunc.connectionRelease;
					reject(error);
				} 
				else if(rows.length > 0) {
					reject({"success":false,  "message":"Asset subType name already exists ! try with different name"});
				}
				else {
					let dataSet = {
						name:body.name,
						assetTypeId:data[0].id,
						uniqueId:crypto.randomBytes(2).toString('hex')
					};
					var query = `insert into asset_subType_detail_? set ?`;
					db.query(query, [companyId,dataSet], (error, res) => {
						if (error) {
							dbFunc.connectionRelease;
							reject(error);
						}else{
							dbFunc.connectionRelease;
							resolve({"success":true,  "message":"Asset subType name saved successfully"} );
						}
					});
				}
			});
		}else{
			reject({"success":false, "message":"Asset Type Id is invalid"});
		}
	});
}


function assetTypeDetail(companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		//var qry = `select T.id, T.assetTypeName, T.icon, A.attribute_key, S.name from asset_type_list_${companyId} as T left join asset_attributes_key_${companyId} A on T.attributes_id=A.id left join asset_subType_detail_${companyId} as S on S.assetTypeId = T.id`;
		var qry = `select ASD.id, ASD.name, aT.id as assetTypeId, aT.assetTypeName from asset_subType_detail_? as ASD left join asset_type_list_? as aT on ASD.assetTypeId=aT.id`;
		db.query(qry,[companyId,companyId], (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				logger.debug("Asset Type Data with subType : " + JSON.stringify(rows));
				resolve({"success":true, "items": rows, "message":""});
			}
		});
	});
}

function updateAssetType(data, companyId, assetTypeData) {
	logger.debug("Data: " + JSON.stringify(data));
	companyId = parseInt(companyId);
	return new Promise((resolve, reject) => {
		data.attributes = JSON.stringify(data.attributes);
		let dataSet = {
			assetTypeName:data.assetTypeName,
			icon:data.icon || null
		};
		let condition = {id:assetTypeData.id};
		let query = `update asset_type_list_? SET ? where ?`;
		db.query(query, [companyId,dataSet,condition], (error, res) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				let dataSet = {
					attribute_key:data.attributes
				};
				let condition = {id:assetTypeData.attributes_id};
				let qry = `update asset_attributes_key_? set ? where ?`;
				db.query(qry, [companyId, dataSet,condition], (error, result) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					}else{
						dbFunc.connectionRelease;
						resolve({"success":true,  "message":"Asset type data updated successfully"} );
					}
				});
			}
		});
	});
}

function updateAssetSubType(assetTypeId, body, companyId, assetSubTypeId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		let condition = {id:assetSubTypeId};
		var qry = `select id from asset_subType_detail_? where ?`;
		logger.debug('Find asset subType Id query: ' +qry);
		db.query(qry, [companyId,condition],(error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} 
			else if(rows.length > 0) {
				let condition = {name:body.name};
				var findQry = `select * from asset_subType_detail_? where ? AND id <> ?`;
				logger.debug('Find asset subType name query: ' +findQry);
				db.query(findQry, [companyId,condition,assetSubTypeId], (error, result, fields) => {
					if (error) {
						dbFunc.connectionRelease;
						reject(error);
					}
					else if(result.length > 0) {
						reject({"success":false,  "message":"Asset subType name already exists ! try with different name"});
					}
					else {
						let dataSet = {
							name:body.name, 
							assetTypeId:assetTypeId
						};
						let condition = {id:assetSubTypeId};
						var query = `update asset_subType_detail_? set ? where ?`;
						db.query(query, [companyId, dataSet,condition], (error, res) => {
							if (error) {
								dbFunc.connectionRelease;
								reject(error);
							}else{
								dbFunc.connectionRelease;
								resolve({"success":true,  "message":"Asset subType data updated successfully"} );
							}
						});
					}
				});
			}
			else {
				reject({"success":false, "message":"asset SubType Id is invalid"});
			}
		});
	});
}

module.exports = assetTypeModel;
