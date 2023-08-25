const routes = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const authMiddleware = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');
const {
  login, createUser, logout,
} = require('../controllers/userController');
const {
  loginValidator, createUserValidator,
} = require('../middlewares/userValidator');

routes.post('/signin', loginValidator, login);
routes.post('/signup', createUserValidator, createUser);

routes.use(authMiddleware);
routes.use('/users', userRouter);
routes.use('/movies', movieRouter);
routes.get('/signout', logout);

routes.use('*', (req, res, next) => {
  next(new NotFoundError(`Ресурс по данному адресу ${req.path} не найден`));
});

module.exports = routes;
