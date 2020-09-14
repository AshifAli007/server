const Joi = require('joi');
//const User = require('../models/user.model');

module.exports = {



  // POST /v1/emp
  createEmp: {
    body: {
  
      assetType:    Joi.number().required()

    },
  },

  // POST /v1/zoneId/assign/device
  assignDeviceZone: {
    deviceId:   Joi.number().required()
  }

};
