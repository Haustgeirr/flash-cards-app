const User = require('../models/userModel');

const validator = require('validator');
const { verifyPassword } = require('../models/userModel');

const createNewUser = async ({ name, email, password }) => {
  if (!name) {
    return {
      error: {
        field: 'name',
        message: 'Name is required',
      },
    };
  }

  if (!email) {
    return {
      error: {
        field: 'email',
        message: 'Email is required',
      },
    };
  }

  if (!validator.isEmail(email)) {
    return {
      error: {
        field: 'email',
        message: 'Please provide a valid email address',
      },
    };
  }

  const usernameExists = await findByEmail(email);

  if (usernameExists) {
    return {
      error: {
        field: 'email',
        message: 'Email already exists',
      },
    };
  }

  if (!password || password.length < 8) {
    return {
      error: {
        field: 'password',
        message: 'Password must be at least 8 characters',
      },
    };
  }

  const userDocument = new User({
    name,
    email,
    password,
  });

  return await userDocument.save();
};

const findById = async (id) => {
  return await User.findById(id).exec();
};

const findByEmail = async (email) => {
  return await User.findOne({ email }).exec();
};

const findAndUpdateUser = async (id, updates) => {
  const updateKeys = Object.keys(updates);

  if (updateKeys.length === 0) {
    return {
      error: {
        message: `No updates received`,
      },
    };
  }

  const user = await User.findById(id).exec();

  updateKeys.map((key) => {
    user[key] = updates[key];
  });

  await user.save();
  return user.toJSON();
};

const findByToken = async (token) => {
  return await User.findOne({ rememberMeToken: token }).exec();
};

const removeUser = async (id, password) => {
  const user = await User.findById(id).exec();

  const passwordsDoMatch = await user.verifyPassword(password);

  if (!passwordsDoMatch) {
    return { error: { field: 'password', message: 'Passwords do not match' } };
  }

  await user.remove();
  return user.toJSON();
};

const setRememberMeToken = async (user, token) => {
  user.rememberMeToken = token;
  await user.save();
};

module.exports = {
  createNewUser,
  findById,
  findByEmail,
  findByToken,
  findAndUpdateUser,
  removeUser,
  setRememberMeToken,
};
