/**
* @file Selected Options 展示组件
* @author 谢天
* @version 0.0.1
*/
/* eslint import/no-unresolved: 0*/
import React, { PropTypes } from 'react';
/**
 * 组件属性申明
 *
 * @property {bool} disabled
 * @property {(string|object)} value
 * @property {(string|number)} width
 * @property {bool} open
 * @property {function} handleClear
 * @property {function} onClick
 */
const propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  disabled: PropTypes.bool,
  open: PropTypes.bool,
  handleClear: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onClick: PropTypes.func.isRequired,
};
/**
 * 展示组件
 * @export
 * @class SelectInput
 * @extends {React.Component}
 */
export const SelectInput = (props) => (
  <div
    className={`wl-select${props.disabled ? ' wl-select-disabled' : ''}${props.open && !props.disabled ? ' wl-select-open' : ''}`}
    style={{ width: props.width }}
    onClick={props.onClick}
  >
    <div className="wl-select-selection wl-select-selection--single">
      <div className="wl-select-selection__rendered">
        <div className="wl-select-selection-selected-value">
            {props.value}
        </div>
      </div>
      <span className="wl-select-selection__clear" onClick={props.handleClear} style={{ display: props.handleClear ? '' : 'none' }} />
      <span className="wl-select-arrow">
        <b />
      </span>
    </div>
  </div>
    );

SelectInput.propTypes = propTypes;
SelectInput.defaultProps = {
};

export default SelectInput;
