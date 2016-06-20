/**
 * Tag Component for uxcore
 * @author peijie.dpj
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var React = require('react');
var ReactDom = require('react-dom');
var classnames = require('classnames');

var TagItem = require('./Item');

var Lang = require('./i18n');

var KEYCODE_ENTER = 13;

var Tag = function (_React$Component) {
  _inherits(Tag, _React$Component);

  function Tag(props) {
    _classCallCheck(this, Tag);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      showInput: false,
      inputValue: '',
      animationTag: ''
    };

    _this.lang = Lang[props.locale.toLowerCase()];
    return _this;
  }

  Tag.prototype.onAdd = function onAdd() {
    var me = this,
        props = me.props,
        lang = me.lang;

    var value = me.trim(me.state.inputValue);

    props.onAdd(value);

    me.setState({
      inputValue: ''
    });
  };

  Tag.prototype.trim = function trim() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    return text.replace(/(^\s*)|(\s*$)/g, "");
  };

  Tag.prototype.onInputChange = function onInputChange(e) {
    var me = this;
    var value = e.target.value;

    me.setState({
      inputValue: value
    });
  };

  Tag.prototype.onInputKeyDown = function onInputKeyDown(e) {
    var me = this;

    if (e.keyCode == KEYCODE_ENTER) {
      me.onAdd();
    }
  };

  Tag.prototype.onInputBlur = function onInputBlur() {
    var me = this;

    me.setState({
      showInput: false
    });
  };

  Tag.prototype.onClickAddButton = function onClickAddButton() {
    var me = this;

    me.setState({
      showInput: true
    }, function () {
      me.refs.input.focus();
    });
  };

  Tag.prototype.render = function render() {

    var me = this,
        props = me.props,
        lang = me.lang,
        data = me.state.data;

    return React.createElement(
      'ul',
      { className: classnames("uxcore-tag", _defineProperty({}, props.className, !!props.className)) },
      props.children,
      props.addTags ? me.state.showInput ? React.createElement(
        'li',
        { className: 'uxcore-tag-add-input' },
        React.createElement('input', { ref: 'input', className: 'kuma-input', placeholder: lang.inputPlaceholder,
          onChange: me.onInputChange.bind(me),
          onBlur: me.onInputBlur.bind(me),
          onKeyDown: me.onInputKeyDown.bind(me),
          value: me.state.inputValue }),
        React.createElement(
          'span',
          { className: 'uxcore-tag-add-input-submit', onMouseDown: me.onAdd.bind(me) },
          React.createElement('i', {
            className: 'kuma-icon kuma-icon-choose' })
        )
      ) : React.createElement(
        'li',
        { className: 'uxcore-tag-add', onClick: me.onClickAddButton.bind(me) },
        React.createElement('i', { className: 'kuma-icon kuma-icon-add' })
      ) : ''
    );
  };

  return Tag;
}(React.Component);

Tag.defaultProps = {
  className: '', //
  addTags: true, // 是否可以新增标签
  onAdd: function onAdd() {}, // 添加标签回调
  locale: 'zh-cn' // 多语言，可选en-us
};

// http://facebook.github.io/react/docs/reusable-components.html
Tag.propTypes = {
  className: React.PropTypes.string,
  addTags: React.PropTypes.bool,
  onAdd: React.PropTypes.func,
  locale: React.PropTypes.string
};

Tag.displayName = "Tag";
Tag.Item = TagItem;

module.exports = Tag;