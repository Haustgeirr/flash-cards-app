const Deck = require('../models/deckModel');
const User = require('../models/userModel');
const { BadRequestError } = require('../utils/errors');
const { isValidObjectId } = require('../utils/utils');

const createNewDeck = async (deck) => {
  const deckDocument = new Deck(deck);

  return await deckDocument.save();
};

const findDeck = async (id) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError({ id: { message: 'Deck ID is not valid' } });
  }
  const deck = await Deck.findById(id).exec();

  if (!deck)
    throw new BadRequestError({ id: { message: `Deck ${id} not found` } });

  return deck;
};

const findAllDecks = async (userId) => {
  const user = await User.findById(userId).exec();

  try {
    await user
      .populate({
        path: 'decks',
      })
      .execPopulate();

    return user.decks;
  } catch (error) {
    throw new BadRequestError(error.errors);
  }
};

const updateDeck = async (deck, updates) => {
  const updateKeys = Object.keys(updates);
  // const deck = await findDeck(id);

  if (updates.length === 0) {
    return { deck: deck.toJSON() };
  }

  updateKeys.forEach((key) => {
    deck[key] = updates[key];
  });

  await deck.save();
  return { deck: deck.toJSON() };
};

const deleteDeck = async (id) => {
  try {
    const deck = await findDeck(id);
    await deck.remove();
    return deck.toJSON();
  } catch (error) {
    if (error instanceof BadRequestError) throw error;
    throw new BadRequestError(error);
  }
};

module.exports = {
  findDeck,
  createNewDeck,
  findAllDecks,
  updateDeck,
  deleteDeck,
};
