function randomString(length) {
  let buffer = [];
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ';
  let charsLength = chars.length;

  for (let i = 0; i < length; i++) {
    buffer.push(chars[getRandomInt(0, charsLength - 1)]);
  }
  return buffer.join('');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const ObjectId = require('mongoose').Types.ObjectId;

function isValidObjectId(id) {
  if (String(new ObjectId(id)) === id) {
    return true;
  }
  return false;
}

module.exports = { randomString, isValidObjectId };
