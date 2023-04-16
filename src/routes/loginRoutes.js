const express = require('express');
const { saveUser } = require('../utils/tools');
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
    const data = req.body;
    const token = await saveUser(data);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
},
);

module.exports = router;