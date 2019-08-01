"use strict";

const express = require("express");
const router = express.Router();

const {
  getFoodsController,
  getFoodByIdController,
  addOrderController
} = require("../controllers/food-controller");

router
  .route("/")
  .all((req, res, next) => {
    // Check auth
    next();
  })
  .get(getFoodsController);

router
  .route("/:id")
  .all((req, res, next) => {
    // Check auth
    next();
  })
  .get(getFoodByIdController);

router
  .route("/orders")
  .all((req, res, next) => {
    // Check auth
    next();
  })
  .post(addOrderController);

module.exports = router;
