var filessystem = require('fs');
const logger = require('../../config/logger');
exports.createGatewaySerialFolder= function(companyId, serial) { 
	return new Promise (function(resolve, reject){
		logger.debug("Company Id: " + companyId);
		var dir = './uploads/'+companyId+'/gateway/'+serial;
		if (!filessystem.existsSync(dir)){
			filessystem.mkdirSync(dir);
			resolve("Gateway Serial Folder Created");
		  }else
		  {
			reject("Already their");
		  }
	});
};