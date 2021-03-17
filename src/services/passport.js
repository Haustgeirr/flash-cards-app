const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const RememberMeStrategy = require('passport-remember-me').Strategy;

const randomString = require('../utils/utils');
const {
  findById,
  findByEmail,
  findByToken,
  setRememberMeToken,
} = require('../repos/userRepo');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  findById(id).then((user) => {
    done(null, user.toJSON());
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (username, password, done) => {
      findByEmail(username)
        .then(async (user) => {
          if (!user) {
            return done(null, false, { error: 'Failed to sign in' });
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
    }
  )
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
  findByToken(token).then((user) => {
    if (!user) {
      return fn();
    }
    setRememberMeToken(user, '');

    return fn(null, user._id);
  });
};

const saveRememberMeToken = (user, token, fn) => {
  setRememberMeToken(user, token);

  return fn();
};

module.exports = issueToken;
