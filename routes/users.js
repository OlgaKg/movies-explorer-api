const usersRoutes = require('express').Router();
const { updateProfileValidator } = require('../middlewares/userValidator');
const {
  updateProfile, getCurrentUser,
} = require('../controllers/userController');

usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', updateProfileValidator, updateProfile);

module.exports = usersRoutes;
