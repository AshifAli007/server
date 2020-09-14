const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/emp.controller');
const checkToken = require('../../middlewares/secureRoutes');
const checkCompany = require('../../middlewares/checkCompany');
const {
  createEmp
} = require('../../validations/emp.validation');

const router = express.Router();

/**
 * Load device when API with deviceId route parameter is hit
 */
 router.param('employeeId', controller.load);

router.use(checkToken);
router.use(checkCompany);
router
  .route('/')
  /**
   * @api {get} v1/employee List Employees
   * @apiDescription Get a list of employees
   * @apiVersion 1.0.0
   * @apiName ListEmployees
   * @apiGroup Employee
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} data employee List
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.empList)

  /**
   * @api {post} v1/employee Create employee
   * @apiDescription Create a new employee
   * @apiVersion 1.0.0
   * @apiName CreateEmployee
   * @apiGroup Employee
   * @apiPermission admin
   *
   * @apiHeader {String} token   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiHeader {Integer} companyId    Company Id
   *
   * @apiParam  {String{..100}}        name               Asset full name
   * @apiParam  {String{..50}}         uniqueId           Asset company id
   * @apiParam  {Integer}              type               type=1 for Machine and 2 for Human
   * @apiParam  {String{..100}}        email              Asset email in case of type=2
   * @apiParam  {Integer{..50}}        contactNo          Asset contact number in case of type=2
   * @apiParam  {String{..200}}        address            Asset address in case of type=2
   * 
   * @apiSuccess (Created 201) {Boolean} success      true
   * @apiSuccess (Created 201) {String}  message       responce message

   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(validate(createEmp), controller.createEmp);


router
  .route('/searchonlineasset')
  /**
   * @api {get} v1/employee/searchonlineasset Search online asset
   * @apiDescription Search asset live status
   * @apiVersion 1.0.0
   * @apiName GetEmployee
   * @apiGroup Employee
   * @apiPermission admin
   *
   * @apiHeader {String}   accessToken     User's access token
   * @apiHeader {Integer}  companyId       company Id
   * 
   * @apiParam  {String{..50}}         name          Asset name or asset uniqueId or beaconId

   * @apiSuccess {Array[]} data asset detail
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.searchOnlineAsset); 

router
  .route('/assetcurrentlocation')
  /**
   * @api {get} v1/employee/assetcurrentlocation Search online asset
   * @apiDescription Search asset live status
   * @apiVersion 1.0.0
   * @apiName GetEmployee
   * @apiGroup Employee
   * @apiPermission admin
   *
   * @apiHeader {String}      accessToken      User's access token
   * @apiHeader {Integer}     companyId        companyId
   * 
   * @apiParam  {String{..50}}  empId          Asset uniqueId
   * @apiParam  {String{..50}}  beaconId       beacon mac id assigned to asset

   * @apiSuccess {Array[]} data asset detail
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.assetCurrentLocation);


router
  .route('/:employeeId')
  /**
   * @api {get} v1/employee/:employeeId Get Employee detail
   * @apiDescription Get employee information
   * @apiVersion 1.0.0
   * @apiName GetEmployee
   * @apiGroup Employee
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * 
   * @apiParam  {Integer} employeeId       id of the employee

   * @apiSuccess {Array[]} data employee detail
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.getEmp) 


  /**
   * @api {put} v1/employee/:employeeId Update Employee Data
   * @apiDescription Update Employee Information
   * @apiVersion 1.0.0
   * @apiName UpdateEmployee
   * @apiGroup Employee
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiHeader {Integer} companyId    Company Id
   * 
   * @apiParam  {Integer} employeeId   employeeId
   *
   * 

   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(controller.updateEmp); 
  

router
  .route('/uploadCsv')
  /**
   * @api {post} v1/employee/uploadCsv Bulk insert employee data by uploading csv
   * @apiDescription Bulk insert employee data by uploading csv
   * @apiVersion 1.0.0
   * @apiName Bulk insert via csv upload
   * @apiGroup Employee
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {String} Content-Type  multipart/form-data
   *
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
