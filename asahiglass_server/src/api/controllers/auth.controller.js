const httpStatus = require('http-status');
const User = require('../models/user.model');
const Userauth = require('../models/userauth.model');
const RefreshToken = require('../models/refreshToken.model');
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken');
const { jwtExpirationInterval } = require('../../config/vars');

/**
* Returns a formated object with tokens
* @private
*/
function generateTokenResponse(user, accessToken) {
  const refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
	accessToken, refreshToken, expiresIn,
  };
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
 
exports.registerPrivilege = async(req, res, next) => {
  Userauth.addUser(req.body).then((data)=>{
	console.log("Return data: " + JSON.stringify(data));
	var email = req.body.email;
	if(data.status == 1){
		return res.json({data: data });

	}else{
		const token = jwt.sign({email},'my_secret_key',{ expiresIn: 60*60*24 });
		return res.json({ "accessToken": token, data: data})
	}
	//return res.json((data));
  }).catch((err) => {
	console.log("Error: " + err);
	return res.json(err);
  })
  
}

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */

exports.login = async (req, res, next) => {

  Userauth.loginUser(req.body).then((data)=>{
		var email = req.body.email
		console.log("Req email: " + email);
		data.token =  jwt.sign({email},'my_secret_key',{ expiresIn: 60*60*24*30 });
		console.log("Response from model: " + JSON.stringify(data));
		return res.json({"success":true, "data":data});
  }).catch((err) => {
		console.log("Error: " + err);
		return res.json(err);
  });
};



/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
exports.oAuth = async (req, res, next) => {
  try {
	const { user } = req;
	const accessToken = user.token();
	const token = generateTokenResponse(user, accessToken);
	const userTransformed = user.transform();
	return res.json({ token, user: userTransformed });
  } catch (error) {
	return next(error);
  }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {
	const { email, refreshToken } = req.body;
	const refreshObject = await RefreshToken.findOneAndRemove({
	  userEmail: email,
	  token: refreshToken,
	});
	const { user, accessToken } = await User.findAndGenerateToken({ email, refreshObject });
	const response = generateTokenResponse(user, accessToken);
	return res.json(response);
  } catch (error) {
	return next(error);
  }
};
