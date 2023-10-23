import "./App.css";
import "./helpers/helpers.css";
import "./helpers/elementsMUI.css";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Registration from "./pages/registration";
import MyPokemonList from "./pages/my-pokemon-list";
import AllPokemons from "./pages/all-pokemons";
import PageNotFound from "./pages/pageNotFound";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow, deepOrange } from "@mui/material/colors";
import { Routes, Route } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: yellow,
    secondary: deepOrange,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/my-pokemon-list" element={<MyPokemonList />} />
        <Route path="/all-pokemons" element={<AllPokemons />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
