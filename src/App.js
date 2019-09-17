import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "./Navigation";
import Page404 from "./pages/Page404";
import Private from "./pages/Private";
import Screen from "./pages/Screen";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/" />
            <Route exact path="/Screen" component={Screen} />
            <Route exact path="/Private" component={Private} />
            <Route component={Page404} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
