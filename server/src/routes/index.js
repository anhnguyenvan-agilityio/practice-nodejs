

const express = require('express');

const router = express.Router();

const userRoute = require('./users-route');
const foodRoute = require('./food-route');

router.use('/users', userRoute);
router.use('/foods', foodRoute);

module.exports = router;
