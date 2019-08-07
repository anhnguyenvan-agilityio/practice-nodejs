const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const APIError = require('../utils/api-error');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res) => {
  console.log('aaa', err);
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  res.status(err.status);
  res.json(response);
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
  // Don't know why remove next will error
  // return html T_T
  console.log(next);
  let convertedError = err;
  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: 'Error of validation error',
      errors: err.errors,
      status: err.status,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }
  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
// exports.notFound = (req, res) => {
//   const err = new APIError({
//     message: 'Not found',
//     status: httpStatus.NOT_FOUND,
//   });
//   return handler(err, req, res);
// };
