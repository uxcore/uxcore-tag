/**
 * Tag Component for uxcore
 * @author peijie.dpj
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

"use strict";

const React = require('react');
const ReactDom = require('react-dom');
const classnames = require('classnames');

const TagItem = require('./Item'); 

const Lang = require('./i18n');

const KEYCODE_ENTER = 13;

class Tag extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
      inputValue: '',
      animationTag: ''
    }

    this.lang = Lang[props.locale.toLowerCase()];
  }

  onAdd() {
    let me = this,
      props = me.props,
      lang = me.lang;

    const value = me.trim(me.state.inputValue);

    props.onAdd(value);

    me.setState({
      inputValue: ''
    })
  }



  trim(text = '') {
    return text.replace(/(^\s*)|(\s*$)/g, "");
  }

  onInputChange(e) {
    let me = this;
    const value = e.target.value;

    me.setState({
      inputValue: value
    });
  }

  onInputKeyDown(e) {
    let me = this;

    if (e.keyCode == KEYCODE_ENTER) {
      me.onAdd();
    }
  }

  onInputBlur() {
    let me = this;

    me.setState({
      showInput: false
    })
  }



  onClickAddButton() {
    let me = this;

    me.setState({
      showInput: true
    }, () => {
      me.refs.input.focus();
    })
  }


  render() {

    let me = this,
      props = me.props,
      lang = me.lang,
      data = me.state.data;

    return <ul className={classnames("uxcore-tag", {
      [props.className] : !!props.className
    })}>
      {props.children}
      {props.addTags ? (
        me.state.showInput ? <li className="uxcore-tag-add-input">
          <input ref="input" className="kuma-input" placeholder={lang.inputPlaceholder}
                 onChange={me.onInputChange.bind(me)}
                 onBlur={me.onInputBlur.bind(me)}
                 onKeyDown={me.onInputKeyDown.bind(me)}
                 value={me.state.inputValue}/>
            <span className="uxcore-tag-add-input-submit" onMouseDown={me.onAdd.bind(me)}><i
              className="kuma-icon kuma-icon-choose"></i></span>
        </li> : <li className="uxcore-tag-add" onClick={me.onClickAddButton.bind(me)}>
          <i className="kuma-icon kuma-icon-add"></i>
        </li>) : ''}
    </ul>

  }
}

Tag.defaultProps = {
  className: '',      //
  addTags: true,      // 是否可以新增标签
  onAdd: () => {},    // 添加标签回调
  locale: 'zh-cn'     // 多语言，可选en-us
}


// http://facebook.github.io/react/docs/reusable-components.html
Tag.propTypes = {
  className: React.PropTypes.string,
  addTags: React.PropTypes.bool,
  onAdd: React.PropTypes.func,
  locale: React.PropTypes.string
}

Tag.displayName = "Tag";
Tag.Item = TagItem;

module.exports = Tag;
