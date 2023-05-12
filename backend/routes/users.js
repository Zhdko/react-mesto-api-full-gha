const userRouter = require('express').Router();

const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const { validateGetUser, validateUpdateUser, validateUpdateAvatar } = require('../middlewares/userValidation');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', validateGetUser, getUser);
userRouter.patch('/me', validateUpdateUser, updateUser);
userRouter.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = { userRouter };
