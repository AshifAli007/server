const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/company.controller');
const checkToken = require('../../middlewares/secureRoutes');
const {
	createCompany
} = require('../../validations/company.validation');


const router = express.Router();

/**
 * Load device when API with companyId route parameter is hit
 */

router.param('companyId', controller.load);

//router.use(checkToken);
router
	.route('/')
	/**
	 * @api {get} v1/company List company
	 * @apiDescription Get a list of company
	 * @apiVersion 1.0.0
	 * @apiName List Of companys
	 * @apiGroup Company
	 * @apiPermission admin
	 *
	 * @apiHeader {String} Authorization   User's access token
	 *

	* @apiSuccess {Array[]} data Company List
	*
	* @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
	* @apiError (Forbidden 403)     Forbidden     Only admins can access the data
	*/
	.get(controller.CompanyList)

	/**
	 * @api {post} v1/company Create company
	 * @apiDescription Create company 
	 * @apiVersion 1.0.0
	 * @apiName Company create
	 * @apiGroup Company
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 *
	 *
	 * @apiSuccess (Created 201) {Boolean}  success         true
	 * @apiSuccess (Created 201) {String}  message       responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.post(validate(createCompany),controller.create);

router
	.route('/:companyId')
	/**
	 * @api {get} v1/company/:companyId Get area detail
	 * @apiDescription Get company detail
	 * @apiVersion 1.0.0
	 * @apiName view company detail
	 * @apiGroup Company
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {Integer} userId       User Id
	 *
	 *
	 * @apiSuccess {Boolean}  success       true
	 * @apiSuccess {String}   message       responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.get(controller.getCompany);

module.exports = router;


