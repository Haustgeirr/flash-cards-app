const express = require('express');
const userRouter = require('../routes/userRoutes');
const deckRouter = require('../routes/deckRoutes');
const cardRouter = require('../routes/cardRoutes');

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.status(200).send({ message: 'API v1 root' });
});

v1Router.use('/users', userRouter);
v1Router.use('/decks', deckRouter);
v1Router.use('/cards', cardRouter);

module.exports = v1Router;
