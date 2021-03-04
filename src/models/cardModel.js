const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    // didAnswerCorrectly: {
    //   type: Boolean,
    //   default: false,
    //   lastSeen: Date,
    // },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
