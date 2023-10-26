import "./App.css";
import "./helpers/helpers.css";
import "./helpers/elementsMUI.css";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Registration from "./pages/registration";
import MyPokemonList from "./pages/my-pokemon-list";
import AllPokemons from "./pages/all-pokemons";
import Search from "./pages/search";
import Settings from "./pages/settings";
import ForgotPassword from "./pages/forgot-password";
import Reset from "./pages/reset";
import Verification from "./pages/verification";
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
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
