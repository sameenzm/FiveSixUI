import React from 'react';
import { shallow, mount } from 'enzyme';
import TeamTypeRadio from '../../../components/business/TeamTypeRadio';
import { beforeEach, describe, it } from 'mocha';


describe('TeamTypeRadio', () => {
    it('Test prop: onChange', () => {
        let value = 0;
        function onChange(e) {
          value = e.target.value;
        }
        const wrapper = mount(
            <TeamTypeRadio onChange={onChange} />
        );
        wrapper.find('.ant-radio-button-input').at(0).simulate('change',{ target: { checked: true } });
        expect(value).to.eql(0);
        wrapper.find('.ant-radio-button-input').at(1).simulate('change',{ target: { checked: true } });
        expect(value).to.eql(1);
        wrapper.find('.ant-radio-button-input').at(2).simulate('change',{ target: { checked: true } });
        expect(value).to.eql(2);
    });
});