
import React from 'react';

import PureRenderMixin from 'react-addons-pure-render-mixin';

import Input from '../../components/Input';
import List from '../../components/List';

class Todo extends React.Component{
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state ={
			todos:[]
		}
	}

	render(){

		return(

			<div>
				<h3>todos-demo 页面</h3>
				<Input submitFn={this.submitFn.bind(this)}/>
				<List todos={this.state.todos} deletFn = { this.deletFn.bind(this)}/>
			</div>
		)
	}

	submitFn(value){
		const id = this.state.todos.length
		this.setState({
			todos:this.state.todos.concat({
				id:id,
				text:value
			})
		})
	}
	deletFn(id){
		let data = this.state.todos;
		this.setState({
			todos:data.filter(item=>{
				if(item.id!==id){
					return item
				}
			})
		})
	}
		
}
export default Todo;