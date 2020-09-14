const Joi = require('joi');


module.exports = {



  // POST /v1/plants
  createPlant: {
    body: {
      name: Joi.string().max(50).required(),
    },
  },
};
