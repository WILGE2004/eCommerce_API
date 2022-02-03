const createError = require("http-errors");

module.exports.Response = {
  success: (res, status = 200, message = "Ok", body = {}) => {
    res.status(status).json({ message, body });
  },
  error: (res, error = null) => {
    const { statusCode, message } = error
      ? error
      : new createError.InternalServerError();
    res.status(statusCode).json({ message });
  },
};

/* const sendRes = (res, code, success, message) => {
  return res.status(code).json({ success, message });
};

module.exports = sendRes; */

// snippet => () => {\n    $3$1\n}
