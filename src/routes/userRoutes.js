const express = require('express');
const passport = require('passport');

const { BadRequestError } = require('../utils/errors');
const { ensureAuthenticated, rememberMe } = require('../middleware/userAuth');
const {
  createUser,
  signInUser,
  signOutUser,
  updateUser,
  deleteUser,
  updateUserPassword,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post(
  '/signup',
  (req, res, next) =>
    createUser(req, res, next).catch((error) => {
      next(new BadRequestError(error));
    }),
  (req, res, next) => {
    const user = res.locals.user;
    req.login(user, (error) => {
      if (error) {
        next(error);
      }
      res.status(201).send(user);
    });
  }
);

userRouter.post(
  '/signin',
  passport.authenticate('local'),
  rememberMe,
  (req, res) => signInUser(req, res)
);

userRouter.post('/signout', ensureAuthenticated, (req, res) =>
  signOutUser(req, res)
);

userRouter.get('/me', ensureAuthenticated, async (req, res) => {
  res.send(req.user);
});

userRouter.patch('/me', ensureAuthenticated, (req, res, next) =>
  updateUser(req, res, next).catch((error) => next(new BadRequestError(error)))
);

userRouter.patch('/change_password', ensureAuthenticated, (req, res, next) =>
  updateUserPassword(req, res, next).catch((error) =>
    next(new BadRequestError(error))
  )
);

userRouter.delete('/me', ensureAuthenticated, (req, res, next) =>
  deleteUser(req, res, next).catch((error) => {
    next(new BadRequestError(error));
  })
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
    res.send({ user: req.user });
  }
);

module.exports = userRouter;
