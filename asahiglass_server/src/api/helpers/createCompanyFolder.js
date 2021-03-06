var filessystem = require('fs');
const logger = require('../../config/logger');
exports.createCompanyFolder= function(companyId) { 
	return new Promise (function(resolve, reject){
		logger.debug("Company Id: " + companyId);
		var dir = './uploads/'+companyId;
		if (!filessystem.existsSync(dir)){
			filessystem.mkdirSync(dir);
			resolve("created");
		}
		else{
			console.log("Directory already exist");
			reject("Already their");
		}
	});
};