import React, { Component, ReactNode, useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import GroupIcon from "@material-ui/icons/Group";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import Button from "@material-ui/core/Button";

import {
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
  FieldValue
} from "@firebase/firestore-types";
import * as firebase from "firebase/app";

import { getWaitingRoomNames, setPlayerInTeam, getTeamPlayerNames, getPlayerName, getGameUpdates } from "../../../services/firebaseStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    item: {
      textAlign: "left"
    },
    list: {
      marginLeft: "15%",
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper
    },
    teamSelectorLeft: {
      marginLeft: "50%"
    },
    teamSelectorRight: {
      marginLeft: "40%"
    }
  })
);


const WaitingRoom: React.FC = () => {
  const classes = useStyles();
  const [names, setNames] = React.useState<string[]>([]);
  const [team1, setTeam1] = React.useState<string[]>([]);
  const [team2, setTeam2] = React.useState<string[]>([]);

  useEffect(() => {
    getGameUpdates(onGameUpdates);
  }, []);

  const OnTeam1 = async (): Promise<void> => {
    //setTeam1([...team1, getPlayerName()]);
    //setNames(names.filter((value, i) => value !== getPlayerName()));
    var isSuccess = await setPlayerInTeam(1);
  };

  const OnTeam2 = async (): Promise<void> => {
    //setTeam2([...team2, getPlayerName()]);
    //setNames(names.filter((value, i) => value !== getPlayerName()));
    var isSuccess = await setPlayerInTeam(2);    
  };

  const onGameUpdates = (data: DocumentData): void => {
      console.log(data);
      if (data["WaitingRoom"] === undefined) 
        setNames([]);
      else
        setNames(data["WaitingRoom"] as string[]);

      if (data["Team1"] === undefined) 
        setNames([]);
      else
        setNames(data["Team1"] as string[]);

      if (data["Team2"] === undefined) 
        setNames([]);
      else
        setNames(data["Team2"] as string[]);
  }

  return (
    <div className={classes.root}>
      <hr />
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs>
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
        </Grid>
        <Grid item xs={1}>
          <Button className={classes.teamSelectorLeft} variant="outlined" color="secondary" onClick={() => OnTeam1()}>
            &#60;&#60;&#60;
          </Button>
        </Grid>
        <Grid item xs>
          <List
            className={classes.list}
            component="nav"
            aria-label="main mailbox folders"
          >
            <ListItem button>
              <ListItemIcon>
                <VideoLabelIcon />
              </ListItemIcon>
              <ListItemText primary="Choisir votre équipe" />
            </ListItem>
            <Divider />
            {names.map((name: string) => (
            <ListItem button key={name}>
              <ListItemText primary={name} />
            </ListItem>
            ))}
            
          </List>
        </Grid>
        <Grid item xs={1}>
          <Button className={classes.teamSelectorRight} variant="outlined" color="secondary" onClick={() => OnTeam2()}>
            &#62;&#62;&#62;
          </Button>
        </Grid>
        <Grid item xs>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default WaitingRoom;
