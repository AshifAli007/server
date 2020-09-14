const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/privilegeUser.controller');
const checkToken = require('../../middlewares/secureRoutes');
const {
	createPrivilegeUser,
	login
} = require('../../validations/privilegeUser.validation');


const router = express.Router();

/**
 * Load device when API with companyId route parameter is hit
 */
 router.param('companyId', controller.load);

//router.use(checkToken);
router
	.route('/')
	/**
	 * @api {post} v1/privlageuser Create Privlage Users
	 * @apiDescription Create privlage user 
	 * @apiVersion 1.0.0
	 * @apiName Company privlage user
	 * @apiGroup Privlage Users
	 * @apiPermission admin

	 * @apiParam  {String}             email     User's email
     * @apiParam  {String{6..128}}     password  User's password
	 * @apiParam  {String}     		   fullName  User's Name
	 * @apiParam  {Integer}     	   userType  User Type

	 *
	 *
	 * @apiSuccess (Created 201) {Boolean}  success         true
	 * @apiSuccess (Created 201) {String}  message       responce message

	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.post(validate(createPrivilegeUser),controller.create);

	/**
	 * @api {post} v1/privlageuser/login Login
	 * @apiDescription Get an accessToken
	 * @apiVersion 1.0.0
	 * @apiName Privlage Users Login
	 * @apiGroup Privlage Users
	 * @apiPermission public
	 *
	 * @apiParam  {String}         email     User's email
	 * @apiParam  {String{..128}}  password  User's password
	 *

	* @apiSuccess  {String}  token.accessToken   Authorization Token

	* @apiSuccess  {String}  user.id             User's id
	* @apiSuccess  {String}  user.name           User's name
	* @apiSuccess  {String}  user.email          User's email
	* @apiSuccess  {String}  user.userType       User's userType

	*
	* @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
	* @apiError (Unauthorized 401)  Unauthorized     Incorrect email or password
	*/
	router.route('/login')
	.post(validate(login), controller.login);

module.exports = router;


