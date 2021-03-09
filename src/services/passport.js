const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const RememberMeStrategy = require('passport-remember-me').Strategy;

const randomString = require('../utils/utils');
const {
  findById,
  findByUsername,
  findByToken,
  setRememberMeToken,
} = require('../repos/userRepo');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    findByUsername(username)
      .then(async (user) => {
        if (!user) {
          return done(null, false, { error: 'Failed to login' });
        }

        const passwordsDoMatch = await user.verifyPassword(password);
        if (!passwordsDoMatch) {
          return done(null, false);
        }

        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.use(
  new RememberMeStrategy((token, done) => {
    consumeRememberMeToken(token, function (err, uid) {
      if (err) {
        return done(err);
      }

      if (!uid) {
        return done(null, false);
      }

      findById(uid).then((user) => {
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      });
    });
  }, issueToken)
);

function issueToken(user, done) {
  var token = randomString(64);
  saveRememberMeToken(user, token, (err) => {
    if (err) {
      return done(err);
    }

    return done(null, token);
  });
}

const consumeRememberMeToken = (token, fn) => {
  const user = findByToken(token).then((user) => {
    if (!user) {
      return fn();
    }
    console.log('consumeToken', user);
    setRememberMeToken(user, '');

    return fn(null, user._id);
  });
};

const saveRememberMeToken = (user, token, fn) => {
  setRememberMeToken(user, token);

  return fn();
};

module.exports = issueToken;
