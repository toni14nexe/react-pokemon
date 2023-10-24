import axios from "axios";
const apiUrl = process.env.USERS_API_LINK;
const pokemonAPIurl = process.env.POKEMON_API_LINK;

export async function getPlayingPokemonList() {
  try {
    const response = await axios.get(`${pokemonAPIurl}/pokemon?limit=151`);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getMyPokemonList() {
  return JSON.parse(localStorage.getItem("pokemons"));
}

export async function getPokemon(id) {
  try {
    const response = await axios.get(`${pokemonAPIurl}/pokemon/${id}`);
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.front_default,
      hp: response.data.stats[0].base_stat,
      attack: response.data.stats[1].base_stat,
      defense: response.data.stats[2].base_stat,
      speed: response.data.stats[5].base_stat,
    };
  } catch (error) {
    console.error(error);
  }
}
