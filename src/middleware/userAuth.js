const userAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ error: 'Authorization failed.' });
};

module.exports = userAuth;
