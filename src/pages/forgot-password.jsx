import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import { clearData } from "../stores/logout";
import Footer from "../components/dashboard/Footer";
import emailjs from "@emailjs/browser";
import { findUserByEmail } from "../stores/users";

const webAppLink = process.env.WEB_APP_LINK;
const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID;

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [sended, setSended] = React.useState(false);
  const [toastSended, setToastSended] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    clearData();
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isBtnDisabledHandler()) resetStart();
  };

  function isBtnDisabledHandler() {
    return !email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  function resetStart() {
    findUserByEmail(email).then((userData) => {
      if (userData?.email) sendEmail(userData);
      else setSended(true);
    });
  }

  async function sendEmail(userData) {
    const resetLink = `${webAppLink}/reset?${decodeURI(
      userData.password
    )}&username=${userData.username}`;
    const emailForm = {
      username: userData.username,
      resetLink: resetLink,
      replayTo: userData.email,
    };
    await emailjs
      .send(emailjsServiceId, emailjsTemplateId, emailForm, emailjsPublicKey)
      .finally(() => {
        setSended(true);
        setToastSended(toastSended + 1);
      });
  }

  if (!sended)
    return (
      <Box className="box">
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12}>
            <h3>Forgot password</h3>
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
            <Button
              variant="outlined"
              onClick={resetStart}
              disabled={isBtnDisabledHandler(email)}
            >
              Submit
            </Button>
          </Grid>
          <Grid xs={12}>
            <Link href="login">Go To Login</Link>
          </Grid>
          <Grid xs={12}>
            <Link href="registration">Go To Registration</Link>
          </Grid>
        </Grid>
        <Footer />
      </Box>
    );

  return (
    <Box className="box">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <h3>Check your e-mail</h3>
        </Grid>
        <Grid xs={12}>
          <Typography>
            {`E-mail sended to `}
            <span className="text-underline">{email}</span>
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Button variant="outlined" onClick={resetStart}>
            Resend
          </Button>
        </Grid>
        <Grid xs={12}>
          <Link href="login">Go To Login</Link>
        </Grid>
      </Grid>
      <Footer />
      <Toast
        trigger={toastSended}
        type="success"
        message="Reset service e-mail succesfully sended"
      />
    </Box>
  );
}
