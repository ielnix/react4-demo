import React from 'react';
import { render } from 'react-dom';


import './static/css/common.less';

// 路由 根页面
import RouterMap from './router/routerMap';


// 性能测试
import Perf from 'react-addons-perf';

if(__DEV__){
	window.Perf=Perf;
}


render(
	<RouterMap />,
	document.getElementById('root')
)