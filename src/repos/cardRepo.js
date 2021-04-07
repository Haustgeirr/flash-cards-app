const Deck = require('../models/deckModel');
const Card = require('../models/cardModel');
const { BadRequestError } = require('../utils/errors');
const { isValidObjectId } = require('../utils/utils');

const createNewCard = async (card) => {
  const cardDocument = new Card(card);

  return await cardDocument.save();
};

const findCards = async (filter) => {
  try {
    const cards = await Card.find(filter);
    return cards;
  } catch (error) {
    return error;
  }
};

const findCardById = async (id) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError({ id: { message: 'Card ID is not valid' } });
  }

  const card = await Card.findById(id).exec();

  if (!card)
    throw new BadRequestError({ id: { message: `Card ${id} not found` } });

  return card;
};

const findAllCards = async (deck) => {
  try {
    await deck.populate({ path: 'cards' }).execPopulate();
    return deck.cards;
  } catch (error) {
    throw new BadRequestError(error.errors);
  }
};

const findAllCardsByDeckId = async (deckID) => {
  try {
    const deck = await Deck.findById(deckID).exec();
    await deck.populate({ path: 'cards' }).execPopulate();

    return deck.cards;
  } catch (error) {
    throw new BadRequestError(error.errors);
  }
};

const updateCard = async (card, updates) => {
  if (updates.length === 0) {
    return { card: card.toJSON() };
  }

  updateKeys.forEach((key) => {
    card[key] = updates[key];
  });

  await deck.save();
  return { deck: deck.toJSON() };
};

const deleteCard = async (card) => {
  try {
    await card.remove();
    return card.toJSON();
  } catch (error) {
    throw new BadRequestError(error);
  }
};

const findAndDeleteCard = async (id) => {
  try {
    const card = await findCardById(id);
    await card.remove();
    return card.toJSON();
  } catch (error) {
    if (error instanceof BadRequestError) throw error;
    throw new BadRequestError(error);
  }
};

module.exports = {
  createNewCard,
  findCards,
  findCardById,
  findAllCards,
  findAllCardsByDeckId,
  updateCard,
  deleteCard,
  findAndDeleteCard,
};
