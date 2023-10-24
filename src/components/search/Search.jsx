import React, { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { getMyPokemonList, getPlayingPokemonList } from "../../stores/pokemons";
import PokemonCards from "../PokemonCards";
import CircularProgress from "@mui/material/CircularProgress";

export default function search() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");

  const pokemonStore = useLocalObservable(() => ({
    pokemons: [],

    getPokemons(search) {
      setIsLoading(true);
      getMyPokemonList().then((myResponse) =>
        getPlayingPokemonList()
          .then((response) => {
            this.pokemons = response;
            myResponse.forEach(
              (pokemon) => (this.pokemons[pokemon.id - 1] = pokemon)
            );
            this.pokemons = this.pokemons.filter((pokemon) => {
              return pokemon.name.toLowerCase().includes(search.toLowerCase());
            });
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
    setSearchValue(window.location.search.slice(7));
    pokemonStore.getPokemons(window.location.search.slice(7));
  }, [window.location.search]);

  return (
    <div className="scrollable-block">
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <PokemonCards
          pokemons={pokemonStore.pokemons}
          searching={searchValue}
        />
      )}
    </div>
  );
}
