const mongoose = require('mongoose');

const { BadRequestError } = require('../utils/errors');

const cardSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [
        true,
        'There was a problem with the server: Owner ID missing.',
      ],
      ref: 'Deck',
    },
    question: {
      type: String,
      required: [true, 'A valid question is required'],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, 'A valid answer is required'],
      trim: true,
    },
    didAnswerCorrectly: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

cardSchema.post('save', (error, res, next) => {
  if (error.name === 'ValidationError') {
    const errorKeys = Object.keys(error.errors);
    const shapedErrors = {};

    errorKeys.map((key) => {
      shapedErrors[key] = { message: error.errors[key].message };
    });

    next(new BadRequestError(shapedErrors));
  }

  next();
});

cardSchema.methods.toJSON = function () {
  const card = this;
  const cardJson = {
    id: card._id,
    question: card.question,
    answer: card.answer,
  };

  return cardJson;
};

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
