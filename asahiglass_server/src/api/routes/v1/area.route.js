const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/area.controller');
const checkToken = require('../../middlewares/secureRoutes');
const checkCompany = require('../../middlewares/checkCompany');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
	createZone,
	assignDeviceZone
} = require('../../validations/zone.validation');

const router = express.Router();

/**
 * Load device when API with deviceId route parameter is hit
 */
 router.param('areaId', controller.load);

router.use(checkToken);
router.use(checkCompany);

router
	.route('/')

	/**
	 * @api {post} v1/floor Get floor list
	 * @apiDescription Get floor list
	 * @apiVersion 1.0.0
	 * @apiName listFloor
	 * @apiGroup Floor
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {Integer} userId       User Id
	 
	 * @apiSuccess (Created 201) {Boolean}  success         true
	 * @apiSuccess (Created 201) {String}  message       responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.get(controller.floorList);

router
	.route('/detail')
	/**
	 * @api {get} v1/floor/detail Get user stats floor wise
	 * @apiDescription Get user stats floor wise
	 * @apiVersion 1.0.0
	 * @apiName User stats 
	 * @apiGroup Floor
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 *
	 *
	 * @apiSuccess {Boolean}   success          true
	 * @apiSuccess {data}      data             user stats area wise
	 * @apiSuccess {String}    message          responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.get(controller.userCount);


router
	.route('/uploadImage')
	/**
	 * @api {post} v1/floor/uploadImage Upload floor image
	 * @apiDescription Upload floor image
	 * @apiVersion 1.0.0
	 * @apiName upload floor image
	 * @apiGroup Floor
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {Integer} userId       User Id
	 *
	 * @apiParam  {String{..50}}  name          Floor Name
	 * @apiParam  {Number}        floorNo       Floor Number
	 
	 * @apiSuccess (Created 201) {Boolean}  success         true
	 * @apiSuccess (Created 201) {String}   message       responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.post(controller.uploadAreaImage);


router
	.route('/:areaId')
	/**
	 * @api {get} v1/floor/:floorId Get floor detail
	 * @apiDescription Get floor detail
	 * @apiVersion 1.0.0
	 * @apiName view floor detail
	 * @apiGroup Floor
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
	.get(controller.getArea)


	/**
   * @api {put} v1/floor/:floorId Update Floor
   * @apiDescription Update Floor Information
   * @apiVersion 1.0.0
   * @apiName UpdateFloor
   * @apiGroup Floor
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id


   * @apiParam  {String{..50}}  name          Floor Name
   * @apiParam  {Number}        floorNo       Floor Number

   * @apiSuccess (Updated 201) {Boolean}  success       true
   * @apiSuccess (Created 201) {String}   message       responce message
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(controller.updateFloor);


router
	.route('/:areaId/zones')
	/**
	 * @api {get} v1/floor/:floorId/zones Get floor detail and Zone Details
	 * @apiDescription Get floor detail
	 * @apiVersion 1.0.0
	 * @apiName view floor & Zone detail
	 * @apiGroup Floor
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
	.get(controller.getAreaZone);

router
	.route('/:areaId/zoneheatmap')
	/**
	 * @api {get} v1/floor/:floorId/zoneheatmap Get floor detail and Zone Details
	 * @apiDescription Get floor detail
	 * @apiVersion 1.0.0
	 * @apiName view floor & Zone detail
	 * @apiGroup Floor
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
	.get(controller.getZoneHeatMap);


module.exports = router;
