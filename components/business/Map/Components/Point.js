import React, {Component, PropTypes} from 'react';
import {isEqual} from 'lodash';
import Label from '../Module/custom';
import InfoWindow from './InfoWindow';

class Point extends Component {
  constructor(props) {
    super(props);
    this.marker = null;
    this.state = {
      infoWindow: false,
      marker: null
    };
    this.transferPoint = (point) => {
      let ret;
      if (this.props.point instanceof BMap.Point) {
        ret = this.props.point;
      } else if (this.props.point instanceof BMap.Pixel) {
        ret = this.context.map.getMapType().getProjection().pointToLngLat(this.props.point);
      } else {
        ret = new BMap.Point(this.props.point.x, this.props.point.y);
      }
      return ret;
    };
    this.getPoint = () => {
      let point = this.transferPoint(this.props.point);
      if (this.props.type === 'knight') {
        this.marker = new Label(point, this.props.info, () => this.setState({infoWindow: true}), this.props.onMouseEnter, this.props.onMouseLeave);
      } else {
        let myIcon = new BMap.Icon('static/images/mapMode/' + this.props.type + '.png', new BMap.Size(30, 32), {
          infoWindowAnchor: new BMap.Size(10, 0)
        });
        if (this.marker) {
          this.context.map.removeOverlay(this.marker);
        }
        this.marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
        this.marker.setIcon(myIcon);
        this.marker.setPosition(point);
        this.marker.addEventListener('click', () => {
          this.setState({
            infoWindow: true,
            marker: this.marker
          });
        });
        this.marker.addEventListener('infowindowclose', () => {
          this.setState({
            infoWindow: false
          });
        });
      }
      this.context.map && this.context.map.addOverlay(this.marker);
      if (this.props.show) {
        this.marker.show();
      } else if (!this.props.show) {
        this.marker.hide();
      }
      if (typeof this.props.animate !== 'undefined') {
        this.marker.setAnimation(this.props.animate);
      }
    };
  }
  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.context.map !== prevContext.map || !isEqual(this.props.point, prevProps.point) || this.props.type !== prevProps.type || this.props.animate !== prevProps.animate || this.props.show !== prevProps.show || this.context.loading !== prevContext.loading) {
      this.getPoint();
    }
  }
  componentDidMount() {
    this.context.map && this.getPoint();
  }
  render() {
    return (
      <div data-type="Point">
        {
          this.props.InfoWindow && <InfoWindow onClose={() => this.setState({infoWindow: false})} show={this.state.infoWindow} father={this.state.marker} point={this.transferPoint(this.props.point)} >
          {this.props.InfoWindow}
          </InfoWindow>
        }
      </div>
    );
  }
}

Point.propTypes = {
  point: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(BMap.Point)]),
  type: PropTypes.string,
  animate: PropTypes.any,
  InfoWindow: PropTypes.any,
  show: PropTypes.bool,
  info: PropTypes.object
};
Point.contextTypes = {
  map: PropTypes.instanceOf(BMap.Map),
  loading: PropTypes.bool
};
Point.defaultProps = {
};

export default Point;
