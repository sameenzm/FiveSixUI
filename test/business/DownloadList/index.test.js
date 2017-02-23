import React from 'react';
import { shallow, mount } from 'enzyme';
import {Spin} from 'antd';
import $ from 'jquery';
import DownloadList from '../../../components/business/DownloadList';

describe('DownloadList', () => {
    // 基础测试
    it('Test props: show', () => {
        const wrapper = shallow(
            <DownloadList show={true}/>
        );
        expect(wrapper.find('.downloadList-no-download-record-panel').text()).to.eql('您二十四小时内无下载记录');
    });
    // 正在下载文件
    it('Test props: data:going', () => {
        const data = [
            {status: 0,name: '配送费1',create_time: 1318781876.721}
        ];
        const wrapper = shallow(
            <DownloadList show={true} data={data}/>
        );
        expect(wrapper.contains(<Spin />)).to.be.true;
    });
    // 下载成功文件
    it('Test props: data:finish', () => {
        const data = [
            {status: 2,name: '配送费3',download_url: 'www.baidu.com',create_time: 1318781876.721},
        ];
        const wrapper = shallow(
            <DownloadList show={true} data={data}/>
        );
        expect(wrapper.find('.downloadList-item-finish').contains(<a href="www.baidu.com">保存到本地</a>)).to.be.true;
    });
    // 下载失败文件
    it('Test props: data:error', () => {
        const data = [
            {status: 3,name: '配送费4',create_time: 1318781876.721},
        ];
        const wrapper = shallow(
            <DownloadList show={true} data={data}/>
        );
        expect(wrapper.find('.downloadList-item-error')).to.have.length(1);
    });
    it('Test props: onCancel', () => {
        const onCancel = sinon.spy();
        const data = [
            {status: 3,name: '配送费4',create_time: 1318781876.721},
        ];
        const wrapper = mount(
            <DownloadList show={true} onCancel={onCancel} data={data}/>
        );
        $('.ant-modal-close').click().delay(800);
        expect(onCancel).to.have.property('callCount', 1);
    });
});