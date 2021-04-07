const sanitize = require('mongo-sanitize');

const userRepo = require('../repos/userRepo');
const deckRepo = require('../repos/deckRepo');

const { BadRequestError } = require('../utils/errors');

const createUser = async (req, res, next) => {
  try {
    const user = {
      name: sanitize(req.body.name),
      email: sanitize(req.body.email),
      password: req.body.password,
    };

    const response = await userRepo.addNewUser(user);
    res.locals.user = response;
    next();
  } catch (error) {
    next(error);
  }
};

const signInUser = async (req, res) => {
  try {
    const user = {
      user: {
        id: req.user.id,
        name: req.user.name,
      },
    };

    res.status(200).send(user);
  } catch (error) {
    res.status(401).send(error);
  }
};

const signOutUser = async (req, res) => {
  req.logout();
  res.clearCookie('remember_me');
  res.send();
};

const updateUser = async (req, res, next) => {
  const shapeUser = ({ name, email }) => {
    return {
      ...(name && sanitize({ name })),
      ...(email && sanitize({ email })),
    };
  };

  try {
    const response = await userRepo.findAndUpdateUser(
      req.user.id,
      shapeUser(req.body)
    );
    if (response.error) {
      throw new BadRequestError(response.error);
    }

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const updateUserPassword = async (req, res, next) => {
  const { id } = req.user;
  const {
    current_password: currentPassword,
    new_password: newPassword,
  } = req.body;

  try {
    await userRepo.verifyUserPassword(id, currentPassword);
    const response = await userRepo.findAndUpdateUser(id, {
      password: newPassword,
    });

    if (response.errors) {
      throw new BadRequestError(response.error);
    }

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.user;
  const { password } = req.body;
  try {
    const decks = await deckRepo.findDecks({ owner: id });
    decks.forEach(async (deck) => {
      await deckRepo.deleteDeck(deck);
    });

    const response = await userRepo.removeUser(id, password);
    req.logout();
    res.clearCookie('remember_me');
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  signInUser,
  signOutUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
