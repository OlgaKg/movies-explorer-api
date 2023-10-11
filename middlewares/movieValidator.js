const { celebrate, Joi } = require('celebrate');

const urlSchema = Joi.string().pattern(/(?:https?):\/\/(w{3}\.)?\w+([.|-]{1,}\w+)*\.[0-9a-zA-Z-]+(\/[\w\-.~:/?#[\]@!$&'()*+,;=]*#?)?/).required();

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(100),
    director: Joi.string().required().min(2).max(70),
    duration: Joi.number().required().min(1),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required(),
    image: urlSchema.required(),
    trailerLink: urlSchema.required(),
    thumbnail: urlSchema.required(),
    movieId: Joi.number(),
    // movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.movieIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});
