import React from 'react';

import { Link } from "react-router-dom";

class Home extends React.Component{
	
	render(){
		return(
			<div>
				<h3 style={{textAlign:'center'}}>react-router-demo 主页面</h3>
				<ul>
			        <li><Link to="/">Home</Link></li>
			        <li><Link to="/hello">Hello World demo</Link></li>
			        <li><Link to="/list">List</Link></li>
			        <li><Link to="/todo">Todo demo</Link></li>
			    </ul>
			</div>
		)
	}
}

export default Home;