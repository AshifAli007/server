const Joi = require('joi');
//const User = require('../models/user.model');

module.exports = {



  // POST /v1/assetType/assetTypeId/subType
  createAssetSubType: {
    body: {
      name: Joi.string().max(50).required(),
    },
  },
};
