const handleNotFound = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
};

const handleServerError = (error, req, res, next) => {
  console.log('handleServerError:', error)
  const message = error.message || 'Internal Server Error';
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    message,
    statusCode,
  });
};

module.exports = {
  handleNotFound,
  handleServerError,
};
