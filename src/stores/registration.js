import axios from "axios";
const apiUrl = process.env.USERS_API_LINK;

export async function registration(username, password) {
  try {
    const response = await axios.post(`${apiUrl}/users`, {
      id: username,
      username: username,
      password: password,
      pokemons: [],
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
