const isProduction = process.env.NODE_ENV === 'production';

const devApiConfig = {
  baseUrl: 'http://localhost:5000/api/v1',
  sessionCookieMaxAge: 60 * 1000,
  rememberMeCookieMaxAge: 10 * 60 * 1000,
};

const prodApiConfig = {
  baseUrl: '',
  sessionCookieMaxAge: 20 * 60 * 1000,
  rememberMeCookieMaxAge: 7 * 24 * 3600 * 1000,
};

const apiConfig = isProduction ? prodApiConfig : devApiConfig;

module.exports = { apiConfig };
