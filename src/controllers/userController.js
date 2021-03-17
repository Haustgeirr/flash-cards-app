const sanitize = require('mongo-sanitize');

const {
  createNewUser,
  findAndUpdateUser,
  removeUser,
} = require('../repos/userRepo');

const CreateUser = async (req, res, next) => {
  const user = {
    name: sanitize(req.body.name),
    email: sanitize(req.body.email),
    password: req.body.password,
  };

  const response = await createNewUser(user);

  if (response.error) {
    res.status(400).send(response.error);
    return;
  }

  res.locals.user = response;

  next();
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

const UpdateUser = async (req, res) => {
  const shapeUser = ({ name, email, password }) => {
    return {
      ...(name && sanitize({ name })),
      ...(email && sanitize({ email })),
      ...(password && { password }),
    };
  };

  try {
    const shapedUpdatedUser = shapeUser(req.body);
    const response = await findAndUpdateUser(req.user.id, shapedUpdatedUser);

    if (response.error) {
      throw new Error(response.error);
    }

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

const DeleteUser = async (req, res) => {
  try {
    const response = await removeUser(req.user.id, req.body.password);

    if (response.error) {
      throw new Error(response.error);
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { CreateUser, LoginUser, LogoutUser, UpdateUser, DeleteUser };
