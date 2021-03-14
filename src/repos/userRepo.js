const User = require('../models/userModel');

const createNewUser = async (user) => {
  const userDocument = new User({
    name: user.name,
    email: user.username,
    password: user.password,
  });

  return await userDocument.save();
};

const findById = async (id) => {
  return await User.findById(id).exec();
};

const findByUsername = async (username) => {
  return await User.findOne({ email: username }).exec();
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
