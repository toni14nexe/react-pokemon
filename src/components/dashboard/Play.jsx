import "../Components.css";
import React, { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";
import { getPlayingPokemonList, getPokemon } from "../../stores/pokemons";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default observer(() => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLaunched, setIsLauncehed] = React.useState(false);
  const [randomPokemon, setRandomPokemon] = React.useState(undefined);
  const [pokemonName, setPokemonName] = React.useState("");

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
      setIsLoading(true);
      const num = Math.round(Math.random() * (151 - 1) + 1);
      const pokemonAlreadyMined = this.usersPokemons.some(
        (pokemon) => pokemon.id === num
      );
      if (!pokemonAlreadyMined) this.getRandomPokemon(num);
      else this.getRandomPokemon();
    },

    getRandomPokemon(id) {
      getPokemon(id)
        .then((response) => setRandomPokemon(response))
        .finally(() => setIsLoading(false));
    },
  }));

  useEffect(() => {
    setIsLauncehed(true);
    if (isLaunched && !pokemonStore.guessingPokemons.length)
      pokemonStore.startPokemonStore();
  });

  function isBtnDisabledHandler() {
    if (!pokemonName.length) return true;
    return false;
  }

  function refresh() {
    console.log("refresh");
    setPokemonName("");
  }

  function submit() {
    console.log("submit");
    setPokemonName("");
  }

  return (
    <div className="scrollable-block">
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <h3 className="scrollable-title">Guess Pokemon name</h3>
          </Grid>
          <Grid xs={12}>
            <img className="guessing-img" src={randomPokemon.image} />
          </Grid>
          <Grid xs={12} className="mb-2">
            <TextField
              className="random-input"
              value={pokemonName}
              id="outlined-basic"
              label="Pokemon name"
              variant="filled"
              onChange={(value) => setPokemonName(value.target.value)}
            />
          </Grid>
          <Grid xs={12} className="mb-2">
            <Button
              className="mr-1"
              variant="outlined"
              onClick={() => refresh()}
            >
              Refresh
            </Button>
            <Button
              className="ml-1"
              variant="outlined"
              onClick={() => submit()}
              disabled={isBtnDisabledHandler()}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
});
