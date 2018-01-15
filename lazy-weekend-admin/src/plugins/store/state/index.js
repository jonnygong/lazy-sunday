// 登录用户信息
const user = {
  name: '', // 用户名
  avatar: '' // 用户头像
};

const nav = [{
  name: '用户管理',
  url: '',
  iconCls: 'fa fa-bookmark',
  children: [{
    name: "用户管理",
    url: "/user/list"
  }]
}, {
  name: '分类管理',
  iconCls: 'fa fa-folder-open-o',
  url: '',
  children: [{
    name: "分类管理",
    url: "/type/list"
  }]
}, {
  name: '地区管理',
  iconCls: 'fa fa-fax',
  url: '',
  children: [{
    name: "地区管理",
    url: "/area/list"
  }]
}, {
  name: '文章管理',
  iconCls: 'fa fa-map-o',
  url: '',
  children: [{
    name: "文章管理",
    url: "/article/list"
  }]
}];

// 已打开页面的标签栏
const pageOpenedList = [];
const currentTitle = '';

export default {
  user,
  pageOpenedList,
  currentTitle,
  nav
};