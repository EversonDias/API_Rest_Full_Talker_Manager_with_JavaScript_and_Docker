const { readFile, writeFile } = require('fs/promises');
const {resolve} = require('path')
const { createToken } = require('./tools');

const readAPI = async () => {
  try {
    const dataAPI = await readFile(resolve(__dirname, '../talker.json'));
    const data = JSON.parse(dataAPI);
    return data;
  } catch (error) {
    console.error(`Error na leitura do arquivo: ${error}`);
  }
}

const searchById = async (id) => {
  try {
    const dataAPI = await readAPI();
    const dataSelect = dataAPI.find((data) => data.id === Number(id));
    return dataSelect;
  } catch (error) {
    console.log(`Erro de leitura do arquivo ${error}`);
  }
}

const readUser = async () => {
  try {
    const dataUser = await readFile(resolve(__dirname, '../login.json'));
    const data = JSON.parse(dataUser);
    return data;
  } catch (error) {
    console.error(`Erro na escrita do arquivo ${error}`);
  }
}

const saveUser = async (user) => {
  try {
    const oldUser  = await readUser();
    const token = createToken(16);
    const newUser = {
      ...user,
      token,
    };
    const dataUser = [...oldUser, newUser];
    await writeFile(
      resolve(__dirname, '../login.json'),
      JSON.stringify(dataUser)
    );
    return token;
  } catch (error) {
    console.error(`Error de Escrita de Arquivo, saveUser ${error}`);
  }
}
module.exports = {
  readAPI,
  searchById,
  saveUser,
}