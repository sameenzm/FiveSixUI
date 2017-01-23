import React from 'react';
import { shallow, mount } from 'enzyme';

import UserPassWordInput from '../../../components/business/UserPassWordInput';

describe('UserPassWorldInput', () => {
    it('Test props: value', () => {
        const wrapper = mount(
            <UserPassWordInput value='123456'/>
        );
        expect(wrapper.find('.ant-input').prop('value')).to.eql('123456');
    });
    it('Test disabled', () => {
        const wrapper = mount(
            <UserPassWordInput disabled={true}/>
        );
        expect(wrapper.find('.ant-input').prop('disabled')).to.eql(true);
    });
    it('Test prop: onChange', () => {
        const handleChange = sinon.spy();
        const wrapper = mount(
            <UserPassWordInput onChange={handleChange}/>
        );
        wrapper.find('.ant-input').simulate('change');
        expect(handleChange).to.have.property('callCount', 1);
    });
});