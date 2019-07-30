'use strict';

module.exports = () => {
  return {
    preconditionFailed(message) {
      return {
        code: 412,
        error: 'Precondition Failed',
        message: message
      };
    },

    badRequest(message) {
      return {
        code: 400,
        error: 'Bad Request',
        message: message
      };
    },

    methodNotAllowed(message) {
      return {
        code: 405,
        error: 'Method Not Allowed',
        message: message
      };
    },

    unauthorized(message) {
      return {
        code: 401,
        error: 'Unauthorized',
        message: message
      };
    },
  };
};
