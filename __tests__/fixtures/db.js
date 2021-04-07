const mongoose = require('mongoose');

const User = require('../../src/models/userModel');
const Deck = require('../../src/models/deckModel');
const Card = require('../../src/models/cardModel');

const userOneId = mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Test User One',
  email: 'testone@test.com',
  password: '12345678',
};

const userTwoId = mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'Test User Two',
  email: 'testtwo@test.com',
  password: '12345678',
};

const deckOneId = mongoose.Types.ObjectId();
const deckOne = {
  _id: deckOneId,
  owner: userOneId,
  name: 'Test Deck One',
  description: 'A short description',
};

const deckTwoId = mongoose.Types.ObjectId();
const deckTwo = {
  _id: deckTwoId,
  owner: userTwoId,
  name: 'Test Deck Two',
  description: 'A short description',
};

const deckThreeId = mongoose.Types.ObjectId();
const deckThree = {
  _id: deckThreeId,
  owner: userTwoId,
  name: 'Test Deck Three',
  description: 'A short description',
};

const cardOneId = mongoose.Types.ObjectId();
const cardOne = {
  _id: cardOneId,
  owner: userOneId,
  deck: deckOneId,
  question: 'A Question',
  answer: 'An Answer',
};

const cardTwoId = mongoose.Types.ObjectId();
const cardTwo = {
  _id: cardTwoId,
  owner: userTwoId,
  deck: deckTwoId,
  question: 'A Second Question',
  answer: 'A Second Answer',
};
const cardThreeId = mongoose.Types.ObjectId();
const cardThree = {
  _id: cardThreeId,
  owner: userTwoId,
  deck: deckTwoId,
  question: 'A Third Question',
  answer: 'A Third Answer',
};
const cardFourId = mongoose.Types.ObjectId();
const cardFour = {
  _id: cardFourId,
  owner: userTwoId,
  deck: deckThreeId,
  question: 'A Fourth Question',
  answer: 'A Fourth Answer',
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  deckOneId,
  deckOne,
  deckTwoId,
  deckTwo,
  deckThreeId,
  deckThree,
  cardOneId,
  cardOne,
  cardTwoId,
  cardTwo,
  cardThreeId,
  cardThree,
  cardFourId,
  cardFour,
};
