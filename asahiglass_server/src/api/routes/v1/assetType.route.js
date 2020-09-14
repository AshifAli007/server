const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/assetType.controller');
const checkToken = require('../../middlewares/secureRoutes');
const checkCompany = require('../../middlewares/checkCompany');
const {
  create
} = require('../../validations/assetType.validation');
const {
  createAssetSubType
} = require('../../validations/assetSubType.validation');


const router = express.Router();

/**
 * Load device when API with deviceId route parameter is hit
 */
 router.param('assetTypeId', controller.load);

router.use(checkToken);
router.use(checkCompany);

router
  .route('/')
  /**
   * @api {get} v1/assetType List asset type with asset attributes key
   * @apiDescription List asset type with asset attributes key
   * @apiVersion 1.0.0
   * @apiName List Asset type
   * @apiGroup Asset Type
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {String} companyId     company Id
   
   * @apiSuccess (Created 201) {Boolean}  success         true
   * @apiSuccess (Created 201) {String}   message       responce message

   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .get(controller.listAssetType)

 /**
   * @api {post} v1/assetType Create asset type with asset attributes key
   * @apiDescription Create asset type with asset attributes key
   * @apiVersion 1.0.0
   * @apiName Create Asset type
   * @apiGroup Asset Type
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {String} companyId     company Id
   * @apiParam  {String{..100}}        name               Asset full name
   * @apiParam  {String{..50}}         uniqueId           Asset unique id
   
   *
   * @apiSuccess (Created 201) {Boolean}  success         true
   * @apiSuccess (Created 201) {String}   message       responce message

   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(validate(create),controller.create);

router
  .route('/subType')
  /**
   * @api {get} v1/assetType/subType Get Asset Type detail with subType
   * @apiDescription Get Asset Type information with subType detail
   * @apiVersion 1.0.0
   * @apiName View Asset Type with sub Type
   * @apiGroup Asset Type
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id

   * @apiSuccess {Array[]} data AssetType detail
   *
   * 
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.assetTypeDetail);

router
  .route('/:assetTypeId')
  /**
   * @api {get} v1/assetType/:assetTypeId Get Asset Type detail
   * @apiDescription Get Asset Type information
   * @apiVersion 1.0.0
   * @apiName View Asset Type
   * @apiGroup Asset Type
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id
   * 
   * @apiParam  {Integer} assetTypeId   id of the asset Type

   * @apiSuccess {Array[]} data AssetType detail
   *
   * 
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.getAssetType)

  /**
   * @api {put} v1/assetType/:assetTypeId Update Asset Type
   * @apiDescription Update Asset Type Information
   * @apiVersion 1.0.0
   * @apiName Update Asset Type
   * @apiGroup Asset Type
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id


   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {String} companyId     company Id
   * @apiParam  {String{..100}}        name               Asset full name
   * @apiParam  {String{..50}}         uniqueId           Asset unique id

   * @apiSuccess (Updated 201) {Boolean}  success       true
   * @apiSuccess (Created 201) {String}   message       responce message
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(validate(create), controller.updateAssetType);


router
  .route('/:assetTypeId/subType')
  /**
   * @api {get} v1/assetType/:assetTypeId/subType Get Asset Type detail with subType
   * @apiDescription Get Asset Type information with subType detail
   * @apiVersion 1.0.0
   * @apiName View Asset Type with sub Type
   * @apiGroup Asset Type
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id
   * 
   * @apiParam  {Integer} assetTypeId   id of the asset Type

   * @apiSuccess {Array[]} data AssetType detail
   *
   * 
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.assetSubType)

  /**
   * @api {post} v1/assetType/:assetTypeId/subType Insert Asset Sub Type
   * @apiDescription Insert Asset subType detail
   * @apiVersion 1.0.0
   * @apiName Insert Asset sub Type
   * @apiGroup Asset Type
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id
   * 
   * @apiParam  {Integer} assetTypeId   id of the asset Type
   * @apiParam  {Integer} name          name of the asset Sub Type

   * @apiSuccess {Array[]} data AssetType detail
   *
   * 
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .post(validate(createAssetSubType),controller.createAssetSubType);

router
  .route('/:assetTypeId/subType/:subTypeId')
  /**
   * @api {post} v1/:assetTypeId/subType/:subTypeId Update Asset Sub Type Detail
   * @apiDescription Update Asset Sub Type Detail
   * @apiVersion 1.0.0
   * @apiName Update Asset Sub Type
   * @apiGroup Asset Type
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} companyId    Company Id

   * @apiParam  {Integer} assetTypeId   id of the asset Type
   * @apiParam  {Integer} name          name of the asset Sub Type

   * @apiSuccess {Array[]} data AssetType detail
   *
   * 
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(controller.updateAssetSubType);


module.exports = router;
