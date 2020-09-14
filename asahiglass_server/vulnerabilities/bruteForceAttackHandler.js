const logger = require('../src/config/logger');
const db = require('../src/config/mysql');
const config = require('../src/config/config');
let userType = {
	0:'privilegeUser',
	1:'userInfo',
};
// var dbFunc = require('../../config/mysql-function')
// var dbFunc = require('../../config/mysql-function');
/* eslint-disable no-console */
// /* eslint-disable no-console */
function timeValidator (time, callback){
	let maxTimeDiff = 300000;
	var currTime = Date.now();
	// console.log("dbtime------",time);
	
	var dbTime = new Date(time);//.toISOString();
	console.log('Inside timeValidator,currTime: '+currTime+' dbTime :'+ dbTime);
	var diff = currTime - dbTime;
	console.log('Time Difference : '+diff+' maxTimeDiff : '+maxTimeDiff);
	if(diff > maxTimeDiff ){
		callback(0);
	}else {
		callback(1);
	}
}

let getCurrentTime = function(){
	var currTime =  new Date();//.toISOString();
	var month  = currTime.getMonth() + 1;
	currTime = currTime.getFullYear()+ '-' +month+ '-' +currTime.getDate()+' '+currTime.getHours()+':'+currTime.getMinutes()+':'+currTime.getSeconds();
	console.log(currTime);
	return currTime;
};

let tableFinder = function(req){
	logger.info("Requested data in login model: " + JSON.stringify(req.user));
	return new Promise((resolve, reject) => {
		let condition = {email:req.user.email};
		var qry = `SELECT * FROM ${userType[req.type]} WHERE ?`;
		logger.info("Query for select in tableFinder: " + qry);
		db.query(qry,condition, (error, rows, fields) => {
			if (error) {
				reject(error);
			} else {
				logger.info("User data found: " + rows[0]);
				resolve({rows:rows,user:req.user});
			}
		});
	});
};

function updateFailAttempt_DB(rows){
	
	logger.debug('Inside updateFailAttempt_DB, rows: ', rows);
	let dataSet = {failCount:rows[0].failCount, isBlock:rows[0].isBlock};
	let condition = {email:rows[0].email};
	let paramList = [dataSet,condition];
	let updateQry = `update ${userType[rows[0].userType]} set ? where ? `;
	if(rows[0].hasOwnProperty('lastFailTime')){
		// updateQry = updateQry.replace('failTime',` , lastFailTime = '${rows[0].lastFailTime}'`);
		dataSet.lastFailTime = rows[0].lastFailTime;
	}
	// }else{
	// 	updateQry = updateQry.replace('failTime','');
	// }
	logger.info('Update Fail Attempt: ',updateQry);
	return new Promise  (function(resolve, reject){
		db.query(updateQry,paramList,(err, result)=>{
			 if(err){
				logger.warn('DB error: ',err);
				reject('DB error');
			 }else{
				logger.info('Data updated');
				resolve('Data updated');
			 }
		});

	});
}

exports.checkFailAttempt = function(req){
	logger.debug('Inside brute force attack handler: ',req);
	return new Promise  (function(resolve, reject){
		tableFinder(req).
			then((ack)=>{
				let rows= ack.rows,user = ack.user;
				logger.info('rows: ',rows);
				logger.info('user: ',user);
				let isBlock = rows[0].isBlock;
				if(isBlock){
					timeValidator(rows[0].lastFailTime, function(ack){
								 logger.debug('callback response: ',JSON.stringify(ack));
								 if(ack ==0){
									   //write code to update the table;
									   rows[0].failCount = 0, rows[0].isBlock = 0;
									   delete rows[0].lastFailTime;
									   resolve('Block API time completed');
									   updateFailAttempt_DB(rows)
									   .then(result=>{logger.info(result);} ,
											 error=>{logger.error(error);});

								 }else{
									   reject(Date.parse(new Date(rows[0].lastFailTime))+config.API_Disable_Time);
								 }

					});
				}else{
					resolve('isBlock is false');
				}
			},
			 error=> {resolve(error);}
			);
	});
};

exports.updateFailAttempt=function(req){
	logger.debug('Inside updateFailAttempt Method');
	return new Promise((resolve, reject)=>{
		tableFinder(req).
			then((ack)=>{
				// console.log(ack.rows[0],"-------------------------------------");

				timeValidator(ack.rows[0].lastFailTime,(flag)=>{
					if(!flag){
						ack.rows[0].failCount = 0, ack.rows[0].isBlock = 0;
						ack.rows[0].lastFailTime = 0;
					}
				});
				if(ack.rows[0].failCount >2){
					ack.rows[0].isBlock = 1, ack.rows[0].failCount += 1;
					ack.rows[0].apiEnableTime = Date.parse(new Date(ack.rows[0].lastFailTime))+config.API_Disable_Time;
					delete ack.rows[0].lastFailTime;
				}else if(ack.rows[0].failCount == 2){
					ack.rows[0].isBlock = 1, ack.rows[0].failCount += 1;
					ack.rows[0].lastFailTime = getCurrentTime();
					ack.rows[0].apiEnableTime = Date.parse(new Date(ack.rows[0].lastFailTime))+config.API_Disable_Time;

				}
				else{
					ack.rows[0].isBlock = 0, ack.rows[0].failCount += 1;
					ack.rows[0].lastFailTime = getCurrentTime();
				}

				resolve(ack.rows[0]);
				updateFailAttempt_DB(ack.rows)
					.then(result=>{logger.info("DATA UPDATED",result);} ,
						error=>{logger.error("updateFailAttempt_DB: ", error);}
					);
			},
			error=> {reject(error);}

			);
	});
};

exports.resetFailAttempt = function(req){
	logger.debug('Inside resetFailAttempt Method');
	tableFinder(req).
		then((ack)=>{
			  let rows= ack.rows;
			  rows[0].isBlock = 0,rows[0].failCount = 0;
			  delete rows[0].lastFailTime;/*,
			  result[0].lastFailTime = getCurrentTime();*/
			  updateFailAttempt_DB(rows)
			  .then(result=>{logger.info(result);} ,
					error=>{logger.error(error);}
			  );
		},
			 error=> {logger.error(error);}
		);
};