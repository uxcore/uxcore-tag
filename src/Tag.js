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

const Dialog = require('uxcore-dialog');
const Tooltip = require('uxcore-tooltip');
const Popover = require('uxcore-popover');
const Message = require('uxcore-message');

const Lang = require('./i18n');

const KEYCODE_ENTER = 13;

class Tag extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
      inputValue: '',
      data: props.data,
      animationTag: '',
      dialogVisible: false,
    }

    this.lang = Lang[props.locale.toLowerCase()];
  }

  _renderLiked(nums) {
    let me = this,
      props = me.props;

    if (nums > props.maxDisplayLiked) {
      return props.maxDisplayLiked + '+';
    } else {
      return nums;
    }

  }

  onClickTag(tag) {
    let me = this,
      props = me.props;

    props.onClickTag(tag);
  }

  onAdd() {
    let me = this,
      props = me.props,
      lang = me.lang;

    const value = me.trim(me.state.inputValue);

    if (!value) {
      Message.info(lang.inputEmpty);
      return;
    } else if (value.length > 15) {
      Message.info(lang.inputMax);
      return;
    } else {

      // 判断重复标签
      const duplicate = me.state.data.some(function (item) {
        return item.tag == value;

      });

      if (duplicate) {
        Message.info(lang.inputDuplicate);
        return;
      } else {
        //console.log(value, value.length, duplicate)

        props.onAdd(value, function () {
          let data = me.state.data;

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
          })
        }, function () {
        });
      }


    }


  }

  onLike(tag, index) {
    let me = this,
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
      })
    }, function () {
    });
  }

  trim(text = '') {
    return text.replace(/(^\s*)|(\s*$)/g, "");
  }

  onDelete(tag, cb) {
    let me = this,
      props = me.props;

    cb();

    props.onDelete(tag, function () {
      me.removeTag(tag);

    }, function () {
    });
  }

  removeTag(tag) {
    let me = this;

    let data = me.state.data;

    data = data.filter(function (item) {
      return item.tag != tag
    });

    me.setState({
      data: data
    })
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

  onMore() {
    let me = this;

    me.setState({
      dialogVisible: true
    })
  }

  onDialogOk() {
    let me = this;

    me.setState({
      dialogVisible: false
    })
  }

  onInputBlur() {
    let me = this;

    me.setState({
      showInput: false
    })
  }

  onDialogCancel() {
    let me = this;

    me.setState({
      dialogVisible: false
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

  renderTagList(isDialog) {
    let me = this,
      props = me.props,
      lang = me.lang,
      data = me.state.data;

    const deleteOverlay = <div className="uxcore-tag-popup-delete">
      <i className="kuma-icon kuma-icon-caution"></i>
      <span>{lang.confirmDelete}</span>
    </div>;

    return <ul className={classnames("uxcore-tag", {
        [props.className]: !!props.className
      })}>{data.map(function (item, index) {
      let res;

      if ((!isDialog) && (index >= props.maxTags)) {
        return ;
      }

      switch (props.mode) {
        case 'like':
          res = <li key={"uxcore-tag-item-" + index + "-" + item.tag} className={classnames("uxcore-tag-item", {
            [props.mode]: true,
            'create-by-owner': item.createByOwner
          })}>
              <span className="uxcore-tag-item-tag" title={item.tag}
                    onClick={me.onClickTag.bind(me, item.tag)}>{item.tag}</span>
              <span className={classnames({
              'can-like': !item.hasLiked && !item.createByMe,
              'is-zero': item.liked == 0,
              'create-by-me': item.createByMe
              })}>
                <span className={classnames("uxcore-tag-item-liked", {
            'liked-max': item.liked > props.maxDisplayLiked
          })} title={item.liked}>{me._renderLiked(item.liked)}</span>
              <span className="uxcore-tag-item-add-like" onClick={me.onLike.bind(me, item.tag, index)}><i
                className="kuma-icon kuma-icon-add"></i></span>
              <span className={classnames("uxcore-tag-item-add-animation", {
                show: me.state.animationTag == item.tag
              })}>+1</span>
              </span>
          </li>;
          break;

        case 'delete':
          let tooltipStyle = {display: 'none'};
          let tooltipOverlay = <p></p>,
            render = [];

          try {
            // 赞为0只有其他人单独创建的一个标签有显示
            if (item.liked == 0 && !item.createByMe) {
              render.push(<a href={'https://work.alibaba-inc.com/work/u/' + item.likeList.workNo}
                             target="_blank">{item.likeList.name}</a>);
              render.push(<span>{lang.describeYou}</span>);
            } else if (item.liked == 1) {
              render.push(<a href={'https://work.alibaba-inc.com/work/u/' + item.likeList.workNo}
                             target="_blank">{item.likeList.name}</a>);
              render.push(<span>{lang.descriptionLikeYou}</span>)
            } else if (item.liked > 1) {
              render.push(<a href={'https://work.alibaba-inc.com/work/u/' + item.likeList.workNo}
                             target="_blank">{item.likeList.name}</a>);
              render.push(<span>{lang.descriptionEt}</span>);
              render.push(<span className="uxcore-tag-item-tooltip-like-numbers">{item.liked}</span>);
              render.push(<span>{lang.descriptionLiked}</span>);
            }

            if (render && render.length > 0) {
              tooltipOverlay = <p>{render}</p>;
              tooltipStyle = {}
            }
          } catch (e) {
            console.log('tag: ', e);
          }



          res =
            <li key={"uxcore-tag-item-" + index + "-" + item.tag} className={classnames("uxcore-tag-item", {
            [props.mode]: true,
            'can-delete': true,
            'create-by-owner': item.createByOwner
          })}>
              <Tooltip placement="bottom" key={"uxcore-tag-item-" + index + "-" + item.tag + "-tooltip"}
                       overlay={tooltipOverlay} overlayStyle={tooltipStyle}>
              <span key={"uxcore-tag-item-" + index + "-" + item.tag + '-tag'}
                    className="uxcore-tag-item-tag"
                    onClick={me.onClickTag.bind(me, item.tag)}>{item.tag}</span>
              </Tooltip>
          <span key={"uxcore-tag-item-" + index + "-" + item.tag + '-liked'}
                title={item.liked}
                className={classnames("uxcore-tag-item-liked", {
            'liked-max': item.liked > props.maxDisplayLiked,
            'is-zero': item.liked == 0
          })}>{me._renderLiked(item.liked)}</span>
              <Popover key={"uxcore-tag-item-" + index + "-" + item.tag + '-popover'}
                       overlay={deleteOverlay} placement="top" trigger='click' showButton={true}
                       onOk={me.onDelete.bind(me, item.tag)} okText={lang.deleteOkText}
                       cancelText={lang.deleteCancelText}>
              <span className="uxcore-tag-item-delete">
                <i className="kuma-icon kuma-icon-close"></i>
              </span>
              </Popover>
            </li>

          break;
      }

      return res;
    })}
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
      {((data.length > props.maxTags) && !isDialog) ?
        <li className="uxcore-tag-more"><a href="javascript:void(0)" onClick={me.onMore.bind(me)}>{lang.more}</a>
        </li> : ''}
    </ul>
  }

  render() {

    let me = this,
      props = me.props,
      lang = me.lang,
      data = me.state.data;

    return <div>
      {me.renderTagList(false)}
      <Dialog visible={me.state.dialogVisible}
              onOk={me.onDialogOk.bind(me)}
              title={lang.title}
              onCancel={me.onDialogCancel.bind(me)}>

        <h3 className="uxcore-tag-dialog-count">{lang.tagsCount + data.length + lang.unit}</h3>
        {me.renderTagList(true)}
        </Dialog>
    </div>

  }
}

Tag.defaultProps = {
  data: [],
  className: '',
  mode: 'like',
  addTags: true,
  maxTags: 20,
  maxDisplayLiked: 99,
  onClickTag: () => {},
  onAdd: () => {},
  onLike: () => {},
  onDelete: () => {},

  locale: 'zh-cn'
}


// http://facebook.github.io/react/docs/reusable-components.html
Tag.propTypes = {
  data: React.PropTypes.array,                      // 数据
  className: React.PropTypes.string,                //
  mode: React.PropTypes.oneOf(['delete', 'like']),  // 这里delete一般为自己看；like为其他人看
  addTags: React.PropTypes.bool,                    // 是否可以添加标签
  maxTags: React.PropTypes.number,                  // 不展开的情况下显示最多的标签数
  maxDisplayLiked: React.PropTypes.number,          // 单个标签显示的最多赞数
  onClickTag: React.PropTypes.func,                 // 点击标签回调
  onAdd: React.PropTypes.func,                      // 添加标签回调
  onLike: React.PropTypes.func,                     // 点赞回调
  onDelete: React.PropTypes.func,                   // 删除标签回调

  locale: React.PropTypes.oneOf(['zh-cn', 'en'])
}

Tag.displayName = "Tag";

module.exports = Tag;
