import React, {Component, PropTypes} from 'react';
import Warning from '../Module/warning';
class Control extends Component {
  constructor(props) {
    super(props);
    this.control = null;
    this.getControl = () => {
      if (/yali/.test(this.props.type)) {
        this.control = new Warning(this.props.type, this.props.text, this.props.offset.x, this.props.offset.y);
        this.context.map.addControl(this.control);
      }
    };
  }
  componentDidMount() {
    this.context.map && this.getControl();
  }
  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.context.map !== prevContext.map || this.props.type !== prevProps.type || this.props.text !== prevProps.text || !_.isEqual(this.props.offset, prevProps.offset) || this.context.loading !== prevContext.loading) {
      if (/yali/.test(this.props.type)) {
        if (this.control) {
          let prev = document.getElementById(prevProps.type + prevProps.text);
          prev && this.context.map.getContainer().removeChild(prev);
        }
        this.getControl();
      }
    }
  }
  render() {
    return (
      <div data-type="Control">
        {this.props.children}
      </div>
    );
  }
}

Control.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  offset: PropTypes.object
};
Control.contextTypes = {
  map: PropTypes.instanceOf(BMap.Map),
  loading: PropTypes.bool
};
Control.defaultProps = {
  offset: {
    x: 10,
    y: 10
  }
};

export default Control;
