const CREATED_STATUS = 201;
const INTERNAL_SERVER_ERROR = 500;

const ERROR_MESSAGES = {
  CONFLICT: 'Пользователь с данным email уже существует',
  NOT_FOUND_USER: 'Пользователь с таким id не найден',
  NOT_FOUND_MOVIE: 'Фильма с таким id нет',
  NOT_FOUND_RESOURCE: 'Ресурс не найден по адресу',
  BAD_REQUEST: 'Переданы некорректные данные',
  FORBIDDEN: 'У вас нет прав на удаление этого фильма',
  INTERNAL_SERVER_ERROR: 'На сервере произошла ошибка',
  UNAUTHORIZED: 'Необходима авторизация',
  CREDENTIALS_ERROR: 'Неправильные почта или пароль',
};

module.exports = {
  CREATED_STATUS,
  INTERNAL_SERVER_ERROR,
  ERROR_MESSAGES,
};
