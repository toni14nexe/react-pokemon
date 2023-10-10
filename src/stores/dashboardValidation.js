import axios from "axios";
import { AES, enc } from "crypto-js";
import { Cookies } from "react-cookie";
const apiUrl = process.env.USERS_API_LINK;
const tokenKey = process.env.USERS_TOKEN_PASS_KEY;

const cookies = new Cookies();

export async function isUserValid(navigate) {
  const username = localStorage.getItem("username");
  try {
    const response = await axios.get(`${apiUrl}/users/${username}`);
    if (response)
      if (isCookieValid(response, username))
        if (isPokemonListValid(response)) return true;
        else throw new Error("Invalid pokemon list");
      else throw new Error("Invalid cookie");
    throw new Error("Something went wrong");
  } catch (error) {
    throw error;
  }
}

function isCookieValid(response) {
  if (
    response?.data?.password ===
    AES.decrypt(cookies.get("pass_token"), tokenKey).toString(enc.Utf8)
  )
    return true;
  return false;
}

function isPokemonListValid(response) {
  if (
    JSON.stringify(response?.data?.pokemons) ===
    localStorage.getItem("pokemons")
  )
    return true;
  return false;
}
