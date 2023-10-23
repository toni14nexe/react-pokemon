import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      USERS_API_LINK: "http://localhost:5000", // use own API link
      POKEMON_API_LINK: "https://pokeapi.co/api/v2", // PokeAPI link
      USERS_PASS_KEY: "sEcReT_kEy", // use own Secret key
      USERS_TOKEN_PASS_KEY: "sEcReT_kEy", // use own Secret key
    },
  },
});
