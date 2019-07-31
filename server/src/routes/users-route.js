"use strict";

const express = require("express");
const router = express.Router();

const {
  addUserController,
  getUsersController,
  getUserByIdController
} = require('../controllers/user-controller');

router
  .route("/")
  .all((req, res, next) => {
    // Check auth
    next();
  })
  .get(getUsersController)
  .post(addUserController);

router
  .route('/:id')
  .all((req, res, next) => {
    // Check auth
    next();
  })
  .get(getUserByIdController);

module.exports = router;
