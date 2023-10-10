import axios from "axios";
import { AES, enc } from "crypto-js";
const apiUrl = process.env.USERS_API_LINK;
const passKey = process.env.USERS_PASS_KEY;

export async function login(username, password) {
  try {
    const response = await axios.get(`${apiUrl}/users/${username}`);
    return password ===
      AES.decrypt(response?.data?.password, passKey).toString(enc.Utf8)
      ? response?.data
      : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
