const express = require('express');
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

router.get('/', async (_req, res) => {
  try {
    const talker = await readAPI();
    res.status(200).json(talker);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/', async (req, res) => {
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

router.put(
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
  hasId,
  async (req, res) => {
  try {
    const { id } = req.params;
    const newTalker = req.body;
    const dataFilter = await filterAPI(id);
    const data = await updateTalker(newTalker, id, dataFilter);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
},
);

router.delete(
  '/',
  hasAuthorization,
  isAuthorization,
  async (req, res) => {
  try {
    const { id } = req.params;
    await filterAPI(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
  }
},
);

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
    res.status(200).json(listOfTalkers);
  } catch (error) {
    console.error(error);
  }
},
);

module.exports = router;