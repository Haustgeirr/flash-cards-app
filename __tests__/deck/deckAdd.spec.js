const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../src/app');
const User = require('../../src/models/userModel');
const Deck = require('../../src/models/deckModel');
const { userOne, userOneId, deckOne } = require('../fixtures/db');

afterAll(async (done) => {
  await User.deleteMany();
  await new User(userOne).save();
  await new Deck(deckOne).save();
  await mongoose.connection.db.dropCollection('sessions');
  mongoose.disconnect();
  done();
});

describe('POST / create new deck', () => {
  beforeEach(async () => {
    await Deck.deleteMany();
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('should return 400 if no deck name', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.post('/api/v1/decks').send({}).expect(400);
  });

  test('should return 200 on successful create deck', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.post('/api/v1/decks').send({ name: 'Test Deck' }).expect(200);
  });

  test('deck db should contain created deck', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.post('/api/v1/decks').send({ name: 'Find Me' });
    expect(Deck.findById(res.body.id)).toBeDefined();
  });

  test('user should have reference to create deck', async () => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.post('/api/v1/decks').send({
      name: 'Test Deck',
    });

    const user = await User.findById(userOneId);
    await user.populate('decks').execPopulate();

    expect(user.decks.length).toBe(1);
  });

  test('should receive 401 if unauthorized', async () => {
    await request(app).post('/api/v1/decks').send({}).expect(401);
  });
});
