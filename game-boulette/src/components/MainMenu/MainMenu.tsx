import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import Title from "../Utilities/Title/Title";
import Join from "./join.png";
import Host from "./host.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  grid: {
    paddingLeft: "10%"
  },
  media: {
    height: 140
  }
});

const MainMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Title title="Bienvenue au jeu de Boulette !"></Title>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs={12} sm={6} className={classes.grid}>
          <Card className={classes.root}>
            <CardActionArea component={Link} to="/join">
              <CardMedia
                className={classes.media}
                component="img"
                alt="Rejoindre une partie"
                height="140"
                image={Join}
                title="Rejoindre une partie"
              />
              <CardContent>
                <Typography component={'span'} gutterBottom variant="h5">
                  Rejoindre
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Rejoindre une partie de boulette
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.grid}>
          <Card className={classes.root}>
            <CardActionArea component={Link} to="/host">
              <CardMedia
                className={classes.media}
                component="img"
                alt="Hôte d'une partie"
                height="140"
                image={Host}
                title="Hôte d'une partie"
              />
              <CardContent>
                <Typography component={'span'} gutterBottom variant="h5">
                  Organiser
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Organiser une partie de boulette
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainMenu;
