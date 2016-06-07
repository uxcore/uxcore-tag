---

## uxcore-tag [![Dependency Status](http://img.shields.io/david/uxcore/uxcore-tag.svg?style=flat-square)](https://david-dm.org/uxcore/uxcore-tag) [![devDependency Status](http://img.shields.io/david/dev/uxcore/uxcore-tag.svg?style=flat-square)](https://david-dm.org/uxcore/uxcore-tag#info=devDependencies) 

## TL;DR

uxcore-tag ui component for react

#### setup develop environment

```sh
$ git clone https://github.com/uxcore/uxcore-tag
$ cd uxcore-tag
$ npm install
$ gulp server
```

## Usage
````
let Tag = require('uxcore-tag');
let Item = Tag.Item;
const data = [
  {
    tag: 'owner创建0',
    count: 0,
    canAddCount: true,
    createByOwner: true
  },
  {
    tag: '创建1',
    count: 1,
    canAddCount: true,
    createByOwner: false
  }
]
onDelete(tag, cb) {
    let me = this,
      data = me.state.data;

      data = data.filter(function (item) {
        return item.tag != tag
      })
     //  一定要手动关闭一下
      cb && cb();
     me.setState({
      data: data
     }) 

    console.log('删除标签: ' + tag);
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
            locale="zh-cn">
         {item.tag}
      </Item>
    })}
</Tag>

````

## uxcore-tag
![image](http://aligitlab.oss-cn-hangzhou-zmf.aliyuncs.com/uploads/platform/pay-roll/641da4aa248d2f660d73c7ede4e10797/image.png)


## API

## Props

| 配置项              | 类型       | 必填    | 默认值     | 功能/备注     |
| -------- | -------- |-------- |-------- |-------- |
|count               |number     |optional|0          | 标签后面的数字 |
|canAddCount         |boolean    |optional|false| 是否可以增加数字     |
|canDelete           |boolean    |optional|false| 是否可以删除标签     | 
|onClick             |function   |optional|noop | 点标签回调          |
|maxDisplayCount     |number     |optional| 99  | 最大显示数字|
|onAddCount          |function   |optional|noop| 点击增加数字的加号回调|
|onDelete            |function    |optional|noop| 点击删除icon回调 注意手动调用cb，否则弹窗不会消失|
|confirmDeleteText   |string    |optional|''| 确认删除文案，如果不填则直接触发onDelete回调|

### 