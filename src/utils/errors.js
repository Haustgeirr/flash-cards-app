class BadRequestError extends Error {
  constructor(error) {
    super(error.message);
    this.errors = error;
    this.statusCode = 400;
  }
}

module.exports = { BadRequestError };
