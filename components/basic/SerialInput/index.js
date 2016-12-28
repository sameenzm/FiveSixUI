/**
* @file 连续区间输入组件
* 
* @author wangjuan01<wangjuan01@iwaimai.baidu.com>
* @version 0.0.1
* 
*/
import React, { PropTypes } from 'react';
import moment from 'moment';
import { Form, InputNumber, Input, Icon, Button } from 'antd';
import './styles.less';

/**
 * 组件属性申明
 *
 * @property {array}         defaultValue     默认值                  
 * @property {number}        min              最小值                  默认值：0
 * @property {number}        max              最大值                  默认值：∞
 * @property {number|string} step             步数                    默认值：1
 * @property {bool}          disabled         是否可编辑              默认值：false
 * @property {func}          onChange         变化时回调函数
 */
const propTypes = {
  defaultValue: PropTypes.array,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

/**
 * 主组件
 * 
 * @export
 * @class SerialInput
 * @extends {React.Component}
 */
export default class SerialInput extends React.Component {
  static defaultProps = {
    min: 0,
    max: 5,
    step: 1,
    disabled: false
  };

  static propTypes = propTypes;

  constructor(props) {
    super(props);

    /**
     * state属性申明
     *
     * @property {bool}         serials   当前类型是否自定义
     * @property {array}        rangeVal      当前的日期区间值
     * @property {array|bool }  removedDates  当前的去除日期（false时，无去除日期工具）
     */
    this.state = {
      serials: props.defaultValue || [ props.min, props.max ]
    }

    /**
     * 更改日期类型时的回调函数
     * 
     * @param {object} e 事件对象
     * 
     * @memberOf SerialInput
     */
    this.deleteInput = (e, index) => {
      const { onChange } = this.props;
      let serials = [ ...this.state.serials ];

      serials.splice(index, 1);

      this.setState({ serials });
      onChange && onChange(serials);
    }

    /**
     * 更改日期类型时的回调函数
     * 
     * @param {object} e 事件对象
     * 
     * @memberOf SerialInput
     */
    this.addInput = (e, index) => {
      e.preventDefault(); 
      const { step, onChange } = this.props;
      let serials = [ ...this.state.serials ];

      console.log(index)

      serials.splice(index + 1, 0, serials[index]+step);

      this.setState({ serials });

      onChange && onChange(serials);
    }

    /**
     * 更改日期区间值组件时的回调函数
     * 
     * @param {array} newRange 日期区间值
     * 
     * @memberOf SerialInput
     */
    this.changeInput = (newValue, index) => {
      const { step, onChange } = this.props;
      let serials = [ ...this.state.serials ];

      serials[index] = newValue;

      this.setState({ serials });

      onChange && onChange(serials);
    }
  }
  render() {
    const { serials } = this.state;
    const { min, max, step } = this.props;

    return (<div className="wl-serialinput-con">
      { 
        serials.map((item, index, array) => {
          if (index === 0) {
            return <span key={index}>
              <Input style={{width: '80px'}} value={item} disabled/>
              <span className="wl-serialinput-line"><Icon type="caret-right" onClick={(e) => this.addInput(e, index)}/></span>
            </span>
          } else if(index === array.length  - 1){
            return <span key={index}>
              <Input style={{width: '80px'}} value={item} disabled/>
            </span>
          } else {
            return <span key={index} className="wl-serialinput-input">
              <InputNumber 
                style={{width: '80px'}}
                value={item}
                step={step}
                min={array[index-1]}
                max={array[index+1]}
                key={index}
                onChange={this.changeInput}
              />
              <Icon  className="wl-serialinput-dele" type="close-circle" onClick={(e) => this.deleteInput(e, index)}/>
            <span className="wl-serialinput-line"><Icon type="caret-right" onClick={(e) => this.addInput(e, index)}/></span>
          </span>
          }
          return <InputNumber 
            value={item}
            step={step}
            min={array[index-1]}
            max={array[index+1]}
            key={index}
            onChange={this.changeInput}
          />
        })
      }
      <Button type="dashed" shape="circle" icon="plus" onClick={(e) => this.addInput(e, serials.length-2)} disabled={serials[serials.length-2]+step===max}></Button>
    </div>);
  }
}
