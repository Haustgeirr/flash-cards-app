require('dotenv').config();

module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ['<rootDir>/__tests__/'],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/fixtures',
    '<rootDir>/public/app/node_modules',
  ],
};
