const express = require('express');
const cookieParser = require('cookie-parser');
const routers = require('express').Router();
const { errors } = require('celebrate');
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/userValidation');
const { userRouter } = require('./users');
const { cardRouter } = require('./cards');
const auth = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');

routers.use(express.json());
routers.use(express.urlencoded({ extended: true }));
routers.use(cookieParser());

routers.use(requestLogger);

routers.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routers.post('/signin', validateLogin, login);
routers.post('/signup', validateCreateUser, createUser);

routers.use('/users', auth, userRouter);
routers.use('/cards', auth, cardRouter);

routers.use(errorLogger);

routers.use((req, res, next) => {
  next(new NotFoundError('Такого URL не существует'));
});
routers.use(errors());
routers.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

module.exports = { routers };
