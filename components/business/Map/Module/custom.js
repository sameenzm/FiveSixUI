export default class customOverlay extends BMap.Overlay {
  constructor(point, info, click, handler_over, handler_out) {
    super();
    this._point = point;
    this._text = info.text;
    this._handler_hover = handler_over;
    this._handler_out = handler_out;
    this._good = info.type;
    this._click = click;
  }
  initialize(map) {
    this._map = map;
    this._map = map;
    let div = this._div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.backgroundColor = this._good ? 'rgba(238, 93, 91, 0.8)' : 'rgba(108, 174, 202, 0.8)';
    div.style.borderColor = this._good ? 'rgba(189, 60, 58, 0.8)' : 'rgba(85, 139, 167, 0.8)';
    div.style.borderRadius = '.3em';
    div.style.borderWidth = '1px';
    div.style.borderStyle = 'double';
    div.style.color = 'white';
    div.style.padding = '4px';
    div.style.lineHeight = '18px';
    div.style.whiteSpace = 'nowrap';
    div.style.MozUserSelect = 'none';
    div.style.fontSize = '14px';
    let span = this._span = document.createElement('span');
    span.style.cursor = 'pointer';
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._text));
    let that = this;

    let arrow = this._arrow = document.createElement('div');
    arrow.style.background = 'url(static/images/mapMode/label.png) no-repeat';
    arrow.style.position = 'absolute';
    arrow.style.width = '11px';
    arrow.style.height = '10px';
    arrow.style.top = '26px';
    arrow.style.left = '10px';
    arrow.style.overflow = 'hidden';
    arrow.style.backgroundPosition = this._good ? '0px 0px' : '0px -20px';
    div.appendChild(arrow);

    div.onclick = this._click;

    div.onmouseover = function() {
      this.style.backgroundColor = 'rgba(255, 150, 37, 0.8)';
      this.style.borderColor = 'rgba(220, 136, 32, 0.8)';
      this.getElementsByTagName('span')[0].innerHTML = that._text;
      arrow.style.backgroundPosition = '0px -10px';
      that._handler_hover && that._handler_hover();
    };

    div.onmouseout = function() {
      this.style.backgroundColor = that._good ? 'rgba(238, 93, 91, 0.8)' : 'rgba(108, 174, 202, 0.8)';
      this.style.borderColor = that._good ? 'rgba(189, 60, 58, 0.8)' : 'rgba(85, 139, 167, 0.8)';
      this.getElementsByTagName('span')[0].innerHTML = that._text;
      arrow.style.backgroundPosition = that._good ? '0px 0px' : '0px -20px';
      that._handler_out && that._handler_out();
    };

    map.getPanes().labelPane.appendChild(div);

    return div;
  }
  draw() {
    let map = this._map;
    let pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - parseInt(this._arrow.style.left, 10) + 'px';
    this._div.style.top = pixel.y - 30 + 'px';
  }
}
