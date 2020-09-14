var logger = require('../../config/logger.js');
var {url} = require('../../config/config');
var _= require('underscore');
var fs = require('fs');

const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://0.0.0.0');

exports.MqttPub = function (topic, message) {
		logger.debug("Topic: " + typeof(topic) + " Msg: " + message);
		 client.publish(topic, message);
}


