/**
 * TagItem Component for uxcore
 * @author peijie.dpj
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

"use strict";

const React = require('react');
const ReactDom = require('react-dom');
const classnames = require('classnames');
const Popover = require('uxcore-popover');

const Lang = require('./i18n');

class TagItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      animationTag: ''
    }

    this.lang = Lang[props.locale];

  }

  componentWillReceiveProps(nextProps) {
    let me = this,
      props = me.props;

    if (nextProps.count == props.count + 1) {
      me.setState({
        animationTag: props.tag
      })
    }
  }


  onClick(tag) {
    let me = this,
      props = me.props;

    props.onClick(tag);
  }

  onAddCount(tag) {
    let me = this,
      props = me.props;

    props.onAddCount(tag);
  }

  onDelete(tag, cb) {
    let me = this,
      props = me.props;

    props.onDelete(tag, cb);
  }

  _renderCount(num) {
    let me = this,
      props = me.props;
    
    if (num > props.maxDisplayCount) {
      return props.maxDisplayCount + '+';
    } else {
      return num;
    }
  }

  

  render() {

    let me = this,
      props = me.props,
      lang = me.lang;

    let deleteOverlay;  

    if (props.confirmDeleteText) {
      deleteOverlay = <div className="uxcore-tag-popup-delete">
        <i className="kuma-icon kuma-icon-caution"></i>
        <span>{props.confirmDeleteText}</span>
      </div>;
    }

      return <li 
        key={props.key}
        className={classnames("uxcore-tag-item", {
        [props.className]: !!props.className,
        'can-delete': props.canDelete
      })}>
      <span className="uxcore-tag-item-tag" onClick={me.onClick.bind(me, props.tag)}>{props.children}</span>
      <span className={classnames("uxcore-tag-item-option", {
        'can-add-count': props.canAddCount,
        'is-zero': props.count == 0
      })}>
        <span className={classnames("uxcore-tag-item-count", {
          'max-count': props.count > props.maxDisplayCount
        })}>{me._renderCount(props.count)}</span>
        <span className="uxcore-tag-item-add-count" onClick={me.onAddCount.bind(me, props.tag)}><i className="kuma-icon kuma-icon-add"></i></span>
        <span className={classnames("uxcore-tag-item-add-animation", {
            show: me.state.animationTag == props.tag
        })}>+1</span>
        {props.confirmDeleteText ? <Popover
            overlay={deleteOverlay} 
            placement="top" 
            trigger="click" 
            showButton={true} 
            onOk={me.onDelete.bind(me, props.tag)}
            okText={lang.deleteOkText}
            cancelText={lang.deleteCancelText}>
            <span className="uxcore-tag-item-delete"><i className="kuma-icon kuma-icon-close"></i></span>

          </Popover> : <span 
            className="uxcore-tag-item-delete" 
            onClick={me.onDelete.bind(me, props.tag)}><i className="kuma-icon kuma-icon-close"></i>
          </span>}
        
      </span>
      </li>

  }
}

TagItem.defaultProps = {
  className: '',
  count: 0,                   // 标签后面的数字
  canAddCount: false,         // 是否可以增加数字
  canDelete: false,           // 是否可以删除标签
  onClick: () => {},          // 点标签回调
  maxDisplayCount: 99,        // 最大显示数字
  onAddCount: () => {},       // 点击增加数字的加号回调
  onDelete: () => {},         // 点击删除icon回调 注意手动调用cb，否则弹窗不会消失
  confirmDeleteText: '',      // 确认删除文案，如果不填则直接触发onDelete回调
  locale: 'zh-cn'
}


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
}

TagItem.displayName = "TagItem";

module.exports = TagItem;
