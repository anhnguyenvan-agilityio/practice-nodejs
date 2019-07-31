"use strict";

const express = require("express");
const router = express.Router();

const userRoute = require('./users-route');

router.use("/users", userRoute);

module.exports = router;
