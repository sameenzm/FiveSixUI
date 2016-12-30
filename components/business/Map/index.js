import React, {Component, PropTypes} from 'react';
import Dimensions from 'react-dimensions';
import update from 'react/lib/update';
import Box from './Containers/Toolbar/Box';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import View from './Containers/View';

const defaultCity = () => {
  let city = '北京';
  try {
    city = window._INITDATA_.team[window._INITDATA_.teamname].cityname;
  } catch (error) {
    city = '北京';
  }
  return city;
};

const styles = {
  position: 'relative',
  overflow: 'hidden'
};

const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    const width = left > 0 ? props.containerWidth - left : left;
    component.moveBox(left < 0 ? 0 : left, top < 0 ? 0 : top, width);
  }
};

@Dimensions(
  {
    getHeight: () => document.body.clientHeight,
    getWidth: () => document.body.clientWidth,
    containerStyle: styles,
    elementResize: true
  }
)
@DragDropContext(HTML5Backend)
@DropTarget('box', boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0
    };
  }
  moveBox(left, top, width) {
    this.setState(update(this.state, {$merge: {
      left: left,
      top: top,
      width: width
    }}
    ));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.containerWidth !== nextProps.containerWidth) {
      this.setState({
        left: Math.round(this.state.left / this.props.containerWidth * nextProps.containerWidth),
        top: Math.round(this.state.top / this.props.containerHeight * nextProps.containerHeight)
      });
    }
  }
  render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props;
    let { left, top } = this.state;
    let flag = false;
    let toolbar;
    let width;
    let minWidth;
    React.Children.toArray(this.props.children).forEach(
      i => {
        if (!flag) {
          flag = i.type.displayName === 'Toolbar';
          toolbar = i;
          width = i.type.displayName === 'Toolbar' ? i.props.width : 0;
          minWidth = i.type.displayName === 'Toolbar' ? i.props.minWidth : 0;
        }
      }
    );
    width = this.state.width && this.state.width < width ? this.state.width > 0 ? this.state.width : width + this.state.width : width;
    width = width < minWidth ? minWidth : width;
    left = width === minWidth && left !== 0 ? this.props.containerWidth - minWidth : left;
    left = left + width > this.props.containerWidth ? this.props.containerWidth - width : left;
    this.props.getPosition && this.props.getPosition(left, top);
    return connectDropTarget(
      <div style={{...styles, width: this.props.containerWidth, height: this.props.containerHeight}}>
        {flag
          ? <Box
            left={left}
            top={top}
            width={width}
            hideSourceOnDrag={hideSourceOnDrag}
            >
             {React.cloneElement(toolbar, {width})}
          </Box>
        : null }
        <View getMap={this.props.getMap} height={this.props.containerHeight} width={this.props.containerWidth} centerPoint={this.props.centerPoint} city={this.props.city} loading={this.props.loading} >
        {this.props.children}
        </View>
      </div>
    );
  }
}

Map.propTypes = {
  centerPoint: PropTypes.array,
  city: PropTypes.string,
  containerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.array,
  connectDropTarget: PropTypes.func,
  hideSourceOnDrag: PropTypes.bool,
  loading: PropTypes.bool
};

Map.defaultProps = {
  hideSourceOnDrag: false,
  city: defaultCity()
};

export default Map;
