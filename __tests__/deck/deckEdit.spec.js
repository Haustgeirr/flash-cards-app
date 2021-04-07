const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../src/app');
const User = require('../../src/models/userModel');
const Deck = require('../../src/models/deckModel');
const {
  userOne,
  userTwo,
  deckOne,
  deckOneId,
  deckTwo,
  deckTwoId,
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

describe('PATCH / update Deck', () => {
  beforeEach(async () => {
    await Deck.deleteMany();
    await User.deleteMany();
    await new User(userOne).save();
    await new Deck(deckOne).save();
  });

  test('should receive 200 on update', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch(`/api/v1/decks/${deckOneId}`)
      .send({ name: 'Updated Deck Name' })
      .expect(200);
  });

  test('name on updated deck should match', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const name = 'Updated Deck Name';
    const res = await agent.patch(`/api/v1/decks/${deckOneId}`).send({ name });

    expect(res.body.name).toMatch(name);
  });

  test('description on updated deck should match', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const description = 'Updated Deck Description';
    const res = await agent
      .patch(`/api/v1/decks/${deckOneId}`)
      .send({ description });

    expect(res.body.description).toMatch(description);
  });

  test('deck name should not be updated if no updates sent', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.patch(`/api/v1/decks/${deckOneId}`).send();

    expect(res.body.name).toMatch(deckOne.name);
  });

  test('deck description should not be updated if no updates sent', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.patch(`/api/v1/decks/${deckOneId}`).send();

    expect(res.body.description).toMatch(deckOne.description);
  });

  test('should status 400 if empty name', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch(`/api/v1/decks/${deckOneId}`)
      .send({ name: '' })
      .expect(400);
  });

  test('should receive 401 if unauthorized', async () => {
    await request(app).patch(`/api/v1/decks/${deckOneId}`).send({}).expect(401);
  });
});

describe('POST / edit deck multiple users', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await Deck.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Deck(deckOne).save();
    await new Deck(deckTwo).save();
  });

  test('should status 401 if trying to edit unowned deck', async () => {
    let agent = request.agent(app);
    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch(`/api/v1/decks/${deckTwoId}`)
      .send({ name: '' })
      .expect(401);
  });
});
