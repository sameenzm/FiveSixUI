/**
* @file Options 组合展示组件
* @author 谢天
* @version 0.0.1
*/

/* eslint import/no-unresolved: 0*/
import React, { PropTypes } from 'react';
import '../styles.less';
/**
 * 组件属性申明
 *
 * @property {array} children
 * @property {(string|object)} label
 */
const propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.arrayOf(PropTypes.element),
};
/**
 * 容器组件
 * @export
 * @class OptGroup
 * @extends {React.Component}
 */
export const OptGroup = (props) => (
  <li className="wl-select-dropdown-menu-item-group">
    <div className="wl-select-dropdown-menu-item-group-title">
              {props.label}
    </div>
    <ul className="wl-select-dropdown-menu-item-group-list">
              {props.children}
    </ul>
  </li>
    );

OptGroup.propTypes = propTypes;

export default OptGroup;
