import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

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

  return (
    <Grid container>
      {props.pokemons.map((pokemon) => (
        <Grid xs={4} key={pokemon.id}>
          <HtmlTooltip
            TransitionComponent={Zoom}
            title={
              <React.Fragment>
                <Typography color="inherit">HP: {pokemon.hp}</Typography>
                <LinearProgress
                  variant="buffer"
                  value={pokemon.hp}
                  valueBuffer={100}
                />{" "}
                <br />
                <Typography color="inherit">
                  Attack: {pokemon.attack}
                </Typography>
                <LinearProgress
                  variant="buffer"
                  value={pokemon.attack}
                  valueBuffer={100}
                />
                <br />
                <Typography color="inherit">
                  Defense: {pokemon.defense}
                </Typography>
                <LinearProgress
                  variant="buffer"
                  value={pokemon.defense}
                  valueBuffer={100}
                />
                <br />
                <Typography color="inherit">Speed: {pokemon.speed}</Typography>
                <LinearProgress
                  variant="buffer"
                  value={pokemon.speed}
                  valueBuffer={100}
                  className="mb-1"
                />
              </React.Fragment>
            }
          >
            <div className="pokemon-card">
              <Grid container>
                <Grid xs={12}>
                  {`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`}
                </Grid>
                <Grid xs={12}>
                  <img src={pokemon.image} />
                </Grid>
              </Grid>
            </div>
          </HtmlTooltip>
        </Grid>
      ))}
    </Grid>
  );
}
