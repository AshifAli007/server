const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/rule.controller');
const checkToken = require('../../middlewares/secureRoutes');
const checkCompany = require('../../middlewares/checkCompany');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {

  createUser,

} = require('../../validations/user.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('ruleId', controller.load);

router.use(checkToken);
router.use(checkCompany);
router
  .route('/')
  /**
   * @api {get} v1/rules List Rules
   * @apiDescription Get a list of rules
   * @apiVersion 1.0.0
   * @apiName ListRules
   * @apiGroup Rules
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiHeader {String} Content-Type  multipart/form-data
   *
   * @apiSuccess {Object[]} Rule List of Rules.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.ruleList)

  /**
   * @api {post} v1/rules Save Rule Data
   * @apiDescription Save Rule Data
   * @apiVersion 1.0.0
   * @apiName Save Rules
   * @apiGroup Rules
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiParam  {Integer}        userId          userId
   *
   * @apiSuccess .
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .post( controller.createRule)

  router
  .route('/asset')
    /**
   * @api {get} v1/rule/asset List Of Rule For Asset
   * @apiDescription Get a list of asset rule
   * @apiVersion 1.0.0
   * @apiName AssetRule
   * @apiGroup Rules
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiHeader {String} Content-Type  multipart/form-data
   *
   * @apiSuccess {Object[]} Rule List of asset rules.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.assetRules)

  router
  .route('/zone')
    /**
   * @api {get} v1/rule/zone List Of Rule For zone
   * @apiDescription Get a list of zone rule
   * @apiVersion 1.0.0
   * @apiName ZOneRule
   * @apiGroup Rules
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiHeader {String} Content-Type  multipart/form-data
   *
   * @apiSuccess {Object[]} Rule List of zone rules.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.zoneRules)

  router
  .route('/activerules')
    /**
   * @api {get} v1/activerules List Of Active Rules
   * @apiDescription Get a list of active rules
   * @apiVersion 1.0.0
   * @apiName ActiveRules
   * @apiGroup Rules
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id
   * @apiHeader {String} Content-Type  multipart/form-data
   *
   * @apiSuccess {Object[]} Rule List of Rules.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.activeruleList)

  router
  .route('/:ruleId')
    /**
   * @api {get} v1/remove Remove the rule mappig
   * @apiDescription Delete rule mapping
   * @apiVersion 1.0.0
   * @apiName RemoveMapping
   * @apiGroup Rules
   * @apiPermission admin
   *
   * @apiHeader {String} accessToken   User's access token
   * @apiHeader {Integer} userId       User Id

   *
   * @apiSuccess {} Object form responce
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .delete(controller.removeRulemapping)


module.exports = router;
