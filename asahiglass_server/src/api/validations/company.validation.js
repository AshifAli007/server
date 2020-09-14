const Joi = require('joi');

module.exports = {



  // POST /v1/Company
  createCompany: {
    body: {
      name: Joi.string().max(50).required(),
      password:Joi.string().regex(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})$/)
    },
  },


};
