export default [
  {
    path: '/login/index',//登录页
    name: '登录页',
    meta: {
      needLogin: false,
      title: '登录页'
    },
    component: () => import('@/views/login/index.vue')
  },
]
