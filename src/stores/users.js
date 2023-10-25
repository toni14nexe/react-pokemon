import axios from "axios";
const apiUrl = process.env.USERS_API_LINK;
import { AES } from "crypto-js";
const passKey = process.env.USERS_PASS_KEY;

export async function getLoggedUserData(userName) {
  try {
    const username = localStorage.getItem("username") || userName;
    const response = await axios.get(`${apiUrl}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function restartPokemons(savingData) {
  savingData.pokemons = [];
  try {
    const response = await axios.put(
      `${apiUrl}/users/${savingData.username}`,
      savingData
    );
    if (response)
      localStorage.setItem("pokemons", JSON.stringify(savingData.pokemons));
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function saveUserData(savingData) {
  try {
    const response = await axios.put(
      `${apiUrl}/users/${savingData.username}`,
      savingData
    );
    if (response)
      localStorage.setItem("pokemons", JSON.stringify(savingData.pokemons));
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function changeUserPassword(savingData) {
  savingData.password = AES.encrypt(savingData.password, passKey).toString();
  saveUserData(savingData);
}

export async function findUserByEmail(email) {
  try {
    const response = await axios.get(`${apiUrl}/users/`);
    const userData = response.data.filter((user) => {
      return user.email === email;
    })[0];
    return userData;
  } catch (error) {
    console.error(error);
  }
}
