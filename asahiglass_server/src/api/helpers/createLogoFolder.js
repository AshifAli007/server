var filessystem = require('fs');
const logger = require('../../config/logger');
exports.createLogoFolder= function(companyId) { 
	return new Promise (function(resolve, reject){
		logger.debug("Company Id: " + companyId);
		var dir = './uploads/'+companyId+'/logo';
		if (!filessystem.existsSync(dir)){
			filessystem.mkdirSync(dir);
			resolve("created");
		  }else
		  {
			  reject("Directory already exist");
		  }
	});
};