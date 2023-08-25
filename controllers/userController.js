const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');
const {
  CREATED_STATUS,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (_req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, name,
  } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email, name, password: hash,
    }))
    .then(() => res.status(CREATED_STATUS).send({
      data: {
        email, name,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(', ')}`,
          ),
        );
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с таким id не найден'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};
