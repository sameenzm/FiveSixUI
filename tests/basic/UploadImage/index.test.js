import React from 'react';
import { render, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { UploadImage } from '../../../components';

describe('UploadImage', () => {
    // 基础测试
    it('Test prop: uploadService & imgName', () => {
        const wrapper = shallow( <UploadImage
                                imgName = '上传图片test'
                                uploadService = 'http://yizhan.baidu.com/logistics/uploadpic' />
        );
        console.log('---', wrapper.props().children[0]);
        expect(wrapper.props().children[0].props.action).to.equal("http://yizhan.baidu.com/logistics/uploadpic");
        expect(wrapper.props().children[0].props.action).to.equal("http://yizhan.baidu.com/logistics/uploadpic");
        // wrapper.find('.wl-imagemodal-con').simulate('click');
        // expect(wrapper.state('show')).to.equal(true);
    });
    // it('Test prop: imgUrl', () => {
    //     const wrapper = mount( <UploadImage
    //                                 imgUrl          = data.idcredit_pic
    //                                 imgName         = '身份证'
    //                                 uploadService   = '/logistics/uploadpic' />
    //     );
    //     // expect(wrapper.find('img[src="http://yizhan.baidu.com/static/logisticsfrontend/images/sound_d165ad8.png"]').to.have.length(1);
    //     wrapper.find('.wl-imagemodal-con').simulate('click');
    //     expect(wrapper.state('show')).to.equal(true);
    // });
    // it('Test prop: showSize', () => {
    //     const wrapper = mount( <UploadImage
    //                                 showSize        = true
    //                                 imgName         = '身份证'
    //                                 uploadService   = '/logistics/uploadpic' />
    //     );
    //     wrapper.find('.wl-imagemodal-con').simulate('click');
    //     expect(wrapper.state('show')).to.equal(true);
    // });

    // it('Test prop: onClose', () => {
    //     const onClose = sinon.spy();
    //     const wrapper = mount( <ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png'
    //         onClose = {
    //             onClose
    //         } >
    //         点击出图 </ImageModal>
    //     );
    //     wrapper.setState({
    //         show: true
    //     });
    //     wrapper.setState({
    //         show: false
    //     });
    //     // expect(onClose).to.have.property('callCount', 1);
    // });
    // it('Test circle: onOpen', () => {
    //     const onOpen = sinon.spy();
    //     const wrapper = mount( <ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png'
    //         onOpen = {
    //             onOpen
    //         } >
    //         点击出图 </ImageModal>
    //     );
    //     wrapper.find('.wl-imagemodal-con').simulate('click');
    //     expect(onOpen).to.have.property('callCount', 1);
    // });
    // it('Test 缩小', () => {
    //     const wrapper = mount( <ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png' >
    //         点击出图 </ImageModal>
    //     );
    //     wrapper.setState({
    //         show: true,
    //     });
    //     // 缩小
    //     wrapper.find('.ant-btn').at(0).simulate('click');
    //     expect(wrapper.state('width')).to.equal(300);
    //     expect(wrapper.state('deg')).to.equal(0);
    // });
    // it('Test 放大&缩小', () => {
    //     const wrapper = mount( <ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png' >
    //         点击出图 </ImageModal>
    //     );
    //     wrapper.setState({
    //         show: true,
    //     });
    //     expect(wrapper.state('width')).to.equal(300);
    //     expect(wrapper.state('deg')).to.equal(0);
    //     // 放大1
    //     wrapper.find('.ant-btn').at(1).simulate('click');
    //     expect(wrapper.state('width')).to.equal(300*1.2);
    //     // 放大2
    //     wrapper.find('.ant-btn').at(1).simulate('click');
    //     expect(wrapper.state('width')).to.equal(300*1.2*1.2);
    //     // 放大3
    //     wrapper.find('.ant-btn').at(1).simulate('click');
    //     expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2);
    //     // 放大4
    //     wrapper.find('.ant-btn').at(1).simulate('click');
    //     expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2*1.2);
    //     // 放大5
    //     wrapper.find('.ant-btn').at(1).simulate('click');
    //     expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2*1.2*1.2);
    //     // 放大6
    //     wrapper.find('.ant-btn').at(1).simulate('click');
    //     expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2*1.2*1.2*1.2);
    //     // 放大7
    //     wrapper.find('.ant-btn').at(1).simulate('click');
    //     expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2*1.2*1.2*1.2*1.2);
    //     // 放大8
    //     wrapper.find('.ant-btn').at(1).simulate('click');
    //     expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2*1.2*1.2*1.2*1.2);
    //     // 缩小
    //     wrapper.find('.ant-btn').at(0).simulate('click');
    //     expect(wrapper.state('width')).to.equal(300*1.2*1.2*1.2*1.2*1.2*1.2*1.2*0.8);
    // });
    // it('Test 逆时针', () => {
    //     const wrapper = mount( <ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png' >
    //         点击出图 </ImageModal>
    //     );
    //     wrapper.setState({
    //         show: true,
    //     });
    //     // 逆时针
    //     wrapper.find('.ant-btn').at(2).simulate('click');
    //     expect(wrapper.state('deg')).to.equal(270);
    //     // 逆时针
    //     wrapper.find('.ant-btn').at(2).simulate('click');
    //     expect(wrapper.state('deg')).to.equal(180);
    //     // 逆时针
    //     wrapper.find('.ant-btn').at(2).simulate('click');
    //     expect(wrapper.state('deg')).to.equal(90);
    //     // 逆时针
    //     wrapper.find('.ant-btn').at(2).simulate('click');
    //     expect(wrapper.state('deg')).to.equal(0);
    // });
    // it('Test 顺时针', () => {
    //     const wrapper = mount( <ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png' >
    //         点击出图 </ImageModal>
    //     );
    //     wrapper.setState({
    //         show: true,
    //     });
    //     // 顺时针
    //     wrapper.find('.ant-btn').at(3).simulate('click');
    //     expect(wrapper.state('deg')).to.equal(90);
    //     // 顺时针
    //     wrapper.find('.ant-btn').at(3).simulate('click');
    //     expect(wrapper.state('deg')).to.equal(180);
    //     // 顺时针
    //     wrapper.find('.ant-btn').at(3).simulate('click');
    //     expect(wrapper.state('deg')).to.equal(270);
    //     // 顺时针
    //     wrapper.find('.ant-btn').at(3).simulate('click');
    //     expect(wrapper.state('deg')).to.equal(0);
    // });
});