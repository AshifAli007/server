var io;
var connectedClients = {};
var clients = [];
var _ = require('underscore');
var logger = require('./../../config/logger.js');
var socket = null;
var ruleService = require('./ruleService.js');

function ConnectionService(_io,eventEmitter) {
	io = _io;

	this.init = function (socket) {
		socket.emit('connected');
		logger.debug('Client connected');
		socket.on('register', register);
		socket.on('disconnect', handleDisconnection);
	}


	if( io != 0){ // io = 0 if connectionService invoke from aircraftService to empty the imei_users list..
		io.of('/').on('connection', function (socket) {
			logger.info('client connected : ');//logger.info(socket);
			socket = socket;
			socket.on('setUserId',function(req){
				logger.debug('inside setUserId, socket:- ',req);
				var cId = req.cId;
				if (!connectedClients.hasOwnProperty(cId)) {
					connectedClients[cId] = [this];
				}
				else {
					connectedClients[cId].push(this);
				}
				logger.debug("connectedClients, ", connectedClients);
			});

			this.init(socket);
		}.bind(this));
	}
	else{
		logger.warn('io = 0 ,Returning 0');
		return 0;
	}

function register(data) {
	connectedClients [this.userId] = this;
	logger.debug('connectedClients:', this.userId);
}

function handleDisconnection(data) {
	logger.debug('Inside handleDisconnection');
	delete connectedClients [this.userId];
}

	eventEmitter.on('dashboard', function (message) {
		logger.debug('ConnectionService: dashboard ' + JSON.stringify(message));
		var socketIds = _.keys(connectedClients);
		logger.debug(socketIds);
		_.each(socketIds, function (aSocketId) {
			logger.debug("Asocket: ", aSocketId);
			if(message.companyId == aSocketId){
				logger.debug("Msg: ", message);
				connectedClients[aSocketId].forEach(function(id) {
					var socket = id;
					socket.emit('dashboard', message);
				});
			}
		});
		//socket?socket.emit('dashboard', message):logger.debug('Socket uninitialised');
	});

	eventEmitter.on('notification', function (message) {
		logger.debug('ConnectionService: notification ' + JSON.stringify(message));
		var socketIds = _.keys(connectedClients);
		logger.debug(socketIds);
		_.each(socketIds, function (aSocketId) {
			if(message.companyId == aSocketId){
				logger.debug("Msg: ", message);
				connectedClients[aSocketId].forEach(function(id) {
					var socket = id;
					socket.emit('notification', message);
				});
			}
		});
		//socket?socket.emit('notification', message):logger.debug('Socket uninitialised');
	});

	eventEmitter.on('health', function (message) {
		logger.debug('ConnectionService: health ' + JSON.stringify(message));
		var socketIds = _.keys(connectedClients);
		logger.debug(socketIds);
		_.each(socketIds, function (aSocketId) {
			if(message.companyId == aSocketId){
				logger.debug("Msg: ", message);
				connectedClients[aSocketId].forEach(function(id) {
					var socket = id;
					socket.emit('health', message);
				});
			}
		});
		//socket?socket.emit('notification', message):logger.debug('Socket uninitialised');
	});

	eventEmitter.on('battery', function (message) {
		logger.debug('ConnectionService: battery ' + JSON.stringify(message));
		var socketIds = _.keys(connectedClients);
		logger.debug(socketIds);
		_.each(socketIds, function (aSocketId) {
			if(message.companyId == aSocketId){
				connectedClients[aSocketId].forEach(function(id) {
					var socket = id;
					socket.emit('battery', message);
				});
			}
		});
		//socket?socket.emit('notification', message):logger.debug('Socket uninitialised');
	});

	eventEmitter.on('controlroom', function (message) {
		logger.debug('ConnectionService: controlroom ' + JSON.stringify(message));
		var socketIds = _.keys(connectedClients);
		logger.debug(socketIds);
		_.each(socketIds, function (aSocketId) {
			if(message.companyId == aSocketId){
				logger.debug("Msg: ", message);
				connectedClients[aSocketId].forEach(function(id) {
					var socket = id;
					socket.emit('controlroom', message);
				});
			}
		});
		//socket?socket.emit('notification', message):logger.debug('Socket uninitialised');
	});

	eventEmitter.on('provisioning', function (message) {
		logger.debug('ConnectionService: provisioning ' + JSON.stringify(message));
		var socketIds = _.keys(connectedClients);
		logger.debug(socketIds);
		_.each(socketIds, function (aSocketId) {
			if(message.companyId == aSocketId){
				logger.debug("Msg: ", message);
				connectedClients[aSocketId].forEach(function(id) {
					var socket = id;
					socket.emit('provisioning', message);
				});
			}
		});
	});
}

module.exports = ConnectionService;
