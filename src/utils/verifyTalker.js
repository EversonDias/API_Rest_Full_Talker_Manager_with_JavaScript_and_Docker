const status400 = 400;
const status401 = 401;

const hasAuthorization = (req, res, next) => {
  if (!['authorization'].every((key) => key in req.headers)) {
    res.status(status401).send({ message: 'Token não encontrado' });
  } else {
    next();
  }
};

const isAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  const isString = typeof authorization === 'string';
  const limit = 16;
  if (!isString || authorization.length !== limit) {
    res.status(status401).send({ message: 'Token inválido' });
  } else {
    next();
  }
};

const hasName = (req, res, next) => {
if (!['name'].every((key) => key in req.body)) {
  res.status(status400).send({ message: 'O campo "name" é obrigatório' });
} else {
  next();
}
};

const verifyName = (req, res, next) => {
  const { name } = req.body;
  const min = 3;
  if (name.length < min) {
    res.status(status400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else {
    next();
  }
};
const hasAge = (req, res, next) => {
  const { age } = req.body;
  const hasKeyAge = !['age'].every((key) => key in req.body);
  const hasValueAge = age === '';
  if (hasKeyAge || hasValueAge) {
    res.status(status400).send({ message: 'O campo "age" é obrigatório' });
  } else {
    next();
  }
};
const verifyAge = (req, res, next) => {
  const { age } = req.body;
  const typeAge = !Number.isInteger(age);
  const legal = 18;
  const isLegalAge = age < legal;
  if (typeAge || isLegalAge) {
    res.status(status400).send(
      { 
        message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' },
        );
  } else {
    next();
  }
};

const hasTalk = (req, res, next) => {
  if (!['talk'].every((key) => key in req.body)) {
    res.status(status400).send({ message: 'O campo "talk" é obrigatório' });
  } else {
    next();
  }
};
const hasWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  if (!['watchedAt'].every((key) => key in talk)) {
    res.status(status400).send({ message: 'O campo "watchedAt" é obrigatório' });
  } else {
    next();
  }
};

const verifyWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!dateRegex.test(watchedAt)) {
    res.status(status400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } else {
    next();
  }
};

const hasRate = (req, res, next) => {
  const { talk } = req.body;
  const hasKeyRate = !['rate'].every((key) => key in talk);
  const hasValue = !talk.rate !== '';
  if (hasKeyRate || hasValue) {
    res.status(status400).send({ message: 'O campo "rate" é obrigatório' });
  } else {
    next();
  }
};

const verifyRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const isInt = Number.isInteger(rate);
  const isInterval = rate >= 0 && rate < 6;
  if (!isInt || !isInterval) {
    res.status(status400).send(
      { 
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' },
);
  } else {
    next();
  }
};

module.exports = {
  hasAuthorization,
  isAuthorization,
  verifyRate,
  hasRate,
  verifyWatchedAt,
  hasWatchedAt,
  hasTalk,
  verifyAge,
  hasAge,
  verifyName,
  hasName,
};