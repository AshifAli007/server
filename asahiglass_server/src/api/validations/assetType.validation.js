const Joi = require('joi');
//const User = require('../models/user.model');

module.exports = {



  // POST /v1/Device
  create: {
    body: {
      assetTypeName: Joi.string().max(50).required(),
    },
  },
};
