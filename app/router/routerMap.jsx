import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from '../containers/Home';
import List from '../containers/List';
import Todo from '../containers/Todo';
import Hello from '../containers/Hello';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/list" component={List} />
      <Route path="/todo" component={Todo} />
      <Route path="/hello" component={Hello} />
    </div>
  </Router>
);

export default App;