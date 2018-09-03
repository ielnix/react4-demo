import React from "react";
import { BrowserRouter as Router, Route ,Switch , Redirect} from "react-router-dom";

import App from '../containers/App';
import List from '../containers/List';
import Todo from '../containers/Todo';
import Hello from '../containers/Hello';
import Detail from '../containers/Detail';

class RouterMap extends React.Component{
	render(){
		return (
			<Router>
			    <div>
				    <Switch>
						<Route exact path="/" component={App} />
						<Route path="/list" component={List} />
						<Route path="/todo" component={Todo} />
						<Route path="/hello" component={Hello} />
						<Route path="/detail/:id" component={Detail}/>
				    </Switch>
			    </div>
		  </Router>
		)
	}
};

export default RouterMap;