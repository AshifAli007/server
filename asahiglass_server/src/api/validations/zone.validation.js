const Joi = require('joi');
//const User = require('../models/user.model');

module.exports = {



  // POST /v1/Device
  createZone: {
    query: {
    
      name: Joi.string().max(50).required(),
      // maxUsers: Joi.number().max(300).required(),

    },
  },

  // POST /v1/zoneId/assign/device
  assignDeviceZone: {
    deviceId:   Joi.number().required()
  }

};
