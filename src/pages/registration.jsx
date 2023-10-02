import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

function register(name, password, email) {
  if (!isBtnDisabledHandler(name, password, email)) {
    console.log("register");
  } else {
    console.log("wrong register");
  }
}

function isBtnDisabledHandler(name, password, email) {
  const emailTest = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  if (name.length < 4 || password.length < 8 || !emailTest) return true;
  return false;
}

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") register(name, password, email);
  };

  return (
    <Box className="box">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <h3>Registration</h3>
        </Grid>
        <Grid xs={12}>
          <TextField
            value={email}
            id="outlined-basic"
            label="Email"
            variant="filled"
            onChange={(value) => setEmail(value.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            value={name}
            id="outlined-basic"
            label="Username"
            variant="filled"
            onChange={(value) => setName(value.target.value)}
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
          <Button
            variant="outlined"
            onClick={() => register(name, password, email)}
            disabled={isBtnDisabledHandler(name, password, email)}
          >
            Submit
          </Button>
        </Grid>
        <Grid xs={12}>
          <Link href="login">Go To Login</Link>
        </Grid>
      </Grid>
    </Box>
  );
}
