const logger = require('../../config/logger');
const Company = require('../models/company.model');

module.exports = function checkCompany(req, res, next) {
	
	var companyId = req.headers['companyid'];
	logger.debug("CompanyId: " + companyId); 
	if(companyId) {
		Company.checkId(companyId).then((data)=>{
			return next();
		}).catch((err) => {
			logger.error("err: " + err);
			return next(err);
		});
	} else {
		return res.json({
			"status":500,
			"message":"No CompanyId Provided",
			"error":"CompanyId must be provided in header for endpoint access"
		});
	}
};


  