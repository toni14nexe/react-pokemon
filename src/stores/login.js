import axios from "axios";
import { AES, enc } from "crypto-js";
import { Cookies } from "react-cookie";
const apiUrl = process.env.USERS_API_LINK;
const passKey = process.env.USERS_PASS_KEY;
const tokenKey = process.env.USERS_TOKEN_PASS_KEY;

const cookies = new Cookies();

export async function login(username, password) {
  try {
    const response = await axios.get(`${apiUrl}/users/${username}`);
    if (
      password ===
        AES.decrypt(response?.data?.password, passKey).toString(enc.Utf8) &&
      response?.data?.verified
    ) {
      setLocalStorageData(response);
      setCookie(response);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function setLocalStorageData(response) {
  localStorage.setItem("username", response?.data?.username);
  localStorage.setItem("pokemons", JSON.stringify(response?.data?.pokemons));
}

function setCookie(response) {
  const crypt = AES.encrypt(response?.data?.password, tokenKey).toString();
  cookies.set(
    "pass_token",
    AES.encrypt(response?.data?.password, tokenKey).toString()
  );
}
