### react-demo

记录react和配置webpack中的问题。

#### webpack3升4问题 错误提示及解决办法

1. webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.

分离代码功能在4被移除，解决办法：

```
//跟output plugin平级
optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                name: "commons",
                chunks: "initial",
                minChunks: 2
            }
        }
    }
}
```


2. webpack.optimize.UglifyJsPlugin has been removed, please use config.optimization.minimize instead.

压缩代码功能在4被移除，解决办法：

```
var UglifyJsPlugin=require('uglifyjs-webpack-plugin');
optimization: {
    minimizer: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: false
            }
        })
    ]
}
```

3. Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead

extract-text-webpack-plugin还不能支持webpack4.0.0以上的版本

package.json中webpack版本为4.0.0以上
```
"devDependencies": {
    ...
    "extract-text-webpack-plugin": "^3.0.2",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.17.1",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.5"
    ...
  }
```
解决办法：
 
```
npm install --save-dev extract-text-webpack-plugin@next 
```
会下载到+ extract-text-webpack-plugin@4.0.0-beta.0 然后在打包就正常了

```
"devDependencies": {
    ...
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.17.1",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.5"
    ...
  }
```

4. No PostCSS Config found

根目录配置一个postcss.config.js文件

```
module.exports = {  
    plugins: {  
      'autoprefixer': {browsers: 'last 5 version'}  
    }  
}
```

[react入门简介](https://segmentfault.com/a/1190000012921279)

#### 事件
定义类中绑定事件需绑定this，给类里面的方法调用其他方法

```
class Hello extends React.Component{
    render(){
        return (
            <div>
                <p className="body-bg" onClick={this.clickHandler.bind(this)}>Hello World</p>
            </div>
        );
    }

    clickHandler(){
        console.log(Date.now())
        console.log(this.clickHandler)
    }
};
```

#### 循环

遍历的每一项最好加上唯一key值，一定程度上提升效率

```
<ul>
    {arr.map(function(item,index){
        return <li key={index}>{item}</li>
    })}
</ul>
```

#### 报错信息

##### 组件定义

```
Uncaught TypeError: Super expression must either be null or a function, not undefined
```

定义错误文件  一般查看大小写，单词是否出错


##### react 路由

4.0版本只需要引用react-router-dom
```
 Failed prop type: The prop `history` is marked as required in `Router`, but its value is `undefined`
```
[官方文档api](https://reacttraining.com/react-router/web/api/Route)

造成此错误的原因为：react-router 4.0版本以上api变了,
react-router4版本中路由的本质变成了React组件

1. 没有IndexRouter
2. 使用BrowserRouter,withRouter


解决配置

[react-router 4使用history控制路由跳转](https://segmentfault.com/a/1190000011137828)

```
//入口文件 index.jsx
import React from 'react';
import { render } from 'react-dom';
import RouterMap from './router/routerMap';
render(
    <RouterMap />,
    document.getElementById('root')
)

// routerMap.jsx 路由文件
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

// home.jsx  主页面配置跳转链接
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
```