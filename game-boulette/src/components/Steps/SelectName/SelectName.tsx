import React, { Component, ReactNode } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    item: {
      textAlign: "left"
    }
  })
);

const SelectName: React.FC = () => {
  const classes = useStyles();

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
          Entrez de votre nom
        </Typography>
      </Grid>
      {/* 12 */}
      <Grid item xs={2} />
      <Grid item xs={2} className={classes.item}>
        <Typography id="" gutterBottom>
          Votre nom
        </Typography>
      </Grid>
      <Grid item xs={2} className={classes.item}>
        <TextField
          label="Nom"
          id=""
          defaultValue=""
          helperText=""
          variant="outlined"
          size="small"
          type="string"
          fullWidth
        />
      </Grid>
      <Grid item xs={6} />
      </Grid>
  </form>
  );
}

export default SelectName;
