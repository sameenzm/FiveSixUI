import React from 'react';
import { render, shallow, mount } from 'enzyme';
import moment from 'moment';
import { findDOMNode } from 'react-dom'

import TimeRangePicker from '../../../components/basic/TimeRangePicker';

describe('TimeRangePicker', () => {
    // 基础测试
    it('Test prop: no props', () => {
        const wrapper = mount(
            <TimeRangePicker />
        );
        // 当前时刻
        console.log(wrapper.find('.ant-time-picker-input').get(0).value);
        console.log(wrapper.find('.ant-time-picker-input').get(1).value);
        expect(wrapper.find('TimePicker').length).to.eql(2);
    });
    it('Test prop: value', () => {
        const startTime = moment('10:10:10', 'HH:mm:ss');
        const endTime = moment('22:22:22', 'HH:mm:ss');
        const wrapper = mount(
            <TimeRangePicker 
            value={{start:startTime, end:endTime}} 
            />
        );
        expect(wrapper.find('.ant-time-picker-input').get(0).value).to.eql('10:10:10');
        expect(wrapper.find('.ant-time-picker-input').get(1).value).to.eql('22:22:22');
    });
    it('Test prop: separator', () => {
        const startTime = moment('10:10:10', 'HH:mm:ss');
        const endTime = moment('10:10:10', 'HH:mm:ss');
        const wrapper = mount(
            <TimeRangePicker 
            value={{start:startTime, end:endTime}} 
            separator='间隔' 
            />
        );
        expect(wrapper.find('.wl-timerangepicker-wrapper').text()).to.eql('间隔');
    });
    it('Test prop: onChange', () => {
        const startTime = moment('10:10:10', 'HH:mm:ss');
        const endTime = moment('10:10:10', 'HH:mm:ss');
        const callback = sinon.spy();
        const handleChange = (obj)=>{
            callback();
        };
        const wrapper = mount(
            <TimeRangePicker 
            value={{start:startTime, end:endTime}}
            onChange={handleChange} 
            />
        );
        wrapper.setProps({value: {start:moment('11:11:11', 'HH:mm:ss'), end:moment('23:23:23', 'HH:mm:ss')}});
        expect(wrapper.find('.ant-time-picker-input').get(0).value).to.eql('11:11:11');
        expect(wrapper.find('.ant-time-picker-input').get(1).value).to.eql('23:23:23');
        // wrapper.find('.wl-timerangepicker-start-time').simulate('click');
    });
    it('Test prop: ordered', () => {
        const startTime = moment('11:11:11', 'HH:mm:ss');
        const endTime = moment('11:11:11', 'HH:mm:ss');
        const handleChange = (obj)=>{
        };
        const wrapper = mount(
            <TimeRangePicker 
            value={{start:startTime, end:endTime}} 
            ordered={true} 
            onChange={handleChange}
            />
        );
        wrapper.find('.wl-timerangepicker-start-time').simulate('click');
        const arrDiv = Array.prototype.slice.call(document.querySelectorAll('.ant-time-picker-panel-select'));
        arrDiv.forEach((item,index)=>{
           if (index === 0 || index === 1) {
                const arr = Array.prototype.slice.call(item.getElementsByTagName('li'));
                arr.forEach((item,index)=>{
                    if (index >= 12) {
                        expect(item.className).to.eql('ant-time-picker-panel-select-option-disabled');
                    }
                }); 
           }
           if (index === 2) {
                const arr = Array.prototype.slice.call(item.getElementsByTagName('li'));
                arr.forEach((item,index)=>{
                    if (index > 11) {
                        expect(item.className).to.eql('ant-time-picker-panel-select-option-disabled');
                    }
                }); 
           }
        });
    });
    it('Test prop: startConfig', () => {
        const startTime = moment('11:11:11', 'HH:mm:ss');
        const endTime = moment('11:11:11', 'HH:mm:ss');
        const addon=(panel) => (
          <Button size="small" type="primary" onClick={() => panel.close()}>
            Ok
          </Button>
        );
        const wrapper = shallow(
            <TimeRangePicker 
            value={{start:startTime, end:endTime}} 
            startConfig = {{addon: addon}} 
            />
        );
        expect(wrapper.find('TimePicker').at(0).prop('addon')).to.eql(addon);
    });
    it('Test prop: endConfig', () => {
        const startTime = moment('11:11:11', 'HH:mm:ss');
        const endTime = moment('11:11:11', 'HH:mm:ss');
        const addon=(panel) => (
          <Button size="small" type="primary" onClick={() => panel.close()}>
            Ok
          </Button>
        );
        const wrapper = shallow(
            <TimeRangePicker 
            value={{start:startTime, end:endTime}} 
            endConfig = {{placeholder: '结束时间'}} 
            />
        );
        expect(wrapper.find('TimePicker').at(1).prop('placeholder')).to.eql('结束时间');
    });  
});

