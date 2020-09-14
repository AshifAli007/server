const Joi = require('joi');
//const User = require('../models/user.model');

module.exports = {



  // POST /v1/Device
  createDevice: {
    body: {
      deviceType: Joi.number().required(),
      name: Joi.string().max(50).required(),
      serial: Joi.string().max(50).required(),
    },
  },


};
