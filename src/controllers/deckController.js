const sanitize = require('mongo-sanitize');

const deckRepo = require('../repos/deckRepo');
const cardRepo = require('../repos/cardRepo');
const { sanitizeObject, throwIfUnownedByUser } = require('../utils/utils');

const createDeck = async (req, res, next) => {
  try {
    const deck = {
      owner: req.user.id,
      name: sanitize(req.body.name),
      description: sanitize(req.body.description),
    };

    const response = await deckRepo.createNewDeck(deck);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const getAllDecks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const decks = await deckRepo.findAllDecks(userId);

    if (decks.length > 0) throwIfUnownedByUser(userId, decks[0].owner);

    res.status(200).send(decks);
  } catch (error) {
    next(error);
  }
};

const getDeck = async (req, res, next) => {
  try {
    const deckId = req.params.deckId;
    const deck = await deckRepo.findDeckById(deckId);

    throwIfUnownedByUser(req.user.id, deck.owner);
    res.status(200).send(deck);
  } catch (error) {
    next(error);
  }
};

const editDeck = async (req, res, next) => {
  try {
    const deckId = req.params.deckId;
    const deck = await deckRepo.findDeckById(deckId);

    throwIfUnownedByUser(req.user.id, deck.owner);
    await deckRepo.updateDeck(deck, sanitizeObject(req.body));
    res.status(200).send(deck.toJSON());
  } catch (error) {
    next(error);
  }
};

const deleteDeck = async (req, res, next) => {
  try {
    const deckId = req.params.deckId;
    const deck = await deckRepo.findDeckById(deckId);

    throwIfUnownedByUser(req.user.id, deck.owner);

    const cards = await cardRepo.findCards({ deck: deckId });
    cards.forEach(async (card) => {
      await cardRepo.deleteCard(card);
    });

    await deckRepo.deleteDeck(deck);
    res.status(200).send(deck);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDeck,
  getAllDecks,
  getDeck,
  editDeck,
  deleteDeck,
};
