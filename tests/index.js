import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiJsx from 'chai-jsx';
import { jsdom } from 'jsdom';
process.env.NODE_ENV='test';

// 加入支持JSX和Enzyme的断言库
chai.use(chaiEnzyme());
chai.use(chaiJsx);

// 创建enzyme中的渲染相关方法依赖的dom环境
global.document = jsdom('<!doctype html><html><head>'+
		'<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=D945ef158d49611a2c801630bf3ef7a8" charset="UTF-8"></script>'+
    '<script type="text/javascript" src="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js" charset="UTF-8"></script>'+
    '<script type="text/javascript" src="http://cdn.static.runoob.com/libs/jquery/2.1.4/jquery.min.js" charset="UTF-8"></script>'+
    '</head><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

import jQuery from 'jquery';
global.$ = global.jQuery = global.jquery = require('jquery')(window);

require('matchmedia-polyfill');
