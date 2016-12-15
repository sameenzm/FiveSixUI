/**
 * @file 银行选择组件
 *      modified by zhangmin01 <zhangmin01@iwaimai.baidu.com>
 * @author lichun <lichun@iwaimai.baidu.com>
 * @version 0.0.1
 */

import React, { PropTypes } from 'react';
import { Select } from 'antd';
import _ from 'lodash';
import { BANK_OPTIONS } from './constant';
import { getFieldDecorator } from '../../_utils/splitFromAntd';

const Option = Select.Option;
/**
 * 组件属性申明
 * @property {object} form
 * @property {string} name 参数名
 * @property {string} initialValue set值
 * @property {bool} required 是否必填
 * @property {bool} disabled 是否只读
 * @property {string} initialValue 初始值
 */

const propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  isSelectAllOptions: PropTypes.bool,
};

/**
 * 表单项--银行
 * @class
 * @extends ReactComponent
 */
export default class BankSelect extends React.Component {

  /**
  * 创建选择器的option pure
  *
  * @param {array} arr
  * @return {array} option
  */
  static createOptionsFromArray(arr) {
    const options = arr.map(item => (
      <Option value={item} key={item}>{item}</Option>
    ));

    return options;
  }

  getOptions() {
    const { isSelectAllOptions } = this.props;
    const options = this.createOptionsFromArray(BANK_OPTIONS);
    if (isSelectAllOptions) {
      options.unshift(<Option value="" key="all">全部</Option>);
    }
    return options;
  }

  /**
  * 默认验证规则 pure
  *
  * @param {array} arr
  * @return {array} option
  */
  generateRules() {
    const { required } = this.props;
    const rules = [];
    if (required) {
      rules.push({ required: true, message: '请选择银行' });
    }
    return rules;
  }

  render() {
    const { form, name, disabled, initialValue } = this.props;
    const otherProps = _.omit(this.props, [
      'form',
      'name',
      'required',
      'disabled',
    ]);
    return getFieldDecorator(form)(name, {
      initialValue,
      rules: this.generateRules(),
    })(
      <Select
        disabled={disabled}
        {...otherProps}
      >
        {this.getOptions()}
      </Select>);
  }
}

BankSelect.propTypes = propTypes;
