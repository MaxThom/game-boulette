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
  const [gameName, setGameName] = React.useState<string>("");
  const [nbRound, setNbRound] = React.useState<number>(3);
  const [slider, setSlider] = React.useState<number>(60);
  const [nbPaper, setNbPaper] = React.useState<number>(5);
  const [theme, setTheme] = React.useState<string>("Tout");
  const [zoom, setZoom] = React.useState<string>("");
  const [disable, setDisable] = React.useState<boolean>(false);

  const OnSaveGame = async (): Promise<void> => {
    setDisable(true);
    var isSuccess = await createGameConfig(gameName, theme, zoom, nbRound, nbPaper, slider);
    setDisable(false);
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
            Configuration de la partie
          </Typography>
        </Grid>
        {/* 12 */}
        <Grid item xs={2} />
        <Grid item xs={2} className={classes.item}>
          <Typography component={'span'} id="" gutterBottom>
            Nom de la partie
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <TextField
            label="Nom"
            id=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGameName(e.currentTarget.value)
            }
            defaultValue={gameName}
            helperText=""
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} />
        {/* 12 */}
        <Grid item xs={2} />
        <Grid item xs={2} className={classes.item}>
          <Typography component={'span'} id="" gutterBottom>
            Nombre de manche
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <TextField
            label="Nombre de manche"
            id=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNbRound(+e.currentTarget.value)
            }
            defaultValue={nbRound}
            helperText=""
            variant="outlined"
            size="small"
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} />
        {/* 12 */}
        <Grid item xs={2} />
        <Grid item xs={2} className={classes.item}>
          <Typography component={'span'} id="discrete-slider" gutterBottom>
            Temps par personne (seconde)
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Slider
            defaultValue={slider}
            onChange={(event: any, value: number | number[]) =>
              setSlider(value as number)
            }
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={120}
          />
        </Grid>
        <Grid item xs={2} className={classes.item}>
          {slider} secondes
        </Grid>
        <Grid item xs={2} />
        {/* 12 */}
        <Grid item xs={2} />
        <Grid item xs={2} className={classes.item}>
          <Typography component={'span'} id="" gutterBottom>
            Nombre de papier par personne
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <TextField
            label="Papier par personne"
            id="outlined-margin-none"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNbPaper(+e.currentTarget.value)
            }
            defaultValue={nbPaper}
            helperText=""
            variant="outlined"
            size="small"
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} />
        {/* 12 */}
        <Grid item xs={2} />
        <Grid item xs={2} className={classes.item}>
          <Typography component={'span'} id="" gutterBottom>
            Thème de la partie
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <TextField
            label="Thème"
            id="outlined-margin-none"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTheme(e.currentTarget.value)
            }
            defaultValue={theme}
            helperText=""
            variant="outlined"
            size="small"
            type="string"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} />
        {/* 12 */}
        <Grid item xs={2} />
        <Grid item xs={2} className={classes.item}>
          <Typography component={'span'} id="" gutterBottom>
            Zoom URL
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <TextField
            label="URL"
            id="outlined-margin-none"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setZoom(e.currentTarget.value)
            }
            defaultValue={zoom}
            helperText=""
            variant="outlined"
            size="small"
            type="string"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} />
        {/* 12 */}
        <Grid item xs={2} />
        <Grid item xs={8} className={classes.item}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.fill}
            startIcon={<SaveIcon />}
            onClick={() => OnSaveGame()}
            disabled={disable}
          >
            Sauvegarder
          </Button>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </form>
  );
};

export default ConfigureGame;
