const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const cardOwner = req.user;

  Card.create({ name, link, owner: cardOwner })
    .then((card) => {
      if (!card) throw new NotFoundError('Ошибка при создании карточки');
      card.populate('owner').then((cardInfo) => res.status(201).send(cardInfo)).catch(next);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка не найдена');
      if (req.user._id !== card.owner.toString()) {
        throw new ConflictError('Только владелец карточки может ее удалить');
      }
      card.deleteOne().then(() => res.send({ data: card })).catch(next);
    })
    .catch(next);
};

const findAndUpdate = (cardId, data, res, next) => {
  Card.findByIdAndUpdate(cardId, data, { new: true })
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  findAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, res, next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  findAndUpdate(cardId, { $pull: { likes: req.user._id } }, res, next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
