const express = require('express');
const { readAPI, searchById } = require('../utils/readingAndWriting');

const router = express.Router();

router.get('/',async (_req, res) => {
  try {
    const talker = await readAPI();
    res.status(200).json(talker);
  } catch (error) {
    res.status(500).json({message: error})
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const data = await searchById(id)
    if (!data) {
      throw new Error('Pessoa palestrante não encontrada')
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({message: 'Pessoa palestrante não encontrada'});
  }
})

module.exports = router;