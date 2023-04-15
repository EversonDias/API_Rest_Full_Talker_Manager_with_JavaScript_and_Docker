const { readFile } = require('fs/promises');
const {resolve} = require('path')

const readAPI = async () => {
  try {
    const dataAPI = await readFile(resolve(__dirname, '../talker.json'));
    const data = JSON.parse(dataAPI);
    return data;
  } catch (error) {
    console.error(`Error na leitura do arquivo: ${error}`);
  }
}

module.exports = {
  readAPI,
}