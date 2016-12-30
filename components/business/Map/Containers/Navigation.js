import React, {Component, PropTypes} from 'react';
import {isEqual} from 'lodash';
import Point from '../Components/Point';
import Line from '../Components/Line';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: []
    };
    this.getOverlays = (r) => {
      let path = [];
      for (let i = 0; i < r.getPlan(0).getNumRoutes(); i++) {
        path = path.concat(r.getPlan(0).getRoute(i).getPath());
      }
      this.setState({path});
    };
    this.getNavigation = () => {
      this.navigation = new BMap.WalkingRoute(this.context.map, {
        onSearchComplete: (results) => {
          if (this.navigation.getStatus() === BMAP_STATUS_SUCCESS) {
            this.getOverlays(results);
          }
        }
      });
      this.navigation.search(new BMap.Point(this.props.point[0].x, this.props.point[0].y), new BMap.Point(this.props.point[1].x, this.props.point[1].y));
    };
  }
  componentDidMount() {
    this.context.map && this.getNavigation();
  }
  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.context.map !== prevContext.map || !isEqual(this.props.point, prevProps.point)) {
      this.getNavigation();
    }
  }
  render() {
    return (
      <div data-type="Navigation">
        <Point animate={this.props.animate ? BMAP_ANIMATION_BOUNCE : null} show={this.props.show && this.props.showStart} point={this.props.point[0]} type={this.props.startType || 'qi'} InfoWindow={this.props.startInfoWindow} />
        <Point animate={this.props.animate ? BMAP_ANIMATION_BOUNCE : null} show={this.props.show && this.props.showEnd} point={this.props.point[1]} type={this.props.endType || 'zhong'} InfoWindow={this.props.endInfoWindow} />
        <Line show={this.props.show && this.props.showLine} style={this.props.animate ? {...this.props.style, strokeStyle: 'dashed',
          strokeWeight: 6,
          strokeOpacity: 1} : this.props.style} path={this.state.path} showArrow
        />
      </div>
    );
  }
}

Navigation.propTypes = {
  point: PropTypes.arrayOf(PropTypes.object),
  show: PropTypes.bool,
  style: PropTypes.object,
  startInfoWindow: PropTypes.any,
  endInfoWindow: PropTypes.any,
  endType: PropTypes.string,
  animate: PropTypes.bool,
  startType: PropTypes.string
};
Navigation.contextTypes = {
  map: React.PropTypes.instanceOf(BMap.Map)
};
Navigation.defaultProps = {
  showEnd: true,
  showStart: true,
  showLine: true
};

export default Navigation;
