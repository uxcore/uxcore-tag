/**
 * TagItem Component for uxcore
 * @author peijie.dpj
 *
 * Copyright 2015-2017, Uxcore Team, Alinw.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Popover from 'uxcore-popover';
import Icon from 'uxcore-icon';

import Lang from './i18n';

export default class TagItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animationTag: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const me = this;
    const props = me.props;

    if (nextProps.count === props.count + 1) {
      me.setState({
        animationTag: props.tag,
      });
    }
  }


  onClick(tag) {
    const me = this;
    const props = me.props;

    props.onClick(tag);
  }

  onAddCount(tag) {
    const me = this;
    const props = me.props;

    props.onAddCount(tag);
  }

  onDelete(tag, cb = () => { }) {
    const me = this;
    const props = me.props;

    props.onDelete(tag, cb);
  }

  renderCount(num) {
    const me = this;
    const props = me.props;

    if (num > props.maxDisplayCount) {
      return `${props.maxDisplayCount}+`;
    }
    return num;
  }


  render() {
    const me = this;
    const props = me.props;
    const {
      prefixCls,
      locale,
      type,
      className,
      canDelete,
      tag, children,
      canAddCount,
      count,
      maxDisplayCount,
      confirmDeleteText,
    } = props;
    const lang = Lang[locale];

    let deleteOverlay;

    if (props.confirmDeleteText) {
      deleteOverlay = (
        <div className="uxcore-tag-popup-delete">
          <i className="kuma-icon kuma-icon-caution" />
          <span>{props.confirmDeleteText}</span>
        </div>
      );
    }

    return (
      <li
        className={classnames(prefixCls, {
          [className]: !!className,
          'can-delete': canDelete,
          [`${prefixCls}-show`]: !!type,
          [`${prefixCls}-${type}`]: !!type,
        })}
      >
        <span
          className={`${prefixCls}-tag`}
          onClick={me.onClick.bind(me, tag)}
        >{children}</span>
        <span
          className={classnames(`${prefixCls}-option`, {
            'can-add-count': canAddCount,
            'is-zero': count === 0,
          })}
        >
          <span
            className={classnames(`${prefixCls}-count`, {
              'max-count': count > maxDisplayCount,
            })}
          >{me.renderCount(count)}</span>
          <span
            className={`${prefixCls}-add-count`}
            onClick={me.onAddCount.bind(me, tag)}
          >
            <Icon name="shoucang" />
          </span>
          <span
            className={classnames(`${prefixCls}-add-animation`, {
              show: me.state.animationTag === tag,
            })}
          >+1</span>
        </span>
        {confirmDeleteText ?
          (
            <Popover
              overlay={deleteOverlay}
              placement="top"
              trigger="click"
              showButton
              onOk={(hideCallback) => { me.onDelete(tag, hideCallback); }}
              okText={lang.deleteOkText}
              cancelText={lang.deleteCancelText}
            >
              <Icon name={(type && canDelete) ? 'biaoqian-qingchu' : 'biaodanlei-tongyongqingchu'} />
            </Popover>
          ) : (
            <Icon name={(type && canDelete) ? 'biaoqian-qingchu' : 'biaodanlei-tongyongqingchu'} onClick={() => { me.onDelete(tag); }} />
          )
        }
      </li>
    );
  }
}

TagItem.defaultProps = {
  prefixCls: 'uxcore-tag-item',
  className: '',
  count: 0,                   // 标签后面的数字
  canAddCount: false,         // 是否可以增加数字
  canDelete: false,           // 是否可以删除标签
  onClick: () => { },          // 点标签回调
  maxDisplayCount: 99,        // 最大显示数字
  onAddCount: () => { },       // 点击增加数字的加号回调
  onDelete: () => { },         // 点击删除icon回调 注意手动调用cb，否则弹窗不会消失
  confirmDeleteText: '',      // 确认删除文案，如果不填则直接触发onDelete回调
  locale: 'zh-cn',
};


// http://facebook.github.io/react/docs/reusable-components.html
TagItem.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['show', 'success', 'danger', 'info', 'warning']),
  tag: PropTypes.string,
  count: PropTypes.number,
  canAddCount: PropTypes.bool,
  canDelete: PropTypes.bool,
  onClick: PropTypes.func,
  maxDisplayCount: PropTypes.number,
  onAddCount: PropTypes.func,
  onDelete: PropTypes.func,
  confirmDeleteText: PropTypes.string,
  locale: PropTypes.string,
};

TagItem.displayName = 'TagItem';
