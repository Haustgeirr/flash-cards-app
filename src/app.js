const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const path = require('path');

const { isProduction, apiConfig } = require('./config');
const v1Router = require('./api/v1');
const errorHandler = require('./middleware/errorHandler');
require('./db/mongoose');
require('./services/passport');

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS setup
const corsOptions = {
  origin: isProduction ? process.env.CORS_ORIGIN : 'http://localhost:3000',
};

app.use(cors(corsOptions));

const mongoURL = process.env.MONGO_URL;

//Session Cookie
const sess = {
  secret: process.env.COOKIE_SECRET,
  store: MongoStore.create({
    mongoUrl: mongoURL,
  }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: apiConfig.sessionCookieMaxAge,
  },
};

if (isProduction) {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(session(sess));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

// Routes
app.use('/api/v1', v1Router);

if (isProduction) {
  app.use(express.static('public/app/build'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../public', 'app', 'build', 'index.html')
    );
  });
}

app.use(errorHandler);

module.exports = app;
