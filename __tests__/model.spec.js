const jwt = require('jsonwebtoken');
const User = require('../src/models/userModel');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

const jwtToken = process.env.JWT_SECRET;

describe('Tests for user validation and methods', () => {
  test('Generate auth token', async () => {
    // const user = new User(userOne);
    // const token = await user.generateAuthToken();
    // const decodedToken = jwt.verify(token, jwtToken);
    // expect(decodedToken._id).toMatch(userOneId.toString());
  });
});
