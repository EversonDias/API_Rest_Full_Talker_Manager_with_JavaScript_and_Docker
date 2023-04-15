const express = require('express');
const { readAPI, searchById, saveAPI } = require('../utils/readingAndWriting');
const {
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
} = require('../utils/verifyTalker');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const talker = await readAPI();
    res.status(200).json(talker);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await searchById(id);
    if (!data) {
      throw new Error('Pessoa palestrante não encontrada');
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

router.post(
  '/',
  hasAuthorization,
  isAuthorization,
  hasName,
  verifyName,
  hasAge,
  verifyAge,
  hasTalk,
  hasRate,
  hasWatchedAt,
  verifyWatchedAt,
  verifyRate,
  async (req, res) => {
  try {
    const newTalker = req.body;
    const data = await saveAPI(newTalker);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
  }
},
);

module.exports = router;