const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../src/app');
const User = require('../../src/models/userModel');
const Deck = require('../../src/models/deckModel');
const Card = require('../../src/models/cardModel');
const { userOne, deckOne, deckOneId } = require('../fixtures/db');

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

describe('POST / create new card', () => {
  beforeEach(async (done) => {
    await Deck.deleteMany();
    await User.deleteMany();
    await Card.deleteMany();
    await new User(userOne).save();
    await new Deck(deckOne).save();
    done();
  });

  test('should return 400 if no card owner', async (done) => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .post('/api/v1/cards')
      .send({ question: 'Question', answer: 'Answer' })
      .expect(400);
    done();
  });

  test('should return 400 if no card question', async (done) => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .post('/api/v1/cards')
      .send({ deck: deckOneId, answer: 'Answer' })
      .expect(400);
    done();
  });

  test('should return 400 if no card answer', async (done) => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .post('/api/v1/cards')
      .send({ deck: deckOneId, question: 'Question' })
      .expect(400);

    done();
  });

  test('should status 200 if successful create card', async (done) => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .post('/api/v1/cards')
      .send({ deck: deckOneId, question: 'Question', answer: 'Answer' })
      .expect(200);
    done();
  });

  test('card db should contain created card', async (done) => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent
      .post('/api/v1/cards')
      .send({ owner: deckOneId, question: 'Can I be found?', answer: 'Yes' });
    expect(Card.findById(res.body.id)).toBeDefined();
    done();
  });

  test('deck should have reference to created card', async (done) => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.post('/api/v1/cards').send({
      deck: deckOneId,
      question: 'Question',
      answer: 'Answer',
    });

    const deck = await Deck.findById(deckOneId);
    await deck.populate('cards').execPopulate();

    expect(deck.cards.length).toBe(1);
    done();
  });

  test('should receive 401 if unauthorized', async (done) => {
    await request(app).post('/api/v1/cards').send({}).expect(401);
    done();
  });
});
