const Main = () => import ('@/views/Main/Main.vue');

/**
 *  路由对象 meta 标签
 *  meta: {
 *  requiresAuth: true, // 用于权限的校验
 *  }
 */

let routes = [
  // 登录页
  {
    path: '/login',
    component: () =>
      import ('@/views/Login/Login.vue'),
    name: '用户登录'
  },
  // 欢迎页
  {
    path: '/',
    component: Main,
    name: '首页',
    redirect: '/main',
    children: [{
      path: '/main',
      component: () =>
        import ('@/views/Welcome/Welcome.vue'),
      name: '欢迎使用',
      meta: {requiresAuth: true}
    }]
  },
  // 用户管理
  {
    path: '/user',
    component: Main,
    name: '用户管理',
    children: [
      {
        path: 'list',
        component: () => import('@/views/User/List.vue'),
        name: '用户列表',
        meta: {requiresAuth: true}
      },
      {
        path: 'list/edit/:id',
        component: () => import('@/views/User/Edit.vue'),
        name: '用户编辑',
        meta: {requiresAuth: true}
      },
      {
        path: 'list/add',
        component: () => import('@/views/User/Add.vue'),
        name: '用户新增',
        meta: {requiresAuth: true}
      }
    ]
  },
  // 分类管理
  {
    path: '/type',
    component: Main,
    name: '分类管理',
    children: [
      {
        path: 'list',
        component: () => import('@/views/Type/List.vue'),
        name: '分类列表',
        meta: {requiresAuth: true}
      },
      {
        path: 'list/edit/:id',
        component: () => import('@/views/Type/Edit.vue'),
        name: '分类编辑',
        meta: {requiresAuth: true}
      },
      {
        path: 'list/add',
        component: () => import('@/views/Type/Add.vue'),
        name: '分类新增',
        meta: {requiresAuth: true}
      }
    ]
  },
  // 地区管理
  {
    path: '/area',
    component: Main,
    name: '地区管理',
    children: [
      {
        path: 'list',
        component: () => import('@/views/Area/List.vue'),
        name: '地区列表',
        meta: {requiresAuth: true}
      },
      {
        path: 'list/edit/:id',
        component: () => import('@/views/Area/Edit.vue'),
        name: '地区编辑',
        meta: {requiresAuth: true}
      },
      {
        path: 'list/add',
        component: () => import('@/views/Area/Add.vue'),
        name: '地区新增',
        meta: {requiresAuth: true}
      }
    ]
  },
  // 文章管理
  {
    path: '/article',
    component: Main,
    name: '文章管理',
    children: [
      {
        path: 'list',
        component: () => import('@/views/Article/List.vue'),
        name: '文章列表',
        meta: {requiresAuth: true}
      },
      {
        path: 'list/edit/:id',
        component: () => import('@/views/Article/Edit.vue'),
        name: '文章编辑',
        meta: {requiresAuth: true}
      },
      {
        path: 'list/add',
        component: () => import('@/views/Article/Add.vue'),
        name: '文章新增',
        meta: {requiresAuth: true}
      }
    ]
  },
  // 个人中心
  {
    path: '/area',
    component: Main,
    name: '个人中心',
    redirect: '/personal/data',
    children: [{
      path: 'data',
      component: () =>
        import ('@/views/Personal/Data.vue'),
      name: '个人资料',
      meta: {requiresAuth: true}
    },
      {
        path: 'setting',
        component: () =>
          import ('@/views/Personal/Setting.vue'),
        name: '个人设置',
        meta: {requiresAuth: true}
      }
    ]
  },
   
  // 404 页面跳转
  {
    path: '*',
    redirect: {path: '/'}
  }
];

export default routes;