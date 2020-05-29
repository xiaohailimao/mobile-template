/*
 * @Description: 公共路由
 * @Autor: guoruliang
 * @Date: 2020-04-01 09:57:00
 * @LastEditors: chenyt
 * @LastEditTime: 2020-05-29 13:52:08
 */

export default [
  {
    path: "/",
    name: "目录",
    meta: {
      needLogin: false,
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "loginModule" */"@/views/home.vue")
  },

  {
    path: "*",
    name: "not-found",
    component: () => import(/* webpackChunkName: "notFoundModule" */"@/views/default.vue")
  }

]

