import React, {SyntheticEvent} from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles
} from "@material-ui/core/styles";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Title from "../Utilities/Title/Title";
import Surface from "../Utilities/Surface/Surface";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { StepIconProps } from "@material-ui/core/StepIcon";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import CreateIcon from '@material-ui/icons/Create';


import JoinGame from "../Steps/JoinGame/JoinGame";
import SelectName from "../Steps/SelectName/SelectName";
import WaitingRoom from "../Steps/WaitingRoom/WaitingRoom";
import WriteWords from "../Steps/WriteWords/WriteWords";


import {  } from '../../services/firebaseStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    backButton: {
      marginRight: theme.spacing(1)
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);

const Connector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const StepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  }
});

function getSteps() {
  return ["Rejoindre une partie", "Choisir votre nom", "Sélection des équipes", "Écriture des mots"];
}

function StepIcon(props: StepIconProps) {
  const classes = StepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <CreateIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return <JoinGame/>;
    case 1:
      return <SelectName />;
    case 2:
      return <WaitingRoom />;
    case 3:
      return <WriteWords />;
    default:
      return "Unknown stepIndex";
  }
}

const Join: React.FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  let history = useHistory();
  const steps = getSteps();

  
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    if (activeStep === steps.length-1) {      
      history.push('/game')
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Title title="Rejoindre une partie"></Title>
      <Surface>
        <Stepper
          activeStep={activeStep}
          connector={<Connector />}
          alternativeLabel
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography component={'span'} className={classes.instructions}>
                Terminé !
              </Typography>
              <Button onClick={handleReset}>Recommencer</Button>
            </div>
          ) : (
            <div>
              <Typography component={'span'} className={classes.instructions}>
                <br />
                {getStepContent(activeStep)}
                <br />
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Retour
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Lancer la partie !" : "Suivant"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Surface>
    </div>
  );
};

export default Join;
