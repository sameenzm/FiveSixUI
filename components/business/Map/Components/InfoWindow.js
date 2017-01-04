import { renderToStaticMarkup } from 'react-dom/server';
import React, {Component, PropTypes} from 'react';

class InfoWindow extends Component {
  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.context.map !== prevContext.map || this.props.show !== prevProps.show || this.props.father !== prevProps.father || this.props.children !== prevProps.children || this.context.loading !== prevContext.loading) {
      this.props.show && this.props.father !== null && this.props.father.openInfoWindow(new BMap.InfoWindow(renderToStaticMarkup(this.props.children)));
      if (this.props.show && this.props.father == null) {
        let infoWindow = new BMap.InfoWindow(renderToStaticMarkup(this.props.children), {
          offset: new BMap.Size(10, -30)
        });
        this.context.map.openInfoWindow(infoWindow, this.props.point);
        infoWindow.addEventListener('close', this.props.onClose && this.props.onClose());
      }
    }

  }
  render() {
    return (
      <div data-type="InfoWindow"/>
    );
  }
}

InfoWindow.propTypes = {

};

InfoWindow.contextTypes = {
  map: PropTypes.instanceOf(BMap.Map),
  loading: PropTypes.bool
};

export default InfoWindow;
