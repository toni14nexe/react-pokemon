import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import Footer from "../components/dashboard/Footer";
import Chip from "@mui/material/Chip";
import Correct from "@mui/icons-material/TaskAltOutlined";
import Wrong from "@mui/icons-material/CloseOutlined";
import { changeUserPassword, getLoggedUserData } from "../stores/users";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [urlAES, setUrlAES] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [wrongToastTrigger, setWrongToastTrigger] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    const usernamePosition = window.location.search.indexOf("&username=");
    setUsername(window.location.search.slice(usernamePosition + 10));
    setUrlAES(window.location.search.slice(1, usernamePosition));
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isBtnDisabledHandler()) savePassword();
  };

  function isBtnDisabledHandler() {
    if (
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

  const correct = <Correct color="success" />;
  const wrong = <Wrong color="secondary" />;
  const passwordLengthIcon = password.length < 8 ? wrong : correct;
  const passwordUppercaseIcon = !/.*[A-Z].*/.test(password) ? wrong : correct;
  const passwordLowercaseIcon = !/.*[a-z].*/.test(password) ? wrong : correct;
  const passwordNumberIcon = !/.*\d.*/.test(password) ? wrong : correct;
  const passwordSpecialCharachterIcon =
    !/.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-].*/.test(password) ? wrong : correct;
  const confirmPasswordIcon =
    password !== confirmPassword || !password.length ? wrong : correct;

  function savePassword() {
    getLoggedUserData(username)
      .then((userData) => {
        if (decodeURI(userData.password) === urlAES) {
          userData.password = password;
          changeUserPassword(userData)
            .then(() => navigate("/login"))
            .catch(() => setWrongToastTrigger(wrongToastTrigger + 1));
        } else setWrongToastTrigger(wrongToastTrigger + 1);
      })
      .catch(() => setWrongToastTrigger(wrongToastTrigger + 1));
  }

  return (
    <Box className="box">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <h3>
            Reset password for{" "}
            <span className="text-underline">{username}</span>
          </h3>
        </Grid>
        <Grid xs={12} className="mb-1">
          <TextField
            value={password}
            size="small"
            label="Password"
            variant="filled"
            type="password"
            onChange={(value) => setPassword(value.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid xs={12} className="mb-1">
          <TextField
            value={confirmPassword}
            size="small"
            label="Confirm password"
            variant="filled"
            type="password"
            onChange={(value) => setConfirmPassword(value.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid xs={12} className="mb-1">
          <Chip icon={passwordLengthIcon} label="Password length" />
          <Chip icon={passwordUppercaseIcon} label="Password uppercase" />
          <Chip icon={passwordLowercaseIcon} label="Password lowercase" />
        </Grid>
        <Grid xs={12} className="mb-1">
          <Chip icon={passwordNumberIcon} label="Password number" />
          <Chip
            icon={passwordSpecialCharachterIcon}
            label="Password special charachter"
          />
          <Chip icon={confirmPasswordIcon} label="Confirm password" />
        </Grid>
        <Grid xs={12} className="mb-1">
          <Button
            variant="outlined"
            onClick={savePassword}
            disabled={isBtnDisabledHandler()}
          >
            Submit
          </Button>
        </Grid>
        <Grid xs={12}>
          <Link href="login">Got To Login</Link>
        </Grid>
        <Grid xs={12}>
          <Link href="registration">Go To Registration</Link>
        </Grid>
      </Grid>
      <Footer />
      <Toast
        trigger={wrongToastTrigger}
        type="error"
        message="Something went wrong"
      />
    </Box>
  );
}
