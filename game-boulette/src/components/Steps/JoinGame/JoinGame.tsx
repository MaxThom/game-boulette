import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import { createGameConfig } from "../../../services/firebaseStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    item: {
      textAlign: "left"
    },
    fill: {
      width: "100%"
    }
  })
);

const ConfigureGame: React.FC = () => {
  const classes = useStyles();
  const [gameList, setGameList] = React.useState<any[]>([]);

  const OnSaveGame = async (): Promise<void> => {
   
    //var isSuccess = await createGameConfig(theme, zoom, nbRound, nbPaper, slider);
   
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <hr />
      <br />
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={2} />
        <Grid item xs={10} className={classes.item}>
          <Typography component={'span'} variant="h5" >
            Choisir une partie
          </Typography>
        </Grid>
        {/* 12 */}
        <Grid item xs={2} />
       
        <Grid item xs={6} />
      </Grid>
    </form>
  );
};

export default ConfigureGame;
