const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../src/app');
const User = require('../../src/models/userModel');
const Deck = require('../../src/models/deckModel');
const Card = require('../../src/models/cardModel');
const { userOne, userOneId, deckOne, deckOneId } = require('../fixtures/db');

afterAll(async (done) => {
  await User.deleteMany();
  await new User(userOne).save();
  await mongoose.connection.db.dropCollection('sessions');
  mongoose.disconnect();
  done();
});

describe('POST / create new card', () => {
  beforeEach(async () => {
    await Deck.deleteMany();
    await User.deleteMany();
    await Card.deleteMany();
    await new User(userOne).save();
    await new Deck(deckOne).save();
  });

  test('should return 400 if no card question', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .post(`/api/v1/decks/${deckOneId}/cards`)
      .send({ answer: 'Answer' })
      .expect(400);
  });

  test('should return 400 if no card answer', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .post(`/api/v1/decks/${deckOneId}/cards`)
      .send({ question: 'Question' })
      .expect(400);
  });

  test('should return 200 if successful create card', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .post(`/api/v1/decks/${deckOneId}/cards`)
      .send({ question: 'Question', answer: 'Answer' })
      .expect(200);
  });

  test('card db should contain created card', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent
      .post(`/api/v1/decks/${deckOneId}/cards`)
      .send({ question: 'Can I be found?', answer: 'Yes' });
    expect(Card.findById(res.body.id)).toBeDefined();
  });

  test('deck should have reference to created card', async () => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.post(`/api/v1/decks/${deckOneId}/cards`).send({
      question: 'Question',
      answer: 'Answer',
    });

    const deck = await Deck.findById(deckOneId);
    await deck.populate('cards').execPopulate();

    expect(deck.cards.length).toBe(1);
  });

  test('should receive 401 if unauthorized', async () => {
    await request(app)
      .post(`/api/v1/decks/${deckOneId}/cards`)
      .send({})
      .expect(401);
  });
});
