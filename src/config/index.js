const isProduction = process.env.NODE_ENV === 'production';

const devApiConfig = {
  baseUrl: 'http://localhost:5000/api/v1',
  sessionCookieMaxAge: 365 * 24 * 3600 * 1000,
  rememberMeCookieMaxAge: 365 * 24 * 3600 * 1000,
  secure: false,
};

const prodApiConfig = {
  baseUrl: `${process.env.HEROKU_ORIGIN}/api/v1`,
  sessionCookieMaxAge: 3600 * 1000,
  rememberMeCookieMaxAge: 7 * 24 * 3600 * 1000,
  secure: true,
};

const apiConfig = isProduction ? prodApiConfig : devApiConfig;

module.exports = { isProduction, apiConfig };
