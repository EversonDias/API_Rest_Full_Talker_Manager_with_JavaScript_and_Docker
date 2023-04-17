const { readFile, writeFile } = require('fs/promises');
const { resolve } = require('path');

const createToken = (length) => {
  let data = '';
  const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let index = 0; index < length; index += 1) {
    data += character.charAt(Math.floor(Math.random() * character.length));
  }
  return data;
};

const readAPI = async () => {
  try {
    const dataAPI = await readFile(resolve(__dirname, '../talker.json'));
    const data = await JSON.parse(dataAPI);
    return data;
  } catch (error) {
    console.error(`Error na leitura do arquivo: ${error}`);
  }
};

const saveAPI = async (newDateAPI) => {
  try {
    const oldDataAPI = await readAPI();
    const newTalker = {
      ...newDateAPI,
      id: [...oldDataAPI].length + 1,
  };
    const data = [...oldDataAPI, newTalker];
    await writeFile(resolve(__dirname, '../talker.json'), JSON.stringify(data));
    return newTalker;
  } catch (error) {
    console.error(error);
  }
};

const searchById = async (id) => {
  try {
    const dataAPI = await readAPI();
    const dataSelect = dataAPI.find((data) => data.id === Number(id));
    return dataSelect;
  } catch (error) {
    console.log(`Erro de leitura do arquivo ${error}`);
  }
};

const readUser = async () => {
  try {
    const dataUser = await readFile(resolve(__dirname, '../login.json'));
    const data = JSON.parse(dataUser);
    return data;
  } catch (error) {
    console.error(`Erro na escrita do arquivo ${error}`);
  }
};

const filterAPI = async (id) => {
  try {
    const dataAPI = await readAPI();
    const dataFilter = dataAPI.filter((data) => data.id !== id);
    return dataFilter;
  } catch (error) {
    console.error(error);
  }
};

const updateTalker = async (newTalker, id, oldTalker) => {
  try {
    const talker = {
      ...newTalker,
      id,
    };
    const newListTalkers = [...oldTalker, talker];
    await writeFile(resolve(__dirname, '../talker.json'), JSON.stringify(newListTalkers));
    return talker;
  } catch (error) {
    console.error('updateTalker', error);
  }
};

const searchByName = async (name) => {
  try {
    const listOfTalkers = await readAPI();
    const dataFilter = listOfTalkers.filter((talker) => talker.name.includes(name));
    return dataFilter;
  } catch (error) {
    console.error('searchByName', error);
  }
};

module.exports = {
  readAPI,
  searchById,
  saveAPI,
  readUser,
  filterAPI,
  updateTalker,
  createToken,
  searchByName,
};