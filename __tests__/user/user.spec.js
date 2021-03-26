const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../src/app');
const User = require('../../src/models/userModel');
const { userOne, userOneId } = require('../fixtures/db');
const extractCookies = require('../fixtures/extractCookies');

afterAll(async (done) => {
  await User.deleteMany();
  await new User(userOne).save();
  await mongoose.connection.db.dropCollection('sessions');
  mongoose.disconnect();
  done();
});

describe('POST /signup', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  test('Should receive a 201 status on correct user creation', async () => {
    await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Jest',
        email: 'jest@test.com',
        password: '12345678',
      })
      .expect(201);
  });

  test('Should receive user object on good signup', async () => {
    const res = await request(app).post('/api/v1/users/signup').send({
      name: 'Jest',
      email: 'jest@test.com',
      password: '12345678',
    });

    expect(res.body.user).toBeDefined;
  });

  test('Should receive a 400 if no user name', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'jest@test.com',
        password: '12345678',
      })
      .expect(400);
  });

  test('Should receive a 400 status if no email', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Jest',
        email: '',
        password: '12345678',
      })
      .expect(400);
  });

  test('Should receive a 400 status if User email is invalid', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Jest',
        email: 'jest',
        password: 'test-test-12345678',
      })
      .expect(400);
  });

  test('Should receive a 400 status if email not unique', async () => {
    await request(app).post('/api/v1/users/signup').send({
      name: 'Jest',
      email: 'jest@test.com',
      password: '12345678',
    });

    await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'jest',
        email: 'jest@test.com',
        password: '12345678',
      })
      .expect(400);
  });

  test('Should receive a 400 status if no password', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Jest',
        email: 'jest@test.com',
      })
      .expect(400);
  });

  test('Should receive a 400 status if password too short', async () => {
    await request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Jest',
        email: 'jest@test.com',
        password: '1234',
      })
      .expect(400);
  });

  test('Password should be hashed', async () => {
    const password = '12345678';

    const response = await request(app).post('/api/v1/users/signup').send({
      name: 'Jest',
      email: 'jest@test.com',
      password,
    });

    const user = await User.findById(response.body.id);
    expect(user.password).not.toBe(password);
  });
});

describe('POST /signin /signout', () => {
  beforeAll(async () => {
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('Should receive 200 on good signin', async () => {
    await request(app)
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);
  });

  test('Should receive user object on good signin', async () => {
    const res = await request(app).post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    expect(res.body.user).toBeDefined;
  });

  test('Should set a remember_me cookie when remember_me: true', async () => {
    let agent = request.agent(app);

    const res = await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
      remember_me: true,
    });

    const cookies = extractCookies(res.headers);
    expect(cookies['remember_me']).toBeDefined();
  });

  test('Should receive 400 without existing user', async () => {
    await request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'doesnotexist@fakeemail.com',
        password: '00000000',
      })
      .expect(401);
  });

  test('Should receive 401 with incorrect password', async () => {
    await request(app)
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: '00000000',
      })
      .expect(401);
  });

  test('Should receive 200 on signout', async () => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.post('/api/v1/users/signout').send();
    expect(res.status).toBe(200);
  });
});

describe('GET /current_user', () => {
  beforeAll(async () => {
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('current_user should res 200 if authorized', async () => {
    let agent = request.agent(app);

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    await agent.get('/api/v1/users/current_user').send().expect(200);
  });

  test('Should receive user object if authorized', async () => {
    let agent = request.agent(app);

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    const res = await agent
      .get('/api/v1/users/current_user')
      .send()
      .expect(200);

    expect(res.body.user).toBeDefined;
  });

  test('Should receive 200 if unauthorized', async () => {
    await request(app).get('/api/v1/users/current_user').send().expect(200);
  });
});

describe('GET /me', () => {
  beforeAll(async () => {
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('/me Should res 200 if authorized', async () => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.get('/api/v1/users/me').send().expect(200);
  });

  test('Should receive a user object if authorized', async () => {
    let agent = request.agent(app);

    const res = await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    expect(res.body.user).toBeDefined();
  });

  test('Should receive 401 if unauthorized', async () => {
    await request(app).get('/api/v1/users/me').send().expect(401);
  });
});
