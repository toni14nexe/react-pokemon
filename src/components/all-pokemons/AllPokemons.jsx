import "../Components.css";
import React, { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";
import PokemonCards from "../PokemonCards";
import { getMyPokemonList, getPlayingPokemonList } from "../../stores/pokemons";

export default observer(() => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isGetLaunched, setIsGetLauncehed] = React.useState(false);

  const pokemonStore = useLocalObservable(() => ({
    pokemons: [],
    collected: 0,

    getData() {
      getMyPokemonList().then((myResponse) =>
        getPlayingPokemonList()
          .then((response) => {
            this.collected = myResponse.length;
            this.pokemons = response;
            myResponse.forEach(
              (pokemon) => (this.pokemons[pokemon.id - 1] = pokemon)
            );
            this.pokemons = this.pokemons.sort((pokemon1, pokemon2) => {
              if (pokemon1.name < pokemon2.name) return -1;
              else return 1;
            });
          })
          .finally(() => setIsLoading(false))
      );
    },
  }));

  useEffect(() => {
    setIsGetLauncehed(true);
    if (isGetLaunched && !pokemonStore.pokemons.length) pokemonStore.getData();
  });

  return (
    <div className="scrollable-block">
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <PokemonCards
          pokemons={pokemonStore.pokemons}
          collected={pokemonStore.collected}
        />
      )}
    </div>
  );
});
