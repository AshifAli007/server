const logger = require('../../config/logger');
exports.checkSoftwareFilename= function(query) { 
	return new Promise (function(resolve, reject){
        let fileName = query.name;
        let type = query.type;
        logger.debug("Query in check file name format: ", fileName);
        var breakFileName = fileName.split("_");
        logger.debug("Break File name: ", breakFileName)
        if(breakFileName[0] == "wi" && breakFileName[1] == "node" || breakFileName[1] == "nodeGateway" || breakFileName[1] == "gateway"){
            var version = breakFileName[2];
            var versionNo = version.slice(0, 5);
            logger.debug("version split: ", versionNo)
            if(type == 1 && breakFileName[1] == "node"){
                resolve(versionNo);
            }else if(type == 2 && breakFileName[1] == "nodeGateway"){
                resolve(versionNo);
            }else if(type == 3 && breakFileName[1] == "gateway"){
                resolve(versionNo);
            }else{
                reject(1);
            }
            
        }else{
            reject(0);
        }
	});
};

