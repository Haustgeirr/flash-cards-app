const express = require('express');

const { ensureAuthenticated } = require('../middleware/userAuth');
const {
  createDeck,
  getAllUserDecks,
  getDeck,
  editDeck,
  deleteUserDeck,
} = require('../controllers/deckController');
const { createCard } = require('../controllers/cardController');
const { BadRequestError } = require('../utils/errors');

const deckRouter = express.Router();

deckRouter.get('/', ensureAuthenticated, (req, res, next) => {
  getAllUserDecks(req, res, next).catch((error) =>
    next(new BadRequestError(error))
  );
});

deckRouter.post('/', ensureAuthenticated, (req, res, next) =>
  createDeck(req, res, next).catch((error) => next(new BadRequestError(error)))
);

deckRouter.get('/:id', ensureAuthenticated, (req, res, next) => {
  getDeck(req, res, next).catch((error) => next(new BadRequestError(error)));
});

deckRouter.patch('/:id', ensureAuthenticated, (req, res, next) => {
  editDeck(req, res, next).catch((error) => next(new BadRequestError(error)));
});

deckRouter.delete('/:id', ensureAuthenticated, (req, res, next) => {
  deleteUserDeck(req, res, next).catch((error) =>
    next(new BadRequestError(error))
  );
});

deckRouter.post('/:id/cards', ensureAuthenticated, (req, res, next) => {
  createCard(req, res, next).catch((error) => next(new BadRequestError(error)));
});

module.exports = deckRouter;
