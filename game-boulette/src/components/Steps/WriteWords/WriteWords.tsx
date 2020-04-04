import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import {
  getWordsCountPerPerson,
  setPlayerWords,
  getWordsSent
} from "../../../services/firebaseStore";

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

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

const WriteWords: React.FC = () => {
  const classes = useStyles();
  const [words, setWords] = React.useState<string[]>([]);
  const [wordCount, setWordCount] = React.useState<number[]>([]);
  const [disable, setDisable] = React.useState<boolean>(false);

  useEffect(() => {
    getWordsCountPerPerson().then((data: any) => {
      setWordCount(range(1, data, 1));
    });
    setDisable(getWordsSent() === "true");
  }, []);

  const OnSave = async (): Promise<void> => {
    setDisable(true);
    console.log(words);
    var isSuccess = await setPlayerWords(words);
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
          <Typography component={"span"} variant="h5">
            Entrez vos mots
          </Typography>
        </Grid>
        {/* 12 */}
        {wordCount.map((index: number) => (
          <React.Fragment>
            <Grid item xs={2} />
            <Grid item xs={2} className={classes.item}>
              <Typography component={"span"} id="" gutterBottom>
                Mot #{index}
              </Typography>
            </Grid>
            <Grid item xs={4} className={classes.item}>
              <TextField
                label="Mot"
                id={"word"+index}
                helperText=""
                variant="outlined"
                size="small"
                type="string"
                fullWidth
                onChange={e => {
                    words[index-1] = e.target.value;
                    setWords([...words]);
                  }}
              />
            </Grid>
            <Grid item xs={4} />
            </React.Fragment>
        ))}
        {/* 12 */}
        <Grid item xs={2} />
        <Grid item xs={8} className={classes.item}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => OnSave()}
            className={classes.fill}
            startIcon={<SaveIcon />}
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

export default WriteWords;
