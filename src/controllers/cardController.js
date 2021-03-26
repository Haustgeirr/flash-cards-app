const sanitize = require('mongo-sanitize');

const { createNewCard } = require('../repos/cardRepo');

const createCard = async (req, res, next) => {
  const id = req.params.id;

  try {
    const card = {
      owner: id,
      question: sanitize(req.body.question),
      answer: sanitize(req.body.answer),
    };

    const response = await createNewCard(card);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCard };
