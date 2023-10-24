import "../Components.css";
import React, { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getPlayingPokemonList,
  getPokemon,
  saveUserData,
} from "../../stores/pokemons";
import { getLoggedUserData, restartPokemons } from "../../stores/users";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from "@mui/icons-material/Refresh";
import Check from "@mui/icons-material/Check";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Clear from "@mui/icons-material/Clear";

export default observer(() => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLaunched, setIsLauncehed] = React.useState(false);
  const [randomPokemon, setRandomPokemon] = React.useState(undefined);
  const [pokemonName, setPokemonName] = React.useState("");
  const [savingData, setSavingData] = React.useState("");
  const [allPokemonsGuessed, setAllPokemonsGuessed] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState(false);
  const [wrongAnswer, setWrongAnswer] = React.useState(false);

  const pokemonStore = useLocalObservable(() => ({
    guessingPokemons: [],
    usersPokemons: [],
    usedIds: [],

    startPokemonStore() {
      getPlayingPokemonList()
        .then((response) => {
          this.guessingPokemons = response;
          this.usersPokemons = JSON.parse(localStorage.getItem("pokemons"));
          this.usedIds = this.usersPokemons.map((pokemon) => pokemon.id);
        })
        .finally(() => this.getRandomNumber());
    },

    getRandomNumber() {
      if (JSON.parse(localStorage.getItem("pokemons")).length === 151)
        setAllPokemonsGuessed(true);
      else {
        setIsLoading(true);
        const num = Math.round(Math.random() * (151 - 1) + 1);
        const pokemonAlreadyMined = this.usersPokemons.some(
          (pokemon) => pokemon.id === num
        );
        if (!pokemonAlreadyMined) this.getRandomPokemon(num);
        else this.getRandomPokemon();
      }
    },

    getRandomPokemon(id) {
      getPokemon(id)
        .then((response) => setRandomPokemon(response))
        .finally(() => setIsLoading(false));
    },

    pokemonNameCorrect(savingData, randomPokemon) {
      setCorrectAnswer(true);
      savingData.pokemons.push({ ...randomPokemon, favorite: false });
      setTimeout(() => {
        saveUserData(savingData).finally(() => pokemonStore.getRandomNumber());
        setCorrectAnswer(false);
      }, 2500);
    },
  }));

  useEffect(() => {
    setIsLauncehed(true);
    if (isLaunched && !pokemonStore.guessingPokemons.length) {
      pokemonStore.startPokemonStore();
      getSavingData();
    }
  });

  function getSavingData() {
    getLoggedUserData().then((response) => setSavingData(response));
  }

  function isBtnDisabledHandler() {
    if (!pokemonName.length) return true;
    return false;
  }

  function refresh() {
    pokemonStore.getRandomNumber();
    setPokemonName("");
  }

  function submit() {
    if (pokemonName.length) {
      if (pokemonName.toLowerCase() === randomPokemon.name)
        pokemonStore.pokemonNameCorrect(savingData, randomPokemon);
      else pokemonNameIncorrect();
      setPokemonName("");
    }
  }

  function pokemonNameIncorrect() {
    setWrongAnswer(true);
    setTimeout(() => {
      pokemonStore.getRandomNumber();
      setWrongAnswer(false);
    }, 2500);
  }

  function restartGame() {
    restartPokemons(savingData).then(() => {
      setAllPokemonsGuessed(false);
      pokemonStore.getRandomPokemon();
    });
  }

  return (
    <div className="scrollable-block">
      {isLoading && <CircularProgress />}
      {allPokemonsGuessed && (
        <div>
          <Grid xs={12}>
            <h3 className="scrollable-title">All Pokemons guessed</h3>
          </Grid>
          <Grid xs={12}>
            <Button
              className="ml-1"
              variant="outlined"
              onClick={() => restartGame()}
            >
              Restart game
              <RefreshIcon className="btn-icon-fix" />
            </Button>
          </Grid>
        </div>
      )}
      {!isLoading && !allPokemonsGuessed && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <h3 className="scrollable-title">Guess Pokemon name</h3>
          </Grid>
          {!wrongAnswer && !correctAnswer && (
            <Grid xs={12} className="pokemon-name-tooltip">
              <Tooltip
                title={`${randomPokemon?.name[0].toUpperCase()}${randomPokemon?.name.slice(
                  1
                )}`}
                className="hover-pointer"
              >
                <HelpOutlineIcon className="color-primary" />
              </Tooltip>
            </Grid>
          )}
          {!wrongAnswer && !correctAnswer && (
            <Grid xs={12}>
              <img className="guessing-img" src={randomPokemon?.image} />
            </Grid>
          )}
          {!wrongAnswer && !correctAnswer && (
            <Grid xs={12} className="mb-2">
              <TextField
                className="random-input"
                value={pokemonName}
                label="Pokemon name"
                variant="filled"
                onChange={(value) => setPokemonName(value.target.value)}
                onKeyDown={(key) => {
                  if (key.code === "Enter") submit();
                }}
              />
            </Grid>
          )}
          {!wrongAnswer && !correctAnswer && (
            <Grid xs={12} className="mb-2">
              <Button
                className="mr-1"
                variant="outlined"
                onClick={() => refresh()}
              >
                Refresh
                <RefreshIcon className="btn-icon-fix" />
              </Button>
              <Button
                className="ml-1"
                variant="outlined"
                onClick={() => submit()}
                disabled={isBtnDisabledHandler()}
              >
                Submit
                <Check className="btn-icon-fix" />
              </Button>
            </Grid>
          )}
          {wrongAnswer && (
            <Grid xs={12}>
              <span className="color-danger">Wrong answer</span>
            </Grid>
          )}
          {wrongAnswer && (
            <Grid xs={12}>
              <Clear fontSize="large" className="mb-2 color-danger" />
            </Grid>
          )}
          {correctAnswer && (
            <Grid xs={12}>
              <span className="color-correct">Correct answer</span>
            </Grid>
          )}
          {correctAnswer && (
            <Grid xs={12}>
              <Check fontSize="large" className="mb-2 color-correct" />
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
});
