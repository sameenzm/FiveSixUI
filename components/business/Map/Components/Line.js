import React, {Component, PropTypes} from 'react';
import {isEqual} from 'lodash';
import {addArrow} from '../Module/arrow';


class Line extends Component {
  constructor(props) {
    super(props);
    this.marker = null;
    this.getLine = () => {
      let arrow;
      if (this.marker) {
        this.context.map.removeOverlay(this.marker);
      }
      this.marker = new BMap.Polyline(this.props.path, {
        ...this.props.style
      });
      arrow = addArrow(this.context.map, this.marker, 2, Math.PI / 7, this.props.style);
      this.context.map && this.context.map.addOverlay(this.marker);
      this.context.map && this.props.showArrow && arrow.forEach(i => this.context.map.addOverlay(i));
      if (this.props.show) {
        this.marker.show();
        arrow.forEach(i => i.show());
      } else {
        this.marker.hide();
        arrow.forEach(i => i.hide());
      }
    };
  }
  componentDidMount() {
    this.context.map && this.getLine();
  }
  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.context.map !== prevContext.map || !isEqual(this.props.path, prevProps.path) || this.props.show !== prevProps.show || this.context.loading !== prevContext.loading) {
      this.getLine();
    }
    if (!isEqual(this.props.style, prevProps.style) && this.marker) {
      this.marker.setStrokeStyle(this.props.style.strokeStyle);
      this.marker.setStrokeWeight(this.props.style.strokeWeight);
      this.marker.setStrokeOpacity(this.props.style.strokeOpacity);
    }
  }
  render() {
    return (
      <div data-type="Line">
        {this.props.children}
      </div>
    );
  }
}

Line.propTypes = {
  path: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(BMap.Point)])),
  show: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.object,
  showArrow: PropTypes.bool
};
Line.contextTypes = {
  map: PropTypes.instanceOf(BMap.Map),
  loading: PropTypes.bool
};
Line.defaultProps = {
};

export default Line;
