// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const mysql = require('./config/mysql-function');
const mqtt = require('mqtt');
const mosca = require('mosca');
const client  = mqtt.connect('mqtt://0.0.0.0');
const mqttServer = require('./api/protocolGateway/mqttProtocol');
//var io = require('socket.io');
const http = require("http");
const https = require('https');
const fs = require('fs');

//Http Server
//var httpServer = require('http').createServer(app).listen(3000);

var {table} = require('./config/config');
connectionService = require('./api/services/connectionService.js');
  var  events = require('events'),
    eventEmitter = new events.EventEmitter();

var checkDefaultTables = require('./api/helpers/checkDefaultTables');
var croneJob = require('./api/helpers/croneJob');

var options = {
  key: fs.readFileSync(__dirname + "/config/ssl/https/ca_key.pem"),
  cert: fs.readFileSync(__dirname + "/config/ssl/https/ca_cert.pem")
};

//Mqtt Certificate
var mqttKey = fs.readFileSync(__dirname + "/config/ssl/mqtt/ca_key.pem");
var mqttCert = fs.readFileSync(__dirname + "/config/ssl/mqtt/ca_cert.pem");

//Mqtt TLS Setup
var Mqttsettings = {
  notSecure:{
    port: 1883,
    logger: {
      name: "secureExample",
      level: 40
    }
  },
  secure : {
    port: 8883,
    rejectUnauthorized: false,
    keyPath: mqttKey,
    certPath: mqttCert
  }
};

  //Https Server
  var httpsServer = https.createServer(options, app).listen(3000);

  //Mqtt Secure Server
  var mqttServersecure = new mosca.Server(Mqttsettings.secure);  

  //Mqtt not secure server
  var mqttServerNotsecure = new mosca.Server(Mqttsettings.notSecure)
  mqttServersecure.on('ready', function(){
    console.log("Mosca broker running on port 8883..")
  });

  mqttServerNotsecure.on('ready', function(){
    console.log("Mosca broker running on port 1883..")
  });

// open mysql connection
mysql.connectionCheck.then((data) =>{
    logger.info("Mysql connection success: " + data);
    checkDefaultTables.defaultTableList(table);
 }).catch((err) => {
     logger.info("Mysql connection: "  + err);
 });

// open mongoose connection
/*mongoose.connect();*/
 mongoose.makeConnection(function(resp){
    let mongoose = resp;

    var mqttProtocol = require('./api/protocolGateway/mqttProtocol').mongo(mongoose);

 });

//Cron Job To check node health
croneJob.deviceHealthScheduler();


//Cron Job To reset beacon battery
croneJob.resetBeaconBatteryScheduler();



// run mqtt client
mqttServer.init(client, eventEmitter);
// listen to requests
//app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

//const app = require('express')();
//const server = require('http').createServer(app);
const io = require('socket.io')(httpsServer);
//io.on('connection', () => { /* … */ });
//http.listen(3000);

/*io.sockets.on('connection', client => {
  client.on('event', data => { *//* … *//* });
  client.on('disconnect', () => { *//* … *//* });
});*/
new connectionService(io,eventEmitter);
/**
* Exports express
* @public
*/
module.exports = app;
