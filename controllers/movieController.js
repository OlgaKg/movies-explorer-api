const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/NotFoundError');
const BadRequestError = require('../utils/errors/BadRequestError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const {
  CREATED_STATUS,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(CREATED_STATUS).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильма с таким id нет'));
      }
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('У вас нет прав на удаление этого фильма'));
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((removedMovie) => {
          if (!removedMovie) {
            next(new NotFoundError('Фильма с таким id нет'));
          }
          res.send({ data: removedMovie });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
