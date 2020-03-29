import React, { Component, ReactNode } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
  }),
);

const SelectName: React.FC = () => {
  const classes = useStyles();

  return (
      <div>
          Hello 2
      </div>
  );
}

export default SelectName;
