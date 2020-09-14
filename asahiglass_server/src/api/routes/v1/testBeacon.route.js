const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/testBeacon.controller');
const checkToken = require('../../middlewares/secureRoutes');
const checkCompany = require('../../middlewares/checkCompany');
const {
  createEmp
} = require('../../validations/testBeacon.validation');

const router = express.Router();

/**
 * Load device when API with deviceId route parameter is hit
 */
 router.param('employeeId', controller.load);

//router.use();
router.use(checkToken);
router.use(checkCompany);

router
  .route('/')


router
  .route('/start')
  /**
   * @api {post} v1/testbeacon/start Start Test
   * @apiDescription Start Test Beacon
   * @apiVersion 1.0.0
   * @apiName Start Test
   * @apiGroup testbeacon
   * @apiPermission admin
   *

   *
   * @apiParam  {String{..100}}        beaconId          beaconId
   * @apiParam  {String{..50}}         receiverId        receiverId

   * 
   * @apiSuccess (Created 201) {Boolean}  success         true
   * @apiSuccess (Created 201) {String}  message       responce message

   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(controller.startTest);



  router
  .route('/stop')
  /**
   * @api {post} v1/testbeacon/stop Stop Test
   * @apiDescription Stop Test Beacon
   * @apiVersion 1.0.0
   * @apiName Stop Test
   * @apiGroup testbeacon
   * @apiPermission admin
   *

   *
   * @apiParam  {String{..100}}        beaconId          beaconId
   * @apiParam  {String{..50}}         receiverId        receiverId

   * 
   * @apiSuccess (Created 201) {Boolean}  success         true
   * @apiSuccess (Created 201) {String}  message       responce message

   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(controller.stopTest);

  router
  .route('/csv')
  /**
   * @api {post} v1/testbeacon/csv Generate Csv
   * @apiDescription Generate Csv
   * @apiVersion 1.0.0
   * @apiName Generate Csv
   * @apiGroup testbeacon
   * @apiPermission admin
   *

   *
   * @apiParam  {String{..100}}        beaconId          beaconId
   * @apiParam  {String{..50}}         receiverId        receiverId

   * 
   * @apiSuccess (Created 201) {Boolean}  success         true
   * @apiSuccess (Created 201) {String}  message       responce message

   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(controller.genrateCsv);




module.exports = router;
