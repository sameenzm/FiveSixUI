import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { TeamTypeRadio } from '../../../components';

describe('TeamTypeRadio', () => {
  // 基础测试
  it('Test prop: form', () => {
    const form = '小度驿站';

    const wrapper = mount(
      <TeamTypeRadio
        form = { form } />
    );
    expect(wrapper.find('.wl-crumb').find('span').at(0).text()).to.equal("当前位置：");
    expect(wrapper.find('[href="www.baidu.com"]').text()).to.equal("骑士管理");
  });
  it('Test prop: onChange', () => {
    const value = {
      form: '小度驿站'
    };

    const onDateChange = sinon.spy();
    const wrapper = shallow(
      <TeamTypeRadio
        onChange = { onDateChange }
        value = { value }
      />
    );
    expect(onDateChange).to.have.property('callCount', 1);
  });
  it('Test circle: init with value', () => {
    const value = {
      form: '小度驿站'
    };

    const onDateChange = sinon.spy();
    const wrapper = mount(
      <TeamTypeRadio
        onChange = { onDateChange }
        value = { value }
      />
    );
    expect(onDateChange).to.have.property('callCount', 1);
    expect(onDateChange.calledWith(value)).to.be.true;
  });
  it('Test circle: i nit without value', () => {
    const value = {
      form: object
    };

    const onDateChange = sinon.spy();
    const wrapper = mount(
      <TeamTypeRadio
        onChange = { onDateChange }
      />
    );
    expect(onDateChange).to.have.property('callCount', 1);
    expect(onDateChange.calledWith(value)).to.be.true;
  });
});