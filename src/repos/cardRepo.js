const Card = require('../models/cardModel');

const createNewCard = async (card) => {
  const cardDocument = new Card(card);

  return await cardDocument.save();
};

module.exports = { createNewCard };
