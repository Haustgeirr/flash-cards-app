const sanitize = require('mongo-sanitize');

const {
  createNewUser,
  findAndUpdateUser,
  removeUser,
  verifyUserPassword,
} = require('../repos/userRepo');
const { BadRequestError } = require('../utils/errors');

const CreateUser = async (req, res, next) => {
  try {
    const user = {
      name: sanitize(req.body.name),
      email: sanitize(req.body.email),
      password: req.body.password,
    };

    const response = await createNewUser(user);
    res.locals.user = response;
    next();
  } catch (error) {
    next(error);
  }
};

const LoginUser = async (req, res) => {
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

const LogoutUser = async (req, res) => {
  req.logout();
  res.clearCookie('remember_me');
  res.send();
};

const UpdateUser = async (req, res, next) => {
  const shapeUser = ({ name, email }) => {
    return {
      ...(name && sanitize({ name })),
      ...(email && sanitize({ email })),
    };
  };

  try {
    const response = await findAndUpdateUser(req.user.id, shapeUser(req.body));
    if (response.error) {
      throw new BadRequestError(response.error);
    }

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const UpdatePassword = async (req, res, next) => {
  const { id } = req.user;
  const {
    current_password: currentPassword,
    new_password: newPassword,
  } = req.body;

  try {
    await verifyUserPassword(id, currentPassword);
    const response = await findAndUpdateUser(id, { password: newPassword });

    if (response.errors) {
      throw new BadRequestError(response.error);
    }

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const DeleteUser = async (req, res, next) => {
  const { id } = req.user;
  const { password } = req.body;
  try {
    const response = await removeUser(id, password);
    req.logout();
    res.clearCookie('remember_me');
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateUser,
  LoginUser,
  LogoutUser,
  UpdateUser,
  UpdatePassword,
  DeleteUser,
};
