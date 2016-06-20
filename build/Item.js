/**
 * TagItem Component for uxcore
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
var Popover = require('uxcore-popover');

var Lang = require('./i18n');

var TagItem = function (_React$Component) {
  _inherits(TagItem, _React$Component);

  function TagItem(props) {
    _classCallCheck(this, TagItem);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      animationTag: ''
    };

    _this.lang = Lang[props.locale];

    return _this;
  }

  TagItem.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var me = this,
        props = me.props;

    if (nextProps.count == props.count + 1) {
      me.setState({
        animationTag: props.tag
      });
    }
  };

  TagItem.prototype.onClick = function onClick(tag) {
    var me = this,
        props = me.props;

    props.onClick(tag);
  };

  TagItem.prototype.onAddCount = function onAddCount(tag) {
    var me = this,
        props = me.props;

    props.onAddCount(tag);
  };

  TagItem.prototype.onDelete = function onDelete(tag, cb) {
    var me = this,
        props = me.props;

    props.onDelete(tag, cb);
  };

  TagItem.prototype._renderCount = function _renderCount(num) {
    var me = this,
        props = me.props;

    if (num > props.maxDisplayCount) {
      return props.maxDisplayCount + '+';
    } else {
      return num;
    }
  };

  TagItem.prototype.render = function render() {
    var _classnames;

    var me = this,
        props = me.props,
        lang = me.lang;

    var deleteOverlay = void 0;

    if (props.confirmDeleteText) {
      deleteOverlay = React.createElement(
        'div',
        { className: 'uxcore-tag-popup-delete' },
        React.createElement('i', { className: 'kuma-icon kuma-icon-caution' }),
        React.createElement(
          'span',
          null,
          props.confirmDeleteText
        )
      );
    }

    return React.createElement(
      'li',
      {
        key: props.key,
        className: classnames("uxcore-tag-item", (_classnames = {}, _defineProperty(_classnames, props.className, !!props.className), _defineProperty(_classnames, 'can-delete', props.canDelete), _classnames)) },
      React.createElement(
        'span',
        { className: 'uxcore-tag-item-tag', onClick: me.onClick.bind(me, props.tag) },
        props.children
      ),
      React.createElement(
        'span',
        { className: classnames("uxcore-tag-item-option", {
            'can-add-count': props.canAddCount,
            'is-zero': props.count == 0
          }) },
        React.createElement(
          'span',
          { className: classnames("uxcore-tag-item-count", {
              'max-count': props.count > props.maxDisplayCount
            }) },
          me._renderCount(props.count)
        ),
        React.createElement(
          'span',
          { className: 'uxcore-tag-item-add-count', onClick: me.onAddCount.bind(me, props.tag) },
          React.createElement('i', { className: 'kuma-icon kuma-icon-add' })
        ),
        React.createElement(
          'span',
          { className: classnames("uxcore-tag-item-add-animation", {
              show: me.state.animationTag == props.tag
            }) },
          '+1'
        ),
        props.confirmDeleteText ? React.createElement(
          Popover,
          {
            overlay: deleteOverlay,
            placement: 'top',
            trigger: 'click',
            showButton: true,
            onOk: me.onDelete.bind(me, props.tag),
            okText: lang.deleteOkText,
            cancelText: lang.deleteCancelText },
          React.createElement(
            'span',
            { className: 'uxcore-tag-item-delete' },
            React.createElement('i', { className: 'kuma-icon kuma-icon-close' })
          )
        ) : React.createElement(
          'span',
          {
            className: 'uxcore-tag-item-delete',
            onClick: me.onDelete.bind(me, props.tag) },
          React.createElement('i', { className: 'kuma-icon kuma-icon-close' })
        )
      )
    );
  };

  return TagItem;
}(React.Component);

TagItem.defaultProps = {
  className: '',
  count: 0, // 标签后面的数字
  canAddCount: false, // 是否可以增加数字
  canDelete: false, // 是否可以删除标签
  onClick: function onClick() {}, // 点标签回调
  maxDisplayCount: 99, // 最大显示数字
  onAddCount: function onAddCount() {}, // 点击增加数字的加号回调
  onDelete: function onDelete() {}, // 点击删除icon回调 注意手动调用cb，否则弹窗不会消失
  confirmDeleteText: '', // 确认删除文案，如果不填则直接触发onDelete回调
  locale: 'zh-cn'
};

// http://facebook.github.io/react/docs/reusable-components.html
TagItem.propTypes = {
  className: React.PropTypes.string,
  tag: React.PropTypes.string,
  count: React.PropTypes.number,
  canAddCount: React.PropTypes.bool,
  canDelete: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  maxDisplayCount: React.PropTypes.number,
  onAddCount: React.PropTypes.func,
  onDelete: React.PropTypes.func,
  confirmDeleteText: React.PropTypes.string,
  locale: React.PropTypes.string
};

TagItem.displayName = "TagItem";

module.exports = TagItem;