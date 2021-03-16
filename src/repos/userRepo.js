const User = require('../models/userModel');

const validator = require('validator');

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

  const usernameExists = await findByUsername(email);

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

  return await (await userDocument.save()).toJSON();
};

const findById = async (id) => {
  return await User.findById(id).exec();
};

const findByUsername = async (email) => {
  return await User.findOne({ email }).exec();
};

const findByToken = async (token) => {
  return await User.findOne({ rememberMeToken: token }).exec();
};

const setRememberMeToken = async (user, token) => {
  user.rememberMeToken = token;
  user.save();
};

module.exports = {
  createNewUser,
  findById,
  findByUsername,
  findByToken,
  setRememberMeToken,
};
