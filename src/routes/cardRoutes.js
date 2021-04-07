const express = require('express');

const { ensureAuthenticated } = require('../middleware/userAuth');
const { BadRequestError } = require('../utils/errors');
const { createCard, deleteCard } = require('../controllers/cardController');

const cardRouter = express.Router();

cardRouter.post('/', ensureAuthenticated, (req, res, next) => {
  createCard(req, res, next).catch((error) => next(new BadRequestError(error)));
});

cardRouter.delete('/:cardId', ensureAuthenticated, (req, res, next) => {
  deleteCard(req, res, next).catch((error) => next(new BadRequestError(error)));
});

module.exports = cardRouter;
