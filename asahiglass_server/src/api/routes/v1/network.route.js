const express = require('express');
const controller = require('../../controllers/network.controller');
const checkToken = require('../../middlewares/secureRoutes');

const router = express.Router();

/**
 * Load network when API with companyId route parameter is hit
 */
router.param('networkId', controller.load);

router.use(checkToken);

router
	.route('/')

	/**
	 * @api {get} v1/networks List Network
	 * @apiDescription Get a list of Network
	 * @apiVersion 1.0.0
	 * @apiName List Of networks
	 * @apiGroup Network
	 * @apiPermission admin
	 *
	 * @apiHeader {String} Authorization   User's access token
	 *

	* @apiSuccess {Array[]} data Network List
	*
	* @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
	* @apiError (Forbidden 403)     Forbidden     Only admins can access the data
	*/
	.get(controller.networkList)

	/**
	 * @api {post} v1/networks Create network
	 * @apiDescription Create network 
	 * @apiVersion 1.0.0
	 * @apiName Network create
	 * @apiGroup Network
	 * @apiPermission admin
	 *
	 * @apiHeader {String}  token         User's access token
	 * @apiHeader {String}  companyId     Company Id
	 * @apiHeader {String}  userId        User Id

	 * @apiParam  {String{..50}}    networkName  name of the network     
	 *
	 *
	 * @apiSuccess (Created 201) {Boolean}  success         true
	 * @apiSuccess (Created 201) {String}  message       responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.post(controller.create);

router
	.route('/:networkId')

	/**
	 * @api {put} v1/networks/:networkId Get Network Data
	 * @apiDescription Get network detail
	 * @apiVersion 1.0.0
	 * @apiName Get network detail
	 * @apiGroup Network
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
	 **/
	.get(controller.getNetwork)


	/**
	 * @api {put} v1/networks/:networkId Update Network Data
	 * @apiDescription Update network detail
	 * @apiVersion 1.0.0
	 * @apiName update network detail
	 * @apiGroup Network
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
	 **/
	.put(controller.updateNetwork)

	/**
	 * @api {delete} v1/networks/:networkId Delete Network Data
	 * @apiDescription Delete network detail
	 * @apiVersion 1.0.0
	 * @apiName Delete network detail
	 * @apiGroup Network
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
	 **/
	.delete(controller.deleteNetwork)

router
	.route('/:networkId/zones')
	/**
	 * @api {put} v1/networks/:networkId/zones List zones detail associated with networkId
	 * @apiDescription List zone detail
	 * @apiVersion 1.0.0
	 * @apiName List zone detail
	 * @apiGroup Network
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {Integer} companyId    Company Id
	 *
	 * @apiParam  {String{..50}}    networkId  Id of the network

	 * @apiSuccess {Boolean}  success       true
	 * @apiSuccess {String}   message       responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 **/
	.get(controller.zoneList);

router
	.route('/:networkId/provisioners/:provisionerUuid')
	/**
	 * @api {put} v1/networks/:networkId/provisioners/:provisionerUuid Update provisionerUuid on the basis of networkId
	 * @apiDescription Update provisionerUuid
	 * @apiVersion 1.0.0
	 * @apiName Update network provisionerUuid
	 * @apiGroup Network
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {Integer} companyId    Company Id
	 *
	 * @apiParam  {String{..50}}    networkId  Id of the network
	 * @apiParam  {String{..50}}    provisionerUuid  Id of the network

	 * @apiSuccess {Boolean}  success       true
	 * @apiSuccess {String}   message       responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 **/
	.put(controller.updateProvisionerUuid);
	


module.exports = router;


