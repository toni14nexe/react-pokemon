import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { saveUserData } from "../stores/pokemons";

export default function pokemonCard(props) {
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "rgb(255, 235, 59)",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
      width: "190px",
    },
  }));

  function changeFavoriteState(pokemon) {
    props.userData.pokemons.forEach((arrayPokemon) => {
      if (arrayPokemon.id === pokemon.id)
        arrayPokemon.favorite = !arrayPokemon.favorite;
      stop();
    });
    saveUserData(props.userData).then(() => props.onPokemonChange());
  }

  return (
    <Grid container>
      <Grid xs={12} className="mb-1">
        <b>{`Collected: ${props.collected} / 151`}</b>
        <LinearProgress
          variant="buffer"
          value={(props.collected / 151) * 100}
          valueBuffer={100}
          className="mt-1 mb-1 ml-1 mr-1"
        />
      </Grid>
      {props.pokemons.map((pokemon) => (
        <Grid xs={4} key={pokemon.id || pokemon.name}>
          {pokemon.hp && (
            <HtmlTooltip
              TransitionComponent={Zoom}
              title={
                <React.Fragment>
                  <Typography color="inherit">HP: {pokemon.hp}</Typography>
                  <LinearProgress
                    variant="buffer"
                    value={(pokemon.hp / 250) * 100}
                    valueBuffer={100}
                  />
                  <br />
                  <Typography color="inherit">
                    Attack: {pokemon.attack}
                  </Typography>
                  <LinearProgress
                    variant="buffer"
                    value={(pokemon.attack / 134) * 100}
                    valueBuffer={100}
                  />
                  <br />
                  <Typography color="inherit">
                    Defense: {pokemon.defense}
                  </Typography>
                  <LinearProgress
                    variant="buffer"
                    value={(pokemon.defense / 180) * 100}
                    valueBuffer={100}
                  />
                  <br />
                  <Typography color="inherit">
                    Speed: {pokemon.speed}
                  </Typography>
                  <LinearProgress
                    variant="buffer"
                    value={(pokemon.speed / 150) * 100}
                    valueBuffer={100}
                    className="mb-1"
                  />
                </React.Fragment>
              }
            >
              <div className="pokemon-card">
                <Grid container>
                  {!props.userData && (
                    <Grid xs={12}>
                      {`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(
                        1
                      )}`}
                    </Grid>
                  )}
                  {props.userData && (
                    <Grid xs={12}>
                      {`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(
                        1
                      )}`}
                      {!pokemon.favorite && (
                        <FavoriteBorderIcon
                          className="ml-1 favorite-icon hover-pointer"
                          onClick={() => changeFavoriteState(pokemon)}
                        />
                      )}
                      {pokemon.favorite && (
                        <FavoriteIcon
                          className="ml-1 favorite-icon hover-pointer"
                          onClick={() => changeFavoriteState(pokemon)}
                        />
                      )}
                    </Grid>
                  )}
                  <Grid xs={12}>
                    <img src={pokemon.image} />
                  </Grid>
                </Grid>
              </div>
            </HtmlTooltip>
          )}
          {!pokemon.hp && (
            <div className="pokemon-card">
              <Grid container>
                <Grid xs={12}>
                  {`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`}
                </Grid>
                <Grid xs={12}>
                  <HelpOutlineIcon
                    sx={{ fontSize: 60 }}
                    className="mt-2 mb-1 color-primary"
                  />
                </Grid>
              </Grid>
            </div>
          )}
        </Grid>
      ))}
    </Grid>
  );
}
