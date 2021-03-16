const { apiConfig } = require('../config');
const issueToken = require('../services/passport');

const ensureAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ error: 'Authorization failed.' });
};

const rememberMe = async (req, res, next) => {
  if (!req.body.remember_me) {
    return next();
  }

  issueToken(req.user, (err, token) => {
    if (err) {
      return next(err);
    }

    res.cookie('remember_me', token, {
      path: '/',
      httpOnly: true,
      maxAge: apiConfig.rememberMeCookieMaxAge,
    });

    return next();
  });
};

module.exports = { ensureAuthenticated, rememberMe };
