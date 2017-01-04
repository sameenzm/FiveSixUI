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
  defaultValue: PropTypes.array.isRequired,
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
    min: '0',
    max: '∞',
    step: 1,
    disabled: false
  };

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

        serials = serials.splice(index, 1);

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
        const { step, onChange } = this.props;
        let serials = [ ...this.state.serials ];

        serials = serials.push(serials[serials.length-1]+this.props.step);

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
    
    propTypes: propTypes

    render() {
      const { serials } = this.state;
      const { min, max, step  } = this.props;
      return (
        <div className="wl-serialinput-con">
          { 
            serials.map((item, index, array) => {
              if (index === array.length  - 1 || index === 0) {
                return <span key={index}>
                  <Input value={item} disabled/>
                  <span className="wl-serialinput-line"><Icon type="right" /></span>
                </span>
              }
              return <InputNumber value={item} step={step} min={min} max={max} key={index}/>
            })
          }
        </div>)
    }
    /**
     * 重新计算组件值, pure
     * 
     * @param {array} rangeVal 日期区间值
     * @param {array} removedDates 移除日期
     * @param {string} dateFormat 日期格式
     * 
     * @return {object} 组件值
     * 
     * @memberOf SerialInput
     */
    recalculateValue(rangeVal, removedDates, dateFormat) {
        const formatRange = transferDate(rangeVal, dateFormat);
        let compValue = {};

        compValue[PARAMS_MAP[0]] = formatRange[0];
        compValue[PARAMS_MAP[1]] = formatRange[1];

        if (removedDates) {  
            compValue[PARAMS_MAP[2]] = removedDates;
        }

        return compValue;
    }

    /**
     * 获取range值, pure
     * 
     * @param {object} props 组件属性
     * 
     * @return {array} range值
     * 
     * @memberOf SerialInput
     */
    getRangeValue (rangeType, props) {
        let type = rangeType || props.defaultType || props.options[0];

        if (type ===  DATE_TYPE[5].name) {
            if(props.customizeDefault && $.isArray(props.customizeDefault) && props.customizeDefault.length === 2) {
                return props.customizeDefault;
            } else {
                type = props.customizeDefault || props.options[0];
            }
        }

        return getRangeValByType(type);
    }

    /**
     * 获取区间内所有日期的Option数组, pure
     * 
     * @param {array} rangeVal 日期区间
     * 
     * @return {array} 所有日期的Option数组
     * 
     * @memberOf SerialInput
     */
    getAllDatesOption (range) {
        let selectDates = [];
        if (range) {
            let startDate = moment(range[0], DEFAULT_DATE_FORMAT);
            const endDate = moment(range[1], DEFAULT_DATE_FORMAT);

            while (moment.min(startDate, endDate) == startDate) {
                let formatDate = startDate.format(DEFAULT_DATE_FORMAT);

                selectDates.push(
                    <Select.Option value={formatDate} key={formatDate}>
                        {formatDate}
                    </Select.Option>
                );

                startDate.add(1, 'days');
            }
        }
        return selectDates;
    }

    /**
     * 默认不可选日期函数(根据配置选项，确定不可选范围), pure
     * 
     * @param {date} current
     * @param {array} options
     * @param {moment} now
     * 
     * @return {bool} 是否是不可选日期
     * 
     * @memberOf SerialInput
     */
    defaultDisabledDate(current, options, baseDate) {
        let past = false, future = false, now = false, isdisabled = false;
        let curDate = moment(current.valueOf());
        let mapping = {};

        DATE_TYPE.map(type => {
            mapping[type.name] = type.relative;
        });

        for (let i = 0, len = options.length; i < len; i++) {
            switch(mapping[options[i]]) {
                case 0:
                    now = true;
                    break;
                case 1:
                    future = true;
                    break;
                case -1:
                    past = true;
                    break;
            }
        }

        // 有过去无未来
        if (past && !future) {
            //包括今天
            if (now) { 
                isdisabled = current && curDate.isAfter(baseDate);
            } else {
                isdisabled = current && curDate.isSameOrAfter(baseDate);
            }
        }

        // 有未来无过去
        if (!past && future) {
            //包括今天
            if (now) {
                isdisabled = current && curDate.isBefore(baseDate);
            } else {
                isdisabled = current && curDate.isSameOrBefore(baseDate);
            }
        }

        return isdisabled;
    }
}
