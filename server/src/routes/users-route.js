"use strict";

const express = require("express");
const router = express.Router();

const { addUserController } = require('../controllers/user-controller');

router
  .route("/")
  .all((req, res, next) => {
    // Check auth
    next();
  })
  .get((req, res) => {
    res.json({
      success: true
    });
  })
  .post(addUserController);

module.exports = router;
