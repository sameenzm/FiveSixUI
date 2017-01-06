/**
 * @file 物流方类别单选框组件，暂仅用于取值，不用于设值
 *       modified by wangying02 <wangying02@iwaimai.baidu.com>
 *
 * @author lichun <lichun@iwaimai.baidu.com>
 * @version 0.0.1
 *
 */
import React, { PropTypes } from 'react';
import { Radio } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

/**
 * 组件属性申明
 * @property {string} name 参数名
 * @property {object} form 表单 antd
 * @property {object} defaultValue 默认值
 * @property {function} onChange
 */
const propTypes = {
  name: PropTypes.string,
  form: PropTypes.object,
  defaultValue: PropTypes.object,
  onChange: PropTypes.func,
};

/**
 * 主 *
 * @expo组件
 rt
 * @class TeamTypeRadio
 * @extends {React.Component}
 */
const TEAM_TYPES = [
  { label: '自定义', value: 0 },
  { label: '直营', value: 1 },
  { label: '渠道', value: 2 },
];
export default class TeamTypeRadio extends React.Component {
  /**
   * Creates an instance of TeamTypeRadio.
   *
   * @memberOf TeamTypeRadio
   */
  constructor(props) {
    super(props);
    this.handleChange = (value) => {
      this.props.onChange && this.props.onChange(value);
    };
  }

  render() {
    return (
      <RadioGroup
        name={this.props.name}
        form={this.props.form}
        defaultValue={this.props.defaultValue}
        onChange={this.handleChange}
      >
        { TEAM_TYPES.map(type =>
          <RadioButton value={type.value} key={type.value}>{type.label}</RadioButton>,
        )}
      </RadioGroup>
    );
  }
}

TeamTypeRadio.propTypes = propTypes;
