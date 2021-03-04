const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../../src/models/userModel');

const userOneId = mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Test User One',
  email: 'testUserOne@test.com',
  password: 'test-test-test',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDatabase,
};
