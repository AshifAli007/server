const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/ota.controller');
const checkToken = require('../../middlewares/secureRoutes');
const checkCompany = require('../../middlewares/checkCompany');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');


const router = express.Router();

/**
 * Load device when API with deviceId route parameter is hit
 */
 router.param('otaId', controller.load);

router.use(checkToken);
//router.use(checkCompany);

router
	.route('/')
  /**
   * @api {get} v1/ota List OTA
   * @apiDescription Get a list of OTA Files
   * @apiVersion 1.0.0
   * @apiName ListOTA
   * @apiGroup OTA
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} data OTA Files List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.otaList)


  /**
   * @api {post} v1/ota Add OTA File  
   * @apiDescription Add Ota file in system and its data in db
   * @apiVersion 1.0.0
   * @apiName AddOTA
   * @apiGroup OTA
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiHeader {String} Content-Type  multipart/form-data
   *

   * @apiParam  {bin}                 file          set key as file
   * @apiParam  {String{..50}}        fileName      File Name
   * @apiParam  {Integer}             File Type     File type
   * @apiParam  {String}              File Description     File Description

   * @apiSuccess (Created 201) {Boolean}  success       true
   * @apiSuccess (Created 201) {String}   message       responce message

   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(controller.create);

  router
  .route('/currentversion')
    /**
   * @api {get} v1/ota/currentversion List Of Devices with current & new version 
   * @apiDescription Get Device list with version
   * @apiVersion 1.0.0
   * @apiName DeviceListWithVersion
   * @apiGroup OTA
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} data Device List Files List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.getDeviceList)

  router
  .route('/node')
    /**
   * @api {get} v1/ota/node List OTA Node
   * @apiDescription Get a list of OTA node
   * @apiVersion 1.0.0
   * @apiName ListNodeOTA
   * @apiGroup OTA
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} data OTA Files List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.nodeOtaList)

  router
  .route('/nodegateway')
    /**
   * @api {get} v1/ota/nodegateway List OTA nodegateway
   * @apiDescription Get a list of OTA node gateway
   * @apiVersion 1.0.0
   * @apiName ListNodegatewayOTA
   * @apiGroup OTA
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} data OTA Files List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.nodegatewayOtaList)

  router
  .route('/gateway')
    /**
   * @api {get} v1/ota/gateway List OTA gateway
   * @apiDescription Get a list of OTA gateway
   * @apiVersion 1.0.0
   * @apiName ListGatewayOTA
   * @apiGroup OTA
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} data OTA Files List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.gatewayOtaList)

  router
  .route('/download')
      /**
   * @api {POST} v1/ota/download Send OTA to gateway
   * @apiDescription Sending file to gateway
   * @apiVersion 1.0.0
   * @apiName OTADownload
   * @apiGroup OTA
   * @apiPermission admin
   *
   * @apiParam  {Integer}             company       Conpany Id
   * @apiParam  {Array[]}             gateways      List Of gateway for update
   * @apiParam  {Integer}             software      Software Id
   * @apiParam  {Integer}              type         Software Type

   * @apiSuccess (Created 201) {Boolean}  success       true
   * @apiSuccess (Created 201) {String}   message       responce message

   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(controller.otaDownload)

module.exports = router;
