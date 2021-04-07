const sanitize = require('mongo-sanitize');

const deckRepo = require('../repos/deckRepo');
const cardRepo = require('../repos/cardRepo');
const { throwIfUnownedByUser, sanitizeObject } = require('../utils/utils');

const createCard = async (req, res, next) => {
  try {
    const sanitizedBody = sanitizeObject(req.body);
    // const card = {
    //   owner: req.user.id,
    //   deck: req.body.deck,
    //   question: sanitize(req.body.question),
    //   answer: sanitize(req.body.answer),
    // };

    const card = { owner: req.user.id, ...sanitizedBody };

    const response = await cardRepo.createNewCard(card);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const getCard = async (req, res, next) => {
  try {
    const cardId = req.params.cardId;
    const card = await cardRepo.findCardById(cardId);

    res.status(200).send(card);
  } catch (error) {
    next(error);
  }
};

const getAllCards = async (req, res, next) => {
  try {
    const deckId = req.params.deckId;
    const deck = await deckRepo.findDeckById(deckId);
    const cards = await cardRepo.findAllCards(deck);

    res.status(200).send(cards);
  } catch (error) {
    next(error);
  }
};

const updateCard = async (req, res, next) => {
  try {
    const cardId = req.params.cardId;
    const card = await cardRepo.findCardById(cardId);

    throwIfUnownedByUser(req.user.id, card.owner);

    const updatedCard = await cardRepo.updateCard(
      card,
      sanitizeObject(req.body)
    );

    res.status(200).send(updatedCard);
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

module.exports = { createCard, getCard, getAllCards, updateCard, deleteCard };
