import React from 'react';
import { render,shallow,mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { Select } from '../../../components';

describe('Select', () => {
    // 基础测试
    it('Test prop: data', () => {
        const wrapper = mount(
            <Select 
                data={[{text: '今天',value: 'today'},{text: '昨天',value: 'yesterday'},{text: '明天',value: 'tomorrow'}]} 
            ></Select>
        );
        expect(wrapper.find('.wl-select-dropdown-menu-item').at(0).text()).to.equal("今天");
        expect(wrapper.find('.wl-select-dropdown-menu-item').at(1).text()).to.equal("昨天");
        expect(wrapper.find('.wl-select-dropdown-menu-item').at(2).text()).to.equal("明天");
        wrapper.find('.wl-select').simulate('click');
        expect(wrapper.state('openMenu')).to.be.true;
        expect(wrapper.find('.wl-select').hasClass('wl-select-open')).to.be.true;
        expect(wrapper.find('.wl-select-dropdown').hasClass('wl-fadeInDown')).to.be.true; 
    });
    it('Test prop: value', () => {
        const wrapper = mount(
            <Select 
                data={[{text: '今天',value: 'today'},{text: '昨天',value: 'yesterday'},{text: '明天',value: 'tomorrow'}]} 
                value={'today'}
            ></Select>
        );
        expect(wrapper.find('.wl-select-selection-selected-value').text()).to.equal("今天");
    });
    it('Test prop: onChange', () => {
        const callback = sinon.spy();
        let index = 0;
        const changeValue = (value) => {
          index++;
          if (index === 1) {
            expect(value).to.equal("");
          }
          if (index === 2) {
            expect(value).to.equal("yesterday");
          }
          if (index === 3) {
            expect(value).to.equal("tomorrow");
          }
          callback();
        };
        const wrapper = mount(
            <Select 
                data={[{text: '今天',value: 'today'},{text: '昨天',value: 'yesterday'},{text: '明天',value: 'tomorrow'}]} 
                value={'today'} 
                onChange={changeValue} 
            ></Select>
        );
        wrapper.find('.wl-select-dropdown-menu-item').at(0).simulate('click');
        wrapper.find('.wl-select-dropdown-menu-item').at(1).simulate('click');
        wrapper.find('.wl-select-dropdown-menu-item').at(2).simulate('click');
        expect(callback).to.have.property('callCount', 3);
    });
    it('Test prop: showSearch', () => {
        const wrapper = mount(
            <Select 
                data={[{text: '今天',value: 'today'},{text: '昨天',value: 'yesterday'},{text: '明天',value: 'tomorrow'}]} 
                value={'today'} 
                showSearch={true}
            ></Select>
        );
        wrapper.find('.wl-search-input-wrapper').find('input').simulate('change', {target: {value: '明'}});
        expect(wrapper.find('.wl-select-dropdown-menu-item').text()).to.equal("明天");
        expect(wrapper.state('search')).to.equal("明");
    });
    it('Test prop: showAll', () => {
        const wrapper = mount(
            <Select 
                data={[{text: '今天',value: 'today'},{text: '昨天',value: 'yesterday'},{text: '明天',value: 'tomorrow'}]} 
                value={'today'} 
                showSearch={true} 
                showAll={true}
            ></Select>
        );
        expect(wrapper.find('.wl-select-dropdown-menu-item').at(0).text()).to.equal("全部");
    });
    it('Test prop: allowClear', () => {
        const changeValue = (value) => {
            expect(value).to.equal("");
        };
        const wrapper = mount(
            <Select 
                data={[{text: '今天',value: 'today'},{text: '昨天',value: 'yesterday'},{text: '明天',value: 'tomorrow'}]} 
                value={'today'} 
                onChange={changeValue} 
                showSearch={true} 
                showAll={true} 
                allowClear={true}
            ></Select>
        );
        // expect(wrapper.contains('<span class="wl-select-selection__clear"></span>')).to.be.true;
        wrapper.find('.wl-select-selection__clear').simulate('click');
    });
    it('Test prop: style', () => {
      // 待测
        const wrapper = mount(
            <Select 
                data={[{text: '今天',value: 'today'},{text: '昨天',value: 'yesterday'},{text: '明天',value: 'tomorrow'}]} 
                value={'today'} 
                showSearch={true} 
                showAll={true} 
                allowClear={true} 
                style={{position: 'absolute', top: 400}}
            ></Select>
        );
        // expect(wrapper.find('div[style="position: absolute; left: 50px;"]')).to.be.length(1);
        //expect(wrapper.find('.wl-select').parent().css('position')).to.equal('absolute');
        //expect(wrapper.find('.wl-select').parent().css('top')).to.equal('400');
    });
    it('Test prop: multiple', () => {
        let index = 0;
        const changeValue = (value) => {
          index++;
          // console.log(index,value);
          if (index === 2) {
            // expect(value).to.equal("['']");
          }
          if(index === 3) {
            // expect(value).to.equal("[]");
          }
        };
        const wrapper = mount(
            <Select 
                data={[{text: '今天',value: 'today'},{text: '昨天',value: 'yesterday'},{text: '明天',value: 'tomorrow'}]} 
                value={['today','yesterday']} 
                showSearch={true} 
                showAll={true} 
                allowClear={true} 
                onChange={changeValue} 
                style={{position: 'absolute', top: 400}}
                multiple = {true}
            ></Select>
        );
        expect(wrapper.find('.wl-select-selection-selected-value').text()).to.equal('【今天】【昨天】');
        wrapper.find('.wl-select-dropdown-menu-item').at(2).simulate('click');
        wrapper.find('.wl-select-dropdown-menu-item').at(3).simulate('click');
        // expect(wrapper.find('.wl-select-selection-selected-value').text()).to.equal('【今天】【明天】');
        wrapper.find('.wl-select-dropdown-menu-item').at(2).simulate('click');
        // expect(wrapper.find('.wl-select-selection-selected-value').text()).to.equal('全部');
    });
});