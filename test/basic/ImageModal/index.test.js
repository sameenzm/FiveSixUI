import React from 'react';
import { render,shallow,mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import moment from 'moment';
import $ from 'jquery';

import ImageModal from '../../../components/basic/ImageModal';

describe('ImageModal', () => {
    // 基础测试
    it('Test prop: src', () => {
        const wrapper = mount( <ImageModal 
            src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png' />
        );
        wrapper.setProps({
            show: true
        });
        expect(wrapper.prop('show')).to.equal(true);
        wrapper.setProps({
            show: false
        });
    });
    it('Test prop: onClose', () => {
        const onClose = sinon.spy();
        const wrapper = mount( 
            <ImageModal 
            src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png'
            onClose = {onClose} />
        );
        wrapper.setProps({
            show: true
        });
        $('.ant-modal-close-x').click();

        // expect(onClose).to.have.property('callCount', 1);
    });
    it('Test circle: onOpen', () => {
        const onOpen = sinon.spy();
        const wrapper = mount( 
            <ImageModal 
            src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png'
            onOpen = {
                onOpen
            } />
        );
        wrapper.setProps({
            show: true
        });
        expect(onOpen).to.have.property('callCount', 1);
    });
    it('Test 缩小', () => {
        const wrapper = mount( 
            <ImageModal 
            src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png' />
        );
        wrapper.setProps({
            show: true,
        });
        // 缩小
        wrapper.find('.ant-btn').at(0).simulate('click');
        expect(wrapper.state('width')).to.equal(300);
        expect(wrapper.state('deg')).to.equal(0);
    });
    it('Test 放大&缩小', () => {
        const wrapper = mount( <ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png' />
        );
        wrapper.setProps({
            show: true,
        });
        expect(wrapper.state('width')).to.equal(300);
        expect(wrapper.state('deg')).to.equal(0);
        // 放大1
        wrapper.find('.ant-btn').at(1).simulate('click');
        expect(wrapper.state('width')).to.equal(300*1.2);
        // 放大2
        wrapper.find('.ant-btn').at(1).simulate('click');
        expect(wrapper.state('width')).to.equal(300*1.2*1.2);
        // 放大3
        wrapper.find('.ant-btn').at(1).simulate('click');
        expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2);
        // 放大4
        wrapper.find('.ant-btn').at(1).simulate('click');
        expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2*1.2);
        // 放大5
        wrapper.find('.ant-btn').at(1).simulate('click');
        expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2*1.2*1.2);
        // 放大6
        wrapper.find('.ant-btn').at(1).simulate('click');
        expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2*1.2*1.2*1.2);
        // 放大7
        wrapper.find('.ant-btn').at(1).simulate('click');
        expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2*1.2*1.2*1.2*1.2);
        // 放大8
        wrapper.find('.ant-btn').at(1).simulate('click');
        expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2*1.2*1.2*1.2*1.2);
        // 缩小
        wrapper.find('.ant-btn').at(0).simulate('click');
        expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2*1.2*1.2*1.2*1.2*0.8);
    });
    it('Test 逆时针', () => {
        const wrapper = mount( <ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png' />
        );
        wrapper.setProps({
            show: true,
        });
        // 逆时针
        wrapper.find('.ant-btn').at(2).simulate('click');
        expect(wrapper.state('deg')).to.equal(270);
        // 逆时针
        wrapper.find('.ant-btn').at(2).simulate('click');
        expect(wrapper.state('deg')).to.equal(180);
        // 逆时针
        wrapper.find('.ant-btn').at(2).simulate('click');
        expect(wrapper.state('deg')).to.equal(90);
        // 逆时针
        wrapper.find('.ant-btn').at(2).simulate('click');
        expect(wrapper.state('deg')).to.equal(0);
    });
    it('Test 顺时针', () => {
        const wrapper = mount( <ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png' />
        );
        wrapper.setProps({
            show: true,
        });
        // 顺时针
        wrapper.find('.ant-btn').at(3).simulate('click');
        expect(wrapper.state('deg')).to.equal(90);
        // 顺时针
        wrapper.find('.ant-btn').at(3).simulate('click');
        expect(wrapper.state('deg')).to.equal(180);
        // 顺时针
        wrapper.find('.ant-btn').at(3).simulate('click');
        expect(wrapper.state('deg')).to.equal(270);
        // 顺时针
        wrapper.find('.ant-btn').at(3).simulate('click');
        expect(wrapper.state('deg')).to.equal(0);
    });
});