const express = require('express');

const { ensureAuthenticated } = require('../middleware/userAuth');
const { BadRequestError } = require('../utils/errors');
const cardController = require('../controllers/cardController');

const cardRouter = express.Router();

cardRouter.get('/:cardId', ensureAuthenticated, (req, res, next) => {
  cardController
    .getCard(req, res, next)
    .catch((error) => next(new BadRequestError(error)));
});

cardRouter.post('/', ensureAuthenticated, (req, res, next) => {
  cardController
    .createCard(req, res, next)
    .catch((error) => next(new BadRequestError(error)));
});

cardRouter.patch('/:cardId', ensureAuthenticated, (req, res, next) => {
  cardController
    .updateCard(req, res, next)
    .catch((error) => next(new BadRequestError(error)));
});

cardRouter.delete('/:cardId', ensureAuthenticated, (req, res, next) => {
  cardController
    .deleteCard(req, res, next)
    .catch((error) => next(new BadRequestError(error)));
});

module.exports = cardRouter;
