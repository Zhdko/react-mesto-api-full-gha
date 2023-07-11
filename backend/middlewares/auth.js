const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { SECRET_KEY } = require('../utils/config');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthorizationError('Необходима авторизация.'));
  }

  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация.'));
  }

  req.user = payload;

  return next();
};
