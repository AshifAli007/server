const Joi = require('joi');
//const User = require('../models/user.model');

module.exports = {



  // POST /v1/emp
  startTest: {
    body: {
    
      fullName: Joi.string().max(100).required(),
      empId:    Joi.string().required(),
      email:    Joi.string().required(),
      contactNo: Joi.number().required(),

    },
  },

  // POST /v1/zoneId/assign/device
  assignDeviceZone: {
    deviceId:   Joi.number().required()
  }

};
