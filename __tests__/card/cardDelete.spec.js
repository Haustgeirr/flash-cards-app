const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../src/app');
const User = require('../../src/models/userModel');
const Deck = require('../../src/models/deckModel');
const Card = require('../../src/models/cardModel');
const {
  userOne,
  userTwo,
  deckOne,
  deckOneId,
  deckTwo,
  cardOne,
  cardOneId,
  cardTwo,
  cardTwoId,
} = require('../fixtures/db');

afterAll(async (done) => {
  await User.deleteMany();
  await Deck.deleteMany();
  await Card.deleteMany();
  await new User(userOne).save();
  await new Deck(deckOne).save();
  await new Card(cardOne).save();
  await mongoose.connection.db.dropCollection('sessions');
  mongoose.disconnect();
  done();
});

describe('POST / delete card', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await Deck.deleteMany();
    await Card.deleteMany();
    await new User(userOne).save();
    await new Deck(deckOne).save();
    await new Card(cardOne).save();
  });

  test('should receive 401 if unauthorized', async () => {
    await request(app).delete(`/api/v1/cards/${cardOneId}`).expect(401);
  });

  test('should return 400 if card id invalid', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete(`/api/v1/cards/doesnotexist`).expect(400);
  });

  test('should status 404 if no card id', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete('/api/v1/cards/ ').expect(404);
  });

  test('should status 200 on good request', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete(`/api/v1/cards/${cardOneId}`).expect(200);
  });

  test('deck cards should be empty after delete', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete(`/api/v1/cards/${cardOneId}`);

    const deck = await Deck.findById(deckOneId);
    await deck.populate('cards').execPopulate();

    expect(deck.cards.length).toBe(0);
  });
});

describe('POST / delete card multiple users', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await Deck.deleteMany();
    await Card.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Deck(deckOne).save();
    await new Deck(deckTwo).save();
    await new Card(cardOne).save();
    await new Card(cardTwo).save();
  });

  test('should status 401 if trying to delete unowned card', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete(`/api/v1/cards/${cardTwoId}`).expect(401);
  });
});
