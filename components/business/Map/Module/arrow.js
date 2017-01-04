export const addArrow = (map, polyline, length, angleValue, style) => {
  let linePoint = polyline.getPath();// 线的坐标串
  let arrowCount = linePoint.length;
  let ret = [];
  for (let i = 1; i < arrowCount; i = i + 25) {
    // debugger;
    let pixelStart = map.pointToPixel(linePoint[i - 1]);
    let pixelEnd = map.pointToPixel(linePoint[i]);
    if (Math.sqrt(Math.pow(pixelStart.x - pixelEnd.x, 2) + Math.pow(pixelStart.y - pixelEnd.y, 2)) < 2) {
      continue;
    }
    let angle = angleValue;// 箭头和主线的夹角
    let r = length; // r/Math.sin(angle)代表箭头长度
    let delta = 0; // 主线斜率，垂直时无斜率
    let param = 0; // 代码简洁考虑
    let pixelTemX;
    let pixelTemY;// 临时点坐标
    let pixelX;
    let pixelY;
    let pixelX1;
    let pixelY1;// 箭头两个点
    if (pixelEnd.x - pixelStart.x === 0) { // 斜率不存在是时
      pixelTemX = pixelEnd.x;
      if (pixelEnd.y > pixelStart.y) {
        pixelTemY = pixelEnd.y - r;
      } else {
        pixelTemY = pixelEnd.y + r;
      }
    // 已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法
      pixelX = pixelTemX - r * Math.tan(angle);
      pixelX1 = pixelTemX + r * Math.tan(angle);
      pixelY = pixelY1 = pixelTemY;
    } else {
      delta = (pixelEnd.y - pixelStart.y) / (pixelEnd.x - pixelStart.x);
      param = Math.sqrt(delta * delta + 1);
      if (pixelEnd.x - pixelStart.x < 0) {
        pixelTemX = pixelEnd.x + r / param;
        pixelTemY = pixelEnd.y + delta * r / param;
      } else {
        pixelTemX = pixelEnd.x - r / param;
        pixelTemY = pixelEnd.y - delta * r / param;
      }
      pixelX = pixelTemX + Math.tan(angle) * r * delta / param;
      pixelY = pixelTemY - Math.tan(angle) * r / param;

      pixelX1 = pixelTemX - Math.tan(angle) * r * delta / param;
      pixelY1 = pixelTemY + Math.tan(angle) * r / param;
    }
    let pointArrow = map.pixelToPoint(new BMap.Pixel(pixelX, pixelY));
    let pointArrow1 = map.pixelToPoint(new BMap.Pixel(pixelX1, pixelY1));
    let Arrow = new BMap.Polyline([
      pointArrow,
      linePoint[i],
      pointArrow1
    ], {...style, strokeWeight: 4});
    ret.push(Arrow);
  }
  return ret;
};
