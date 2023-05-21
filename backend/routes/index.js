const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const routers = require('express').Router();
const { errors } = require('celebrate');
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser, logout } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/userValidation');
const { userRouter } = require('./users');
const { cardRouter } = require('./cards');
const auth = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

routers.use(helmet());
routers.use(express.json());
routers.use(express.urlencoded({ extended: true }));
routers.use(cookieParser());

routers.use(requestLogger);

routers.use(limiter);

routers.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routers.post('/signin', validateLogin, login);
routers.post('/signup', validateCreateUser, createUser);
routers.post('/signout', logout);

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
