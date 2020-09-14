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
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
var createDynamicTables = require('../helpers/createDynamicTables.js');
var removeDynamicTables = require('../helpers/removeDynamicTables.js');
var createCompanyFolder = require('../helpers/createCompanyFolder');
var createGatewayFolder = require('../helpers/createGatewayFolder');
var createLogoFolder = require('../helpers/createLogoFolder');
var createZoneFolder = require('../helpers/createZoneFolder');
var createFloorFolder = require('../helpers/createFloorsFolder');
var createAssetFolder = require('../helpers/createAssetFolder');
var base64Converter = require('../helpers/createBase64Image');
var {url} = require('../../config/config');

const companyModel = {
	createCompany:createCompany,
	checkId: checkId,
	listCompany:listCompany,
	getCompany:getCompany
};


function createCompany(data) {
	return new Promise((resolve, reject) => {
		var companyData = {
			name:data && data.name,
			address: data && data.address,
			website: data && data.website
		};
		let qry = `select email from userInfo where ?`;
		let condition = {email:data.contactPerson.email};
		db.query(qry, condition, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			} else if(rows.length > 0) {
				dbFunc.connectionRelease;
				reject({"success":false,"message":"User email already exist ! try with different email"});
			} else {
				let insertQry = 'INSERT INTO company_detail SET ?';
				db.query(insertQry, companyData ,(err, res) => {
					if (err) {
						dbFunc.connectionRelease;
						reject(err);
					}
					else {
						var tables = [];
						waterfall([
		    				function(callback) {
		        				var name = 'asset_detail';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'device_detail';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'zone_detail';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'floor_plan';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'node_neighbour_detail';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'map_user_floor';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'map_testBeacon_receiver';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'asset_zone_mapping';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'policy_list';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'asset_attributes_key';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'asset_attribute_value';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'asset_type_list';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'bus_detail';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'food_cart_detail';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
		    				},
		    				function(tables, callback) {
		        				var name = 'asset_subType_detail';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
							},
							function(tables, callback) {
		        				var name = 'kpi_detail';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
							},
							function(tables, callback) {
		        				var name = 'map_controlroomgw_zone';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
							},
							function(tables, callback) {
		        				var name = 'prov_scan';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
							},
							function(tables, callback) {
		        				var name = 'plant_detail';
								createDynamicTables.createDynamicTable(name,res.insertId).then((tableName) => {
									tables.push(tableName);
									logger.info(`${tableName} Table Created Successfully`);
									callback(null, tables);
								}).
								catch((err)=> {
									callback(err);
								});
							}
							
						], function (err, result) {
							if (err) {
								let deleteQuery = `delete from company_detail where ?`;
								let condition = {id:res.insertId};
								db.query(deleteQuery, condition ,(err, rows, fields) => {
									if (err) {
										dbFunc.connectionRelease;
										reject(err);
									}
									else {
										logger.debug('Company data deleted from company_detail table with id: ' +res.insertId);
										if (tables && tables.length > 0) {
		    								removeDynamicTables.removeDynamicTable(tables).then((data) => {
		    									logger.debug("List of removed dynamic tables due to error: " +tables);
		    									reject(data);
											}).
											catch((err)=> {
												reject(err);
											});	
										}
										else {
											reject({"success":false,"message":"Please contact to Admin"});
										}
									}
								});
							}
							else {
								Userauth.addUser(data.contactPerson, res.insertId).then((resu)=>{
									logger.info("Return data: " + JSON.stringify(resu));
									//var qry = "update company_detail set contactPerson="+resu.insertId+" where id= "+res.insertId+"";
									let qry = `update company_detail set ? where ?`;
									let condition = {id:res.insertId};
									let dataSet = {
										'contactPerson':resu.insertId
									};
									db.query(qry ,[dataSet,condition],(err, rows, fields) => {
										if (err) {
											dbFunc.connectionRelease;
											reject(err);
										}
										else {
											logger.info('Company created with id: ' +res.insertId);
											
											createCompanyFolder.createCompanyFolder(res.insertId).then((data)=>{
												logger.debug("Company Folder: " + data);
											});
											createGatewayFolder.createGatewayFolder(res.insertId).then((data)=>{
												logger.debug("Gateway Folder: " + data);
											});
											createLogoFolder.createLogoFolder(res.insertId).then((data)=>{
												logger.debug("Logo Folder: " + data);
											});
											createZoneFolder.createZoneFolder(res.insertId).then((data)=>{
												logger.debug("Zone Folder: " + data);
											});
											createFloorFolder.createFloorFolder(res.insertId).then((data)=>{
												logger.debug("Floor Folder: " + data);
											});
											createAssetFolder.createAssetFolder(res.insertId).then((data)=>{
												logger.debug("Asset Folder: " + data);
											});

											var type = 'logo';
											base64Converter.base64ImageConverter(data.logo, res.insertId, type).then((data)=>{
												logger.debug("Company Logo Uploaded Successfully");
												// var qry = `update company_detail set logo='${data}' where id='${res.insertId}'`;
												var qry = `update company_detail set logo=? where id=?`;
												logger.debug("Company Logo updated:" + qry);
												db.query(qry,[data,res.insertId], (error, row, fields) => {
													if (error) {
														dbFunc.connectionRelease;
														reject(error);
													}
													else {
														logger.debug("Company logo updated");
													}
												});
											});
											resolve({suceess:true, message:'Company data created successfully'});
										}
									});

								}).catch((err) => {
									logger.error("Error: " + err);
									reject(err);
								});
							}
						});
					}
				});
			}
		});
	});
}


function checkId(id){
	return new Promise((resolve, reject) => {
		let qry = `select * from company_detail where ?`;
		let condition = {id:id};
		db.query(qry,condition, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					resolve(rows);
				}else{
					logger.error('Company not found');
					reject({"success":false, "message":"Company Id is invalid"});
				}
			}
		}); 
	});
}

function listCompany(){
	return new Promise((resolve, reject) => {
		let qry = `select * from company_detail CD left join userInfo UI on CD.id=UI.companyId where userType=1`;
		db.query(qry, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				dbFunc.connectionRelease;
				if(rows.length > 0){
					var result = rows.map((company) => {
						if(company.logo) {
							company.logo = `${url.baseUrl}${company.id}/logo/${company.logo}`; 
						}
						return company;
					});
					resolve({"success":true, "items": result, "message":""});
				}else {
					resolve({"success":true, "items": rows, "message":""});
				}
			}
		}); 
	});
}

function getCompany(companyId){
	return new Promise((resolve, reject) => {
		let qry = `select * from company_detail where ?`;
		let condition = {id:companyId};
		db.query(qry, condition, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				if(rows.length > 0){
					if(rows[0].logo) {
						rows[0].logo = `${url.baseUrl}${companyId}/logo/${rows[0].logo}`;
					}
					resolve({"success":true, "data": rows[0], "message":""});
				}else{
					reject({"success":false, "message":"Company Id is invalid"});
				}
			}
		});
	});
}

module.exports = companyModel;
