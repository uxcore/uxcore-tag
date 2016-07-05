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

```javascript
const data = [
  {
    tag: 'owner创建0',
    count: 0,
    canAddCount: true,
    createByOwner: true,
    canDelete: true
  },
  {
    tag: 'owner创建1',
    count: 1,
    canAddCount: true,
    createByOwner: true,
    canDelete: false
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
      createByOwner: false,
      canDelete: true
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
                canDelete={item.canDelete}
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
```


## uxcore-tag
![image](https://img.alicdn.com/tps/TB1BPtHKpXXXXcCXpXXXXXXXXXX-328-211.png)


## API

## Props

### Tag

|配置项|类型|必填|默认值|功能/备注|
|---|---|---|---|---|
|className|string|optional|''|额外的className|
|addTags|boolean|optional|true|是否可以新增tag|
|onAdd(tagName)|function|optional|noop|新增tag的回调,tagName为新增的标签名|
|locale|string|optional|'zh-cn'|语言，另可选'en-us', 'pl-pl'|


### TagItem

> 通过 Tag.Item 取得。

|配置项|类型|必填|默认值|功能/备注|
|---|---|---|---|---|
|className|string|optional|''|额外的className|
|tag|string|require|''|tag的值|
|count|number|optional|0|标签后面的数字|
|canAddCount|boolean|optional|false|是否可以增加数字|
|canDelete|boolean|optional|false|是否可以删除标签| 
|onClick(tagName)|function|optional|noop|点标签回调|
|maxDisplayCount|number|optional|99|最大显示数字|
|onAddCount(tagName)|function|optional|noop|点击增加数字的加号回调|
|onDelete(tagName, cb)|function|optional|noop|点击删除icon回调 注意手动调用cb，否则弹窗不会消失|
|confirmDeleteText|string|optional|''|确认删除文案，如果不填则直接触发onDelete回调|
