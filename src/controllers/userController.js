const sanitize = require('mongo-sanitize');

const { createNewUser } = require('../repos/userRepo');

const CreateUser = async (req, res, next) => {
  const user = {
    name: sanitize(req.body.name),
    email: sanitize(req.body.username),
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
        id: req.user._id,
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

module.exports = { CreateUser, LoginUser, LogoutUser };
