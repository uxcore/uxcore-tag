/**
 * Tag Component Demo for uxcore
 * @author peijie.dpj
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */


/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

const React = require('react');
const Tooltip = require('uxcore-tooltip');

const Tag = require('../src');

const Item = Tag.Item;

const tagData = [
  {
    tag: 'owner创建0',
    count: 9999,
    canAddCount: true,
    createByOwner: true,
  },
  {
    tag: 'owner创建1',
    count: 9999,
    canAddCount: true,
    createByOwner: true,
  },
  {
    tag: 'owner创建100',
    count: 100,
    canAddCount: true,
    createByOwner: true,
  },
  {
    tag: '自己创建0',
    count: 0,
    canAddCount: true,
    createByOwner: false,
  },
  {
    tag: '自己创建1',
    count: 1,
    canAddCount: true,
    createByOwner: false,
  },
  {
    tag: '自己创建100',
    count: 100,
    canAddCount: true,
    createByOwner: false,
  },
  {
    tag: '他人创建0',
    count: 0,
    canAddCount: true,
    createByOwner: false,
  },
  {
    tag: '他人创建1',
    count: 1,
    canAddCount: true,
    createByOwner: false,
  },
  {
    tag: '他人创建100',
    count: 100,
    canAddCount: true,
    createByOwner: false,
  },
  {
    tag: '测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下',
    count: 5,
    canAddCount: true,
    createByOwner: false,
  },
  {
    tag: '点过赞',
    count: 100,
    canAddCount: false,
    createByOwner: false,
  },
  {
    tag: '点过赞2',
    count: 2,
    canAddCount: false,
    createByOwner: false,
  },
];

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: tagData,
      showData: ['关键词：阿里', '关键词：百度'],
    };
  }

  onClickTag(tag) {
    console.log('点击标签: ', tag);
  }
  onAdd(tag, cb) {
    const me = this;
    const data = me.state.data;


    const item = {
      tag,
      count: 0,
      canAddCount: false,
      createByOwner: false,
    };

    console.log(`添加标签: ${tag}`);

    data.push(item);

    me.setState({
      data,
    });

    cb(false);
  }
  onLike(tag) {
    const me = this;
    let data = me.state.data;

    data = data.map((item) => {
      if (item.tag === tag) {
        item.count += 1;
        item.canAddCount = false;
      }
      return item;
    });

    me.setState({
      data,
    });

    console.log('赞标签: ', tag);
  }
  onDelete(tag, cb) {
    const me = this;
    let data = me.state.data;

    data = data.filter(item => item.tag !== tag);

    if (cb) {
      cb();
    }
    me.setState({
      data,
    });

    console.log(`删除标签: ${tag}`);
  }

  onDelete2(tag, cb) {
    const showData = this.state.showData.filter(item => item !== tag);
    this.setState({
      showData,
    }, () => {
      if (cb) {
        cb();
      }
    });
  }

  render() {
    const me = this;

    const props = {
      className: 'tag-classname',
      addTags: true,
      onAdd: me.onAdd.bind(me),
      locale: 'zh-cn',
      // locale: 'en-us'
    };

    return (
      <div className="demo">
        <h2>互动性 TAG</h2>
        <Tag {...props}>
          {me.state.data.map((item, index) => {
            const res = (
              <Item
                key={`uxcore-tag-item-${index}`}
                className={item.createByOwner ? 'create-by-owner' : ''}
                tag={item.tag}
                count={item.count}
                canAddCount={item.canAddCount}
                canDelete
                onClick={me.onClickTag.bind(me)}
                maxDisplayCount={999}
                onAddCount={me.onLike.bind(me)}
                onDelete={me.onDelete.bind(me)}
                confirmDeleteText="确定删除该标签吗?"
                locale="zh-cn"
              >
                {item.tag}
              </Item>);

            if (index < 5) {
              return <Tooltip overlay={<p>test</p>} placement="bottom" trigger={["hover"]}><span>{res}</span></Tooltip>;
            }

            return res;
          })}
        </Tag>
        <h2>展示型 TAG （只读）</h2>
        <Tag addTags={false}>
          <Item type="show">Top50 入职学校</Item>
          <Item type="success">积极提醒</Item>
          <Item type="danger">警示提醒</Item>
          <Item type="info">常规提醒</Item>
          <Item type="warning">注意</Item>
        </Tag>
        <h2>展示型 TAG （可删除）</h2>
        <Tag addTags={false}>
          {me.state.showData.map(item => (
            <Item type="show" canDelete key={item} tag={item} onDelete={me.onDelete2.bind(me)}>{item}</Item>
          ))}
        </Tag>
      </div>
    );
  }
}


module.exports = Demo;
