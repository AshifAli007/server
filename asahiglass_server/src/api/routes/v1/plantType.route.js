const express = require('express');
const controller = require('../../controllers/plantType.controller');
const checkToken = require('../../middlewares/secureRoutes');
const checkCompany = require('../../middlewares/checkCompany');

const router = express.Router();

/**
 * Load device when API with deviceId route parameter is hit
 */
router.param('plantTypeId', controller.load);

router.use(checkToken);
router.use(checkCompany);

router
	.route('/')

	/**
	 * @api {post} v1/planttype Get kpi List
	 * @apiDescription Get plant type list
	 * @apiVersion 1.0.0
	 * @apiName list plant type
	 * @apiGroup kpi
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {Integer} companyId    Company Id
	 
	 * @apiSuccess (Created 201) {Boolean}  success         true

	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.get(controller.plantTypeList);

module.exports = router;



