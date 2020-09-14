var {
	fileUrl
} = require('./../../config/config');
const mongoose = require('mongoose');
const logger = require('../../config/logger.js');
const db = require('../../config/mysql');
var _= require('underscore');
var dbFunc = require('../../config/mysql-function');
var MqttpublishService = require('../protocolGateway/mqttProtocolpubliser')
var versionChecker = function(req){
    return new Promise (function(resolve, reject){
        logger.debug("Req in version checker: ", req);
        var companyId = parseInt(req.companyId);
        let condition = {"DD.serial":req.gatewayId};
        var qry = `select DD.softwareId, S.id, S.type, S.version,S.filename, S.size, S.crc from device_detail_? DD left join software S on DD.softwareId=S.id where ?`
        let paramList = [companyId,condition];
        db.query(qry, paramList ,(err, res) => {
            if (err) {
                dbFunc.connectionRelease;
                reject({"success":false, "message":err.sqlMessage});
            }
            else{
                var versionData = res[0];
                logger.debug("Responce in version checker: ", JSON.stringify(versionData));
                if(!versionData.softwareId){
                    logger.warn(`No New Software alloted to given gateway ${req.gatewayId}`);
                }else{
                    if(!versionData.filename){
                        logger.warn("Invalid Software id");
                    }else{
                        let currentVersion = req.currentVersion;
                        let newVersion = versionData.version
                        if(currentVersion != newVersion){
                            logger.info(`Sending ${req.gatewayId} for sofware update version ${newVersion}`);
                            var pubTopic = `assetTracker/${companyId}/${req.gatewayId}/ota`;
                            var folder;
                            if(versionData.type == 1){
                                folder = 'node';
                            }else if(versionData.type == 2){
                                folder = 'nodeGateway';
                            }else{
                                folder = 'gateway';
                            }
                            var Url = `${fileUrl.baseUrl}${folder}/${versionData.filename}`;
                            let message = `${versionData.type},${Url},${versionData.filename},${versionData.size},${versionData.crc}`;
                            logger.debug("message with url: ", message);
                            logger.debug("Topic: ", pubTopic);
                            //Sending data to publish
                            MqttpublishService.MqttPub(pubTopic, message);
                        }else{
                            logger.info(`Version is same for gateway ${req.gatewayId} no need for update`);
                        }
                    }

                }
                
            }
        });
    })
}


exports.rebootAndVersionHandler = function(req){
    return new Promise (function(resolve, reject){
        logger.debug("rebootAndVersionHandler request data: ", req);
        var companyId = parseInt(req.companyId);
        let qry = `update device_detail_? set ? where ?`;
        let dataSet = {
            "currentVersion": req.currentVersion,
            "resetReason": req.rebootReason
        };
        let condition = {"serial":req.gatewayId};
        let paramList = [companyId,dataSet,condition];
        db.query(qry, paramList ,(err, res) => {
            if (err) {
                dbFunc.connectionRelease;
                reject({"success":false, "message":err.sqlMessage});
            }
            else {
                logger.debug("Update success");
                versionChecker(req).then(result => {

                }).catch((err) => {
                    logger.error("Error: " + err);
                 
                });
                //resolve({"success":true,  "message":"Plant Data updated Successfully"});
            }
        });

    });
};