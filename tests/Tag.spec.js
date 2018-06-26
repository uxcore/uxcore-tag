import expect from 'expect.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tag from '../src';
import i18n from '../src/i18n';
const TagItem = Tag.Item;

Enzyme.configure({ adapter: new Adapter() });

describe('Tag', () => {
	it('render correct', () => {
		mount(<Tag />);
	})
});

describe('Tag Props', () => {
	it('className support', () => {
		const wrapper = mount(<Tag className="test" />);
		expect(wrapper.hasClass('test'));
	});

	it('addTag support', () => {
		const wrapper1 = mount(<Tag />);
		const wrapper2 = mount(<Tag addTags={false} />);

		// addTag 正常渲染
		expect(wrapper1.find('.uxcore-tag-add')).to.have.length(1);
		expect(wrapper2.find('.uxcore-tag-add')).to.have.length(0);

		// 点击展开 输入框
		wrapper1.find('.uxcore-tag-add').simulate('click');
		expect(wrapper1.state().showInput).to.equal(true);
		expect(wrapper1.find('.uxcore-tag-add-input')).to.have.length(1);
	});

	it('onAdd with one argument support', () => {
		let wrapper;
		let tagNameVal;
		let addTime = 0;
		let submitButton;
		let addInput;
		const onAdd = function(tagName) {
			tagNameVal = tagName;
			addTime += 1;
		}

		// 点击出现
		wrapper = mount(<Tag onAdd={onAdd} />);
		wrapper.find('.uxcore-tag-add').simulate('click');
		submitButton = wrapper.find('.uxcore-tag-add-input-submit');
		addInput = wrapper.find('.uxcore-tag-add-input');
		expect(submitButton).to.have.length(1);

		// 设置内容
		wrapper.setState({
			inputValue: 'new Tag'
		});

		// 点击添加
		submitButton.simulate('mousedown');
		expect(tagNameVal).to.equal('new Tag');
		expect(addTime).to.equal(1);
	});

	it('onAdd with two arguments support', () => {
		const onAddTrue = function(tagName, cb) {
			cb(true);
		}
		const onAddFalse = function(tabName, cb) {
			cb(false);
		}

		const wrapperTrue = mount(<Tag onAdd={onAddTrue} />);
		const wrapperFalse = mount(<Tag onAdd={onAddFalse} />);

		wrapperTrue.setState({
			showInput: true,
			inputValue: 'new Tag',
		});
		wrapperTrue.find('.uxcore-tag-add-input-submit').simulate('mousedown');
		expect(wrapperTrue.state().inputValue).to.equal('new Tag');


		wrapperFalse.setState({
			showInput: true,
			inputValue: 'new Tag',
		});
		wrapperFalse.find('.uxcore-tag-add-input-submit').simulate('mousedown');
		expect(wrapperFalse.state().inputValue).to.equal('');
	});

	it('locale support', () => {
		const wrapperZh = mount(<Tag />);
		const wrapperEn = mount(<Tag locale="en-us" />);
		const wrapperPl = mount(<Tag locale="pl-pl" />);

		wrapperZh.setState({
			showInput: true,
		});

		wrapperEn.setState({
			showInput: true,
		});

		wrapperPl.setState({
			showInput: true,
		});

		expect(wrapperZh.find('.uxcore-tag-add-input > .kuma-input').getDOMNode().getAttribute('placeholder')).to.equal(i18n['zh-cn'].inputPlaceholder);
		expect(wrapperEn.find('.uxcore-tag-add-input > .kuma-input').getDOMNode().getAttribute('placeholder')).to.equal(i18n['en-us'].inputPlaceholder);
		expect(wrapperPl.find('.uxcore-tag-add-input > .kuma-input').getDOMNode().getAttribute('placeholder')).to.equal(i18n['pl-pl'].inputPlaceholder);
	});

	it('blur')
});

describe('Tag Input Events', () => {
	it('changeInputValue', () => {
		const wrapper = mount(<Tag />);
		wrapper.setState({
			showInput: true,
		});
		const input = wrapper.find('.uxcore-tag-add-input > .kuma-input');
		input.simulate('change', {
			target: {
				value: '1'
			}
		});
		expect(wrapper.state().inputValue).to.equal('1');
	});

	it('input enter', () => {
		let addTime = 0;
		let tagText = '';
		const wrapper = mount(<Tag onAdd={(tag) => {
			addTime += 1;
			tagText = tag;
		}} />);
		wrapper.setState({
			showInput: true,
			inputValue: 'new Tag',
		});
		const input = wrapper.find('.uxcore-tag-add-input > .kuma-input');
		input.simulate('keyDown', {
			keyCode: 13,
		});
		expect(addTime).to.be(1);
		expect(tagText).to.be('new Tag');
	});

	it('input blur', () => {
		const wrapper = mount(<Tag />);
		wrapper.setState({
			showInput: true,
		});
		const input = wrapper.find('.uxcore-tag-add-input > .kuma-input');
		input.simulate('blur');
		setTimeout(() => {
			expect(wrapper.state().showInput).to.be(false);
		}, 100);
	})
});

describe('TagItem', () => {
	it('render correct', () => {
		mount(<TagItem />);
	});
});

describe('TagItem props', () => {
	it('className support', () => {
		const wrapper = mount(<TagItem className="test" />);
		expect(wrapper.hasClass('test'));
	});

	it('type support', () => {
		['show', 'success', 'warning', 'info', 'danger'].forEach(type => {
			expect(
				mount(<TagItem type={type} />).hasClass(`uxcore-tag-item-${type}`)
			)
		})
	});

	it('count support', () => {
		[0, 20].forEach(count => {
			const wrapper = mount(<TagItem count={count} />);
			if (count === 0) {
				expect(wrapper.find('.uxcore-tag-item-option').hasClass('is-zero'));
			}
			expect(wrapper.find('.uxcore-tag-item-count').text()).to.equal(`${count}`);
		});
	});

	it('maxDisplayCount support', () => {
		expect(mount(<TagItem maxDisplayCount={10} count={100} />).find('.uxcore-tag-item-count').text()).to.equal('10+');
	});

	it('canDelete support', () => {
		expect(mount(<TagItem canDelete />).hasClass('can-delete'));
		expect(mount(<TagItem />).hasClass('can-delete')).to.be(false);
	});

	it('onClick support', () => {
		let clickedTag;
		const handleClickTag = (tag) => { clickedTag = tag; };
		const wrapper = mount(<TagItem onClick={handleClickTag} tag="TagItem">TagItem</TagItem>);
		wrapper.find('.uxcore-tag-item-tag').simulate('click');
		expect(clickedTag).to.be('TagItem');
	});

	it('onDelete support', () => {
		let deletedTag;
		const handleDeleteTag = (tag) => { deletedTag = tag; };
		const wrapper = mount(<TagItem onDelete={handleDeleteTag} tag="TagItem">TagItem</TagItem>);
		wrapper.find('.uxcore-icon.uxicon-biaodanlei-tongyongqingchu').simulate('click');
		expect(deletedTag).to.be('TagItem');
	});

	it('onDelete and confirmDeleteText support', () => {
		let deletedTag;
		const handleDeleteTag = (tag) => { deletedTag = tag; };
		const confirmDeleteText = '确认删除该Tag吗?';
		const wrapper = mount(<TagItem onDelete={handleDeleteTag} confirmDeleteText={confirmDeleteText} tag={TagItem}>TagItem</TagItem>);
		wrapper.find('.uxcore-icon.uxicon-biaodanlei-tongyongqingchu').simulate('click');
		expect(deletedTag).to.be(undefined);
		expect(document.querySelector('.uxcore-tag-popup-delete > span').innerText).to.be(confirmDeleteText);
	});

	it('onAddCount support', () => {
		let addTime = 0;
		let addTag;
		const handleAddCount = function(tag) {
			addTag = tag;
			addTime += 1;
		}
		const wrapper = mount(<TagItem tag="1" canAddCount onAddCount={handleAddCount}>TagItem</TagItem>);
		wrapper.find('.uxcore-tag-item-add-count').simulate('click');
		expect(addTime).to.be(1);
		expect(addTag).to.be('1');
	});

	it('propsChange count + 1', () => {
		const props = {tag: 'tag', count: 1}
		const handleAddCount = () => { props.count += 1; };
		const wrapper = mount(<TagItem canAddCount onAddCount={handleAddCount} {...props}></TagItem>);
		wrapper.find('.uxcore-tag-item-add-count').simulate('click');
		expect(props.count).to.be(2);

		wrapper.setProps(props);
		expect(wrapper.state().animationTag).to.be(props.tag);
	});
});