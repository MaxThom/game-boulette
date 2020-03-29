import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Title from "../Utilities/Title/Title";

const useStyles = makeStyles({


});

const Join: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Title title="Rejoindre une partie"></Title>
    </div>
  );
};

export default Join;
