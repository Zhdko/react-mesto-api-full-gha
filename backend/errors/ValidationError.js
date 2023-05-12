module.exports = class RequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
