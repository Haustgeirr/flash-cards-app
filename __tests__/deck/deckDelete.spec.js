const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../src/app');
const User = require('../../src/models/userModel');
const Deck = require('../../src/models/deckModel');
const Card = require('../../src/models/cardModel');
const {
  userOne,
  userOneId,
  userTwo,
  deckOne,
  deckOneId,
  deckTwo,
  deckTwoId,
  cardOne,
} = require('../fixtures/db');

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
  beforeEach(async (done) => {
    await User.deleteMany();
    await Deck.deleteMany();
    await new User(userOne).save();
    await new Deck(deckOne).save();
    done();
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

  test('should return 404 if no deck id', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete(`/api/v1/decks/ `).expect(404);
  });

  test('should status 200 if good request', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete(`/api/v1/decks/${deckOneId}`).expect(200);
  });

  test('users decks should be empty after delete', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete(`/api/v1/decks/${deckOneId}`);

    const decks = await Deck.find({ owner: userOneId }).exec();
    expect(decks.length).toBe(0);
  });
});

describe('POST / delete deck multiple users', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await Deck.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Deck(deckOne).save();
    await new Deck(deckTwo).save();
  });

  test('should status 401 if trying to delete unowned deck', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete(`/api/v1/decks/${deckTwoId}`).expect(401);
  });
});

describe('POST / delete deck deletes all cards', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await Deck.deleteMany();
    await new User(userOne).save();
    await new Deck(deckOne).save();
    await new Card(cardOne).save();
  });

  test('should not receive cards when find() deleted deck id', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete(`/api/v1/decks/${deckOneId}`);

    const cards = await Card.find({ deck: deckOneId }).exec();
    expect(cards.length).toBe(0);
  });
});
