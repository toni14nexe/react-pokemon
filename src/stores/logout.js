import { Cookies } from "react-cookie";

const cookies = new Cookies();

export async function logout(navigate) {
  clearData();
  navigate("/login");
}

export function clearData() {
  localStorage.clear();
  cookies.remove("pass_token");
}
