/**
 * Tag Component for uxcore
 * @author peijie.dpj
 *
 * Copyright 2015-2017, Uxcore Team, Alinw.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'uxcore-icon';

import TagItem from './Item';
import Lang from './i18n';

const KEYCODE_ENTER = 13;

const trim = (text = '') => text.replace(/(^\s*)|(\s*$)/g, '');

// 用于判断blur的时候点击的是不是提交输入框按钮
// 如果是输入框按钮，并且onAdd返回了true，那么不会收起输入框
let isClickSubmit = false;

export default class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      inputValue: '',
      animationTag: '',
    };
  }

  onAdd() {
    const me = this;
    const props = me.props;
    const value = trim(me.state.inputValue);

    if (props.onAdd.length <= 1) {
      // 兼容之前的逻辑
      props.onAdd(value);
      me.setState({
        inputValue: '',
      });
    } else {
      // 如果传入两个参数，视为第二个参数为必须回调的参数
      // 返回true时不会收起输入框不会清空输入框
      props.onAdd(value, (keepOpen) => {
        if (keepOpen) {
          me.input.focus();
          isClickSubmit = true;

          setTimeout(() => {
            isClickSubmit = false;
          }, 100);
        } else {
          me.setState({
            inputValue: '',
          });
        }
      });
    }
  }

  onInputChange(e) {
    const me = this;
    const value = e.target.value;

    me.setState({
      inputValue: value,
    });
  }

  onInputKeyDown(e) {
    const me = this;

    if (e.keyCode === KEYCODE_ENTER) {
      me.onAdd();
    }
  }

  onInputBlur() {
    const me = this;

    setTimeout(() => {
      if (!isClickSubmit) {
        me.setState({
          showInput: false,
        });
      }
    }, 16);
  }


  onClickAddButton() {
    const me = this;

    me.setState({
      showInput: true,
    }, () => {
      me.input.focus();
    });
  }

  saveRef(refName) {
    const me = this;
    return (c) => {
      me[refName] = c;
    };
  }

  renderAddTag() {
    const me = this;
    const { addTags, locale } = me.props;
    const lang = Lang[locale.toLowerCase()];
    if (!addTags) {
      return null;
    }
    if (me.state.showInput) {
      return (
        <li className="uxcore-tag-add-input">
          <input
            ref={me.saveRef('input')}
            className="kuma-input"
            placeholder={lang.inputPlaceholder}
            onChange={(e) => { me.onInputChange(e); }}
            onBlur={() => { me.onInputBlur(); }}
            onKeyDown={(e) => { me.onInputKeyDown(e); }}
            value={me.state.inputValue}
          />
          <span className="uxcore-tag-add-input-submit" onMouseDown={() => { me.onAdd(); }}>
            <Icon name="biaoqianxuanze-duoxuan-gou" />
          </span>
        </li>
      );
    }
    return (
      <li className="uxcore-tag-add" onClick={() => { me.onClickAddButton(); }}>
        <i className="kuma-icon kuma-icon-add" />
      </li>
    );
  }


  render() {
    const me = this;
    const props = me.props;
    return (
      <ul
        className={classnames('uxcore-tag', {
          [props.className]: !!props.className,
        })}
      >
        {props.children}
        {me.renderAddTag()}
      </ul>
    );
  }
}

Tag.defaultProps = {
  className: '',      //
  addTags: true,      // 是否可以新增标签
  onAdd: () => { },    // 添加标签回调
  locale: 'zh-cn',     // 多语言，可选en-us
};


// http://facebook.github.io/react/docs/reusable-components.html
Tag.propTypes = {
  className: PropTypes.string,
  addTags: PropTypes.bool,
  onAdd: PropTypes.func,
  locale: PropTypes.string,
};

Tag.displayName = 'Tag';

Tag.Item = TagItem;
