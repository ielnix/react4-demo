import React from 'react';

import Header from '../../components/Header';
import Carousel from './subpage/Carousel';
import Recommend from './subpage/Recommend';
import List from './subpage/List';

import PureRenderMixin from 'react-addons-pure-render-mixin';


class Hello extends React.Component{
	constructor(props , context){
		super(props,context);
		this.state={
			now:Date.now(),
			arr:[]
		}
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	render(){
		var arr=[];
		return (
			<div>
				<Header title="hello页面"/>
			    <p className="body-bg" onClick={this.clickHandler.bind(this)}>Hello World</p>
			    <hr/>
			    <Carousel/>
			    <Recommend/>
			    <List/>
			    <ul>
			    	{this.state.arr.length==0
			    	?<p>Loading...</p>
			    	:this.state.arr.map(function(item,index){
			    		return <li key={index}>{item}</li>
			    	})}
			    </ul>
			</div>
	    );
	}


	clickHandler(){
		this.setState({
			now:Date.now()
		})
	}
	// 声明周期
	componentDidMount(){
		console.log('所有模块加载完成')
		// 渲染完成
		var self=this;
		setTimeout(function(){
			self.setState({
				arr:['a','b','c']
			})
				
		},1000)
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		
	}

	componentDidUpdate(prevProps, prevState) {
		// 触发更新 一般用于清空数据 判断是否请求数据
		
	}

	componentWillUpdate(nextProps, nextState) {
		// 清空 setTimeout setInterval
	}

};

export default Hello;