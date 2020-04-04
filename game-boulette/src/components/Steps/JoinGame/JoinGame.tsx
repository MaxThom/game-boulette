import React, { useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import IconButton from "@material-ui/core/IconButton";
import LinedSurface from "../../Utilities/Surface/LinedSurface";
import SyncIcon from "@material-ui/icons/Sync";

import { getAllWaitingRoomGame, setGameRef } from "../../../services/firebaseStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    item: {
      textAlign: "left",
    },
    fill: {
      width: "100%",
    },
    joinRoom: {
      marginLeft: "50%",
    },
    row: {
      height: "10%"
    }
  })
);

const ConfigureGame: React.FC = () => {
  const classes = useStyles();
  const [gameList, setGameList] = React.useState<any[]>([]);

  useEffect(() => {
    OnRefresh();
  }, []);

  const OnRefresh = async (): Promise<void> => {
    getAllWaitingRoomGame().then((data: any) => {
      setGameList(data);
    });
  };

  const OnChooseGame = (gameId: any): void => {
    setGameRef(gameId as string);
  };

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
          <Typography component={"span"} variant="h5">
            Choisir une partie
          </Typography>
          <IconButton color="primary" aria-label="add to shopping cart" onClick={() => OnRefresh()}>
            <SyncIcon fontSize="large" />
          </IconButton>
        </Grid>
        {/* 12 */}
        {gameList.map((row: { id: string; data: any }) => (
          <React.Fragment>
            <Grid item xs={2} />
            <Grid item xs={5}>
              <LinedSurface>
        <strong>{row.data["Config"]["GameName"]}</strong>
                <Button
                  id={row.id}
                  variant="contained"
                  color="secondary"
                  className={classes.joinRoom}
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  onClick={e => {
                    OnChooseGame(row.id);
                  }}
                >
                  Choisir
                </Button>
              </LinedSurface>
            </Grid>
            <Grid item xs={5} />
          </React.Fragment>
        ))}
      </Grid>
    </form>
  );
};

export default ConfigureGame;
