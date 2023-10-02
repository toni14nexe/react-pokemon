import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

function login(name, password) {
  if (!isBtnDisabledHandler(name, password)) {
    console.log("login");
  } else {
    console.log("wrong login");
  }
}

function isBtnDisabledHandler(name, password) {
  if (name.length < 4 || password.length < 8) return true;
  return false;
}

export default function Login() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") login(name, password);
  };

  return (
    <Box sx={{ width: "50%" }} className="box">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <h3>Login</h3>
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
            onClick={() => login(name, password)}
            disabled={isBtnDisabledHandler(name, password)}
          >
            Submit
          </Button>
        </Grid>
        <Grid xs={12}>
          <Link href="registration">Go To Registration</Link>
        </Grid>
      </Grid>
    </Box>
  );
}
