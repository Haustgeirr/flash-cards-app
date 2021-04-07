const express = require('express');

const { ensureAuthenticated } = require('../middleware/userAuth');
const { BadRequestError } = require('../utils/errors');
const deckController = require('../controllers/deckController');
const cardController = require('../controllers/cardController');

const deckRouter = express.Router();

deckRouter.get('/', ensureAuthenticated, (req, res, next) => {
  deckController
    .getAllDecks(req, res, next)
    .catch((error) => next(new BadRequestError(error)));
});

deckRouter.post('/', ensureAuthenticated, (req, res, next) =>
  deckController
    .createDeck(req, res, next)
    .catch((error) => next(new BadRequestError(error)))
);

deckRouter.get('/:deckId', ensureAuthenticated, (req, res, next) => {
  deckController
    .getDeck(req, res, next)
    .catch((error) => next(new BadRequestError(error)));
});

deckRouter.patch('/:deckId', ensureAuthenticated, (req, res, next) => {
  deckController
    .editDeck(req, res, next)
    .catch((error) => next(new BadRequestError(error)));
});

deckRouter.delete('/:deckId', ensureAuthenticated, (req, res, next) => {
  deckController
    .deleteDeck(req, res, next)
    .catch((error) => next(new BadRequestError(error)));
});

deckRouter.get('/:deckId/cards', ensureAuthenticated, (req, res, next) => {
  cardController
    .getAllCards(req, res, next)
    .catch((error) => next(new BadRequestError(error)));
});

module.exports = deckRouter;
