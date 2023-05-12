module.exports = class RegisterError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
