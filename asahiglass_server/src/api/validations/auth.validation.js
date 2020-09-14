const Joi = require('joi');

module.exports = {
  // POST /v1/auth/register
  register: {
    body: {
      email: Joi.string().email().required(),
      fullName: Joi.string().required().min(6).max(100),
      // password: Joi.string().required().min(6).max(128),
      password:Joi.string().regex(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})$/),
      userType: Joi.number().required(),
      contactno: Joi.number().required(),
    },
  },

  // POST /v1/auth/login
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().max(128),
    },
  },

  // POST /v1/auth/facebook
  // POST /v1/auth/google
  oAuth: {
    body: {
      access_token: Joi.string().required(),
    },
  },

  // POST /v1/auth/refresh
  refresh: {
    body: {
      email: Joi.string().email().required(),
      refreshToken: Joi.string().required(),
    },
  },
};
