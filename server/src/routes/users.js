'use strict'

const express = require('express');
const router = express.Router();

router.route("/")
  // .all((req, res, next) => {
  //   next();
  // })
  .get((req, res) => {
    res.json({
      success: true
    })
  });

module.exports = router;
