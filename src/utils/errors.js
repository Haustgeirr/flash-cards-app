class BadRequestError extends Error {
  constructor(error) {
    super(error.message);
    this.errors = error;
    this.statusCode = 400;
  }
}

class UnauthorisedError extends Error {
  constructor(error) {
    super(error.message);
    this.errors = error;
    this.statusCode = 401;
  }
}

module.exports = { BadRequestError, UnauthorisedError };
