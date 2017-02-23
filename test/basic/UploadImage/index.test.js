import React from 'react';
import { render, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import UploadImage from '../../../components/basic/UploadImage';

describe('UploadImage', () => {
    // 基础测试
    it('Test prop: uploadService & imgName', () => {
        const wrapper = shallow(<UploadImage
                                imgName = '上传图片test'
                                uploadService = 'http://yizhan.baidu.com/logistics/uploadpic' />);
        expect(wrapper.props().children[0].props.action).to.equal("http://yizhan.baidu.com/logistics/uploadpic");
        expect(wrapper.find('.wl-uploadimage-preview').node.props.alt).to.equal("上传图片test");
        // expect(wrapper.props().children[1].props.children.props.alt).to.equal("上传图片test");
    });
    it('Test prop: imgUrl & showSize', () => {
        const wrapper = shallow( <UploadImage
                                    imgUrl          = "https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg"
                                    showSize        = {true}
                                    imgName         = '上传图片test'
                                    uploadService   = '/logistics/uploadpic' />
        );
        expect(wrapper.find('.wl-uploadimage-preview').node.props.src).to.equal("https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg");
    });
    it('Test prop: disabled', () => {
        const wrapper = shallow( <UploadImage
                                    disabled        = {true}
                                    imgName         = '上传图片test'
                                    uploadService   = '/logistics/uploadpic' />
        );
        expect(wrapper.find('.wl-uploadimage-btn').node.props.disabled).to.equal(true);
    });

    /*it('calls componentDidMount && Test prop: showSize', () => {
        sinon.spy(UploadImage.prototype, "componentDidMount");
        const wrapper = mount( <UploadImage
                                    showSize        = {true}
                                    imgUrl          = "https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg"
                                    imgName         = '上传图片test'
                                    uploadService   = '/logistics/uploadpic' />
        );
        // console.log('---', UploadImage.prototype.componentDidMountco);
    
        expect(UploadImage.prototype.componentDidMount).to.have.property('callCount', 1);
        UploadImage.prototype.componentDidMount.restore();
    
    });*/
    //
    // it('Test prop: onChange', () => {
    //     const onUploadPicture = sinon.spy();
    //     const wrapper = shallow( <UploadImage
    //                                 onChange        = {onUploadPicture}
    //                                 imgName         = '上传图片test'
    //                                 uploadService   = '/logistics/uploadpic' />
    //     );
    //     // console.log('---', onUploadPicture);
    //     expect(onUploadPicture).to.have.property('callCount', 1);
    //     // wrapper.find('.wl-imagemodal-con').simulate('click');
    //     // expect(wrapper.state('show')).to.equal(true);
    // });
});