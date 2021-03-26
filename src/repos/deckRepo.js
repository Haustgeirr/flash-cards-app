const Deck = require('../models/deckModel');
const User = require('../models/userModel');
const { BadRequestError } = require('../utils/errors');
const { isValidObjectId } = require('../utils/utils');

const createNewDeck = async (deck) => {
  const deckDocument = new Deck(deck);

  return await deckDocument.save();
};

const findDeck = async (id) => {
  if (isValidObjectId(id)) {
    return await Deck.findById(id).exec();
  }

  throw new BadRequestError({ id: { message: 'Deck ID is not valid' } });
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

module.exports = { findDeck, createNewDeck, findAllDecks };
