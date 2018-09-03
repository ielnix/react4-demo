import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Detail extends React.Component{
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	render(){
		return(
			<div>
				<div>路由地址：{this.props.match.url}</div>
				<div>路由携带参数：{this.props.match.params.id}</div>
			</div>
		)
	}
}

export default Detail;