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
  await mongoose.connection.db.dropCollection('sessions');
  mongoose.disconnect();
  done();
});

describe('GET / get decks for a user', () => {
  beforeEach(async () => {
    await Deck.deleteMany();
    await User.deleteMany();
    await new User(userOne).save();
    await new Deck(deckOne).save();
  });

  test('should receive 200 on get', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.get('/api/v1/decks').expect(200);
  });

  test('res should contain decks on get', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.get('/api/v1/decks');
    expect(res.body.id).toEqual(deckOne.id);
  });

  test('status 401 if not auth', async () => {
    await request(app).get('/api/v1/decks').expect(401);
  });
});

describe('GET / get decks when user has no decks', () => {
  beforeEach(async () => {
    await Deck.deleteMany();
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('should receive 200 on get', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.get('/api/v1/decks').expect(200);
  });

  test('res should be an empty array on get', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.get('/api/v1/decks');
    expect(res.body).toEqual([]);
  });
});

describe('GET /:id get single deck', () => {
  beforeEach(async () => {
    await Deck.deleteMany();
    await User.deleteMany();
    await new User(userOne).save();
    await new Deck(deckOne).save();
  });

  test('should receive 200 on get', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.get(`/api/v1/decks/${deckOneId}`).expect(200);
  });

  test('res should contain specified deck', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.get(`/api/v1/decks/${deckOneId}`);
    expect(res.body.id).toMatch(deckOneId.toString());
  });

  test('status 400 if deck does not exist', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.get(`/api/v1/decks/doesnotexist`).expect(400);
  });

  test('status 401 if not auth', async () => {
    await request(app).get(`/api/v1/decks/${deckOneId}`).expect(401);
  });
});
