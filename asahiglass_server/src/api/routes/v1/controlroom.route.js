const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/controlRoom.controller');


const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/controlroom List Zone for control room
   * @apiDescription Get a list of zones for control room
   * @apiVersion 1.0.0
   * @apiName Controlroom
   * @apiGroup Controlroom
   * @apiPermission admin
   *
   * 
   *

   * @apiSuccess {Array[]} users List of zones for control room.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.getControlRoom);


module.exports = router;
