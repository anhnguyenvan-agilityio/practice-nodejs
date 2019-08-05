

module.exports = () => ({
  preconditionFailed(message) {
    return {
      code: 412,
      error: 'Precondition Failed',
      message,
    };
  },

  badRequest(message) {
    return {
      code: 400,
      error: 'Bad Request',
      message,
    };
  },

  methodNotAllowed(message) {
    return {
      code: 405,
      error: 'Method Not Allowed',
      message,
    };
  },

  unauthorized(message) {
    return {
      code: 401,
      error: 'Unauthorized',
      message,
    };
  },
});
