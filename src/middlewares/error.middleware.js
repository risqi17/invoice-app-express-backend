const ResponseUtil = require('../utils/response.util');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json(ResponseUtil.fail(err.message));
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json(ResponseUtil.fail('Unauthorized'));
  }

  return res.status(500).json(ResponseUtil.error('Internal server error'));
};

module.exports = errorHandler;