/**
 * 此页面主要用于测试Map组件
 */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { FitArea } from 'fivesix';

export default class MapDemo extends Component {
    render() {
        return (
          <FitArea 
            comparedPoints = { [
              {longitude: 116.210667, latitude: 40.76959},
              {longitude: 115.555263, latitude: 40.49627},
              {longitude: 116.316882, latitude: 39.960742},
              {longitude: 116.31257, latitude: 39.921133},
              {longitude: 116.342465, latitude: 39.912057},
              {longitude: 116.375523, latitude: 39.946583},
              {longitude: 116.365749, latitude: 39.964724},
              {longitude: 116.365749, latitude: 39.964724},
              {longitude: 115.832013, latitude: 40.486339}
            ] }
          />
        )
    }
}
