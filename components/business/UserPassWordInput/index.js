/**
 * @file 用户密码输入校验组件
 *       特性：明文密码输入控件；
 *            当input值为******时，点击密码，密码值清空；
 *       modified by zhangcongfeng<zhangcongfeng@iwaimai.baidu.com>
 *       modified by lichun<lichun@iwaimai.baidu.com> 20161213
 *
 * @author lichun <lichun@iwaimai.baidu.com>
 * @version 0.0.1
 *
 */
import React, { PropTypes } from 'react';
import { Input } from 'antd';
import { PASSWORD_MASK } from '../../constant';


/**
 * 组件属性申明
 * @property {string} value 默认值
 * @property {function} onChange input change事件
 * @property {object} others antd Input的扩展属性支持
 */
const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

/**
 * 主组件
 *
 * @export
 * @class UserPassWord
 * @extends {React.Component}
 */
function UserPassWord({ value, onChange, ...others }) {
  return (<Input
    size="large"
    value={value}
    onChange={onChange}
    onFocus={(e) => {
      const event = e;
      if (event && event.currentTarget) {
        const targetValue = event.currentTarget.value;
        if (targetValue === PASSWORD_MASK) {
          event.currentTarget.value = '';
        }
      }
    }}
    {...others}
  />);
}
UserPassWord.propTypes = propTypes;
export default UserPassWord;
