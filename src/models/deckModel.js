const mongoose = require('mongoose');

const { BadRequestError } = require('../utils/errors');

const deckSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Deck name is required'],
      unique: [true, 'Deck name is already in use'],
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

deckSchema.virtual('cards', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'owner',
});

deckSchema.methods.toJSON = function () {
  const deck = this;
  const deckJson = {
    id: deck._id,
    name: deck.name,
  };

  return deckJson;
};

deckSchema.post('save', (error, res, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(
      new BadRequestError({
        name: { message: 'A deck with this name already exists' },
      })
    );
  }

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

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
