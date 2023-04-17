const express = require('express');
const { createToken } = require('../utils/tools');
const {
  isEmail,
  isPassword,
  verifyEmail,
  verifyPassword,
} = require('../utils/verifyLogin');

const router = express.Router();

router.post(
  '/',
  isEmail,
  isPassword,
  verifyEmail,
  verifyPassword,
  async (req, res) => {
  try {
    const token = createToken(16);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
},
);

module.exports = router;