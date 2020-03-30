import api from '@/api'
import store from '@/store'
// import Cookies from 'js-cookie'
import {getToken} from '@/utils/auth'

// const TOKENNAME = process.env.VUE_APP_TOKEN
const SET_USER_INFO = 'SET_USER_INFO'

// 页面路由拦截
 async function beforeEachHandler (to, from, next) {
  if ((to.meta && to.meta.needLogin)) {
    let limit = 2
    try {
      // 获取本地token
      let hasH5Token = getToken() !== -1
      console.log('h5现在有无token;', hasH5Token)
      if (!hasH5Token) {
        console.log('无token')
        //本地无token，从app获取或者到登录页面去
        //       next({
        //         path: '/login', // 验证失败要跳转登录页面
        //         query: {
        //           redirect: to.fullPath// 要传的参数
        //         }
        //       })
      }
      while (limit-- > 0) {
        // 获取用户信息
        let result = await api.base.getUserInfo({})
        console.log(result, result.code, '------code-------')
        if (result.code !== 0) {
          if (!hasH5Token || limit === 0) {
            throw Error('token Invalid')
          } else {
            console.log('get2')
            // h5token失效重新拿一次
          }
        } else {
          store.commit(SET_USER_INFO, result.data)
          break
        }
      }
      next()
    } catch (error) {
      console.error( error, '-------beforeEach错误日志-----')
      next(false)
    }
  } else {
    next()
  }
}

// 演示替换到维修升级页面
 function beforeEachToExample (to, from, next) {
  const pathMap = {
    '/home': '/exception?page=1&noheader=true',
  }
  if (pathMap[to.path]) {
    next(pathMap[to.path])
  } else {
    next()
  }
}
export {
  beforeEachHandler,
  beforeEachToExample
}
