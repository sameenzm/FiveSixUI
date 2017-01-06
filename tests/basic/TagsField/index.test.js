import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { TagsField } from '../../../components';

describe('TagsField', () => {
    it('Test Example: props', () => {
        const onClickTag = sinon.spy();
        const onCloseTag = sinon.spy();
        const wrapper = shallow(
                <TagsField 
                    tags={[{value: 'lxl', label: '李小璐'},{value: 'bbh',label: '白百合'}]} 
                    onClickTag={onClickTag} 
                    onCloseTag={onCloseTag} 
                    selected={'lxl'}
                ></TagsField>
        );
        // 第一个tag
        expect(wrapper.find('Tag').at(0).prop('value')).to.eql('lxl');
        expect(wrapper.find('Tag').at(0).prop('selected')).to.be.true;
        expect(wrapper.find('Tag').at(0).prop('onClick')).to.eql(onClickTag);
        expect(wrapper.find('Tag').at(0).prop('onClose')).to.eql(onCloseTag);
        // 第二个tag
        expect(wrapper.find('Tag').at(1).prop('value')).to.eql('bbh');
        expect(wrapper.find('Tag').at(1).prop('selected')).to.be.false;
        expect(wrapper.find('Tag').at(1).prop('onClick')).to.eql(onClickTag);
        expect(wrapper.find('Tag').at(1).prop('onClose')).to.eql(onCloseTag);  
    });
});