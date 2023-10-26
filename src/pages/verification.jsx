import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Footer from "../components/dashboard/Footer";
import { accountVerification } from "../stores/users";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [urlAES, setUrlAES] = React.useState("");

  React.useEffect(() => {
    const usernamePosition = window.location.search.indexOf("&username=");
    setUsername(window.location.search.slice(usernamePosition + 10));
    setUrlAES(window.location.search.slice(1, usernamePosition));
    accountVerification(username, urlAES);
  });

  return (
    <Box className="box">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <h3>
            Hey <span className="text-underline">{username}</span>, your account
            is now verifed.
          </h3>
        </Grid>
        <Grid xs={12}>
          <Link href="login">Go To Login</Link>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}
