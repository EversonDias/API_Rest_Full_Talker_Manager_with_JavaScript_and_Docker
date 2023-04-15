const express = require('express');
const { readAPI } = require('../utils/readingAndWriting');

const router = express.Router();

router.get('/',async (_req, res) => {
  try {
    const talker = await readAPI();
    res.status(200).json(talker);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error})
  }
});

module.exports = router;