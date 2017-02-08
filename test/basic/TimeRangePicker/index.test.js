import React from 'react';
import { render, shallow, mount } from 'enzyme';
import moment from 'moment';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
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
    // value
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
    // separator
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
    // onChange
    it('Test prop: onChange&startTime', () => {
        const startTime = moment('01:01:01', 'HH:mm:ss');
        const endTime = moment('10:10:10', 'HH:mm:ss');
        let startCurrent = '';
        const handleChange = (obj)=>{
            //startCurrent = obj.start;
        };
        const wrapper = mount(
            <TimeRangePicker 
            value={{start:startTime, end:endTime}} 
            ordered={true} 
            onChange={handleChange} 
            />
        );
        // 开始时间
        wrapper.find('.wl-timerangepicker-start-time').simulate('click');
        $('.ant-time-picker-panel-select').eq(0).find('li:eq(5)').click();
        $('.ant-time-picker-panel-select').eq(1).find('li:eq(5)').click();
        $('.ant-time-picker-panel-select').eq(2).find('li:eq(5)').click();
        // wrapper.setProps({value: {start: startCurrent, end: endTime}});
        // expect(wrapper.find('.ant-time-picker-input').get(0).value).to.eql('05:05:05');
        $('.ant-time-picker-panel-select').remove();
    });
    // onChange
    it('Test prop: onChange&endTime', () => {
        const startTime = moment('01:01:01', 'HH:mm:ss');
        const endTime = moment('10:10:10', 'HH:mm:ss');
        let endCurrent = '';
        const handleChange = (obj)=>{
            // endCurrent = obj.end;
        };
        const wrapper = mount(
            <TimeRangePicker 
            value={{start:startTime, end:endTime}} 
            ordered={true} 
            onChange={handleChange} 
            />
        );
         // 结束时间
        wrapper.find('.wl-timerangepicker-end-time').simulate('click');
        $('.ant-time-picker-panel-select').eq(0).find('li:eq(6)').click();
        $('.ant-time-picker-panel-select').eq(1).find('li:eq(6)').click();
        $('.ant-time-picker-panel-select').eq(2).find('li:eq(6)').click();
        // wrapper.setProps({value: {start: startTime, end: endCurrent}});
        // expect(wrapper.find('.ant-time-picker-input').get(1).value).to.eql('06:06:06');
        $('.ant-time-picker-panel-select').remove();
    });
    // ordered&end
    it('Test prop: ordered&end', () => {
        const startTime = moment('05:05:05', 'HH:mm:ss');
        const endTime = moment('10:10:10', 'HH:mm:ss');
        const wrapper = mount(
            <TimeRangePicker 
            value={{start:startTime, end:endTime}} 
            ordered={true} 
            />
        );
        // 结束时间
        wrapper.find('.wl-timerangepicker-end-time').simulate('click');
        /*for(let i=0;i<5;i++){
            expect($('.ant-time-picker-panel-select').eq(0).find('li').eq(i).attr('class')).to.eq('ant-time-picker-panel-select-option-disabled');
        }*/
        $('.ant-time-picker-panel-select').eq(0).find('li').eq(5).click();
        /*for(let i=0;i<5;i++){
            expect($('.ant-time-picker-panel-select').eq(1).find('li').eq(i).attr('class')).to.eq('ant-time-picker-panel-select-option-disabled');
        }*/
        $('.ant-time-picker-panel-select').eq(1).find('li').eq(5).click();
        /*for(let i=0;i<5;i++){
            expect($('.ant-time-picker-panel-select').eq(2).find('li').eq(i).attr('class')).to.eq('ant-time-picker-panel-select-option-disabled');
        }*/
        $('.ant-time-picker-panel-select').remove();
    });
    // ordered&startTime
    it('Test prop: ordered&start', () => {
        const startTime = moment('10:10:10', 'HH:mm:ss');
        const endTime = moment('10:10:10', 'HH:mm:ss');
        const wrapper = mount(
            <TimeRangePicker 
            value={{start:startTime, end:endTime}} 
            ordered={true} 
            />
        );
        wrapper.find('.wl-timerangepicker-start-time').simulate('click');
        // 开始时间
        // expect($('.ant-time-picker-panel-select').eq(0).find('li').eq(11).attr('class')).to.eq('ant-time-picker-panel-select-option-disabled');
        // expect($('.ant-time-picker-panel-select').eq(1).find('li').eq(11).attr('class')).to.eq('ant-time-picker-panel-select-option-disabled');
        // expect($('.ant-time-picker-panel-select').eq(2).find('li').eq(11).attr('class')).to.eq('ant-time-picker-panel-select-option-disabled');
        $('.ant-time-picker-panel-select').remove();
    });
    // startConfig
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
    // endConfig
    it('Test prop: endConfig', () => {
        const startTime = moment('11:11:11', 'HH:mm:ss');
        const endTime = moment('11:11:11', 'HH:mm:ss');
        const wrapper = shallow(
            <TimeRangePicker 
            value={{start:startTime, end:endTime}} 
            endConfig = {{placeholder: '结束时间'}} 
            />
        );
        expect(wrapper.find('TimePicker').at(1).prop('placeholder')).to.eql('结束时间');
    });  
    it('Test prop: ordered is false', () => {
        const startTime = moment('10:10:10', 'HH:mm:ss');
        const endTime = moment('22:22:22', 'HH:mm:ss');
        const wrapper = shallow(
            <TimeRangePicker 
            value={{start:startTime, end:endTime}} 
            ordered={false} 
            />
        );
        (wrapper.find('TimePicker').first().prop('disabledHours'))();
        (wrapper.find('TimePicker').first().prop('disabledMinutes'))();
        (wrapper.find('TimePicker').first().prop('disabledSeconds'))();
        (wrapper.find('TimePicker').last().prop('disabledHours'))();
        (wrapper.find('TimePicker').last().prop('disabledMinutes'))();
        (wrapper.find('TimePicker').last().prop('disabledSeconds'))();
    });
});

