/**
 * Tag Component Demo for uxcore
 * @author peijie.dpj
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

let classnames = require('classnames');
const ToolTip = require('uxcore-tooltip');

let Tag = require('../src');
let Item = Tag.Item;

const data = [
  {
    tag: 'owner创建0',
    count: 0,
    canAddCount: true,
    createByOwner: true
  },
  {
    tag: 'owner创建1',
    count: 1,
    canAddCount: true,
    createByOwner: true
  },
  {
    tag: 'owner创建100',
    count: 100,
    canAddCount: true,
    createByOwner: true
  },
  {
    tag: '自己创建0',
    count: 0,
    canAddCount: true,
    createByOwner: false
  },
  {
    tag: '自己创建1',
    count: 1,
    canAddCount: true,
    createByOwner: false
  },
  {
    tag: '自己创建100',
    count: 100,
    canAddCount: true,
    createByOwner: false
  },
  {
    tag: '他人创建0',
    count: 0,
    canAddCount: true,
    createByOwner: false
  },
  {
    tag: '他人创建1',
    count: 1,
    canAddCount: true,
    createByOwner: false
  },
  {
    tag: '他人创建100',
    count: 100,
    canAddCount: true,
    createByOwner: false
  },
  {
    tag: '测试一下',
    count: 5,
    canAddCount: true,
    createByOwner: false
  },
  {
    tag: '点过赞',
    count: 100,
    canAddCount: false,
    createByOwner: false
  },
  {
    tag: '点过赞2',
    count: 2,
    canAddCount: false,
    createByOwner: false
  }
]

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data
    }
  }

  onClickTag(tag) {

    console.log('点击标签: ', tag)
  }
  onAdd(tag) {
    let me = this,
      data = me.state.data;
    

    let item = {
      tag: tag,
      count: 0,
      canAddCount: false,
      createByOwner: false
    }

    data.push(item);

    me.setState({
      data: data
    })

    console.log('添加标签: ' + tag);
  }
  onLike(tag) {
     let me = this,
      data = me.state.data;

      data = data.map(function (item) {
        if (item.tag == tag) {
          item.count = item.count + 1;
          item.canAddCount = false;
        }
        return item
      })

     me.setState({
      data: data
     }) 

    console.log('赞标签: ', tag);
  }
  onDelete(tag, cb) {
    let me = this,
      data = me.state.data;

      data = data.filter(function (item) {
        return item.tag != tag
      })

      cb && cb();
     me.setState({
      data: data
     }) 

    console.log('删除标签: ' + tag);
  }

  render() {
    let me = this;

    let props = {
      className: 'tag-classname',
      addTags: true,
      onAdd: me.onAdd.bind(me),
      locale: 'zh-cn'
      //locale: 'en-us'
    }

    return (
      <div className="demo">
        
        <Tag {...props}>
        {me.state.data.map(function (item, index) {
            return <Item 
                key={"uxcore-tag-item-" + index}
                className={item.createByOwner ? "create-by-owner" : ''}
                tag={item.tag}
                count={item.count}
                canAddCount={item.canAddCount}
                canDelete={true}
                onClick={me.onClickTag.bind(me)}
                maxDisplayCount={99}
                onAddCount={me.onLike.bind(me)}
                onDelete={me.onDelete.bind(me)}
                confirmDeleteText="确定删除该标签吗?"
                locale="zh-cn"
                >
                {item.tag}
              </Item>
        })}
          
        </Tag>
      </div>
    );
  }
}
;

module.exports = Demo;
