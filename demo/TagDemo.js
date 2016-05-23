/**
 * Tag Component Demo for uxcore
 * @author peijie.dpj
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

let classnames = require('classnames');

let Tag = require('../src');

const data = [
  {
    tag: 'owner创建0',
    liked: 0,
    hasLiked: false,
    createByMe: false,
    createByOwner: true,
    likeList: {
      name: '吴朋（宵何）',
      workNo: 109094
    }
  },
  {
    tag: 'owner创建1',
    liked: 1,
    hasLiked: false,
    createByMe: false,
    createByOwner: true,
    likeList: {
      name: '吴朋（宵何）',
      workNo: 109094
    }
  },
  {
    tag: 'owner创建100',
    liked: 100,
    hasLiked: false,
    createByMe: false,
    createByOwner: true,
    likeList: {
      name: '吴朋（宵何）',
      workNo: 109094
    }
  },
  {
    tag: '自己创建0',
    liked: 0,
    hasLiked: false,
    createByMe: true,
    createByOwner: false,
  },
  {
    tag: '自己创建1',
    liked: 1,
    hasLiked: false,
    createByMe: true,
    createByOwner: false,
    likeList: {
      name: '吴朋（宵何）',
      workNo: 109094
    }
  },
  {
    tag: '自己创建100',
    liked: 100,
    hasLiked: false,
    createByMe: true,
    createByOwner: false,
    likeList: {
      name: '吴朋（宵何）',
      workNo: 109094
    }
  },
  {
    tag: '他人创建0',
    liked: 0,
    hasLiked: false,
    createByMe: false,
    createByOwner: false,
    likeList: {
      name: '吴朋（宵何）',
      workNo: 109094
    }
  },
  {
    tag: '他人创建1',
    liked: 1,
    hasLiked: false,
    createByMe: false,
    createByOwner: false,
    likeList: {
      name: '吴朋（宵何）',
      workNo: 109094
    }
  },
  {
    tag: '他人创建100',
    liked: 100,
    hasLiked: false,
    createByMe: false,
    createByOwner: false,
    likeList: {
      name: '吴朋（宵何）',
      workNo: 109094
    }
  },
  {
    tag: '测试一下',
    liked: 5,
    hasLiked: false,
    createByMe: false,
    createByOwner: false,
    likeList: {
      name: '吴朋（宵何）',
      workNo: 109094
    }
  },
  {
    tag: '点过赞',
    liked: 100,
    hasLiked: true,
    createByMe: false,
    createByOwner: false,
    likeList: {
      name: '吴朋（宵何）',
      workNo: 109094
    }
  },
  {
    tag: '点过赞2',
    liked: 2,
    hasLiked: true,
    createByMe: true,
    createByOwner: false,
    likeList: {
      name: '董培杰（酒舟）',
      workNo: 82815
    }
  }
]

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  onClickTag(tag) {

    console.log('点击标签: ', tag)
  }
  onAdd(tag, success, fail) {
    console.log('添加标签: ' + tag);
    success()

  }
  onLike(tag, success, fail) {
    console.log('赞标签: ', tag);
    success();
  }
  onDelete(tag, success, fail) {
    console.log('删除标签: ' + tag);
    success();
  }

  render() {
    let me = this;

    let props = {
      data: data,
      className: 'tag-classname',
      mode: 'delete', // delete | like
      addTags: true,
      maxTags: 20,
      maxDisplayLiked: 99,
      onClickTag: me.onClickTag.bind(me),
      onAdd: me.onAdd.bind(me),
      onLike: me.onLike.bind(me),
      onDelete: me.onDelete.bind(me),

      locale: 'zh-cn'
      //locale: 'en'
    }
    return (
      <div className="demo">
        <Tag {...props}/>
      </div>
    );
  }
}
;

module.exports = Demo;
