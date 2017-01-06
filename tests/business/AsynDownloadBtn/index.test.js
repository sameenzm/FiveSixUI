import React from 'react';
import { shallow, mount } from 'enzyme';

import { AsynDownloadBtn } from '../../../components';

describe('AsynDownloadBtn', () => {
    // 基础测试
    it('Test props: downloadAction', () => {
        const downloadAction = sinon.spy();
        const wrapper = mount(
            <AsynDownloadBtn downloadAction={downloadAction}/>
        );
        wrapper.find('.ant-btn').simulate('click');
        document.querySelector('.ant-btn-primary').click();
        expect(downloadAction).to.have.property('callCount', 1);
    });
});