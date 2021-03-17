const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../src/app');
const User = require('../src/models/userModel');
const { userOne, userOneId } = require('./fixtures/db');
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

describe('POST User Signin / Logout', () => {
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

describe('GET /current_user auth tests', () => {
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

describe('GET /me authorization tests', () => {
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

describe('PATCH /me update user', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
  });

  test('should receive 401 if unauthorized', async () => {
    await request(app).patch('/api/v1/users/me').send({}).expect(401);
  });

  test('should receive 400 if no data sent', async () => {
    let agent = request.agent(app);

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    await agent.patch('/api/v1/users/me').send({}).expect(400);
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

  test('users name should be updated after patch', async () => {
    let agent = request.agent(app);
    const name = 'Updated Name';

    await agent.post('/api/v1/users/signin').send({
      email: userOne.email,
      password: userOne.password,
    });

    const res = await agent.patch('/api/v1/users/me').send({ name });

    const user = await User.findById(userOneId);
    expect(user.name).toBe(name);
  });

  test('users email should be updated after patch', async () => {
    let agent = request.agent(app);
    const email = 'updatedemail@test.com';

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    const res = await agent
      .patch('/api/v1/users/me')
      .send({ email })
      .expect(200);

    const user = await User.findById(userOneId);
    expect(user.email).toBe(email);
  });

  test('user can sign in after changing email', async () => {
    let agent = request.agent(app);
    const email = 'updatedemail@test.com';

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    await agent.patch('/api/v1/users/me').send({ email }).expect(200);

    await agent.post('/api/v1/users/signout').send({}).expect(200);

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

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    await agent.patch('/api/v1/users/me').send({ email }).expect(200);

    await agent.post('/api/v1/users/signout').send({}).expect(200);

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(401);
  });

  test('users password should be updated after patch', async () => {
    let agent = request.agent(app);
    const password = '87654321';

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    const res = await agent
      .patch('/api/v1/users/me')
      .send({ password })
      .expect(200);

    const user = await User.findById(userOneId);
    expect(await user.verifyPassword(password)).toBe(true);
  });

  test('user can sign in after changing password', async () => {
    let agent = request.agent(app);
    const password = '87654321';

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    await agent.patch('/api/v1/users/me').send({ password }).expect(200);

    await agent.post('/api/v1/users/signout').send({}).expect(200);

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

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    await agent.patch('/api/v1/users/me').send({ password }).expect(200);

    await agent.post('/api/v1/users/signout').send({}).expect(200);

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

    await agent
      .post('/api/v1/users/signin')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    await agent.patch('/api/v1/users/me').send({ password }).expect(200);

    await agent.get('/api/v1/users/me').expect(200);
  });
});

describe('DELETE /me', () => {
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
