import React, { Component, ReactNode } from "react";
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
    }
  })
);
const WaitingRoom: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <hr/>  
      <Grid container direction="row" justify="space-evenly" alignItems="center">
        <Grid item xs>
          <List className={classes.list} component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Équipe #1" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Drafts" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Trash" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs>
          <List className={classes.list} component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <VideoLabelIcon />
              </ListItemIcon>
              <ListItemText primary="Attente" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Drafts" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Trash" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs>
          <List className={classes.list} component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Équipe #2" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Drafts" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Trash" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default WaitingRoom;
