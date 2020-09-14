var filessystem = require('fs');
const logger = require('../../config/logger');
var db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
exports.base64ImageConverter= function(imgdata, companyId, type, id) { 
	return new Promise (function(resolve, reject){
		var filename = imgdata.filename;
		var ext = filename.split('.').pop();
		if(type == 'logo') {
			var newFilename = "logo."+ext;
			var path = './uploads/'+companyId+'/logo/'+newFilename;
		}
		else if(type == 'asset_image') {
			var newFilename = id+"."+ext;
			var path = './uploads/'+companyId+'/asset_image/'+newFilename;
		}
		
		filessystem.writeFile(path, imgdata.base64, 'base64', function(err) {
			logger.error(err);
			if(err){
				reject(err);
			}
			else {
				resolve(newFilename);
			}
		});
	});
};