const sanitize = require('mongo-sanitize');

const {
  createNewDeck,
  findAllDecks,
  findDeck,
  deleteDeck,
} = require('../repos/deckRepo');

const createDeck = async (req, res, next) => {
  try {
    const deck = {
      owner: req.user.id,
      name: sanitize(req.body.name),
      description: sanitize(req.body.description),
    };

    const response = await createNewDeck(deck);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const getAllUserDecks = async (req, res, next) => {
  const user = req.user;

  try {
    const decks = await findAllDecks(user.id);

    res.status(200).send(decks);
  } catch (error) {
    next(error);
  }
};

const getDeck = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deck = await findDeck(id);
    res.status(200).send(deck);
  } catch (error) {
    next(error);
  }
};

const deleteUserDeck = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;

    await deleteDeck(id);
    const decks = await findAllDecks(user.id);
    res.status(200).send(decks);
  } catch (error) {
    next(error);
  }
};

module.exports = { createDeck, getAllUserDecks, getDeck, deleteUserDeck };
