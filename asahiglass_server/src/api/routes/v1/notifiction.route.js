const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/notification.controller');
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
router.param('notificationId', controller.load);

router.use(checkToken);
router.use(checkCompany);

router
  .route('/')
  /**
   * @api {get} v1/notification List Notification
   * @apiDescription Get a list of Notifications
   * @apiVersion 1.0.0
   * @apiName ListNotification
   * @apiGroup Notification
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} Notification List .
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.getNotifications)


  router
  .route('/:type')
  /**
   * @api {get} v1/notification/:type List Notification on the basis of type
   * @apiDescription Get a list of Notifications on the basis of type 
   * @apiVersion 1.0.0
   * @apiName ListNotification
   * @apiGroup Notification
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *

   * @apiSuccess {Array[]} Notification List .
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.Notifications)

module.exports = router;
