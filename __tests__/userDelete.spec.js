const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../src/app');
const User = require('../src/models/userModel');
const { userOne, userOneId, userTwo } = require('./fixtures/db');

afterAll(async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await mongoose.connection.db.dropCollection('sessions');
  await mongoose.disconnect();
});

describe('DELETE /me update deletion', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('receives 200 when sucessefully deleting the user', async () => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .delete('/api/v1/users/me')
      .send({
        password: userOne.password,
      })
      .expect(200);
  });

  test('user no longer exists after deletion', async () => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.delete('/api/v1/users/me').send({
      password: userOne.password,
    });

    const user = await User.findById(userOneId);
    expect(user).toBe(null);
  });

  test('receives 400 when supplying incorrect password', async () => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .delete('/api/v1/users/me')
      .send({
        password: '00000000',
      })
      .expect(400);
  });

  test('receives 404 when trying to delete non-existant user', async () => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });
  });

  test('receives 401 if not logged in', async () => {
    await request(app).delete('/api/v1/users/me').expect(401);
  });
});
