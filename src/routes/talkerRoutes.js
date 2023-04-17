const express = require('express');
const { writeFile } = require('fs/promises');
const { resolve } = require('path');
const { 
  readAPI,
  searchById,
  saveAPI,
  filterAPI,
  updateTalker,
  searchByName,
} = require('../utils/tools');
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
  hasId,
} = require('../utils/verifyTalker');

const router = express.Router();

router.get(
  '/search',
  hasAuthorization,
  isAuthorization,
  async (req, res) => {
  try {
    const { q } = req.query;
    if (q === '') {
      const listOfTalkers = await readAPI();
      return res.status(200).json(listOfTalkers);
    }
    const listOfTalkers = await searchByName(q);
    return res.status(200).json(listOfTalkers);
  } catch (error) {
    console.error(error);
  }
},
);

router.get('/', async (_req, res) => {
  try {
    const talker = await readAPI();
    return res.status(200).json(talker);
  } catch (error) {
    return res.status(500).json({ message: error });
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
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
  }
},
);

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await searchById(id);
    if (!data) {
      throw new Error('Pessoa palestrante não encontrada');
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

router.put(
  '/:id',
  hasAuthorization, isAuthorization,
  hasName, verifyName,
  hasAge, verifyAge,
  hasTalk,
  hasRate,
  hasWatchedAt,
  verifyWatchedAt,
  verifyRate,
  hasId,
  async (req, res) => {
  try {
    const { id } = req.params;
    const numberId = Number(id);
    const newTalker = req.body;
    const dataFilter = await filterAPI(numberId);
    const data = await updateTalker(newTalker, numberId, dataFilter);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
},
);

router.delete(
  '/:id',
  hasAuthorization,
  isAuthorization,
  async (req, res) => {
  try {
    const { id } = req.params;
    const data = await filterAPI(Number(id));
    await writeFile(resolve(__dirname, '../talker.json'), JSON.stringify(data));
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
  }
},
);

module.exports = router;