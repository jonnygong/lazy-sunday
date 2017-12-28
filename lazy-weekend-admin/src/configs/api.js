import systems from '@/configs';
const baseUrl = systems.debug ? '/api/' : 'http://server-jp.52admin.net:8360/admin/';
export default {
  // 接口请求baseUrl
  baseUrl: baseUrl,
  // 接口文档地址
  // document:
  api: {
    // 公共接口
    imageUpload: 'common/upload', // 文件上传
    sysinfoProvince: 'Sysinfo/province', // 省市级三级联动
    sysinfoCity: 'Sysinfo/city', // 省市级三级联动
    sysinfoZone: 'Sysinfo/zone', // 省市级三级联动
    adminMenu: 'admin/menu', // 用户权限
    
    logout: 'Login/logout', // 退出接口
    code: 'Login/code', // 二维码生成接口
    personData: 'Personal/data', // 个人资料接口


    login: 'auth/login', // 登录接口

    typeList: 'type/list', // 分类列表
    typeSelect: 'type/select', // 分类列表
    typeAdd: 'type/add', // 添加分类
    typeUpdate: 'type/update', // 编辑分类
    typeDelete: 'type/delete', // 删除分类
    typeDetail: 'type/detail', // 分类详情

    areaList: 'area/list', // 地区列表
    areaSelect: 'area/select', // 地区列表
    areaAdd: 'area/add', // 添加地区
    areaUpdate: 'area/update', // 编辑地区
    areaDelete: 'area/delete', // 删除地区
    areaDetail: 'area/detail', // 地区详情

    articleList: 'article/list', // 文章列表
    articleAdd: 'article/add', // 添加文章
    articleUpdate: 'article/update', // 编辑文章
    articleDelete: 'article/delete', // 删除文章
    articleDetail: 'article/detail', // 文章详情

    userList: 'user/list', // 用户列表
    userAdd: 'user/add', // 添加用户
    userUpdate: 'user/update', // 编辑用户
    userDelete: 'user/delete', // 删除用户
    userDetail: 'user/detail', // 用户详情
  }
};
