/**
 * @file 银行选择组件
 *      modified by zhangmin01 <zhangmin01@iwaimai.baidu.com>
 *
 * @author lichun <lichun@iwaimai.baidu.com>
 * @version 0.0.1
 */
import React, { PropTypes } from 'react';
import { Select } from 'antd';
import { BANK_OPTIONS } from './constant';

const Option = Select.Option;

/**
 * 组件属性申明
 * @property {string} value
 * @property {function} onChange
 */
const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

/**
 * 表单项--银行
 * @class
 * @extends ReactComponent
 */
export default class BankSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSelectAll: false,
      selected: '招商银行',
    };
    this.createOptionsFromArray = this.createOptionsFromArray.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  /**
  * 创建选择器的option pure
  *
  * @param {array} arr
  * @return {array} option
  */
  createOptionsFromArray(arr) {
    const options = arr.map(item => (
      <Option value={item} key={item}>{item}</Option>
    ));
    return options;
  }

  getOptions() {
    // const { multiple } = this.props;
    const options = this.createOptionsFromArray(BANK_OPTIONS);
    // if (multiple) {
    // options.unshift(<Option value="all" key="all">全部</Option>);
    // }
    return options;
  }

  render() {
    return (
      <Select
        ref="select"
        dropdownClassName="wl-bank-select-dropdown"
        {...this.props}
      >
        {this.getOptions()}
      </Select>
    );
  }
}

BankSelect.propTypes = propTypes;
