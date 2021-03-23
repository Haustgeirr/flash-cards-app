const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (!error.statusCode) error.statusCode = 500;

  res.status(error.statusCode).send(error);

  return;
};

module.exports = errorHandler;
