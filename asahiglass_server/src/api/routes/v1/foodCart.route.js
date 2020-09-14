const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/foodCart.controller');
const checkToken = require('../../middlewares/secureRoutes');
const checkCompany = require('../../middlewares/checkCompany');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
	createFoodCart,
	assignDeviceZone
} = require('../../validations/foodCart.validation');

const router = express.Router();

/**
 * Load device when API with deviceId route parameter is hit
 */
router.param('foodCartId', controller.load);

router.use(checkToken);
router.use(checkCompany);

router
	.route('/')

	/**
	 * @api {post} v1/foodCart Get Food Cart list
	 * @apiDescription Get Food Cart list
	 * @apiVersion 1.0.0
	 * @apiName list Food Cart
	 * @apiGroup Food Cart
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {Integer} companyId    Company Id
	 
	  * @apiSuccess {Array[]} data Food Cart List

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.get(controller.foodCartList)

	/**
   * @api {post} v1/foodCart Insert Food Cart Data
   * @apiDescription Insert a new Food Cart Data
   * @apiVersion 1.0.0
   * @apiName Create Food Cart
   * @apiGroup Food Cart
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id
   *
   * @apiParam  {String{..50}}         foodCartNo   Food Cart Number

   * 
   * @apiSuccess (Created 201) {Boolean} success    true
   * @apiSuccess (Created 201) {String}  message    response message
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
	.post(validate(createFoodCart), controller.create);


router
	.route('/:foodCartId')
	/**
	 * @api {get} v1/bus/:foodCartId Get Food Cart detail
	 * @apiDescription Get Food Cart detail
	 * @apiVersion 1.0.0
	 * @apiName view Food Cart detail
	 * @apiGroup Food Cart
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
	.get(controller.getfoodCart)

   /**
   * @api {put} v1/foodCart/:foodCartId Update Food Cart Data 
   * @apiDescription Update Food Cart Information
   * @apiVersion 1.0.0
   * @apiName UpdateFoodCart
   * @apiGroup Food Cart
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * 
   * @apiParam  {Integer} foodCartId   Food Cart Id
   *
   * 

   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(validate(createFoodCart),controller.updateFoodCart)

router
	.route('/uploadCsv')
	/**
	 * @api {post} v1/foodCart/uploadCsv Bulk insert data by uploading csv
	 * @apiDescription Insert Food Cart data by uploading csv
	 * @apiVersion 1.0.0
	 * @apiName Insert Food Cart data by uploading csv file
	 * @apiGroup Food Cart
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {Integer} companyId    Company Id
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
