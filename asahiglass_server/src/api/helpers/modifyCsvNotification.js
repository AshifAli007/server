var fs = require('fs');
const logger = require('../../config/logger');
var mqttPub = require('../protocolGateway/mqttProtocolpubliser');
var {url} = require('../../config/config');
const { crc32 } = require('crc');

exports.modifyCsvNotification= function(msg) { 
	return new Promise (function(resolve, reject){ 
		logger.debug("Noti msg: " + JSON.stringify(msg));
		if(!msg.cId){
			reject(false);
		}else{
			var pubTopic = 'assetTracker/'+msg.cId+'/'+msg.gWId+'/file/modify';
			var dirPath = `${process.env.PWD}/uploads/${msg.cId}/gateway/${msg.gWId}/neighbourNode.csv`;
			var stats = fs.statSync(dirPath),
				fileSize = stats.size,
				path = url.baseUrl+msg.cId+"/gateway/"+msg.gWId+"/neighbourNode.csv",
				checksum = crc32(fs.readFileSync(dirPath, 'utf8')).toString(16);
			var msgs = path+",neighbourNode.csv,"+fileSize+","+checksum;
			fs.readFile(dirPath, function(err, file) {
				if (err)  {
					reject(err);
				}
				else {
					mqttPub.MqttPub(pubTopic, msgs);
					resolve({"success":true,  "message":"CSV created and published to topic"});
				}
			});
		}
	});
};

exports.modifyJsonNotification= function(msg) { 
	return new Promise (function(resolve, reject){ 
		logger.debug("Node neighbour JSON data: " + JSON.stringify(msg));
		if(!msg.cId || !msg.gWId){
			reject(false);
		}else{
			var pubTopic = 'assetTracker/'+msg.cId+'/'+msg.gWId+'/provision/request';
			var msgs = JSON.stringify(msg.json);
			mqttPub.MqttPub(pubTopic, msgs);
			resolve({"success":true,  "message":"JSON updated and published to topic"});
		}
	});
};