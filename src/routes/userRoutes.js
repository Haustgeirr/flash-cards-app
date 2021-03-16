const express = require('express');
const passport = require('passport');

const { ensureAuthenticated, rememberMe } = require('../middleware/userAuth');
const {
  CreateUser,
  LoginUser,
  LogoutUser,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post(
  '/signup',
  (req, res, next) => CreateUser(req, res, next),
  (req, res) => {
    const user = res.locals.user;
    req.login(user, (error) => {
      if (error) {
        res.status(401).send(error);
      }
      res.status(201).send(user);
    });
  }
);

userRouter.post(
  '/login',
  passport.authenticate('local'),
  rememberMe,
  (req, res) => LoginUser(req, res)
);

userRouter.post('/logout', ensureAuthenticated, (req, res) =>
  LogoutUser(req, res)
);

userRouter.get('/me', ensureAuthenticated, async (req, res) => {
  res.send(req.user);
});

// this is a special route that allows a soft failure for user auth
// for when users arrive with out a valid session
userRouter.get(
  '/current_user',
  function (req, res, next) {
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
