require('dotenv').config();
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RegisterError = require('../errors/RegisterError');
const NotFoundError = require('../errors/NotFoundError');
const { secretKey } = require('../utils/constants');
const RequestError = require('../errors/ValidationError');

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        const userObject = user.toObject();
        delete userObject.password;
        res.status(201).send(userObject);
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new RegisterError('Email уже используется'));
        } else if (err instanceof mongoose.Error.ValidationError) {
          next(new RequestError('Переданы неккоректные данные'));
        } else {
          next(err);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, secretKey, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const findUser = (id, res, next) => {
  User.findById(id)
    .orFail(() => new NotFoundError('Пользователь по указанному _id не найден.'))
    .then((user) => res.send(user))
    .catch(next);
};

const findAndUpdate = (id, data, res, next) => {
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь по указанному _id не найден.'))
    .then((user) => res.send(user))
    .catch(next);
};

const getUser = (req, res, next) => findUser(req.params.userId, res, next);

const getCurrentUser = (req, res, next) => findUser(req.user._id, res, next);

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  findAndUpdate(req.user._id, { name, about }, res, next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  findAndUpdate(req.user._id, { avatar }, res, next);
};

module.exports = {
  getAllUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
