import axios from "axios";
const apiUrl = process.env.USERS_API_LINK;

export async function getLoggedUserData() {
  try {
    const username = localStorage.getItem("username");
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
