const createToken = (length) => {
  let data = '';
  const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let index = 0; index < length; index += 1) {
    data += character.charAt(Math.floor(Math.random() * character.length));
  }
  return data;
};

module.exports = {
  createToken,
};