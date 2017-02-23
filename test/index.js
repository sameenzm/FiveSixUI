import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiJsx from 'chai-jsx';
import { jsdom } from 'jsdom';
import { expect } from 'chai';
import sinon from 'sinon';

process.env.NODE_ENV = 'test';

// 加入支持JSX和Enzyme的断言库
chai.use(chaiEnzyme());
chai.use(chaiJsx);
global.expect = expect;
global.sinon = sinon;

// 创建enzyme中的渲染相关方法依赖的dom环境
global.document = jsdom('<!doctype html><html><head><script></script></head><body></body></html>');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
require('matchmedia-polyfill');