import React, { Component, ReactNode } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
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
            id="outlined-select-currency"
            select
            label="Nombre de manche"
            value="3"
            helperText=""
            variant="outlined"
            size="small"
            fullWidth
          >
            <MenuItem key="1" value="1">
              1 manche
            </MenuItem>
            <MenuItem key="2" value="2">
              2 manches
            </MenuItem>
            <MenuItem key="3" value="3">
              3 manches
            </MenuItem>
            <MenuItem key="4" value="4">
              4 manches
            </MenuItem>
            <MenuItem key="5" value="5">
              5 manches
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} />
        {/* 12 */}
        <Grid item xs={2} />
        <Grid item xs={2}>
          <Typography id="discrete-slider" gutterBottom>
            Temps par manche (seconde)
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
      </Grid>

      <TextField
        label="Nombre de manche"
        id="outlined-margin-none"
        defaultValue="3"
        helperText=""
        variant="outlined"
        size="small"
      />
    </form>
  );
};

export default ConfigureGame;
