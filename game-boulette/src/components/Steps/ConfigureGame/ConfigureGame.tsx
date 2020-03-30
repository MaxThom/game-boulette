import React, { Component, ReactNode } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    item: {
      textAlign: "left"
    }
  })
);

const ConfigureGame: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(60);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
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
          <Typography variant="h5" component="h1">
            Configuration de la partie
          </Typography>
        </Grid>
        {/* 12 */}
        <Grid item xs={2} />
        <Grid item xs={2} className={classes.item}>
          <Typography id="" gutterBottom>
            Nombre de manche
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <TextField
            label="Nombre de manche"
            id=""
            defaultValue="3"
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
          <Typography id="discrete-slider" gutterBottom>
            Temps par personne (seconde)
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Slider
            defaultValue={value}
            onChange={handleChange}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={120}
          />
        </Grid>
        <Grid item xs={2} className={classes.item}>
          {value} secondes
        </Grid>
        <Grid item xs={2} />
        {/* 12 */}
        <Grid item xs={2} />
        <Grid item xs={2} className={classes.item}>
          <Typography id="" gutterBottom>
            Nombre de papier par personne
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <TextField
            label="Papier par personne"
            id="outlined-margin-none"
            defaultValue="5"
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
          <Typography id="" gutterBottom>
            Thème de la partie
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <TextField
            label="Thème"
            id="outlined-margin-none"
            defaultValue="Tout"
            helperText=""
            variant="outlined"
            size="small"
            type="string"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} />
      </Grid>
      {/* 12 */}
    </form>
  );
};

export default ConfigureGame;
