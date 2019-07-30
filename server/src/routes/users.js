"use strict";

const express = require("express");
const router = express.Router();

const UserModel = require("../models/userModel");

router
  .route("/")
  // .all((req, res, next) => {
  //   next();
  // })
  .get((req, res) => {
    res.json({
      success: true
    });
  })
  .post(async (req, res) => {
    try {
      const user = new UserModel({
        fullName: "Ánh đẹp trai",
        userName: "anhnguyen",
        password: "123456"
      });
      const rs = await user.save();
      res.json({
        success: true
      });
    } catch (err) {
      throw Error();
    }
  });

module.exports = router;
