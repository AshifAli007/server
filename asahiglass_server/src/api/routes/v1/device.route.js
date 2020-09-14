const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/device.controller');
const checkToken = require('../../middlewares/secureRoutes');
const checkCompany = require('../../middlewares/checkCompany');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  createDevice
} = require('../../validations/device.validation');

const router = express.Router();

/**
 * Load device when API with deviceId route parameter is hit
 */
router.param('deviceId', controller.load);

router.use(checkToken);
router.use(checkCompany);
router
  .route('/')
  /**
   * @api {get} v1/device List Device
   * @apiDescription Get a list of devices
   * @apiVersion 1.0.0
   * @apiName ListDevices
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} data Devices List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.deviceList)

  /**
   * @api {post} v1/device Create Device
   * @apiDescription Create a new Device
   * @apiVersion 1.0.0
   * @apiName CreateDevice
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   *
   * @apiParam  {Integer}             deviceType    We have five type of devices 1 is Beacon, 2 is Revicer, 3 Gateway, 4 is Test device & 5 is Nbiot devices
   * @apiParam  {String{..50}}        name          Device Name
   * @apiParam  {String{..50}}        serial        Device serial no.
   * @apiParam  {Boolean}             isBuzz        isBuzz will have either 0 or 1.
   * 
   * @apiSuccess (Created 201) {Boolean} success    true
   * @apiSuccess (Created 201) {String}  message    response message
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(validate(createDevice), controller.create);

router
  .route('/getDevices')
  /**
   * @api {get} v1/device/getDevices Get a list of devices
   * @apiDescription Get a list of devices
   * @apiVersion 1.0.0
   * @apiName List Devices
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} Devices List .
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.getDevices);


  router
  .route('/beacon')
  /**
   * @api {get} v1/device/beacon Beacon device
   * @apiDescription Get beacon device list
   * @apiVersion 1.0.0
   * @apiName GetBeaconDevices
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   *
   * @apiSuccess {Array[]} data Beacon Devices List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(controller.getBeacons)

  router
  .route('/mapAssetAndDevice')
  /**
   * @api {get} v1/device/mapAssetAndDevice Get Mapped asset and device
   * @apiDescription Get Mapped Asset & Device Data
   * @apiVersion 1.0.0
   * @apiName GetMapAssetDeviceData
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   *
   * @apiSuccess {Array[]} data Mapped Asset Device Data
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(controller.getmapAssetDevice)


router
  .route('/reciver')
  /**
   * @api {get} v1/device/revicer Reciver device
   * @apiDescription Get reciver device list
   * @apiVersion 1.0.0
   * @apiName GetRevicerDevices
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   *
   * @apiSuccess {Array[]} data Reciver Devices List 
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(controller.getRecivers)

router
  .route('/testbeacons')
  /**
   * @api {get} v1/device/testbeacons Test Beacon Device List
   * @apiDescription Get Test Beacon device list
   * @apiVersion 1.0.0
   * @apiName GetTestBeaconDevices
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id
   *
   * @apiSuccess {Array[]} data Reciver Devices List 
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(controller.testBeaconList)


  router
  .route('/provisioneddevice')
  /**
   * @api {get} v1/device/provisioneddevice Provisning device
   * @apiDescription Get Provisning device list
   * @apiVersion 1.0.0
   * @apiName GetProvisningDevices
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   *
   * @apiSuccess {Array[]} data Provisning Devices List 
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(controller.getProvisioning)


  router
  .route('/zonegateway')
  /**
   * @api {get} v1/device/gateway Zone Gateway device
   * @apiDescription Get gateway device list
   * @apiVersion 1.0.0
   * @apiName GetGatewayDevices
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   *
   * @apiSuccess {Array[]} data Gateway Devices List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(controller.getGateways)

  router
  .route('/RfidCards')
  /**
   * @api {get} v1/device/RfidCards RFID Cards
   * @apiDescription Get RFID Cards list
   * @apiVersion 1.0.0
   * @apiName GetRFIDDevice
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiHeader {Integer} companyId    Company Id

   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.getRfidCards)

router
  .route('/provisioningdevice')
  /**
   * @api {get} v1/device/RfidCards Get Provisioning Device Gateway
   * @apiDescription Get Provisioning Device list
   * @apiVersion 1.0.0
   * @apiName GetProvisioningDevice
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiHeader {Integer} companyId    Company Id

   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.getProvisioningDevice)

router
  .route('/getBusGateway')
  /**
   * @api {get} v1/device/getBusGateway Get Bus Device Gateway
   * @apiDescription Get Bus Device Gateway list
   * @apiVersion 1.0.0
   * @apiName Get Bus Device Gateway
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiHeader {Integer} companyId    Company Id

   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.getBusGateway);

router
  .route('/getFoodCartGateway')
  /**
   * @api {get} v1/device/getFoodCartGateway Get Food Cart Device Gateway
   * @apiDescription Get Food Cart Device Gateway list
   * @apiVersion 1.0.0
   * @apiName Get Food Cart Device Gateway
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiHeader {Integer} companyId    Company Id

   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.getFoodCartGateway);

router
  .route('/devicehealth')
  /**
   * @api {get} v1/device/devicehealth Get device health
   * @apiDescription Get device health
   * @apiVersion 1.0.0
   * @apiName Get device health
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id

   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.deviceHealth);

router
  .route('/beacon/batterystatus')
  /**
   * @api {get} v1/device/beacon/batterystatus Beacon device battery status
   * @apiDescription Get beacon device list with battery status
   * @apiVersion 1.0.0
   * @apiName Get Beacon Device battery status
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    companyId Id
   *
   * @apiSuccess {Array[]} data Beacon Devices List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(controller.beaconBatteryStatus)




  router
  .route('/:deviceId')
  /**
   * @api {get} v1/device/:deviceId Get Device detail By ID
   * @apiDescription Get device information
   * @apiVersion 1.0.0
   * @apiName GetDevice
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * 
   * @apiParam  {Integer} deviceId       deviceId
   *
   * 

   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.getDevice) 


	/**
   * @api {put} v1/device/:deviceId Update Device 
   * @apiDescription Update Device Information
   * @apiVersion 1.0.0
   * @apiName UpdateDevice
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * 
   * @apiParam  {Integer} deviceId     deviceId
   *
   * 

   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(validate(createDevice),controller.updateDevice) 


  router
	.route('/uploadCsv')
	/**
	 * @api {post} v1/device/uploadCsv Bulk insert data by uploading csv
	 * @apiDescription Insert device data by uploading csv
	 * @apiVersion 1.0.0
	 * @apiName Insert device data by uploading csv file
	 * @apiGroup Device
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {String} Content-Type  multipart/form-data

	 * @apiParam  {csv}        file          set key as file
	 *
	 * @apiSuccess (Created 201) {Boolean}  success         true
	 * @apiSuccess (Created 201) {String}  message       responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.post(controller.uploadCsv);

  router
  .route('/:deviceId/mapAssetAndDevice')
  /**
   * @api {post} v1/:deviceId/mapAssetAndDevice Map asset with device
   * @apiDescription Map asset with device
   * @apiVersion 1.0.0
   * @apiName Map asset and device
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * 
   * @apiParam  {Integer} deviceId       deviceId from device_detail table
   * @apiParam  {Integer} assetId        assetId from asset_detail table
   *
   * @apiSuccess (Created 201) {Boolean}  success         true
   * @apiSuccess (Created 201) {Boolean}  message         response message

   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found)   NotFound     Device or Asset does not exist
   */
  .post(controller.mapAssetAndDevice) 


router
  .route('/:deviceId/nodeneighbourdetail')
  /**
   * @api {get} v1/:deviceId/nodeneighbourdetail Node neighbour detail of gateway
   * @apiDescription Node neighbour detail of gateway
   * @apiVersion 1.0.0
   * @apiName Gateway node neighbour detail
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id
   * 
   * @apiParam  {Integer} deviceId       deviceId from device_detail table
   *
   * @apiSuccess {Array[]} gateway node neighbour detail list.
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found)   NotFound     Device or Asset does not exist
   */
  .get(controller.nodeNeighbourDetail);

router
  .route('/:deviceId/rssi')
  /**
   * @api {put} v1/device/:deviceId Update rssi for a node
   * @apiDescription Update rssi data for node
   * @apiVersion 1.0.0
   * @apiName Update rssi for a node
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id
   
   * @apiParam  {String{..50}}    deviceId   Id of the device(node)

   * @apiSuccess {Boolean}  success       true
   * @apiSuccess {String}   message       responce message

   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   **/
  .put(controller.updateNodeRssi); 

router
  .route('/mapAssetAndDeviceByCsv')
  /**
   * @api {post} v1/device/mapAssetAndDeviceByCsv Bulk mapping of asset and device by uploading csv
   * @apiDescription Map device and asset data by uploading csv
   * @apiVersion 1.0.0
   * @apiName Map device and asset data by uploading csv file
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {String} companyId     company Id
   * @apiHeader {String} Content-Type  multipart/form-data

   * @apiParam  {csv}        file          set key as file
   *
   * @apiSuccess (Created 201) {Boolean}  success         true
   * @apiSuccess (Created 201) {String}  message       responce message

   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(controller.mapAssetAndDeviceByCsv);

router
  .route('/createAndMapDevice')
  /**
   * @api {post} v1/device/createAndMapDevice Create new Device and Map with Asset 
   * @apiDescription Create new Device and Map with Asset
   * @apiVersion 1.0.0
   * @apiName Create new Device and Map with Asset
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {String} companyId     company Id

   * @apiParam  {string}  serial        device serial
   * @apiParam  {Integer} deviceType    device Type
   * @apiParam  {Integer} assetId       Asset Id
   *
   * @apiSuccess (Created 201) {Boolean}  success         true
   * @apiSuccess (Created 201) {String}   message       responce message

   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(controller.createAndMapDevice);

router
  .route('/provision')
  /**
   * @api {post} v1/device/provision Bulk provisioning of zone gateway and receiver/node 
   * @apiDescription Bulk Provisioning
   * @apiVersion 1.0.0
   * @apiName Bulk Provisioning
   * @apiGroup Device
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {String} companyId     company Id
   * @apiHeader {String} Content-Type  multipart/form-data

   * @apiParam  {csv}        file          set key as file
   *
   * @apiSuccess (Created 201) {Boolean}  success      true
   * @apiSuccess (Created 201) {String}   message       responce message
   *
   * @apiSuccess (Created 201) {Boolean}  success       true
   * @apiSuccess (Created 201) {String}   message       responce message

   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(controller.provision);

  
module.exports = router;
