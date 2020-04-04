import React, { Component, ReactNode } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
        padding: "1%",
        paddingTop: "2vh",
        height: "4vh"
    }
  }),
);

type Props = {
    children: ReactNode
}

const LinedSurface: React.FC<Props> = ({children}) => {
  const classes = useStyles();

  return (
      <Paper className={classes.surface} variant="outlined" elevation={3}>{children}</Paper>    
  );
}

export default LinedSurface;
