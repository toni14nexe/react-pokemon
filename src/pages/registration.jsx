import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import { registration } from "../stores/registration";
import Correct from "@mui/icons-material/TaskAltOutlined";
import Wrong from "@mui/icons-material/CloseOutlined";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import { AES } from "crypto-js";
const passKey = process.env.USERS_PASS_KEY;

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") register();
  };

  function register() {
    if (!isBtnDisabledHandler()) {
      registration(username, AES.encrypt(password, passKey).toString())
        .then(() => navigate("/dashboard"))
        .catch((error) => {
          if (error?.response?.data?.includes("duplicate id"))
            setAlertMessage("Username already exists!");
          else setAlertMessage(error?.message);
        });
    }
  }

  function isBtnDisabledHandler() {
    if (
      username.length < 4 ||
      password.length < 8 ||
      password !== confirmPassword ||
      !/.*[A-Z].*/.test(password) ||
      !/.*[a-z].*/.test(password) ||
      !/.*\d.*/.test(password) ||
      !/.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-].*/.test(password)
    )
      return true;
    return false;
  }

  const passwordAlert = alertMessage ? (
    <Grid display="flex" justifyContent="center">
      <Alert severity="error">{alertMessage}</Alert>
    </Grid>
  ) : undefined;

  const correct = <Correct color="success" />;
  const wrong = <Wrong color="secondary" />;
  const usernameLengthIcon = username.length < 5 ? wrong : correct;
  const passwordLengthIcon = password.length < 8 ? wrong : correct;
  const passwordUppercaseIcon = !/.*[A-Z].*/.test(password) ? wrong : correct;
  const passwordLowercaseIcon = !/.*[a-z].*/.test(password) ? wrong : correct;
  const passwordNumberIcon = !/.*\d.*/.test(password) ? wrong : correct;
  const passwordSpecialCharachterIcon =
    !/.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-].*/.test(password) ? wrong : correct;
  const confirmPasswordIcon =
    password !== confirmPassword || !password.length ? wrong : correct;

  return (
    <Box className="box">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <h3>Registration</h3>
        </Grid>
        <Grid xs={12}>
          <TextField
            value={username}
            id="outlined-basic"
            label="Username"
            variant="filled"
            onChange={(value) => setUsername(value.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            value={password}
            id="outlined-basic"
            label="Password"
            variant="filled"
            type="password"
            onChange={(value) => setPassword(value.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            value={confirmPassword}
            id="outlined-basic"
            label="Confirm password"
            variant="filled"
            type="password"
            onChange={(value) => setConfirmPassword(value.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid xs={12}>
          <Chip icon={usernameLengthIcon} label="Username length" />
          <Chip icon={passwordLengthIcon} label="Password length" />
          <Chip icon={passwordUppercaseIcon} label="Password uppercase" />
        </Grid>
        <Grid xs={12}>
          <Chip icon={passwordLowercaseIcon} label="Password lowercase" />
          <Chip icon={passwordNumberIcon} label="Password number" />
          <Chip
            icon={passwordSpecialCharachterIcon}
            label="Password special charachter"
          />
          <Chip icon={confirmPasswordIcon} label="Confirm password" />
        </Grid>
        <Grid xs={12}>
          <Button
            variant="outlined"
            onClick={() => register()}
            disabled={isBtnDisabledHandler()}
          >
            Submit
          </Button>
        </Grid>
        <Grid xs={12}>
          <Link href="login">Go To Login</Link>
        </Grid>
      </Grid>
      <Box className="mt-1">{passwordAlert}</Box>
    </Box>
  );
}
