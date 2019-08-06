const express = require('express');
const router = express.Router();

const {
  addUserController,
  getUsersController,
  getUserByIdController,
  chargeUserController,
} = require('../controllers/user-controller');

router
  .route('/')
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

router
  .route('/recharge')
  .all((req, res, next) => {
    // Check auth
    next();
  })
  .post(chargeUserController);

module.exports = router;
