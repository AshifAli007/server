const Joi = require('joi');

module.exports = {



  // POST /v1/foodCart
  createFoodCart: {
    body: {
      foodCartNo: Joi.string().max(50).required(),
    },
  },
};
