import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      WEB_APP_LINK: "http://localhost:4000", // use own API link
      USERS_API_LINK: "http://localhost:5000", // use own API link
      POKEMON_API_LINK: "https://pokeapi.co/api/v2", // PokeAPI link
      USERS_PASS_KEY: "sEcReT_kEy", // use own Secret key
      USERS_TOKEN_PASS_KEY: "sEcReT_kEy", // use own Secret key
      EMAILJS_PUBLIC_KEY: "", // use own emailjs public key - register on www.emailjs.com and create it - free & simple
      EMAILJS_SERVICE_ID: "", // use own emailjs service id - register on www.emailjs.com and create it - free & simple
      EMAILJS_RESET_TEMPLATE_ID: "", // use own emailjs template id - register on www.emailjs.com and create it - free & simple
      EMAILJS_VERIFY_TEMPLATE_ID: "", // use own emailjs template id - register on www.emailjs.com and create it - free & simple
    },
  },
});
