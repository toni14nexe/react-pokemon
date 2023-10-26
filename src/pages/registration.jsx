import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { registration } from "../stores/registration";
import Correct from "@mui/icons-material/TaskAltOutlined";
import Wrong from "@mui/icons-material/CloseOutlined";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import { clearData } from "../stores/logout";
import Footer from "../components/dashboard/Footer";
import { findUserByEmail } from "../stores/users";
import emailjs from "@emailjs/browser";
import Toast from "../components/Toast";

const webAppLink = process.env.WEB_APP_LINK;
const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
const emailjsTemplateId = process.env.EMAILJS_VERIFY_TEMPLATE_ID;

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastTrigger, setToastTrigger] = React.useState(0);
  const [registred, setRegistred] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    clearData();
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") register();
  };

  function register() {
    if (!isBtnDisabledHandler()) {
      findUserByEmail(email)
        .then((response) => {
          if (response === "E-mail already registered!") showToast(response);
          else
            registration(username, password, email)
              .then((response) => sendEmail(response.cryptedPassword))
              .catch((error) => {
                if (error?.response?.data?.includes("duplicate id"))
                  showToast("Username already exists!");
              })
              .catch(() => showToast("Something went wrong"));
        })
        .catch(() => showToast("Something went wrong"));
    }
  }

  function showToast(message) {
    setToastMessage(message);
    setToastTrigger(toastTrigger + 1);
  }

  async function sendEmail(cryptedPassword) {
    const verificationLink = `${webAppLink}/verification?${decodeURI(
      cryptedPassword
    )}&username=${username}`;
    const emailForm = {
      username: username,
      verificationLink: verificationLink,
      replayTo: email,
    };
    await emailjs
      .send(emailjsServiceId, emailjsTemplateId, emailForm, emailjsPublicKey)
      .finally(() => setRegistred(true));
  }

  function isBtnDisabledHandler() {
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) ||
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

  const correct = <Correct color="success" />;
  const wrong = <Wrong color="secondary" />;
  const emailIcon = !email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? wrong
    : correct;
  const usernameLengthIcon = username.length < 5 ? wrong : correct;
  const passwordLengthIcon = password.length < 8 ? wrong : correct;
  const passwordUppercaseIcon = !/.*[A-Z].*/.test(password) ? wrong : correct;
  const passwordLowercaseIcon = !/.*[a-z].*/.test(password) ? wrong : correct;
  const passwordNumberIcon = !/.*\d.*/.test(password) ? wrong : correct;
  const passwordSpecialCharachterIcon =
    !/.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-].*/.test(password) ? wrong : correct;
  const confirmPasswordIcon =
    password !== confirmPassword || !password.length ? wrong : correct;

  if (!registred)
    return (
      <Box className="box">
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12}>
            <h3>Registration</h3>
          </Grid>
          <Grid xs={12}>
            <TextField
              value={email}
              label="e-mail"
              variant="filled"
              onChange={(value) => setEmail(value.target.value)}
              onKeyDown={handleKeyDown}
            />
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
            <TextField
              value={confirmPassword}
              label="Confirm password"
              variant="filled"
              type="password"
              onChange={(value) => setConfirmPassword(value.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Grid>
          <Grid xs={12}>
            <Chip icon={emailIcon} label="Email" />
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
        <Toast trigger={toastTrigger} type="error" message={toastMessage} />
        <Footer />
      </Box>
    );

  return (
    <Box className="box">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <h3>Succesfully registered</h3>
        </Grid>
        <Grid xs={12}>
          <Typography>
            Check your e-mail <span className="text-underline">{email}</span> to
            verificate account.
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Link href="login">Go To Login</Link>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}
