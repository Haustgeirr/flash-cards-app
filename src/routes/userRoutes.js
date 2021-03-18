const express = require('express');
const passport = require('passport');

const { BadRequestError, UnauthorisedError } = require('../utils/errors');
const { ensureAuthenticated, rememberMe } = require('../middleware/userAuth');
const {
  CreateUser,
  LoginUser,
  LogoutUser,
  UpdateUser,
  DeleteUser,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post(
  '/signup',
  (req, res, next) =>
    CreateUser(req, res, next).catch((error) => {
      next(new BadRequestError(error));
    }),
  (req, res, next) => {
    const user = res.locals.user;
    req.login(user, (error) => {
      if (error) {
        next(new UnauthorisedError('Unauthorised'));
      }
      res.status(201).send(user);
    });
  }
);

userRouter.post(
  '/signin',
  passport.authenticate('local'),
  rememberMe,
  (req, res) => LoginUser(req, res)
);

userRouter.post('/signout', ensureAuthenticated, (req, res) =>
  LogoutUser(req, res)
);

userRouter.get('/me', ensureAuthenticated, async (req, res) => {
  res.send(req.user);
});

userRouter.patch('/me', ensureAuthenticated, (req, res, next) =>
  UpdateUser(req, res, next).catch((error) => next(new BadRequestError(error)))
);

userRouter.delete('/me', ensureAuthenticated, (req, res) =>
  DeleteUser(req, res)
);

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
