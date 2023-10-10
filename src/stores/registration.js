import axios from "axios";
import { AES } from "crypto-js";
const apiUrl = process.env.USERS_API_LINK;
const passKey = process.env.USERS_PASS_KEY;

export async function registration(username, password) {
  const cryptedPassword = AES.encrypt(password, passKey).toString();
  try {
    const response = await axios.post(`${apiUrl}/users`, {
      id: username,
      username: username,
      password: cryptedPassword,
      pokemons: [],
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
