const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/zone.controller');
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
 router.param('zoneId', controller.load);

router.use(checkToken);
router.use(checkCompany);

router
  .route('/')
  /**
   * @api {get} v1/zone List Zone
   * @apiDescription Get a list of zones
   * @apiVersion 1.0.0
   * @apiName ListZones
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} users List of zones.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.zoneList)

  /**
   * @api {post} v1/zone Create Zone 
   * @apiDescription Create a new Zone with zone image upload
   * @apiVersion 1.0.0
   * @apiName CreateZone
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiHeader {String} Content-Type  multipart/form-data
   *

   * @apiParam  {jpg/jpeg/png}        file          set key as file
   * @apiParam  {String{..50}}        name          Zone Name
   * @apiParam  {Integer}             maxUsers      No of maximum users in a zone


   * @apiSuccess (Created 201) {Boolean}  success       true
   * @apiSuccess (Created 201) {String}   message       responce message

   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(validate(createZone), controller.create);

router
  .route('/assign/user')
  /**
   * @api {get} v1/zone Zone and Asset mapping list
   * @apiDescription Get list of zone and asset mapping
   * @apiVersion 1.0.0
   * @apiName Zone and asset mapping
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} data zone and asset mapping List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.zoneusermappinglist)


  router
  .route('/zonedetails')
  /**
   * @api {get} v1/zone/zonedetails Zone name and its user stats
   * @apiDescription Get list of zone and its user stats
   * @apiVersion 1.0.0
   * @apiName Zone and user stats
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} data  Zone name and its user stats
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.zoneDetail)


router
  .route('/zonetype')
    /**
   * @api {get} v1/zone/zonetype Zone type information
   * @apiDescription Get zone type info
   * @apiVersion 1.0.0
   * @apiName Get Zone type info
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   * @apiHeader {Integer} companyId       company Id
   *
   * @apiSuccess {Array[]}      data            List of node info in a zone.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.zoneType);

router
  .route('/:zoneId')
  /**
   * @api {get} v1/zone/:zoneId Get Zone information
   * @apiDescription Get zone information
   * @apiVersion 1.0.0
   * @apiName GetZone information
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * 
   * @apiParam  {Integer} zoneId       Zone's Id
   *
   * 

   * @apiSuccess {Array[]} data  Zone information

   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.getZone) 

  /**
   * @api {put} v1/zone/:zoneId Update Zone Information
   * @apiDescription Update Zone Information
   * @apiVersion 1.0.0
   * @apiName UpdateZone
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id


   * @apiParam  {jpg/jpeg/png}        file          set key as file
   * @apiParam  {String{..50}}        name          Zone Name

   * @apiSuccess (Updated 201) {Boolean}  success       true
   * @apiSuccess (Created 201) {String}   message       responce message
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(controller.updateZone);
 


  router
  .route('/:zoneId/assign/user')
  /**
   * @api {get} v1/zoneId/assign/user List of assign asset per zone
   * @apiDescription Get a list of assign asset per zone
   * @apiVersion 1.0.0
   * @apiName GetAssignUsers
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Integer}        zoneId          id of the zone
   * @apiSuccess {Array[]} data  List of assets in zone
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.ListassignUser)


  /**
   * @api {post} v1/zoneId/assign/user Assign asset to zone
   * @apiDescription Assign asset to zone
   * @apiVersion 1.0.0
   * @apiName AssignUserToZone
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiParam  {Integer}        userId          userId
   *
   * @apiSuccess {Array[]} Gateway Devices List .
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .post( controller.assignUser)


  router
  .route('/release/user/:id')
  /**
   * @api {get} v1/release/user/id Remove mapping between Asset & zone 
   * @apiDescription Delete mapping between Asset & zone 
   * @apiVersion 1.0.0
   * @apiName RemoveAssetZoneMapping
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Integer}        zoneId          id of the zone
   * @apiSuccess {} data  Success or uSuccess msg
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .delete(controller.removeMapping)

  router
  .route('/:zoneId/reciver/count')
    /**
   * @api {get} v1/zoneId/reciver/count Get the count of edge and non edge node
   * @apiDescription Get the count of edge and non edge 
   * @apiVersion 1.0.0
   * @apiName Get reciver count
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Integer}        zoneId          id of the zone
   * @apiSuccess {Array[]} data  List of edge and non edge node
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.getReciver)

  router
  .route('/:zoneId/listEnteredAssets')
    /**
   * @api {get} v1/zone/:zoneId/listEnteredAssets Entered assets detail in a zone
   * @apiDescription Get the entered assets detail in particular zone 
   * @apiVersion 1.0.0
   * @apiName Get entered Asset in a zone
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Integer}        zoneId          id of the zone
   * @apiSuccess {Array[]} items  List of assets in zone.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.listEnteredAssets)

router
  .route('/:zoneId/zonenodeinfo')
    /**
   * @api {get} v1/zone/:zoneId/zonenodeinfo Zone node info
   * @apiDescription Get list of zone node info 
   * @apiVersion 1.0.0
   * @apiName Get Zone node info
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Integer}        zoneId          id of the zone
   * @apiSuccess {Array[]}      data            List of node info in a zone.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.zoneNodeInfo)

router
  .route('/:zoneId/nodeneighbour')
    /**
   * @api {post} v1/zone/:zoneId/nodeneighbour Add node neighbour
   * @apiDescription Add node neighbour 
   * @apiVersion 1.0.0
   * @apiName Get Zone node info
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Integer}       zoneId            id of the zone
   * @apiParam  {Integer}       centralNodeId     central node id
   * @apiParam  {Array[]}       neighbourNodeId   neighbour node id
   * @apiParam  {Integer}       gatewayId         gateway Id

   * @apiSuccess (Created 201) {Boolean}  success       true
   * @apiSuccess (Created 201) {String}   message       responce message
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(controller.addNodeNeighbour)

router
  .route('/:zoneId/zonetype')
    /**
   * @api {post} v1/zone/:zoneId/zonetype Update zone type
   * @apiDescription Update zone type 
   * @apiVersion 1.0.0
   * @apiName Get Update zone type
   * @apiGroup Zone
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Integer}       zoneId            id of the zone
   * @apiParam  {Integer}       zoneType          zone type

   * @apiSuccess (Created 201) {Boolean}  success       true
   * @apiSuccess (Created 201) {String}   message       responce message
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .put(controller.updateZoneType);


module.exports = router;
