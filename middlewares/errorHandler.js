const { INTERNAL_SERVER_ERROR, ERROR_MESSAGES } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === INTERNAL_SERVER_ERROR
      ? ERROR_MESSAGES.INTERNAL_SERVER_ERROR
      : message,
  });
  next();
};
