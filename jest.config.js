require('dotenv').config();
module.exports = {
  collectCoverage: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/__tests__/fixtures'],
};
