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

describe('PATCH /me update user', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('should receive 401 if unauthorized', async () => {
    await request(app).patch('/api/v1/users/me').send({}).expect(401);
  });

  test('should receive 200 if no data sent', async () => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.patch('/api/v1/users/me').send({}).expect(200);
  });

  test('should receive 200 on patch name ', async () => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch('/api/v1/users/me')
      .send({ name: 'Updated Name' })
      .expect(200);
  });

  test('should receive 200 on patch email ', async () => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch('/api/v1/users/me')
      .send({ email: 'updatedemail@test.com' })
      .expect(200);
  });

  test('users name should be updated after patch', async () => {
    let agent = request.agent(app);
    const name = 'Updated Name';

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.patch('/api/v1/users/me').send({ name });

    const user = await User.findById(userOneId);
    expect(user.name).toBe(name);
  });

  test('should receive 400 if email is not unique', async () => {
    await new User(userTwo).save();
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch('/api/v1/users/me')
      .send({ email: userTwo.email })
      .expect(400);
  });

  test('users email should be updated after patch', async () => {
    let agent = request.agent(app);
    const email = 'updatedemail@test.com';

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.patch('/api/v1/users/me').send({ email });
    const user = await User.findById(userOneId);
    expect(user.email).toBe(email);
  });

  test('user can sign in after changing email', async () => {
    let agent = request.agent(app);
    const email = 'updatedemail@test.com';

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.patch('/api/v1/users/me').send({ email });

    await agent.post('/api/v1/users/signout').send({});

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: email,
        password: userOne.password,
      })
      .expect(200);
  });

  test('user cannot sign in with old email after changing it', async () => {
    let agent = request.agent(app);
    const email = 'updatedemail@test.com';

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.patch('/api/v1/users/me').send({ email });

    await agent.post('/api/v1/users/signout').send({});

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(401);
  });
});

describe('PATCH /change_password update user password', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('users password should be updated after patch', async () => {
    let agent = request.agent(app);
    const password = '87654321';

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch('/api/v1/users/change_password')
      .send({ current_password: userOne.password, new_password: password });

    const user = await User.findById(userOneId);
    expect(await user.verifyPassword(password)).toBe(true);
  });

  test('user can sign in after changing password', async () => {
    let agent = request.agent(app);
    const password = '87654321';

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch('/api/v1/users/change_password')
      .send({ current_password: userOne.password, new_password: password });

    await agent.post('/api/v1/users/signout').send({});

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: password,
      })
      .expect(200);
  });

  test('user cannot sign in with old password after changing it', async () => {
    let agent = request.agent(app);
    const password = '87654321';

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch('/api/v1/users/change_password')
      .send({ current_password: userOne.password, new_password: password });

    await agent.post('/api/v1/users/signout').send({});

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(401);
  });

  test('user is still signed in after changing details', async () => {
    let agent = request.agent(app);
    const password = '87654321';

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent
      .patch('/api/v1/users/change_password')
      .send({ current_password: userOne.password, new_password: password });

    await agent.get('/api/v1/users/me').expect(200);
  });
});
