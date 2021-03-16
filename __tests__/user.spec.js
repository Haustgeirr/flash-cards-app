const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../src/app');
const User = require('../src/models/userModel');
const { userOne } = require('./fixtures/db');
const { response } = require('../src/app');
const extractCookies = require('./fixtures/extractCookies');

afterAll(async () => {
  await mongoose.disconnect();
});

describe('POST / Create User tests', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  test('Should receive a 201 status on correct user creation', async () => {
    await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Jest',
        username: 'jest@test.com',
        password: '12345678',
      })
      .expect(201);
  });

  test('Should receive a 400 if no user name', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'jest@test.com',
        password: '12345678',
      })
      .expect(400);
  });

  test('Should receive a 400 status if no username', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Jest',
        username: '',
        password: '12345678',
      })
      .expect(400);
  });

  test('Should receive a 400 status if User username is invalid', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Jest',
        username: 'jest',
        password: 'test-test-12345678',
      })
      .expect(400);
  });

  test('Should receive a 400 status if username not unique', async () => {
    await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Jest',
        username: 'jest@test.com',
        password: '12345678',
      })
      .expect(201);

    await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'jest',
        username: 'jest@test.com',
        password: '12345678',
      })
      .expect(400);
  });

  test('Should receive a 400 status if no password', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Jest',
        username: 'jest@test.com',
      })
      .expect(400);
  });

  test('Should receive a 400 status if password too short', async () => {
    await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Jest',
        username: 'jest@test.com',
        password: '1234',
      })
      .expect(400);
  });

  test('Password should be hashed', async () => {
    const password = '12345678';

    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Jest',
        username: 'jest@test.com',
        password,
      })
      .expect(201);

    const user = await User.findById(response.body.id);
    expect(user.password).not.toBe(password);
  });
});

describe('POST User Login / Logout', () => {
  beforeAll(async () => {
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('Should receive 200 on good login', async () => {
    await request(app)
      .post('/api/v1/users/login')
      .send({
        username: userOne.email,
        password: userOne.password,
      })
      .expect(200);
  });

  test('Should set a remember_me cookie when remember_me: true', async () => {
    let agent = request.agent(app);

    const res = await agent
      .post('/api/v1/users/login')
      .send({
        username: userOne.email,
        password: userOne.password,
        remember_me: true,
      })
      .expect(200);

    const cookies = extractCookies(res.headers);
    expect(cookies['remember_me']).toBeDefined();
  });

  test('Should receive 400 without existing user', async () => {
    await request(app)
      .post('/api/v1/users/login')
      .send({
        username: 'doesnotexist@fakeemail.com',
        password: '00000000',
      })
      .expect(401);
  });

  test('Should receive 400 with incorrect password', async () => {
    await request(app)
      .post('/api/v1/users/login')
      .send({
        username: userOne.email,
        password: '00000000',
      })
      .expect(401);
  });

  test('Should receive 200 on logout', async () => {
    let agent = request.agent(app);

    await agent
      .post('/api/v1/users/login')
      .send({
        username: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    const res = await agent.post('/api/v1/users/logout').send();
    expect(res.status).toBe(200);
  });
});

describe('GET User authorization tests', () => {
  beforeAll(async () => {
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('Should receive 200 if authorized', async () => {
    let agent = request.agent(app);

    await agent
      .post('/api/v1/users/login')
      .send({
        username: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    agent.get('/api/v1/users/me').send().expect(200);
  });

  test('Should receive 401 if unauthorized', async () => {
    await request(app).get('/api/v1/users/me').send().expect(401);
  });
});
