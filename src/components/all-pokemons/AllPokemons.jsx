import "../Components.css";
import React, { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";
import PokemonCards from "../PokemonCards";
import { getPokemons } from "../../stores/pokemons";

export default observer(() => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isGetLaunched, setIsGetLauncehed] = React.useState(false);

  const pokemonStore = useLocalObservable(() => ({
    pokemons: [],

    getPokemons() {
      getPokemons()
        .then((response) => (this.pokemons = response))
        .finally(() => setIsLoading(false));
    },
  }));

  useEffect(() => {
    setIsGetLauncehed(true);
    if (isGetLaunched && !pokemonStore.pokemons.length)
      pokemonStore.getPokemons();
  });

  return (
    <div className="scrollable-block">
      {isLoading && <CircularProgress />}
      {!isLoading && <PokemonCards pokemons={pokemonStore.pokemons} />}
    </div>
  );
});
