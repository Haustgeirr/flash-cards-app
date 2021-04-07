const express = require('express');

const { ensureAuthenticated } = require('../middleware/userAuth');
const { BadRequestError } = require('../utils/errors');
const {
  createDeck,
  getAllDecks,
  getDeck,
  editDeck,
  deleteDeck,
} = require('../controllers/deckController');

const deckRouter = express.Router();

deckRouter.get('/', ensureAuthenticated, (req, res, next) => {
  getAllDecks(req, res, next).catch((error) =>
    next(new BadRequestError(error))
  );
});

deckRouter.post('/', ensureAuthenticated, (req, res, next) =>
  createDeck(req, res, next).catch((error) => next(new BadRequestError(error)))
);

deckRouter.get('/:deckId', ensureAuthenticated, (req, res, next) => {
  getDeck(req, res, next).catch((error) => next(new BadRequestError(error)));
});

deckRouter.patch('/:deckId', ensureAuthenticated, (req, res, next) => {
  editDeck(req, res, next).catch((error) => next(new BadRequestError(error)));
});

deckRouter.delete('/:deckId', ensureAuthenticated, (req, res, next) => {
  deleteDeck(req, res, next).catch((error) => next(new BadRequestError(error)));
});

module.exports = deckRouter;
