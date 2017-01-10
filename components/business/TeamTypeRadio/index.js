import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom'
import { Radio } from 'antd';

/**
 * 组件属性申明
 * @name 参数名
 */
const propTypes = {
}

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const TEAM_TYPES = [
    { label: '自定义', value: 0 },
    { label: '直营', value: 1 },
    { label: '渠道', value: 2 }
]
/**
 * 物流方类别单选框
 * 暂仅用于取值，不用于设值
 */
export default class TeamTypeRadio extends React.Component {
    render() {
        const { onChange } = this.props;
        return (
            <RadioGroup 
                defaultValue={0}
                onChange = { onChange }
            >
            { TEAM_TYPES.map((type, index) => (
                <RadioButton value={type.value} key={type.value}>{type.label}</RadioButton>
            ))}
            </RadioGroup>
        )
    }
}
