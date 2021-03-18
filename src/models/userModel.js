const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { BadRequestError } = require('../utils/errors');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email is already in use'],
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Please enter a valid Email address');
        }
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Passwords must be 8 characters or longer'],
      trim: true,
    },
    rememberMeToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userJson = {
    id: user._id,
    name: user.name,
  };

  return userJson;
};

userSchema.methods.verifyPassword = async function (password) {
  const user = this;
  const passwordsDoMatch = await bcrypt.compare(password, user.password);
  return passwordsDoMatch;
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;

  next();
});

userSchema.post('save', (error, res, next) => {
  // console.log('userSchema.post', Object.keys(error));
  // console.log('userSchema.post', Object.keys(error.errors));
  // console.log('userSchema.post', Object.keys(error.errors.email));
  // console.log('userSchema.post', error.errors.email.reason);

  if (error.name === 'MongoError' && error.code === 11000) {
    next(
      new BadRequestError({ email: { message: 'Email is already in use' } })
    );
  }

  if (error.name === 'ValidationError') {
    const errorKeys = Object.keys(error.errors);
    const shapedErrors = {};

    errorKeys.map((key) => {
      shapedErrors[key] = { message: error.errors[key].message };
    });
    // const shapedErrors = errorKeys.map((key) => {
    //   return { [key]: { message: error.errors[key].message } };
    // });

    // console.log('shapedErrors', shapedErrors);

    next(new BadRequestError(shapedErrors));
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
