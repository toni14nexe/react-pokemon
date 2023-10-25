import "../Components.css";
import React, { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";
import PokemonCards from "../PokemonCards";
import { getMyPokemonList } from "../../stores/pokemons";
import { getLoggedUserData } from "../../stores/users";

export default observer(() => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userData, setUserData] = React.useState(undefined);

  const pokemonStore = useLocalObservable(() => ({
    pokemons: [],

    getPokemons() {
      getMyPokemonList()
        .then((response) => {
          this.pokemons = response.sort((pokemon1, pokemon2) => {
            if (pokemon1.name < pokemon2.name) return -1;
            else return 1;
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  }));

  useEffect(() => pokemonStore.getPokemons(), []);

  function getUserData() {
    getLoggedUserData().then((response) => setUserData(response));
  }

  const onPokemonChange = () => {
    pokemonStore.getPokemons();
  };

  return (
    <div className="scrollable-block">
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <PokemonCards
          pokemons={pokemonStore.pokemons}
          userData={userData}
          collected={pokemonStore.pokemons.length}
          onPokemonChange={onPokemonChange}
        />
      )}
    </div>
  );
});
