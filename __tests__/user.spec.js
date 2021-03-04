const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../src/app');
const User = require('../src/models/userModel');
const { userOne } = require('./fixtures/db');
const { response } = require('../src/app');

afterAll(async () => {
  await User.deleteMany();
  mongoose.disconnect();
});

describe('POST / Create User tests', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  test('Should receive a 201 status on correct user creation', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Test User One',
        email: 'test@test.com',
        password: 'test-test-test',
      })
      .expect('Content-Type', /json/)
      .expect(201);
  });

  test('User should have a token when created', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Test User One',
        email: 'test@test.com',
        password: 'test-test-test',
      })
      .expect(201);

    const user = await User.findById(response.body.user._id);
    expect(response.body.token).not.toBeNull();
  });

  test('Should receive a 400 if no User name', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: '',
        email: 'test@test.com',
        password: 'test-test-test',
      })
      .expect(400);
  });

  test('Should receive a 400 status if no User email', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Name',
        email: '',
        password: 'test-test-test',
      })
      .expect(400);
  });

  test('Should receive a 400 status if User email is invalid', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Name',
        email: 'test',
        password: 'test-test-test',
      })
      .expect(400);
  });

  test('Should receive a 400 status if email not unique', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Name',
        email: 'test@test.com',
        password: 'test-test-test',
      })
      .expect(201);

    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Name',
        email: 'test@test.com',
        password: 'test-test-test',
      })
      .expect(400);
  });

  test('Should receive a 400 status if no password', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Name',
        email: 'test',
      })
      .expect(400);
  });

  test('Should receive a 400 status if password too short', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Name',
        email: 'test',
        password: 'test',
      })
      .expect(400);
  });

  test('Password should be hashed', async () => {
    const password = '12345678';

    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Name',
        email: 'test@test.com',
        password,
      })
      .expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user.password).not.toBe(password);
  });
});

describe('GET User authorization tests', () => {
  beforeAll(async () => {
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('Should receive 401 if unauthorized', async () => {
    await request(app).get('/api/v1/users/profile').send().expect(401);
  });

  test('Should receive 200 if authorized', async () => {
    await request(app)
      .get('/api/v1/users/profile')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });
});

describe('POST User Login / Logout', () => {
  test('Should receive 400 without existing user', async () => {
    await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'doesnotexist@fakeemail.com',
        password: '00000000',
      })
      .expect(400);
  });

  test('Should receive 400 with incorrect password', async () => {
    await request(app)
      .post('/api/v1/users/login')
      .send({
        email: userOne.email,
        password: '00000000',
      })
      .expect(400);
  });

  test('Should receive 200 on good login', async () => {
    await request(app)
      .post('/api/v1/users/login')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);
  });

  test('Should create a token on good login', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    const user = await User.findById(response.body.user._id);
    expect(response.body.token).toBe(user.tokens[1].token);
  });

  test('Should receive 200 on logout', async () => {
    await request(app)
      .post('/api/v1/users/login')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    await request(app)
      .post('/api/v1/users/logout')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });
});
