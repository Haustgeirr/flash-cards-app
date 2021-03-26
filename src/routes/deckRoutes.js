const express = require('express');

const { ensureAuthenticated } = require('../middleware/userAuth');
const {
  createDeck,
  getAllUserDecks,
  getDeck,
} = require('../controllers/deckController');
const { createCard } = require('../controllers/cardController');
const { BadRequestError } = require('../utils/errors');

const deckRouter = express.Router();

deckRouter.post('/', ensureAuthenticated, (req, res, next) =>
  createDeck(req, res, next).catch((error) => next(new BadRequestError(error)))
);

deckRouter.get('/', ensureAuthenticated, (req, res, next) => {
  getAllUserDecks(req, res, next).catch((error) =>
    next(new BadRequestError(error))
  );
});

deckRouter.get('/:id', ensureAuthenticated, (req, res, next) => {
  getDeck(req, res, next).catch((error) => next(new BadRequestError(error)));
});

deckRouter.post('/:id/cards', ensureAuthenticated, (req, res, next) => {
  createCard(req, res, next).catch((error) => next(new BadRequestError(error)));
});

module.exports = deckRouter;
