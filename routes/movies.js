const moviesRoutes = require('express').Router();
const {
  createMovieValidator, movieIdValidator,
} = require('../middlewares/movieValidator');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movieController');

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', createMovieValidator, createMovie);
moviesRoutes.delete('/:movieId', movieIdValidator, deleteMovie);

module.exports = moviesRoutes;
