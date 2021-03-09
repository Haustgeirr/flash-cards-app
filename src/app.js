const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const { apiConfig } = require('./config');
const v1Router = require('./api/v1');
require('./db/mongoose');
require('./services/passport');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// CORS setup
const corsOptions = {
  origin: 'http://localhost:3000',
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

if (process.env.NODE_ENV === 'production') {
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

module.exports = app;
