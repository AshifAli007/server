var filessystem = require('fs');
const logger = require('../../config/logger');

var checkNodeFolder = function(){
    var dir = './software/node';
    if (!filessystem.existsSync(dir)){
        filessystem.mkdirSync(dir);
    }
}

var checkGatewayNodeFolder = function(){
    var dir = './software/nodeGateway';
    if (!filessystem.existsSync(dir)){
        filessystem.mkdirSync(dir);
    }
}

var checkGatewayFolder = function(){
    var dir = './software/gateway';
    if (!filessystem.existsSync(dir)){
        filessystem.mkdirSync(dir);
    }
}

exports.createSoftwareFolder= function(companyId) { 
	return new Promise (function(resolve, reject){
		var dir = './software';
		if (!filessystem.existsSync(dir)){
            filessystem.mkdirSync(dir);
            checkNodeFolder();
            checkGatewayNodeFolder();
            checkGatewayFolder();
			resolve(1)
		  }else
		  {
            checkNodeFolder();
            checkGatewayNodeFolder();
            checkGatewayFolder();
			resolve(0)
		  }
	});
};

