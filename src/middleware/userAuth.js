const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const jwtToken = process.env.JWT_SECRET;

const userAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = jwt.verify(token, jwtToken);
    const user = await User.findOne({
      _id: decodedToken._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ error: 'Authorization failed.' });
  }
};

module.exports = userAuth;
