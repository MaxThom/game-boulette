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
  getPlayerName,
  getGameUpdates,
  setPlayerTurnStatus,
  getIsHost,
  setGameStatus,
  getGameConfig,
  setGameCurrentTurn,
  setPlayerTurnName,
  setGameCurrentRound
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
  const [playerName, setPlayerName] = React.useState<string>("");
  const [isHost, setIsHost] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<string>("Waiting-Room");
  const [currentPlayer, setCurrentPlayer] = React.useState<string>("Maxime");
  const [team1, setTeam1] = React.useState<string[]>([]);
  const [team2, setTeam2] = React.useState<string[]>([]);
  const [score1, setScore1] = React.useState<number>(0);
  const [score2, setScore2] = React.useState<number>(0);
  const [remainingWords, setRemainingWords] = React.useState<string[]>([]);
  const [currentWord, setCurrentWord] = React.useState<string>("");
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = React.useState<number>(0);
  
  const [currentRound, setCurrentRound] = React.useState<number>(1);
  const [gameConfig, setGameConfig] = React.useState<any>();
  const [currentTurn, setCurrentTurn] = React.useState<number>(0);
  const [counter, setCounter] = React.useState(0);
  
  const OnEndTurn = (): void => {
    setPlayerTurnStatus(false);
    setGameCurrentTurn(currentTurn+1);
    setCurrentTurn(currentTurn+1);
    SetNewTurn();
  };

  useEffect(() => {
    getGameUpdates(onGameUpdates);
    setPlayerName(getPlayerName());
    setIsHost(getIsHost());
    getGameConfig().then((data: any) => {
      setGameConfig(data);
    });
  }, []);

  useEffect(() => {    
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0 && isPlaying) OnEndTurn();
  }, [counter]);


  
  const onGameUpdates = (data: DocumentData): void => {
    console.log(data);
    if (data) {
      if (data["Status"] !== undefined)
      setStatus(data["Status"] as string);

      if (data["Team1"] !== undefined) 
      setTeam1(data["Team1"] as string[]);

      if (data["Team2"] !== undefined)
      setTeam2(data["Team2"] as string[]);

      if (data["Game"]["StandingPlayer"]["Name"] !== undefined)
      setCurrentPlayer(data["Game"]["StandingPlayer"]["Name"] as string);

      if (data["Game"]["StandingPlayer"]["IsPlaying"] !== undefined) {
        if (data["Game"]["StandingPlayer"]["IsPlaying"] as boolean === true && data["Game"]["StandingPlayer"]["IsPlaying"] !== isPlaying)
          setCounter(5);
        setIsPlaying(data["Game"]["StandingPlayer"]["IsPlaying"] as boolean);
      }

      if (data["Game"]["ScoreTeam1"] !== undefined)
      setScore1(data["Game"]["ScoreTeam1"] as number);

      if (data["Game"]["ScoreTeam2"] !== undefined) 
      setScore2(data["Game"]["ScoreTeam2"] as number);

      if (data["Game"]["RemainingWords"] !== undefined)
      setRemainingWords(data["Game"]["RemainingWords"] as string[]);

      if (data["Game"]["CurrentRound"] !== undefined) 
      setCurrentRound(data["Game"]["CurrentRound"] as number);    

      if (data["Game"]["CurrentTurn"] !== undefined) 
      { setCurrentTurn(data["Game"]["CurrentTurn"] as number);}
    }
  };

  const SetNewTurn = (): void => {
      console.log(currentTurn);
      if (currentTurn % 2 === 0) {
        // Team 1
        console.log(~~(currentTurn / 2));
        console.log(~~(currentTurn / 2)% team1.length);
        setPlayerTurnName(team1[(currentTurn / 2) % team1.length]);
      } else {
        // Team 2
        console.log(~~(currentTurn / 2));
        console.log(~~(currentTurn / 2)% team2.length);
        setPlayerTurnName(team2[~~(currentTurn / 2) % team2.length]);
      }      
  };

  const OnStartTurn = (): void => {
    setPlayerTurnStatus(true);
    console.log(gameConfig);
    console.log(gameConfig["TimePerPersonSec"]);
    setTimeRemaining(gameConfig["TimePerPersonSec"])
    //setCounter(3);
  };

  

  const OnGameStart = (): void => {
    setGameStatus("Game-Started");
    setCurrentTurn(1);
    setGameCurrentTurn(1);
    SetNewTurn();
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
          {status === "Game-Started" ? (
            <React.Fragment>
            <Typography component={"span"}>
              Manche # 
              <strong>{currentRound}</strong>
            </Typography>
            <br />
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
              {counter} secondes
              <br />
              <br />
            </Typography>
            {isPlaying ? (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.word}
                disabled={playerName !== currentPlayer}
              >
                Cliquer à plusieurs reprises pour dévoiler le mot
              </Button>
            ) : (
              <React.Fragment />
            )}
            </React.Fragment>
            ) : (
              <Button
                color="primary"
                variant="contained"
                size="large"
                disabled={!isHost}
                onClick={() => OnGameStart()}
              >
                Commencer la partie !
              </Button>
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
          {status === "Game-Started" ? (
            isPlaying ? (
              <React.Fragment>
                <Button
                  className={classes.middleButton}
                  variant="contained"
                  color="secondary"
                  startIcon={<SpellcheckIcon />}
                  disabled={playerName !== currentPlayer}
                >
                  Trouvé
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  startIcon={<SkipNextIcon />}
                  disabled={playerName !== currentPlayer}
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
                  onClick={() => OnStartTurn()}
                  disabled={playerName !== currentPlayer}
                >
                  Commencer !
                </Button>
              </React.Fragment>
            )
          ) : (<React.Fragment/>)}
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
