export default class warningControl extends BMap.Control {
  constructor(type, text, x, y) {
    super();
    const color = {
      yaligao: '#ff4500',
      yalizhong: '#FFD700',
      yalidi: '#66CD00'
    };
    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
    this.defaultOffset = new BMap.Size(x, y);
    this.type = type;
    this.text = text;
    this.color = color[type];
    this.id = type + text;
  }
  initialize(map) {
    let div = document.createElement('div');
    div.id = this.id;
    div.style.height = '100px';
    div.style.width = '60px';
    div.style.backgroundImage = 'url(static/images/mapMode/' + this.type + '.png)';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundPositionX = 'center';
    div.style.backgroundPositionY = '80%';
    div.style.backgroundSize = '100%';
    div.style.borderRadius = '15px';
    div.style.color = this.color;
    div.style.paddingTop = '83px';
    div.style.fontSize = '12px';
    div.style.fontWeight = 600;
    div.style.textAlign = 'center';
    div.appendChild(document.createTextNode(this.text));
    map.getContainer().appendChild(div);
    return div;
  }
}
