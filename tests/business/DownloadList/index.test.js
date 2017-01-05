import React from 'react';
import { shallow, mount } from 'enzyme';
import {Spin} from 'antd';
import { DownloadList } from '../../../components';
import $ from 'jquery';

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
        expect(wrapper.find('.downloadList-item-going').text()).to.eql('小度驿站-配送费1 【2011-10-17 00:17:56】状态：正在下载，请稍候…<Spin />');
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
        expect(wrapper.find('.downloadList-item-finish').text()).to.eql('小度驿站-配送费3 【2011-10-17 00:17:56】状态：完成保存到本地');
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
        expect(wrapper.find('.downloadList-item-error').text()).to.eql('小度驿站-配送费4 【2011-10-17 00:17:56】状态：失败');
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