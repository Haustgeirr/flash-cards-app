const User = require('../models/userModel');

const createNewUser = async ({ name, email, password }) => {
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
  const user = await User.findById(id).exec();

  if (updateKeys.length === 0) {
    return { user: user.toJSON() };
  }

  updateKeys.map((key) => {
    user[key] = updates[key];
  });

  await user.save();
  return { user: user.toJSON() };
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
