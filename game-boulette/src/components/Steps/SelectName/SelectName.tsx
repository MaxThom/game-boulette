import React, { useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import { setPlayerName, getPlayerName } from "../../../services/firebaseStore";


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

const SelectName: React.FC = () => {
  const classes = useStyles();
  const [name, setName] = React.useState<string>("");
  const [disable, setDisable] = React.useState<boolean>(false);

  useEffect(() => {
    setName(getPlayerName());
  }, []);

  const OnSave = async (): Promise<void> => {
    setDisable(true);
    var isSuccess = await setPlayerName(name);
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
          Entrez de votre nom
        </Typography>
      </Grid>
      {/* 12 */}
      <Grid item xs={2} />
      <Grid item xs={2} className={classes.item}>
        <Typography component={'span'} id="" gutterBottom>
          Votre nom
        </Typography>
      </Grid>
      <Grid item xs={2} className={classes.item}>
        <TextField
          label="Nom"
          id=""
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)
          }
          value={name}
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
            onClick={() => OnSave()}
            className={classes.fill}
            startIcon={<SaveIcon />}
          >
            Sauvegarder
          </Button>
        </Grid>
        <Grid item xs={2} />
      </Grid>
  </form>
  );
}

export default SelectName;
