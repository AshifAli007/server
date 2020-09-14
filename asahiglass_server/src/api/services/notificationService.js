const logger = require('../../config/logger.js');
var controlRoomZone = require('./../services/controllroomZoneService');
var mqttPub = require('../protocolGateway/mqttProtocolpubliser');
var mailer = require('../services/mailer');
var smsService = require('../services/smsService');
const moment = require('moment-timezone');
var errHandler = function(err) {
	logger.error('ErrorHandler: ', err);
}
exports.sendNotification = function(data, events){
    logger.info("Data in notification service: ", data);
    return new Promise (function(resolve, reject){
        var time =  moment(new Date(parseInt(data.time))).format("HH:mm");
        
        logger.debug("Time: ", time);
        var type;
        if(data.ruleType === 1 || data.ruleType === 6){
            type = "Asset";
        }else{
            type = "Zone";
        }
        var mailBody = {
            name : data.empName,
            msg: data.message,
            zoneName: data.zoneName,
            time: time,
            type:type
        };
        
         events.emit('dashboard', data);

        if (data.isAllowed === 0 || data.isAllowed == false) {
            logger.debug("Is allowed is false");
           
            events.emit('notification', data);
  
            
            if(data.isEntry == 1){
                if(data.companyId == 5){
                mailer.mail(mailBody);
                smsService.smsSender(mailBody);
                }
                events.emit('controlroom', data);
                controlRoomZone.controlRooomValidator(data).then((res =>{
                    logger.debug("Inside notificationService of contol room asset: ", JSON.stringify(res));
                    var pubTopic = 'assetTracker/'+res.companyId+'/'+res.serial+'/control/alarm/set';
                    var msg = JSON.stringify(res.msg);
                    logger.debug("Publish msg: ", typeof(msg));
                    mqttPub.MqttPub(pubTopic, msg);
                }), errHandler);
            }
            resolve(true);
        }
        else if(data.isMax == 1 && data.isAllowed === undefined){
            logger.info("Zone max count msg: ", JSON.stringify(data));
            
            if(data.isEntry == 1){
            events.emit('notification', data);
            events.emit('controlroom', data);
           // mailer.mail(mailBody);
            controlRoomZone.controlRooomValidator(data).then((res =>{
                logger.debug("Inside notificationService of contol room zone: ", JSON.stringify(res));
                var pubTopic = 'assetTracker/'+res.companyId+'/'+res.serial+'/control/alarm/set';
                //var topic = `assetTracker/${res.companyId}/${res.serial}/control/alarm/set`;
                var msg = JSON.stringify(res.msg);
                mqttPub.MqttPub(pubTopic, msg);
            }), errHandler);
            }
            resolve(true);
        }
        else if(data.isMin == 1 && data.isAllowed === undefined){
            logger.info("Zone max time msg: ", JSON.stringify(data));
            if(data.isEntry == 1){
                events.emit('notification', data);
                events.emit('controlroom', data);
               // mailer.mail(mailBody);
            }
            
        }
        else if(data.isMaxTime == 1 && data.isAllowed === undefined){
            logger.info("Zone max time msg: ", JSON.stringify(data));
            if(data.isEntry == 1){
                events.emit('notification', data);
                events.emit('controlroom', data);
               // mailer.mail(mailBody);
            }
            
        }else if(data.exitAlloweZone == 1){
            
            if(data.isEntry == 0){
                events.emit('notification', data);
		        logger.info("Asset Exit event: ", JSON.stringify(mailBody));
		        if(data.companyId == 5){
                 mailer.mail(mailBody);
                 smsService.smsSender(mailBody);
                }
            }
        }else if(data.isMissing == 1){
            if(data.isEntry == 0){
                logger.debug("Data in is missing notification: ", data)
                events.emit('notification', data);
		        //logger.info("Asset Exit event: ", JSON.stringify(mailBody));
		        // if(data.companyId == 5){
                //  mailer.mail(mailBody);
                //  smsService.smsSender(mailBody);
                // }
            }
        }
    });

};

