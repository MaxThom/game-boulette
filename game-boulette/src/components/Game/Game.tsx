import React, { useEffect, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Title from "../Utilities/Title/Title";
import Surface from "../Utilities/Surface/Surface";
import DefaultLinedSurface from "../Utilities/Surface/DefaultLinedSurface";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import {
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
  FieldValue,
} from "@firebase/firestore-types";
import * as firebase from "firebase/app";
import {
  getWaitingRoomNames,
  setPlayerInTeam,
  getTeamPlayerNames,
  getPlayerName,
  getGameUpdates,
  setPlayerName,
  setPlayerTurnStatus,
} from "../../services/firebaseStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    item: {
      textAlign: "left",
    },
    list: {},
    word: {
      width: "70%",
      height: "5vh",
    },
    middleButton: {
      marginRight: "40px",
    },
  })
);

const Game: React.FC = () => {
  const classes = useStyles();
  const [currentPlayer, setCurrentPlayer] = React.useState<string>("Maxime");
  const [team1, setTeam1] = React.useState<string[]>([]);
  const [team2, setTeam2] = React.useState<string[]>([]);
  const [score1, setScore1] = React.useState<number>(0);
  const [score2, setScore2] = React.useState<number>(0);
  const [remainingWords, setRemainingWords] = React.useState<string[]>([]);
  const [currentWord, setCurrentWord] = React.useState<string>("");
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = React.useState<number>(0);

  useEffect(() => {
    getGameUpdates(onGameUpdates);
  }, []);

  const onGameUpdates = (data: DocumentData): void => {
    console.log(data);

    if (data["Team1"] === undefined) setTeam1([]);
    else setTeam1(data["Team1"] as string[]);

    if (data["Team2"] === undefined) setTeam2([]);
    else setTeam2(data["Team2"] as string[]);

    if (data["Game"]["StandingPlayer"]["Name"] === undefined)
      setCurrentPlayer("");
    else setCurrentPlayer(data["Game"]["StandingPlayer"]["Name"] as string);

    if (data["Game"]["StandingPlayer"]["IsPlaying"] === undefined)
      setIsPlaying(false);
    else setIsPlaying(data["Game"]["StandingPlayer"]["IsPlaying"] as boolean);

    if (data["Game"]["ScoreTeam1"] === undefined) setScore1(0);
    else setScore1(data["Game"]["ScoreTeam1"] as number);

    if (data["Game"]["ScoreTeam2"] === undefined) setScore2(0);
    else setScore2(data["Game"]["ScoreTeam2"] as number);

    if (data["Game"]["RemainingWords"] === undefined) setRemainingWords([]);
    else setRemainingWords(data["Game"]["RemainingWords"] as string[]);
  };

  const onStartTurn = (): void => {
    setPlayerTurnStatus(true);
  };

  return (
    <div>
      <Title title="Que la partie commence !"></Title>
      <Surface>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={3}>
            <DefaultLinedSurface>
              <List
                className={classes.list}
                component="nav"
                aria-label="main mailbox folders"
              >
                <ListItem button>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Équipe #1" />
                </ListItem>
                <Divider />
                {team1.map((name: string) => (
                  <ListItem button key={name}>
                    <ListItemText primary={name} />
                  </ListItem>
                ))}
              </List>
            </DefaultLinedSurface>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={4}>
            <Typography component={"span"} variant="h5">
              Tour de <br />
              <strong>{currentPlayer}</strong>
            </Typography>
            <br />
            <br />
            <br />
            <Typography component={"span"}>
              <strong>Temps restant</strong>
              <br />
              {timeRemaining} secondes
              <br />
              <br />
            </Typography>
            {isPlaying ? (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.word}
              >
                Cliquer à plusieurs reprises pour dévoiler le mot
              </Button>
            ) : (
              <React.Fragment />
            )}
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={3}>
            <DefaultLinedSurface>
              <List
                className={classes.list}
                component="nav"
                aria-label="main mailbox folders"
              >
                <ListItem button>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Équipe #2" />
                </ListItem>
                <Divider />
                {team2.map((name: string) => (
                  <ListItem button key={name}>
                    <ListItemText primary={name} />
                  </ListItem>
                ))}
              </List>
            </DefaultLinedSurface>
          </Grid>
        </Grid>
        <br></br>
        <br></br>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={3}>
            <DefaultLinedSurface>
              <Typography component={"span"}>
                <br />
                <strong>Pointage</strong>
                <br />
                Équipe #1: {score1}
                <br />
                Équipe #2: {score2}
                <br />
                <br />
              </Typography>
            </DefaultLinedSurface>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={4}>
            {isPlaying ? (
              <React.Fragment>
                <Button
                  className={classes.middleButton}
                  variant="contained"
                  color="secondary"
                  startIcon={<SpellcheckIcon />}
                >
                  Trouvé
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  startIcon={<SkipNextIcon />}
                >
                  Passer
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => onStartTurn()}
                >
                  Commencer !
                </Button>
              </React.Fragment>
            )}
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={3}>
            <DefaultLinedSurface>
              <Typography component={"span"}>
                <br />
                <strong>Nombre de mots restants</strong>
                <br />
                {remainingWords.length}
                <br />
                <br />
              </Typography>
            </DefaultLinedSurface>
          </Grid>
        </Grid>
      </Surface>
    </div>
  );
};

export default Game;
