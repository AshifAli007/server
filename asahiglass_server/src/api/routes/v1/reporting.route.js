const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/reporting.controller');
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
router.param('reportType', controller.load);

router.use(checkToken);
router.use(checkCompany);

//router
  //.route('/')
  /**
   * @api {get} v1/reporting List Reporting
   * @apiDescription Get a list of Reporting
   * @apiVersion 1.0.0
   * @apiName ListReporting
   * @apiGroup Reporting
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} Reporting List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  //.get(controller.getReporting)

router
  .route('/')
  /**
   * @api {get} v1/reporting List Reporting
   * @apiDescription Get a list of Reporting
   * @apiVersion 1.0.0
   * @apiName ListReporting
   * @apiGroup Reporting
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   * @apiHeader {Integer} companyId    Company Id

   * @apiParam  {Integer}         kpi          kpi value as integer
   * @apiParam  {String{..50}}    type         type to represent data

   * @apiSuccess {Array[]} Reporting List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.getReportingData);

router
  .route('/detail')
  /**
   * @api {get} v1/reportingdetail List Reporting in detail
   * @apiDescription Get a list of Reporting
   * @apiVersion 1.0.0
   * @apiName ListReporting
   * @apiGroup Reporting
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   * @apiHeader {Integer} companyId    Company Id

   * @apiParam  {Integer}         kpi          kpi value as integer
   * @apiParam  {String{..50}}    type         type to represent data

   * @apiSuccess {Array[]} Reporting List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.detailReportingData);

router
  .route('/zoneviolationstats')
  /**
   * @api {get} v1/reporting/zoneviolationstats Most violation
   * @apiDescription Get Most violated zone
   * @apiVersion 1.0.0
   * @apiName Most violated zone
   * @apiGroup Reporting
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   * @apiHeader {Integer} companyId    Company Id

   * @apiParam  {Integer}         plantId          kpi value as integer
   * @apiParam  {String{..50}}    type             type to represent data

   * @apiSuccess {Array[]} Reporting List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.getViolationStats);

router
  .route('/zonepopulationstats')
  /**
   * @api {get} v1/reporting/zonepopulationstats Most violation
   * @apiDescription Get Most populated zone
   * @apiVersion 1.0.0
   * @apiName Most populated zone
   * @apiGroup Reporting
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   * @apiHeader {Integer} companyId    Company Id

   * @apiParam  {Integer}         plantId          kpi value as integer
   * @apiParam  {String{..50}}    type             type to represent data

   * @apiSuccess {Array[]} Reporting List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.getPopulationStats);

router
  .route('/assettypeviolationstats')
  /**
   * @api {get} v1/reporting/assettypeviolationstats Most violation
   * @apiDescription Get Violation stats on the basis of assetType
   * @apiVersion 1.0.0
   * @apiName Most violation by assetType
   * @apiGroup Reporting
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   * @apiHeader {Integer} companyId    Company Id

   * @apiParam  {Integer}         plantId          kpi value as integer
   * @apiParam  {String{..50}}    type             type to represent data

   * @apiSuccess {Array[]} Reporting List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.getAssetTypeViolationStats);

router
  .route('/zoneproductivity')
  /**
   * @api {get} v1/reporting/zoneproductivity Most Productive Zone
   * @apiDescription Get Most productive zone
   * @apiVersion 1.0.0
   * @apiName Most productive zone
   * @apiGroup Reporting
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   * @apiHeader {Integer} companyId    Company Id

   * @apiParam  {Integer}         plantId          kpi value as integer
   * @apiParam  {String{..50}}    type             type to represent data

   * @apiSuccess {Array[]} Reporting List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.getZoneProductivity);

router
  .route('/:reportType/entryexit')
    /**
   * @api {get} v1/reporting/:reportType/entryexit List Reporting on the basis of Entry and Exit timing of emp.
   * @apiDescription Get emp. Entry and Exit timings
   * @apiVersion 1.0.0
   * @apiName ListReporting On the basis of entry and exit time
   * @apiGroup Reporting
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * 
   * @apiParam  {Integer}         ReportType   reportType 1 is for today and 2 datewise
   * @apiParam  {String{..50}}    empId        uniqueId of the asset
   * @apiParam  {Integer}         sDate        start date if reportType is 2
   * @apiParam  {Integer}         eDate        end date if reportType is 2


   * @apiSuccess {Array[]} Reporting List on the basis of date
   *
   * 
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.getReportToday); 

module.exports = router;
