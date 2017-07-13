import React, { PropTypes } from 'react';
import './styles.less';

const propTypes = {
  comparedPoints: PropTypes.array,
};

const convertObjToPoint = (obj) => {
  return new BMap.Point(obj.longitude, obj.latitude);
}

export default class FitArea extends React.Component {
  componentDidMount() {
    const { comparedPoints } = this.props;

    const map = new BMap.Map('mapcontainer');
    const point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
    map.centerAndZoom(point, 10); 

    const paintedPoints = comparedPoints.map(point => convertObjToPoint(point));
    const polygon = new BMap.Polygon(paintedPoints, {
      strokeColor: '#0B71F5',
      fillColor: '#0B71F5',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillOpacity: 0.3,
    });
    map.addOverlay(polygon);


    var myDrawingManagerObject = new BMapLib.DrawingManager(map, 
      {
        isOpen: true, 
        drawingType: BMAP_DRAWING_MARKER, 
        enableDrawingTool: true,
        enableCalculate: false,
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_LEFT,
            offset: new BMap.Size(5, 5),
            drawingTypes : [
                BMAP_DRAWING_MARKER,
                BMAP_DRAWING_CIRCLE,
                BMAP_DRAWING_POLYLINE,
                BMAP_DRAWING_POLYGON,
                BMAP_DRAWING_RECTANGLE 
            ]
        },
        polylineOptions: {
            strokeColor: "#333"
        }
      }
    )
    let drawingArea = [];
    myDrawingManagerObject.addEventListener("markercomplete", function(e, overlay) {
      let drawingPoint = overlay.point;
      // const circle = new BMap.Circle(drawingPoint, 30000);
      // map.addOverlay(circle);
      let min = 30000;
      let minPoint;

      for (let i = 0; i < paintedPoints.length; i++) {
        let dis = map.getDistance(drawingPoint, paintedPoints[i]);
        if (dis < min) {
          min = dis;
          minPoint = paintedPoints[i];
        }
      }

      if (minPoint) {
        overlay.setPosition(minPoint);
        drawingPoint = minPoint;
      }

      // 画线，视觉上的
      if (drawingArea.length > 0) {
        const line = new BMap.Polyline([drawingPoint, drawingArea[0]]);
        map.addOverlay(line);
      }

      drawingArea.unshift(drawingPoint);
    });
  }

  render () {
    return (
      <div id="mapcontainer" className="wl-fitmap"></div>
    )
  }
}