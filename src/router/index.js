import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
import Image from '@/views/images/'
import Comment from '@/views/comment/'
import Settings from '@/views/settings/'
import Fans from '@/views/fans/'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path为空，会作为默认子路由
        name: 'home',
        component: Home
      },
      {
        path: '/article', // path为空，会作为默认子路由
        name: 'article',
        component: Article
      },
      {
        path: '/publish', // path为空，会作为默认子路由
        name: 'publish',
        component: Publish
      },
      {
        path: '/image', // path为空，会作为默认子路由
        name: 'image',
        component: Image
      },
      {
        path: '/comment', // path为空，会作为默认子路由
        name: 'comment',
        component: Comment
      },
      {
        path: '/settings', // path为空，会作为默认子路由
        name: 'settings',
        component: Settings
      },
      {
        path: '/fans', // path为空，会作为默认子路由
        name: 'fans',
        component: Fans
      }
    ]
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫
// next 放行方法

// const user = JSON.parse(window.localStorage.getItem('user'))

// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login') {
//     if (user) {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

export default router
