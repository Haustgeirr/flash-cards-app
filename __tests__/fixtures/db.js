const mongoose = require('mongoose');

const User = require('../../src/models/userModel');

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

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  setupDatabase,
};
