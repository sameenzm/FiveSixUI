/**
* @file 画商圈组件
*       modified by wangjuan01 <wangjuan01@iwaimai.baidu.com>
*
* @author lishaoyi<lishaoyi@iwaimai.baidu.com>
* @version 0.0.1
*
*/
import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';
import MapCircle from './mapcircle';
import './style.less';

const maptool = new BMap.MercatorProjection();

/**
 * 组件属性申明
 *
 * @property {object} mapStyle      地图样式       默认值：{ height: '450px',  width: '100%' }
 * @property {object} center        地图定位中心   默认值：{ cityName: '北京市' }
 * @property {array}  polygons      多区块数组     默认值：[]
 * @property {array}  backPolygons  背景多区块数组 默认值：[]
 * @property {array}  tools         工具按钮       默认值：['edit', 'clear', 'save', 'reset', 'viewAll']
 * @property {bool}   enableEditing 能否编辑       默认值：使用options属性的第一个值
 * @property {func}   onSave        点击保存按钮之后的回调
 * @property {func}   onDelete      点删除按钮之后的回调
 */
const propTypes = {
  mapStyle: PropTypes.object,
  center: PropTypes.object,
  polygons: PropTypes.array,
  backPolygons: PropTypes.array,
  tools: PropTypes.array,
  enableEditing: PropTypes.bool,
  onSave: React.PropTypes.func,
  onDelete: React.PropTypes.func,
};

/**
 * 主组件
 *
 * @export
 * @class AoiMap
 * @extends {React.Component}
 */
export default class AoiMap extends Component {
  static defaultProps = {
    mapStyle: {
      height: '450px',
      width: '100%',
    },
    center: {
      cityName: '北京市',
    },
    polygons: [],
    backPolygons: [],
    tools: ['edit', 'clear', 'save', 'reset', 'viewAll'],
    enableEditing: true,
  };

  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.state = {
      backPolygonsDrawed: false,
      isEditing: false,
    };

    this.handleEdit = () => {
      const isEditing = !this.state.isEditing;

      if (isEditing) {
        this.aoimap.open();
      } else {
        this.aoimap.close();
      }
      this.setState({ isEditing });
    };

    this.handleClear = () => {
      this.aoimap.dispose();
    };

    this.handleSave = () => {
      const polygons = this.aoimap.getPolygons();
      const regions = [];

      for (let i = 0, len = polygons.length; i < len; i++) {
        const path = polygons[i].getPath();
        const points = [];

        for (let j = 0, pathLen = path.length; j < pathLen; j++) {
          const mercatorObj = maptool.lngLatToPoint(path[j]);
          const point = {
            lng: path[j].lng,
            lat: path[j].lat,
            longitude: path[j].lng,
            latitude: path[j].lat,
            x: mercatorObj.x,
            y: mercatorObj.y,
          };
          points.push(point);
        }
        regions.push(points);
      }
      this.props.onSave && this.props.onSave(regions);
    };

    this.handleReset = () => {
      const { polygons, enableEditing } = this.props;

      this.aoimap.dispose();
      this.aoimap.drawPolygons(polygons, enableEditing);
    };

    this.handleDelete = () => {
      this.props.onDelete && this.props.onDelete();
    };

    this.handleViewAll = () => {
      this.aoimap.resetViewport();
    };
  }

  componentDidMount() {
    const { polygons, backPolygons, enableEditing, center } = this.props;

    this.aoimap = new MapCircle('mapCon');
    this.aoimap.drawBackPolygons(backPolygons);
    this.aoimap.drawPolygons(polygons, enableEditing);
    (!polygons || polygons.length === 0) && this.aoimap.setCenter(center);
  }

  componentWillReceiveProps() {
    const { polygons, backPolygons, enableEditing } = this.props;

    setTimeout(() => {
      this.aoimap.dispose();
      this.aoimap.drawBackPolygons(backPolygons);
      this.aoimap.drawPolygons(polygons, enableEditing);
    }, 1000);
  }

  render() {
    const { tools, mapStyle } = this.props;
    const { isEditing } = this.state;

    return (<div className="wl-aoimap-con">
      <div className="wl-aoimap-toolbar">
        { tools.indexOf('edit') !== -1 ?
          <Button
            type={isEditing ? 'primary' : 'ghost'}
            icon="edit"
            onClick={this.handleEdit}
          >编辑</Button> : ''
        }
        { tools.indexOf('clear') !== -1 ?
          <Button
            type="ghost"
            icon="delete"
            onClick={this.handleClear}
          >清空</Button> : ''
        }
        { tools.indexOf('reset') !== -1 ?
          <Button
            type="ghost"
            icon="rollback"
            onClick={this.handleReset}
          >重置</Button> : ''
        }
        { tools.indexOf('save') !== -1 ?
          <Button
            type="ghost"
            icon="check"
            onClick={this.handleSave}
          >保存</Button> : ''
        }
        { tools.indexOf('delete') !== -1 ?
          <Button
            type="ghost"
            icon="delete"
            onClick={this.handleDelete}
          >删除</Button> : ''
        }
        { tools.indexOf('viewAll') !== -1 ?
          <Button
            type="ghost"
            icon="eye"
            onClick={this.handleViewAll}
          >视野</Button> : ''
        }
      </div>
      <div id="mapCon" style={mapStyle}> </div>
    </div>);
  }
}
