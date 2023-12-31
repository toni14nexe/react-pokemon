import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { login } from "../stores/login";
import { useNavigate } from "react-router-dom";
import { clearData } from "../stores/logout";
import Footer from "../components/dashboard/Footer";
import Toast from "../components/Toast";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastTrigger, setToastTrigger] = React.useState(0);

  React.useEffect(() => {
    clearData();
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") loginHandler();
  };

  function loginHandler() {
    if (!isBtnDisabledHandler()) {
      login(username, password)
        .then((response) => {
          if (response) navigate("/dashboard");
          else showToast("Wrong login data!");
        })
        .catch(() => showToast(error?.message));
    }
  }

  function showToast(message) {
    setToastMessage(message);
    setToastTrigger(toastTrigger + 1);
  }

  function isBtnDisabledHandler() {
    if (username.length < 4 || password.length < 8) return true;
    return false;
  }

  return (
    <Box className="box">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <h3>Login</h3>
        </Grid>
        <Grid xs={12}>
          <TextField
            value={username}
            label="Username"
            variant="filled"
            onChange={(value) => setUsername(value.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            value={password}
            label="Password"
            variant="filled"
            type="password"
            onChange={(value) => setPassword(value.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid xs={12}>
          <Button
            variant="outlined"
            onClick={() => loginHandler(username, password)}
            disabled={isBtnDisabledHandler(username, password)}
          >
            Submit
          </Button>
        </Grid>
        <Grid xs={12}>
          <Link href="forgot-password">Forgot password?</Link>
        </Grid>
        <Grid xs={12}>
          <Link href="registration">Go To Registration</Link>
        </Grid>
      </Grid>
      <Toast trigger={toastTrigger} type="error" message={toastMessage} />
      <Footer />
    </Box>
  );
}
