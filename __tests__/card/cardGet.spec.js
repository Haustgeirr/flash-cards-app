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
  userTwoId,
  deckOne,
  deckOneId,
  deckTwo,
  deckTwoId,
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
  await mongoose.connection.db.dropCollection('sessions');
  mongoose.disconnect();
  done();
});

describe('GET / get card from deck', () => {
  beforeEach(async () => {
    await Deck.deleteMany();
    await User.deleteMany();
    await Card.deleteMany();
    await new User(userOne).save();
    await new Deck(deckOne).save();
    await new Card(cardOne).save();
  });

  test('should receive 200 on get', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.get(`/api/v1/decks/${deckOneId}`).expect(200);
  });

  test('res should contain cards on get', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.get(`/api/v1/decks/${deckOneId}/cards`);
    expect(cardOneId.toString()).toMatch(res.body[0].id);
  });

  test('status 401 if not auth', async () => {
    await request(app).get(`/api/v1/decks/${deckOneId}/cards`).expect(401);
  });
});

describe('GET / get card when user has no decks', () => {
  beforeEach(async () => {
    await Deck.deleteMany();
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('should receive 400 on get when user has no decks', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.get(`/api/v1/decks/${deckOneId}/cards`).expect(400);
  });
});

describe('GET /:id get single card', () => {
  beforeEach(async () => {
    await Deck.deleteMany();
    await User.deleteMany();
    await Card.deleteMany();
    await new User(userOne).save();
    await new Deck(deckOne).save();
    await new Card(cardOne).save();
  });

  test('should receive 200 on get', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.get(`/api/v1/cards/${cardOneId}`).expect(200);
  });

  test('res should contain specified card', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.get(`/api/v1/cards/${cardOneId}`);
    expect(res.body.id).toEqual(cardOneId.toString());
  });

  test('status 400 if deck does not exist', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.get(`/api/v1/cards/doesnotexist`).expect(400);
  });

  test('status 401 if not auth', async () => {
    await request(app).get(`/api/v1/cards/${cardOneId}`).expect(401);
  });
});

describe('GET / decks for different users', () => {
  beforeEach(async () => {
    await Deck.deleteMany();
    await User.deleteMany();
    await Card.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Deck(deckOne).save();
    await new Deck(deckTwo).save();
    await new Card(cardTwo).save();
  });

  test('should status 401 when get unowned deck', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    agent.get(`/api/v1/cards/${cardTwoId}`).expect(401);
  });
});
