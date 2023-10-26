import axios from "axios";
import { AES } from "crypto-js";
const apiUrl = process.env.USERS_API_LINK;
const passKey = process.env.USERS_PASS_KEY;

export async function registration(username, password, email) {
  const cryptedPassword = AES.encrypt(password, passKey).toString();
  try {
    const response = await axios.post(`${apiUrl}/users`, {
      id: username,
      username: username,
      email: email,
      verified: false,
      password: cryptedPassword,
      pokemons: [],
    });
    response.cryptedPassword = cryptedPassword;
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
