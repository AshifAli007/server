const mongoose = require('mongoose');
const logger = require('../../config/logger.js');
const db = require('../../config/mysql');
var _= require('underscore');
var dbFunc = require('../../config/mysql-function');
var notificationService = require('../services/notificationService');
var NotificationDao = require('../models/dao/notificationSchema');
var notificationDao, notificationModel;


var notificationDao = new NotificationDao(mongoose);
var notificationModel = notificationDao.getModel();

exports.checkChange = function(req, events){
    return new Promise (function(resolve, reject){
        logger.debug("Request in Change in gw ", JSON.stringify(req) );
        let filterTemp = {
            "zoneId": req.zoneId,
            "beaconId": req.beaconId,
            "isEntry": true,
            "companyId":req.companyId
        };
        logger.debug("Filter: ", JSON.stringify(filterTemp));
        notificationModel.findOne(filterTemp, (err, res) => {
            if (err) {
                logger.error('Mongo find error: ', err);
            } else if(res){
                logger.debug("Find beacon in db ", JSON.stringify(res));
                if(res.gatewayId === req.gatewayId){
                   resolve({success: false, message: "Duplicate Packet" });
                }else{
                    var exitTime = Date.now();

                    var update = {
                        "isEntry": 0,
                        "exitTime": exitTime,
                        "isMaxTime": false,
                        "isMax":false
                    };

                    notificationModel.updateMany(filterTemp, {
                        $set: update
                    }, (err, result) => {
                        if (err) {
                            logger.error('Update data error: ', err);
                        } else {
                            logger.info('Data Updated :', result);
                            //Send Notification
                            //events.emit('dashboard', data);
                            logger.debug("Update exit: ", res);
            
                        }
                    });

                    res.isEntry = false;
                    res.exitTime = exitTime;
                    res.entryTime = 0;
                    res.time = exitTime;
                    logger.debug("Res update data: ", JSON.stringify(res))
                    notificationService.sendNotification(res, events).then(data => {

                    });

                    resolve({success: true, message: req});
                    
                }
            }
        });
    });

};