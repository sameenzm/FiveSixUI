import React, {Component, PropTypes} from 'react';
import { Card } from 'antd';

class Toolbar extends Component {
  render() {
    return (
      <Card style={{width: this.props.width, height: 'auto'}} bodyStyle={this.props.bodyStyle} >
      {this.props.children}
      </Card>
    );
  }
}

Toolbar.propTypes = {

};

export default Toolbar;
