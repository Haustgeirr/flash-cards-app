const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../src/app');
const User = require('../../src/models/userModel');
const Deck = require('../../src/models/deckModel');
const { userOne, userOneId, deckOne, deckOneId } = require('../fixtures/db');

afterAll(async (done) => {
  await User.deleteMany();
  await Deck.deleteMany();
  await new User(userOne).save();
  await new Deck(deckOne).save();
  await mongoose.connection.db.dropCollection('sessions');
  mongoose.disconnect();
  done();
});

describe('POST / delete deck', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await Deck.deleteMany();
    await new User(userOne).save();
    await new Deck(deckOne).save();
  });

  test('should receive 401 if unauthorized', async () => {
    await request(app).delete(`/api/v1/decks/${deckOneId}`).expect(401);
  });

  test('should return 400 if deck id invalid', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete(`/api/v1/decks/doesnotexist`).expect(400);
  });

  test('should return 200 if no deck id', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete(`/api/v1/decks/${deckOneId}`).expect(200);
  });

  test('user decks should be empty after delete', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete(`/api/v1/decks/${deckOneId}`);

    const res = await agent.get('/api/v1/decks/');
    expect(res.body.length).toEqual(0);
  });
});
