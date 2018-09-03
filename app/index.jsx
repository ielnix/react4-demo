import React from 'react';
import { render } from 'react-dom';


import './static/css/common.less';

// 路由 根页面
import RouterMap from './router/routerMap';


// 性能测试
import Perf from 'react-addons-perf';


// 如果开发  引用性能测试
if(process.env.NODE_ENV=='development'){
	window.Perf=Perf;
}

render(
	<RouterMap />,
	document.getElementById('root')
)