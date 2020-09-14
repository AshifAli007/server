const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/provision.controller');
const checkToken = require('../../middlewares/secureRoutes');
const checkCompany = require('../../middlewares/checkCompany');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');


const router = express.Router();

/**
 * Load device when API with deviceId route parameter is hit
 */


router.use(checkToken);
router.use(checkCompany);

router
  .route('/')

    /**
   * @api {get} v1/provision Post Provision Data
   * @apiDescription Post Provision Data
   * @apiVersion 1.0.0
   * @apiName PostProvisionData
   * @apiGroup Provision
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
	 * @apiSuccess (Created 201) {Boolean}  success         true
	 * @apiSuccess (Created 201) {String}  message       responce message
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.getProvision)

  /**
   * @api {get} v1/ Post Provision Data
   * @apiDescription Post Provision Data
   * @apiVersion 1.0.0
   * @apiName PostProvisionData
   * @apiGroup Provision
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
	 * @apiSuccess (Created 201) {Boolean}  success         true
	 * @apiSuccess (Created 201) {String}  message       responce message
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(controller.postProvision)




module.exports = router;
