/**
 * Tag Component for uxcore
 * @author peijie.dpj
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */


const React = require('react');
const classnames = require('classnames');
const Icon = require('uxcore-icon');

const TagItem = require('./Item');
const Lang = require('./i18n');

const KEYCODE_ENTER = 13;

const trim = (text = '') => text.replace(/(^\s*)|(\s*$)/g, '');

// 用于判断blur的时候点击的是不是提交输入框按钮
// 如果是输入框按钮，并且onAdd返回了true，那么不会收起输入框
let isClickSubmit = false;

class Tag extends React.Component {

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

    const keepOpen = props.onAdd(value);

    if (keepOpen) {
      me.input.focus();
      isClickSubmit = true;

      window.setTimeout(() => {
        isClickSubmit = false;
      }, 100);
    } else {
      me.setState({
        inputValue: '',
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

    window.setTimeout(() => {
      if (!isClickSubmit) {
        me.setState({
          showInput: false,
        });
      }
    }, 33);
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
  className: React.PropTypes.string,
  addTags: React.PropTypes.bool,
  onAdd: React.PropTypes.func,
  locale: React.PropTypes.string,
};

Tag.displayName = 'Tag';
Tag.Item = TagItem;

module.exports = Tag;
