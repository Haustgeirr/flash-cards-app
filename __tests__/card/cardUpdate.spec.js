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
  await new Card(cardOne).save();
  await mongoose.connection.db.dropCollection('sessions');
  mongoose.disconnect();
  done();
});

describe('PATCH / update Deck', () => {
  beforeEach(async () => {
    await Deck.deleteMany();
    await User.deleteMany();
    await Card.deleteMany();
    await new User(userOne).save();
    await new Deck(deckOne).save();
    await new Card(cardOne).save();
  });

  test('should receive 200 on update', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch(`/api/v1/cards/${cardOneId}`)
      .send({ question: 'Updated Question' })
      .expect(200);
  });

  test('question on updated card should match', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const question = 'Updated Deck Name';
    const res = await agent
      .patch(`/api/v1/cards/${cardOneId}`)
      .send({ question });

    expect(res.body.question).toMatch(question);
  });

  test('answer on updated card should match', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const answer = 'Updated Deck Description';
    const res = await agent
      .patch(`/api/v1/cards/${cardOneId}`)
      .send({ answer });

    expect(res.body.answer).toMatch(answer);
  });

  test('card question should not be updated if no updates sent', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.patch(`/api/v1/cards/${cardOneId}`).send();

    expect(res.body.question).toMatch(cardOne.question);
  });

  test('card answer should not be updated if no updates sent', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.patch(`/api/v1/cards/${cardOneId}`).send();

    expect(res.body.answer).toMatch(cardOne.answer);
  });

  test('should status 400 if empty name', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch(`/api/v1/cards/${cardOneId}`)
      .send({ question: '' })
      .expect(400);
  });

  test('should receive 401 if unauthorized', async () => {
    await request(app).patch(`/api/v1/cards/${cardOneId}`).send({}).expect(401);
  });
});

describe('POST / edit card multiple users', () => {
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

  test('should status 401 if trying to edit unowned card', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch(`/api/v1/cards/${cardTwoId}`)
      .send({ question: 'Unauthorized Update' })
      .expect(401);
  });
});
