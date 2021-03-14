const express = require('express');
const passport = require('passport');

const { createNewUser } = require('../repos/userRepo');
const userAuth = require('../middleware/userAuth');
const issueToken = require('../services/passport');
const { apiConfig } = require('../config');

const userRouter = express.Router();

userRouter.post(
  '/signup',
  async (req, res, next) => {
    try {
      const user = await createNewUser(req.body);
      res.locals.user = { user: { id: user._id, name: user.name } };

      return next();
    } catch (error) {
      res.status(400).send(error);
    }
  },
  passport.authenticate('local'),
  (req, res) => {
    const user = res.locals.user;
    res.status(201).send(user);
  }
);

userRouter.post(
  '/login',
  passport.authenticate('local'),
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
    try {
      const user = {
        user: {
          id: req.user._id,
          name: req.user.name,
        },
      };

      res.status(200).send(user);
    } catch (error) {
      res.status(401).send(error);
    }
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

userRouter.get(
  '/current_user',
  function (req, res, next) {
    const isAuth = req.isAuthenticated();

    if (req.isAuthenticated()) {
      return next();
    }

    res.status(200).end();
  },
  (req, res) => {
    res.send({ user: { id: req.user._id, name: req.user.name } });
  }
);

module.exports = userRouter;
