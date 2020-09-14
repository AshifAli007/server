const Joi = require('joi');

module.exports = {



  // POST /v1/privalageusers
  createPrivilegeUser: {
    body: {
      email: Joi.string().email().required(),
      fullName: Joi.string().required().min(6).max(100),
      // password: Joi.string().required().min(6).max(128),
      password:Joi.string().regex(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})$/),
      userType: Joi.number().required(),
    },
  },

  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().max(128),
      // password:Joi.string().regex(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})$/),
    },
  },


};
