const jsdom = require('jsdom');
export default (documentLoaded) => {
  // Mock Image class since it's not found by default in jsdom
  global.Image = class Image {
    get complete() {
      return true;
    }
  };

  global.navigator = {
    userAgent: 'node.js',
  };

  jsdom.env({
    html: '<html><head></head><body><script></script></body></html>',
    scripts: [
      'http://api.map.baidu.com/getscript?v=2.0&ak=D945ef158d49611a2c801630bf3ef7a8&services=&t=20170109222834',
      'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js',
    ],
    done: (err, win) => {
      err && (console.log(err));
      global.BMap_loadScriptTime = (new Date).getTime(); 
      global.window = win;
      global.document = win.document;
      global.BMap = win.BMap;
      Object.keys(win).forEach((property) => {
        if (typeof global[property] === 'undefined') {
          global[property] = win[property];
        }
      });
      require('matchmedia-polyfill');
      // Done!
      console.log('success');
      documentLoaded();
    },
  });
};