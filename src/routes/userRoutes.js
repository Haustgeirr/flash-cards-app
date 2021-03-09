const express = require('express');
const passport = require('passport');

const User = require('../models/userModel');
const { createNewUser } = require('../repos/userRepo');
const userAuth = require('../middleware/userAuth');
const issueToken = require('../services/passport');
const { apiConfig } = require('../config');

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const user = await createNewUser(req.body);

    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.post(
  '/login',
  passport.authenticate('local', {
    // failureRedirect: '/',
  }),
  (req, res, next) => {
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
  },
  (req, res) => {
    // res.redirect(`${apiConfig.baseUrl}/users/me`);
    res.send(req.user);
  }
);

userRouter.post('/logout', userAuth, async (req, res) => {
  req.logout();
  res.clearCookie('remember_me');
  res.send();
});

userRouter.get('/me', userAuth, async (req, res) => {
  res.send(req.user);
});

module.exports = userRouter;
