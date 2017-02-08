import React from 'react';
import { render, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import moment from 'moment';
import $ from 'jquery';

import TenDaysSelect from '../../../components/basic/TenDaysSelect';
import { DISABLED_SELECT_CLASS } from '../../constants';

describe('TenDaysSelect', () => {
    // 基础测试
    it('Test prop: value', () => {
        const month = '2013-10';
        const month_type = '1';

        const wrapper = mount(
            <TenDaysSelect 
                value = { { month, month_type } }
            />
        );
        expect(wrapper.find('[value="' + month + '"]')).to.have.length(1);
        expect(wrapper.find('[title="上旬"]')).to.have.length(1);
        wrapper.setProps({value: {}});
        wrapper.setProps({value: {month, month_type: '2'}});
        expect(wrapper.find('[title="中旬"]')).to.have.length(1);
        // month_type=number
        wrapper.setProps({value: {month, month_type: 3}});
        expect(wrapper.find('[title="下旬"]')).to.have.length(1);
        // for coverage
        wrapper.setProps({value: false});
    });

    it('Test porp: disabled', () => {
        const wrapper = mount(
            <TenDaysSelect 
                disabled = { true }
            />
        );
        expect(wrapper.find('[disabled]')).to.have.length(1);
        expect(wrapper.find(DISABLED_SELECT_CLASS)).to.have.length(1);
    });
    it('Test prop: onChange', () => {
        const value = {
            month: '2013-11', 
            month_type: '1'
        };
        const onDateChange = sinon.spy();
        const wrapper = mount(
            <TenDaysSelect 
                onChange = { onDateChange }
                value = { value }
            />
        );
        expect(onDateChange).to.have.property('callCount', 1);
        // 选择月份
        wrapper.find('.ant-calendar-picker-input').simulate('click');
        $('.ant-calendar-month-panel-cell').eq(0).click();
        expect(onDateChange.calledWith({month: '2013-01', month_type: '1'})).to.be.true;
        // 选择旬
        wrapper.find('.ant-select-selection-selected-value').simulate('click');
        $('.ant-select-dropdown-menu-item').eq(1).click();
        expect(onDateChange.calledWith({month: '2013-01', month_type: '2'})).to.be.true;
    });
    it('Test prop: startMoment&endMoment', () => {
        const value = {
            month: '2017-02', 
            month_type: '1'
        };
        const wrapper = mount(
            <TenDaysSelect 
                value={value}
                startMoment={moment('2016-01')} 
                endMoment={moment('2017-05')} 
            />
        );
        wrapper.find('.ant-calendar-picker-input').simulate('click');
        expect($('.ant-calendar-month-panel-cell-disabled').length).to.eq(8);
    });
    it('Test prop: monthFormat', () => {
        const value = {
            month: '2017-02', 
            month_type: '1'
        };
        const onDateChange = sinon.spy();
        const wrapper = mount(
            <TenDaysSelect 
                value={value}
                onChange = { onDateChange }
                monthFormat={'YYYY.MM'}
            />
        );
        expect(onDateChange.calledWith({month: '2017.02', month_type: '1'})).to.be.true;
    });
});

