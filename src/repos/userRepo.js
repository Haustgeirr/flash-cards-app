const User = require('../models/userModel');
const { BadRequestError } = require('../utils/errors');

const addNewUser = async ({ name, email, password }) => {
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

const verifyUserPassword = async (id, password) => {
  const user = await User.findById(id).exec();
  const passwordsDoMatch = await user.verifyPassword(password);

  if (!passwordsDoMatch) {
    throw new BadRequestError({
      currentPassword: { message: 'Credentials do not match our records' },
    });
  }

  return user;
};

const removeUser = async (id, password) => {
  try {
    const user = await verifyUserPassword(id, password);
    await user.remove();
    return user.toJSON();
  } catch (error) {
    throw new BadRequestError(error.errors);
  }
};

const setRememberMeToken = async (user, token) => {
  user.rememberMeToken = token;
  await user.save();
};

module.exports = {
  addNewUser,
  findById,
  findByEmail,
  findByToken,
  findAndUpdateUser,
  verifyUserPassword,
  removeUser,
  setRememberMeToken,
};
