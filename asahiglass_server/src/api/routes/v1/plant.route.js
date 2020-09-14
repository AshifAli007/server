const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/plant.controller');
const checkToken = require('../../middlewares/secureRoutes');
const checkCompany = require('../../middlewares/checkCompany');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
	createPlant
} = require('../../validations/plant.validation');


const router = express.Router();

/**
 * Load device when API with plantId route parameter is hit
 */
router.param('plantId', controller.load);

router.use(checkToken);
router.use(checkCompany);

router
	.route('/')

	/**
	 * @api {get} v1/plants Get Plant list of a company
	 * @apiDescription Get Plant list
	 * @apiVersion 1.0.0
	 * @apiName listPlant
	 * @apiGroup Plant
	 * @apiPermission admin
	 *
	 * @apiHeader {String} accessToken   User's access token
	 * @apiHeader {Integer} companyId    Company Id
	 
	 * @apiSuccess (Created 201) {Boolean}  success         true
	 * @apiSuccess (Created 201) {String}  message       responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.get(controller.plantList)



	/**
   * @api {post} v1/plants Insert Plant Data
   * @apiDescription Insert new Plant Data
   * @apiVersion 1.0.0
   * @apiName CreatePlant
   * @apiGroup Plant
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id
   *
   * @apiParam  {String{..50}}         name       Plant name
   * @apiParam  {Float{..50}}          lat        Plant latitude
   * @apiParam  {Float{..50}}          long       Plant longitude
   * @apiParam  {String{..100}}        address    Plant Address


   * 
   * @apiSuccess (Created 201) {Boolean} success    true
   * @apiSuccess (Created 201) {String}  message    response message
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
	.post(validate(createPlant), controller.create);

	router
	.route('/details')
	/**
	 * @api {get} v1/plants/details Get plant detail
	 * @apiDescription Get plant detail
	 * @apiVersion 1.0.0
	 * @apiName view plant detail
	 * @apiGroup Floor
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
	.get(controller.getPlantDetail);

router
	.route('/:plantId')
	/**
	 * @api {get} v1/plants/:plantId Get plant detail
	 * @apiDescription Get plant detail
	 * @apiVersion 1.0.0
	 * @apiName view plant detail
	 * @apiGroup Floor
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
	.get(controller.getPlant)

   /**
   * @api {put} v1/plants/:plantId Update Plant Data 
   * @apiDescription Update Plant Information
   * @apiVersion 1.0.0
   * @apiName UpdatePlant
   * @apiGroup Plant
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id
   * 
   * @apiParam  {Integer} plantId      plantId

   * @apiParam  {String{..50}}         name       Plant name
   * @apiParam  {Float{..50}}          lat        Plant latitude
   * @apiParam  {Float{..50}}          long       Plant longitude
   * @apiParam  {String{..100}}        address    Plant Address

   * @apiSuccess (Created 201) {Boolean}  success         true
   * @apiSuccess (Created 201) {String}  message       responce message

   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(validate(createPlant),controller.updatePlant);

router
	.route('/:plantId/floors')
	/**
	 * @api {get} v1/plants/:plantId/floors Get plant detail with their floors
	 * @apiDescription Get plant detail with their floors
	 * @apiVersion 1.0.0
	 * @apiName View plant with their floors
	 * @apiGroup Plant
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
	.get(controller.getPlantFloors);


module.exports = router;
