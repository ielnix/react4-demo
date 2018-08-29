import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from '../containers/App';
import List from '../containers/List';
import Todo from '../containers/Todo';
import Hello from '../containers/Hello';

class RouterMap extends React.Component{
	render(){
		return (
			<Router>
			    <div>
			      <Route exact path="/" component={App} />
			      <Route path="/list" component={List} />
			      <Route path="/todo" component={Todo} />
			      <Route path="/hello" component={Hello} />
			    </div>
		  </Router>
		)
	}
};

export default RouterMap;