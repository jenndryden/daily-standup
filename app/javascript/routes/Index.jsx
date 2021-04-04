import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import StandupCharacters from "../components/StandupCharacters";
import StandupCharacter from "../components/StandupCharacter";
import NewStandupCharacter from "../components/NewStandupCharacter";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/standup-characters" exact component={StandupCharacters} />
      <Route path="/standup-character/:id" exact component={StandupCharacter} />
      <Route path="/new-character" exact component={NewStandupCharacter} />
    </Switch>
  </Router>
);
