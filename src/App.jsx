//import { useState } from "react";
import "./App.css";
import LoginForm from "./components/login/login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow, deepOrange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: yellow,
    secondary: deepOrange,
  },
});

function App() {
  //const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <LoginForm />
    </ThemeProvider>
  );
}

export default App;
