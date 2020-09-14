
const logger = require('../../config/logger');
const mqttPub = require('../protocolGateway/mqttProtocolpubliser');
const mqttsub = require('../protocolGateway/mqttProtocol');
const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');

const provisionModel = {
	postProvision:postProvision,
	getProvision:getProvision,

};


function postProvision(body, companyId) {
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		logger.debug("Body Data: " + JSON.stringify(body) + " , " + companyId);
		if(!body.type || !body.gatewaySerial ){
			reject({"success":false,  "message":"Please select Device Type And Gateway"});
		}else{
			let condition = {deviceSerial:body.gatewaySerial};
			var qry = `select * from prov_scan_? where ?`;
			logger.debug("Qry for prov scan: ", qry);
			db.query(qry,[companyId,condition], (error, rows, fields) => {
				if (error) {
					dbFunc.connectionRelease;
					reject(error);
				}else if(rows.length > 0){
					logger.debug("dasdas");
					reject({"success":false,  "message":"Scanning failed scan is already in progress from given device"});
				}else{
					logger.debug("dasdas1");
					var payLoad;
					if(body.type == 5){
						payLoad = "rfidScan";
					}else{
						payLoad = "bleScan";
					}
					var pubTopic = 'assetTracker/'+companyId+'/'+body.gatewaySerial+'/provisioning';
					logger.debug("Topic: " + pubTopic + " , Payload: " + payLoad );
					mqttPub.MqttPub(pubTopic, payLoad);
					let dataSet = {type:body.type, deviceSerial:body.gatewaySerial, isScanning:1};
					var qry = `insert into prov_scan_? set ?`;
					logger.debug("Insert in prov data: ", qry);
					db.query(qry,[companyId, dataSet], (error, rows, fields) => {
						if (error) {
							dbFunc.connectionRelease;
							reject(error);
						}else{
							resolve({"success":true,  "message":"Provisioning Started"});
						}
					});
				}
			});
			//mqttsub.startTimer();
		}


	});
}

function getProvision(parm, companyId){
	return new Promise((resolve, reject) => {
		companyId = parseInt(companyId);
		logger.debug("Parm data: ", parm);
		var qry;
		var condition;
		if(Object.keys(parm).length > 0){
			condition = [companyId,{deviceSerial:parm.id}];
			qry = `select * from prov_scan_? where ?`;	
		}else{
			condition = [companyId];
			qry = `select * from prov_scan_?`;
		}

		logger.debug("Get Provision: ", qry);
		db.query(qry,condition, (error, rows, fields) => {
			if (error) {
				dbFunc.connectionRelease;
				reject(error);
			}else{
				resolve({"success":true, items:rows, "message":""});
			}
		});
	});
}


module.exports = provisionModel;
