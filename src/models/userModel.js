const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email address is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [8, 'Password must be 8 characters or longer'],
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

const User = mongoose.model('User', userSchema);

module.exports = User;
