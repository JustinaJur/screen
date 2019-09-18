import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "./Navigation";
import Page404 from "./pages/Page404";
import Doctor from "./pages/Doctor";
import Screen from "./pages/Screen";
import Administration from "./pages/Administration";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Administration} />
            <Route exact path="/Screen" component={Screen} />
            <Route exact path="/Doctor" component={Doctor} />
            <Route component={Page404} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
