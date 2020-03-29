import React, { Component, ReactNode } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
  }),
);

const WaitingRoom: React.FC = () => {
  const classes = useStyles();

  return (
      <div>
          Hello 3
      </div>
  );
}

export default WaitingRoom;
