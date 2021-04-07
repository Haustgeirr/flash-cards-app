const errorHandler = (error, req, res, next) => {
  if (error.statusCode === 404) res.status(404).redirect('/404');
  if (!error.statusCode) error.statusCode = 500;
  if (error.statusCode === 500) console.error(error);

  res.status(error.statusCode).send(error);

  return;
};

module.exports = errorHandler;
