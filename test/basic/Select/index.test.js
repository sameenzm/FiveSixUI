import React from 'react';
import { render,shallow,mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import $ from 'jquery';
import {findDOMNode} from 'react-dom';

import Select from '../../../components/basic/Select';
import { DropdownMenu, OptGroup,
    Option, SearchInput, SelectInput, Tips } from '../../../components/basic/Select/Components';


describe('Select', () => {
    let clock;
    before(function () {
        clock = sinon.useFakeTimers();
    });

    after(function () {
        clock.restore();
    });
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
        wrapper.find('.wl-select-selection__clear').simulate('click');
    });
    it('Test prop: style', () => {
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
        const expectedStyles = {
          position: 'absolute',
          top: 400
        }
        expect(wrapper.prop('style')).to.eql(expectedStyles);
    });
    it('Test prop: multiple', () => {
        let index = 0;
        const changeValue = (value) => {
            wrapper.setProps({
                value: value
            });
        };
        const wrapper = mount(
            <Select 
                data={[{text: '今天',value: 'today'},{text: '昨天',value: 'yesterday'},{text: '明天',value: 'tomorrow'}]} 
                value={['today']} 
                showSearch={true} 
                showAll={true} 
                allowClear={true} 
                onChange={changeValue} 
                style={{position: 'absolute', top: 400}} 
                multiple = {true}
            ></Select>
        );
        expect(wrapper.find('.wl-select-selection-selected-value').text()).to.eql("【今天】");
        wrapper.find('.wl-select-dropdown-menu-item').at(0).simulate('click');
        expect(wrapper.find('.wl-select-selection-selected-value').text()).to.eql("全部");
        wrapper.find('.wl-select-dropdown-menu-item').at(0).simulate('click');
        expect(wrapper.find('.wl-select-selection-selected-value').text()).to.eql("");
        wrapper.find('.wl-select-dropdown-menu-item').at(1).simulate('click');
        expect(wrapper.find('.wl-select-selection-selected-value').text()).to.eql("【今天】");
        wrapper.find('.wl-select-dropdown-menu-item').at(2).simulate('click');
        expect(wrapper.find('.wl-select-selection-selected-value').text()).to.eql("【今天】【昨天】");
        wrapper.find('.wl-select-dropdown-menu-item').at(3).simulate('click');
        expect(wrapper.find('.wl-select-selection-selected-value').text()).to.eql("全部");
    });
    // 2017-02-03
    it('Test state: openMenu', () => {
        const wrapper = mount(
            <Select 
                data={[{text: '今天',value: 'today'},{text: '昨天',value: 'yesterday'},{text: '明天',value: 'tomorrow'}]} 
            ></Select>
        );
        wrapper.setState({
            openMenu: true
        });
        wrapper.find('.wl-select').simulate('click');
        expect(wrapper.find('.wl-select').hasClass('wl-select-open')).to.be.false;
    });
    it('Test state: body click', () => {
        const wrapper = mount(
            <Select 
                data={[{text: '今天',value: 'today'},{text: '昨天',value: 'yesterday'},{text: '明天',value: 'tomorrow'}]} 
            ></Select>
        );
        wrapper.find('.wl-select').simulate('click');
        $(document.body).click();
        expect(wrapper.find('.wl-select').hasClass('wl-select-open')).to.be.false;
        expect(wrapper.state('openMenu')).to.be.false;
    });
    it('Test props: data&children', () => {
        const selectData = [{text: 'group1',value: 'group1',
                        children:[{text: '1',value: '1'}]},
                    {text: 'group2',value: 'group2',
                    children:[{text: '4',value: '4'}]},
                    {text: 'group3',value: 'group3',
                    children:[{text: '7',value: '7'}]}];
        const changeValue =sinon.spy();
        const wrapper = mount(
            <Select
                data={selectData} 
                value={['1','2','3','4','5','6','7','8','9']}
                showSearch={true}
                showAll={true}
                allowClear={true}
                onChange={changeValue}
                style={{position: 'absolute', top: 400}}
                multiple = {true}
            ></Select>
        );
        // wrapper.find('.wl-select').at(0).simulate('click');
        wrapper.setProps({value: 'ALL'});
        expect(changeValue).to.have.property('callCount', 1);
        wrapper.setProps({value: 'FIRST'});
        expect(changeValue).to.have.property('callCount', 2);
        wrapper.setProps({value: 'LAST'});
        expect(changeValue).to.have.property('callCount', 3);
        wrapper.setProps({value: 'ANY'});
        expect(changeValue).to.have.property('callCount', 4);
    });
    // 点选
    it('Test multiple', () => {
        const selectData = [
            {text:'1',value:'1'},
            {text:'2',value:'2'},
            {text:'3',value:'3'},
            {text:'4',value:'4'},
            {text:'5',value:'5'},
            {text:'6',value:'6'}
        ];
        const changeValue = (value)=>{
            // console.log(value);
            wrapper.setProps({value: value});
        };
        const wrapper = mount(
            <Select
                data={selectData} 
                value={['1','2','3']}
                showSearch={true}
                showAll={true}
                allowClear={true}
                onChange={changeValue}
                style={{position: 'absolute', top: 400}}
                multiple = {true}
            ></Select>
        );
        wrapper.find('.wl-select').at(0).simulate('click');
        wrapper.find('.wl-select-dropdown-menu-item').at(0).simulate('click');
        // 全部
        wrapper.find('.wl-select-dropdown-menu-item').at(6).simulate('click');
        // ['1','2','3','4','5']
        // $('.computeFontWidth')
        expect(wrapper.find('.wl-select-selection-selected-value').text()).to.eql("已选择 5 项");
    });
    // SearchInput
    it('Test SearchInput', () => {
        const handleChange = (e)=>{
            wrapper.setProps({
                value: e.target.value
            });
        };
        const wrapper = mount(
            <SearchInput
              width={'150px'}
              style={{ left: 0, top: 500 }}
              onChange={handleChange}
              value={''}
              key="searchinput"
            />
        );
        wrapper.find('.wl-select-search__field').simulate('focus');
        expect(wrapper.state('focus')).to.be.true;
        wrapper.find('.wl-select-search__field').simulate('blur');
        expect(wrapper.state('focus')).to.be.false;
        wrapper.find('button').simulate('click');
        clock.tick(1000);
        expect(wrapper.find('button').hasClass('wl-myBtn-clicked')).to.be.false;
        wrapper.find('button').simulate('mouseup');
    });
    // Option 
    it('Test Option', () => {
        const handleMouseEnter = (e)=>{
        };
        const handleMouseLeave = (e)=>{
        };
        const handleClick = (e)=>{

        };
        const wrapper = mount(
            <Option
                value={'option'}
                label={'test'}
                selected={false}
                disabled={false}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                lazyload={false}
              />
        );
        wrapper.find('li').simulate('mouseenter',{ target: { clientWidth: 150, scrollWidth: 150 } });
        wrapper.find('li').simulate('mouseleave',{ target: { clientWidth: 150, scrollWidth: 150 } });
        // jquery 
        wrapper.find('li').simulate('mouseenter',{ target: { clientWidth: 150, scrollWidth: 155 } });
        wrapper.find('li').simulate('mouseleave',{ target: { clientWidth: 150, scrollWidth: 155 } });
        wrapper.find('li').simulate('click');
        wrapper.setProps({
            disabled: true,
            selected: true
        });
        expect(wrapper.find('li').hasClass('wl-select-dropdown-menu-item-disabled')).to.be.true;
        expect(wrapper.find('li').hasClass('wl-select-dropdown-menu-item-selected')).to.be.true;
        // error
        /*wrapper.setProps({
            lazyload: true
        });*/
    });
    // Tips 
    it('Test Tips', () => {
        const wrapper = mount(
            <Tips 
                text={''} 
                show={true} 
                style={{'display': 'none'}} 
            />
        );
        wrapper.setProps({
            show: false
        });
    });
});