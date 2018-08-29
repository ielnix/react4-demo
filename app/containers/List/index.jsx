import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link , withRouter } from "react-router-dom";

class List extends React.Component{
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	render(){
		const arr=[1,2,3]
		return(
			<div>
				<h3>List</h3>
				<ul>
					{arr.map((item,index)=>{
						return <li key={index} onClick={this.clickHandler.bind(this,item)} >{item}</li>
					})}
				</ul>
			</div>
		)
	}

	clickHandler(val){
		this.props.history.push('detail/'+val);
	}

}

export default withRouter(List);