import React, {Component, PropTypes} from 'react';
import { Spin } from 'antd';
let map;
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null
    };
  }

  getChildContext() {
    return {
      map: this.state.map,
      loading: this.props.loading
    };
  }
  componentDidMount() {
    map = new BMap.Map('mapmode');
    map.centerAndZoom(this.props.centerPoint && this.props.centerPoint[0] ? this.props.centerPoint[0] : this.props.city, 11);
    map.addControl(new BMap.MapTypeControl({
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT
    }));
    map.addControl(new BMap.NavigationControl({
      type: BMAP_NAVIGATION_CONTROL_SMALL,
      anchor: BMAP_ANCHOR_BOTTOM_LEFT
    }));
    map.addControl(new BMap.ScaleControl({
      anchor: BMAP_ANCHOR_BOTTOM_LEFT
    }));
    map.enableScrollWheelZoom(true);
    map.enableKeyboard();
    this.setState({
      map
    });
    this.props.getMap && this.props.getMap(map);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.loading && nextProps.loading) {
      map.clearOverlays();
    }
  }
  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.centerPoint, this.props.centerPoint)) {
      if (this.props.centerPoint && this.props.centerPoint.length > 0 && map) {
        map.setViewport(this.props.centerPoint.map(v => {
          if (v instanceof BMap.Pixel) {
            return map.getMapType().getProjection().pointToLngLat(v);
          }
          return v;
        }));
      } else {
        map && map.setCurrentCity(this.props.city);
      }
    }
  }
  render() {
    return (
      <Spin size="large" spinning={this.props.loading} >
        <div id="mapmode" style={{height: this.props.height, width: this.props.width}} >
          {_.remove(React.Children.toArray(this.props.children), i => i.type.displayName !== 'Toolbar')}
        </div>
      </Spin>
    );
  }
}

View.propTypes = {
  centerPoint: PropTypes.array,
  city: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool
};

View.defaultProps = {
};

View.childContextTypes = {
  map: PropTypes.instanceOf(BMap.Map),
  loading: PropTypes.bool
};

export default View;
