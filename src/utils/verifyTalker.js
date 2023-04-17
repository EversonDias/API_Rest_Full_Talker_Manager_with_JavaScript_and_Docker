const { readAPI } = require('./tools');

const status400 = 400;
const status401 = 401;
const status404 = 404;

const hasAuthorization = (req, res, next) => {
  if (!['authorization'].every((key) => key in req.headers)) {
    return res.status(status401).send({ message: 'Token não encontrado' });
  } 
    next();
};

const isAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  const isString = typeof authorization === 'string';
  const limit = 16;
  if (!isString || authorization.length !== limit) {
    return res.status(status401).send({ message: 'Token inválido' });
  } 
    next();
};

const hasName = (req, res, next) => {
if (!['name'].every((key) => key in req.body)) {
  return res.status(status400).send({ message: 'O campo "name" é obrigatório' });
} 
  next();
};

const verifyName = (req, res, next) => {
  const { name } = req.body;
  const min = 3;
  if (name.length < min) {
    return res.status(status400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } 
    next();
};
const hasAge = (req, res, next) => {
  const { age } = req.body;
  const hasKeyAge = !['age'].every((key) => key in req.body);
  const hasValueAge = age === '';
  if (hasKeyAge || hasValueAge) {
    return res.status(status400).send({ message: 'O campo "age" é obrigatório' });
  } 
    next();
};
const verifyAge = (req, res, next) => {
  const { age } = req.body;
  const typeAge = !Number.isInteger(age);
  const legal = 18;
  const isLegalAge = age < legal;
  if (typeAge || isLegalAge) {
    return res.status(status400).send(
      { 
        message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' },
        );
  } 
    next();
};

const hasTalk = (req, res, next) => {
  if (!['talk'].every((key) => key in req.body)) {
    return res.status(status400).send({ message: 'O campo "talk" é obrigatório' });
  } 
    next();
};
const hasWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  if (!['watchedAt'].every((key) => key in talk)) {
    return res.status(status400).send({ message: 'O campo "watchedAt" é obrigatório' });
  } 
    next();
};

const verifyWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!dateRegex.test(watchedAt)) {
    return res.status(status400).send(
      { 
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
);
  } 
    next();
};

const hasRate = (req, res, next) => {
  const { talk } = req.body;
  const hasKeyRate = !['rate'].every((key) => key in talk);
  if (hasKeyRate) {
    return res.status(status400).send({ message: 'O campo "rate" é obrigatório' });
  } 
    next();
};

const verifyRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const isInt = Number.isInteger(rate);
  const isInterval = rate <= 0 || rate > 5;
  if (!isInt || isInterval) {
    return res.status(status400).send(
      { 
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' },
);
  } 
    next();
};

const hasId = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readAPI();
  const keysId = talkers.map((talker) => talker.id);
  if (!keysId.includes(Number(id))) {
    return res.status(status404).send({ message: 'Pessoa palestrante não encontrada' });
  } 
    next();
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
  hasId,
};