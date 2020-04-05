import React from "react";
import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import MainMenu from "./MainMenu/MainMenu";
import Host from "./Host/Host";
import Join from "./Join/Join";
import Game from "./Game/Game";

const App: React.FC = () => {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <BrowserRouter>
          <Switch>
            <Route path="/join" component={Join}></Route>
            <Route path="/host" component={Host}></Route>
            <Route path="/game" component={Game}></Route>
            <Route path="/" component={MainMenu}></Route>
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
};

export default App;

