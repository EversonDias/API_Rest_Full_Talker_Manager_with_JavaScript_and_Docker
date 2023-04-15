const express = require('express');
const {saveUser} = require('../utils/readingAndWriting');
const {
  createToken,
  isEmail,
  isPassword,
  verifyEmail,
  verifyPassword
} = require('../utils/tools');

const router = express.Router();

const validity = (data) => {
  try {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i
    const passwordRegex = 6
    const verifyEmail = emailRegex.test(data.email);
    const verifyPassword = data.password.length > passwordRegex; 
    return verifyEmail && verifyPassword;
  } catch (error) {
    console.error(error);
  }
}

router.post(
  '/',
  isEmail,
  isPassword,
  verifyEmail,
  verifyPassword,
  async (req, res) => {
  try {
    const data = req.body;
    const token = await saveUser(data)
    res.status(200).json({token,})
  } catch (error) {
    console.log(error);
  }
})

router.get('/', async (_req, res) => {
  try {
    const token = createToken(16);
    res.status(200).json({token,})
  } catch (error) {
    console.error(error);
  }
})

module.exports = router;