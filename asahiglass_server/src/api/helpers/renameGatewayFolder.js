var fs = require('fs');
const logger = require('../../config/logger');


exports.renameGatewayFolder= function(companyId, oldSerial, newSerial) { 
	return new Promise (function(resolve, reject){
		var dirPath = `./uploads/${companyId}/gateway/${oldSerial}`;
		var newDirPath = `./uploads/${companyId}/gateway/${newSerial}`;
		if (fs.existsSync(dirPath)){
			logger.debug('Directory for device serial exists:' +oldSerial);
			fs.rename(dirPath, newDirPath, function(err) {
			    if (err) {
			    	reject(err);
			    }
			    else {
			    	resolve('Folder name renamed');
			    }
			});
		}
		else {
			reject('Directory for device serial does not exist:' +oldSerial);
		}
	});
};