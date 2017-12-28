// default config
module.exports = {
  // 可以公开访问的Controller
  publicController: [
    // 格式为controller
    'tag',
    'area',
    'common'
  ],

  // 可以公开访问的Action
  publicAction: [
    // 格式为： controller+action
    'user/reg',
    'user/login',
    'article/top',
    'article/detail',
    'article/list'
    // 'article/top'
  ]
};
