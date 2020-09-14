const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/bus.controller');
const checkToken = require('../../middlewares/secureRoutes');
const checkCompany = require('../../middlewares/checkCompany');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
	createBus,
	assignDeviceZone
} = require('../../validations/bus.validation');

const router = express.Router();

/**
 * Load device when API with deviceId route parameter is hit
 */
router.param('busId', controller.load);

router.use(checkToken);
router.use(checkCompany);

router
	.route('/')

	/**
	 * @api {post} v1/bus Get Bus list
	 * @apiDescription Get Bus list
	 * @apiVersion 1.0.0
	 * @apiName listBus
	 * @apiGroup Bus
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {Integer} companyId    Company Id
	 
	  * @apiSuccess {Array[]} data Bus List

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.get(controller.busList)

	/**
   * @api {post} v1/bus Insert Bus Data
   * @apiDescription Insert a new Bus Data
   * @apiVersion 1.0.0
   * @apiName CreateBus
   * @apiGroup Bus
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id
   *
   * @apiParam  {String{..50}}         busNo       Bus Number

   * 
   * @apiSuccess (Created 201) {Boolean} success    true
   * @apiSuccess (Created 201) {String}  message    response message
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  	.post(validate(createBus), controller.create);


router
	.route('/:busId')
	/**
	 * @api {get} v1/bus/:busId Get Bus detail
	 * @apiDescription Get bus detail
	 * @apiVersion 1.0.0
	 * @apiName view bus detail
	 * @apiGroup Bus
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {Integer} companyId    Company Id
	 *
	 *
	 * @apiSuccess {Boolean}  success       true
	 * @apiSuccess {String}   message       responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.get(controller.getBus)

   /**
   * @api {put} v1/bus/:busId Update Bus Data 
   * @apiDescription Update Bus Information
   * @apiVersion 1.0.0
   * @apiName UpdateBus
   * @apiGroup Bus
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId     Company Id
   * 
   * @apiParam  {Integer} busId        busId
   *
   * 

   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(validate(createBus),controller.updateBus)

router
	.route('/uploadCsv')
	/**
	 * @api {post} v1/bus/uploadCsv Bulk insert data by uploading csv
	 * @apiDescription Insert Bus data by uploading csv
	 * @apiVersion 1.0.0
	 * @apiName Insert Bus data by uploading csv file
	 * @apiGroup Bus
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {Integer} companyId     Company Id
	 * @apiHeader {String} Content-Type  multipart/form-data

	 * @apiParam  {csv}        file          set key as file
	 *
	 * @apiSuccess (Created 201) {Boolean}  success         true
	 * @apiSuccess (Created 201) {String}   message       responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.post(controller.uploadCsv);


module.exports = router;
