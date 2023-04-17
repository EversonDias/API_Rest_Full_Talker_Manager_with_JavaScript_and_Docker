const isEmail = (req, res, next) => {
  if (!['email'].every((key) => key in req.body)) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } 
    next();
};

const isPassword = (req, res, next) => {
  if (!['password'].every((key) => key in req.body)) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  } 
    next();
};

const verifyEmail = (req, res, next) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
  const { email } = req.body;
  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 
    next();
};

const verifyPassword = (req, res, next) => {
  const min = 6;
  const { password } = req.body;
  if (password.length < min) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } 
    next();
};

module.exports = {
  isEmail,
  isPassword,
  verifyEmail,
  verifyPassword,
};