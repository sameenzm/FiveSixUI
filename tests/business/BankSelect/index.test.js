import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { mount } from 'enzyme';

import { BankSelect } from '../../../components';

describe('BankSelect', () => {
	it('Test props: value', () => {
		const wrapper = mount(
			<BankSelect value='招商银行'/>
		);
		expect(wrapper.find('.ant-select-selection-selected-value').prop('title')).to.eql('招商银行');
	});
	it('Test disabled', () => {
		const wrapper = mount(
			<BankSelect disabled/>
		);
		expect(wrapper.find('.ant-select').hasClass('ant-select-disabled')).to.equal(true);
	});
	it('Test prop: onChange', () => {
		let value = '招商银行';
		const onChange = val => (value = val);
		const wrapper = mount(
			<BankSelect {...{value, onChange}}/>
		);
		expect(wrapper.find('.ant-select-selection-selected-value').text()).to.eql("招商银行");
		wrapper.ref('select').simulate('click');
		document.querySelectorAll('.wl-bank-select-dropdown li')[1].click();
		setTimeout(() => {
			expect(value).to.eql("中国工商银行");
		}, 0);
	});
});