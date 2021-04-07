const sanitize = require('mongo-sanitize');

const cardRepo = require('../repos/cardRepo');
const { throwIfUnownedByUser } = require('../utils/utils');

const createCard = async (req, res, next) => {
  try {
    const card = {
      owner: req.user.id,
      deck: req.body.deck,
      question: sanitize(req.body.question),
      answer: sanitize(req.body.answer),
    };

    const response = await cardRepo.createNewCard(card);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const getAllCards = async (req, res, next) => {
  try {
    const deckId = req.params.deckId;
    const cards = await cardRepo.findAllCardsByDeckId(deckId);

    res.status(200).send(cards);
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const cardId = req.params.cardId;
    const card = await cardRepo.findCardById(cardId);

    throwIfUnownedByUser(req.user.id, card.owner);

    await cardRepo.deleteCard(card);
    res.status(200).send(card);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCard, getAllCards, deleteCard };
