import React, { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";
import { getLoggedUserData, changeUserPassword } from "../../stores/users";
import { login } from "../../stores/login";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Correct from "@mui/icons-material/TaskAltOutlined";
import Wrong from "@mui/icons-material/CloseOutlined";
import Toast from "../Toast";

export default function Settings() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordChangeToastTrigger, setPasswordChangeToastTrigger] =
    React.useState(0);

  const userStore = useLocalObservable(() => ({
    userData: undefined,

    getUserData() {
      getLoggedUserData()
        .then((response) => (this.userData = response))
        .finally(() => setIsLoading(false));
    },

    changePassword(password, passwordChangeToastTrigger) {
      this.userData.password = password;
      changeUserPassword(this.userData).then(() => {
        login(this.userData.username, password);
        setPassword("");
        setConfirmPassword("");
        setPasswordChangeToastTrigger(passwordChangeToastTrigger + 1);
      });
    },
  }));

  useEffect(() => {
    if (!userStore.userData) userStore.getUserData();
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isBtnDisabledHandler())
      userStore.changePassword(password, passwordChangeToastTrigger);
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

  return (
    <div className="scrollable-block">
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Grid container>
          <Grid xs={12} className="mb-1">
            <b>Account data</b>
          </Grid>
          <Grid xs={12} className="mb-1">
            {"Username: "}
            <b>{userStore.userData.username}</b>
          </Grid>
          <Grid xs={12} className="mb-1">
            {"Pokemons collected: "}
            <b>{`${userStore.userData.pokemons?.length} / 151`}</b>
          </Grid>
          <Grid xs={12} className="mb-1">
            {"Pokemons percent: "}
            <b>
              {`${((userStore.userData.pokemons?.length / 151) * 100).toFixed(
                2
              )} %`}
            </b>
          </Grid>
          <Grid xs={12} className="mt-2 mb-1">
            <b>Change password</b>
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
              onClick={() =>
                userStore.changePassword(password, passwordChangeToastTrigger)
              }
              disabled={isBtnDisabledHandler()}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
      <Toast
        trigger={passwordChangeToastTrigger}
        type="success"
        message="Password changed succesfully"
      />
    </div>
  );
}
