var filessystem = require('fs');
const logger = require('../../config/logger');
exports.createGatewayFolder= function(companyId) { 
	return new Promise (function(resolve, reject){
		logger.debug("Company Id: " + companyId);
		var dir = './uploads/'+companyId+'/gateway';
		if (!filessystem.existsSync(dir)){
			filessystem.mkdirSync(dir);
			resolve("created");
		  }else
		  {
			reject("Already their");
		  }
	});
};