import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

type TitleProps = {
    title: string;
}

const useStyles = makeStyles({});

const Title: React.FC<TitleProps> = ({title}) => {
  const classes = useStyles();    
  return (
      
    <div>
      <br />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs={12}>
          <Typography component={'span'} variant="h2" >
            {title}
          </Typography>
        </Grid>
      </Grid>
      <hr />
      <br />
      <br />
    </div>
  );
};

export default Title;
