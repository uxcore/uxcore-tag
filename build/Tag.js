/**
 * Tag Component for uxcore
 * @author peijie.dpj
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDom = require('react-dom');
var classnames = require('classnames');

var Dialog = require('uxcore-dialog');
var Tooltip = require('uxcore-tooltip');
var Popover = require('uxcore-popover');
var Message = require('uxcore-message');

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
      data: props.data,
      animationTag: '',
      dialogVisible: false
    };

    _this.lang = Lang[props.locale.toLowerCase()];
    return _this;
  }

  Tag.prototype._renderLiked = function _renderLiked(nums) {
    var me = this,
        props = me.props;

    if (nums > props.maxDisplayLiked) {
      return props.maxDisplayLiked + '+';
    } else {
      return nums;
    }
  };

  Tag.prototype.onClickTag = function onClickTag(tag) {
    var me = this,
        props = me.props;

    props.onClickTag(tag);
  };

  Tag.prototype.onAdd = function onAdd() {
    var me = this,
        props = me.props,
        lang = me.lang;

    var value = me.trim(me.state.inputValue);

    if (!value) {
      Message.info(lang.inputEmpty);
      return;
    } else if (value.length > 15) {
      Message.info(lang.inputMax);
      return;
    } else {

      // 判断重复标签
      var duplicate = me.state.data.some(function (item) {
        return item.tag == value;
      });

      if (duplicate) {
        Message.info(lang.inputDuplicate);
        return;
      } else {
        //console.log(value, value.length, duplicate)

        props.onAdd(value, function () {
          var data = me.state.data;

          data.push({
            tag: value,
            liked: 0,
            hasLiked: false,
            createByMe: true,
            createByOwner: props.mode == 'delete'
          });

          me.setState({
            data: data,
            inputValue: '',
            showInput: false
          });
        }, function () {});
      }
    }
  };

  Tag.prototype.onLike = function onLike(tag, index) {
    var me = this,
        props = me.props,
        data = me.state.data;

    // 无法赞赞过的和自己创建的
    if (data[index].hasLiked || data[index].createByMe) {
      return;
    }

    props.onLike(tag, function () {
      data[index].hasLiked = true;
      data[index].liked = data[index].liked + 1;

      me.setState({
        animationTag: tag,
        data: data
      });
    }, function () {});
  };

  Tag.prototype.trim = function trim() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    return text.replace(/(^\s*)|(\s*$)/g, "");
  };

  Tag.prototype.onDelete = function onDelete(tag, cb) {
    var me = this,
        props = me.props;

    cb();

    props.onDelete(tag, function () {
      me.removeTag(tag);
    }, function () {});
  };

  Tag.prototype.removeTag = function removeTag(tag) {
    var me = this;

    var data = me.state.data;

    data = data.filter(function (item) {
      return item.tag != tag;
    });

    me.setState({
      data: data
    });
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

  Tag.prototype.onMore = function onMore() {
    var me = this;

    me.setState({
      dialogVisible: true
    });
  };

  Tag.prototype.onDialogOk = function onDialogOk() {
    var me = this;

    me.setState({
      dialogVisible: false
    });
  };

  Tag.prototype.onInputBlur = function onInputBlur() {
    var me = this;

    me.setState({
      showInput: false
    });
  };

  Tag.prototype.onDialogCancel = function onDialogCancel() {
    var me = this;

    me.setState({
      dialogVisible: false
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

  Tag.prototype.renderTagList = function renderTagList(isDialog) {
    var _classnames;

    var me = this,
        props = me.props,
        lang = me.lang,
        data = me.state.data;

    var deleteOverlay = React.createElement(
      'div',
      { className: 'uxcore-tag-popup-delete' },
      React.createElement('i', { className: 'kuma-icon kuma-icon-caution' }),
      React.createElement(
        'span',
        null,
        lang.confirmDelete
      )
    );

    return React.createElement(
      'ul',
      { className: classnames("uxcore-tag", (_classnames = {}, _classnames[props.className] = !!props.className, _classnames)) },
      data.map(function (item, index) {
        var _classnames2, _classnames3;

        var res = void 0;

        if (!isDialog && index >= props.maxTags) {
          return;
        }

        switch (props.mode) {
          case 'like':
            res = React.createElement(
              'li',
              { key: "uxcore-tag-item-" + index + "-" + item.tag, className: classnames("uxcore-tag-item", (_classnames2 = {}, _classnames2[props.mode] = true, _classnames2['create-by-owner'] = item.createByOwner, _classnames2)) },
              React.createElement(
                'span',
                { className: 'uxcore-tag-item-tag', title: item.tag,
                  onClick: me.onClickTag.bind(me, item.tag) },
                item.tag
              ),
              React.createElement(
                'span',
                { className: classnames({
                    'can-like': !item.hasLiked && !item.createByMe,
                    'is-zero': item.liked == 0,
                    'create-by-me': item.createByMe
                  }) },
                React.createElement(
                  'span',
                  { className: classnames("uxcore-tag-item-liked", {
                      'liked-max': item.liked > props.maxDisplayLiked
                    }), title: item.liked },
                  me._renderLiked(item.liked)
                ),
                React.createElement(
                  'span',
                  { className: 'uxcore-tag-item-add-like', onClick: me.onLike.bind(me, item.tag, index) },
                  React.createElement('i', {
                    className: 'kuma-icon kuma-icon-add' })
                ),
                React.createElement(
                  'span',
                  { className: classnames("uxcore-tag-item-add-animation", {
                      show: me.state.animationTag == item.tag
                    }) },
                  '+1'
                )
              )
            );
            break;

          case 'delete':
            var tooltipStyle = { display: 'none' };
            var tooltipOverlay = React.createElement('p', null),
                render = [];

            try {
              // 赞为0只有其他人单独创建的一个标签有显示
              if (item.liked == 0 && !item.createByMe) {
                render.push(React.createElement(
                  'a',
                  { href: 'https://work.alibaba-inc.com/work/u/' + item.likeList.workNo,
                    target: '_blank' },
                  item.likeList.name
                ));
                render.push(React.createElement(
                  'span',
                  null,
                  lang.describeYou
                ));
              } else if (item.liked == 1) {
                render.push(React.createElement(
                  'a',
                  { href: 'https://work.alibaba-inc.com/work/u/' + item.likeList.workNo,
                    target: '_blank' },
                  item.likeList.name
                ));
                render.push(React.createElement(
                  'span',
                  null,
                  lang.descriptionLikeYou
                ));
              } else if (item.liked > 1) {
                render.push(React.createElement(
                  'a',
                  { href: 'https://work.alibaba-inc.com/work/u/' + item.likeList.workNo,
                    target: '_blank' },
                  item.likeList.name
                ));
                render.push(React.createElement(
                  'span',
                  null,
                  lang.descriptionEt
                ));
                render.push(React.createElement(
                  'span',
                  { className: 'uxcore-tag-item-tooltip-like-numbers' },
                  item.liked
                ));
                render.push(React.createElement(
                  'span',
                  null,
                  lang.descriptionLiked
                ));
              }

              if (render && render.length > 0) {
                tooltipOverlay = React.createElement(
                  'p',
                  null,
                  render
                );
                tooltipStyle = {};
              }
            } catch (e) {
              console.log('tag: ', e);
            }

            res = React.createElement(
              'li',
              { key: "uxcore-tag-item-" + index + "-" + item.tag, className: classnames("uxcore-tag-item", (_classnames3 = {}, _classnames3[props.mode] = true, _classnames3['can-delete'] = true, _classnames3['create-by-owner'] = item.createByOwner, _classnames3)) },
              React.createElement(
                Tooltip,
                { placement: 'bottom', key: "uxcore-tag-item-" + index + "-" + item.tag + "-tooltip",
                  overlay: tooltipOverlay, overlayStyle: tooltipStyle },
                React.createElement(
                  'span',
                  { key: "uxcore-tag-item-" + index + "-" + item.tag + '-tag',
                    className: 'uxcore-tag-item-tag',
                    onClick: me.onClickTag.bind(me, item.tag) },
                  item.tag
                )
              ),
              React.createElement(
                'span',
                { key: "uxcore-tag-item-" + index + "-" + item.tag + '-liked',
                  title: item.liked,
                  className: classnames("uxcore-tag-item-liked", {
                    'liked-max': item.liked > props.maxDisplayLiked,
                    'is-zero': item.liked == 0
                  }) },
                me._renderLiked(item.liked)
              ),
              React.createElement(
                Popover,
                { key: "uxcore-tag-item-" + index + "-" + item.tag + '-popover',
                  overlay: deleteOverlay, placement: 'top', trigger: 'click', showButton: true,
                  onOk: me.onDelete.bind(me, item.tag), okText: lang.deleteOkText,
                  cancelText: lang.deleteCancelText },
                React.createElement(
                  'span',
                  { className: 'uxcore-tag-item-delete' },
                  React.createElement('i', { className: 'kuma-icon kuma-icon-close' })
                )
              )
            );

            break;
        }

        return res;
      }),
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
      ) : '',
      data.length > props.maxTags && !isDialog ? React.createElement(
        'li',
        { className: 'uxcore-tag-more' },
        React.createElement(
          'a',
          { href: 'javascript:void(0)', onClick: me.onMore.bind(me) },
          lang.more
        )
      ) : ''
    );
  };

  Tag.prototype.render = function render() {

    var me = this,
        props = me.props,
        lang = me.lang,
        data = me.state.data;

    return React.createElement(
      'div',
      null,
      me.renderTagList(false),
      React.createElement(
        Dialog,
        { visible: me.state.dialogVisible,
          onOk: me.onDialogOk.bind(me),
          title: lang.title,
          onCancel: me.onDialogCancel.bind(me) },
        React.createElement(
          'h3',
          { className: 'uxcore-tag-dialog-count' },
          lang.tagsCount + data.length + lang.unit
        ),
        me.renderTagList(true)
      )
    );
  };

  return Tag;
}(React.Component);

Tag.defaultProps = {
  data: [],
  className: '',
  mode: 'like',
  addTags: true,
  maxTags: 20,
  maxDisplayLiked: 99,
  onClickTag: function onClickTag() {},
  onAdd: function onAdd() {},
  onLike: function onLike() {},
  onDelete: function onDelete() {},

  locale: 'zh-cn'
};

// http://facebook.github.io/react/docs/reusable-components.html
Tag.propTypes = {
  data: React.PropTypes.array, // 数据
  className: React.PropTypes.string, //
  mode: React.PropTypes.oneOf(['delete', 'like']), // 这里delete一般为自己看；like为其他人看
  addTags: React.PropTypes.bool, // 是否可以添加标签
  maxTags: React.PropTypes.number, // 不展开的情况下显示最多的标签数
  maxDisplayLiked: React.PropTypes.number, // 单个标签显示的最多赞数
  onClickTag: React.PropTypes.func, // 点击标签回调
  onAdd: React.PropTypes.func, // 添加标签回调
  onLike: React.PropTypes.func, // 点赞回调
  onDelete: React.PropTypes.func, // 删除标签回调

  locale: React.PropTypes.oneOf(['zh-cn', 'en'])
};

Tag.displayName = "Tag";

module.exports = Tag;