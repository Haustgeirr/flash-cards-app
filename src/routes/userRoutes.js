const express = require('express');

const User = require('../models/userModel');
const userAuth = require('../middleware/userAuth');

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.get('/profile', userAuth, async (req, res) => {
  res.send(req.user);
});

userRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

userRouter.post('/logout', userAuth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = userRouter;
