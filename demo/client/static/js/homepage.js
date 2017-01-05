import React, { Component } from 'react';
import { SerialInput, AoiMap, Summernote } from 'fivesix';
// import { Button } from 'antd';
// import moment from 'moment';

export default class Homepage extends Component {
  render() {
    return (<div style={{ padding: '20px' }}>
      <SerialInput />
      <Summernote />
      <AoiMap />
    </div>);
  }
}
