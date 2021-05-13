import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/Login'
import Layout from '@/components/Layout'
import Home from '@/views/home/home'
import Bookinfo from '@/views/book/bookinfo'
import Booktype from '@/views/book/booktype'
import Chukusearch from '@/views/kuncun/chukusearch'
import Rukusearch from '@/views/kuncun/rukusearch'
import Kucunsearch from '@/views/kuncun/kucunsearch'
import User from '@/views/user/user'

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export default new Router({
  
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/',
      // name: 'layout',
      component: Layout,
      redirect:"/home",
      children:[
        {
            path: '/home',
            component: resolve => require(['@/views/home/home'],resolve),

            //component: Home,
            meta:{title:'首页'}
          },
          {
            path: '/bookinfo',
            component: resolve => require(['@/views/book/bookinfo'],resolve),
            //component: Bookinfo,
            meta:{title:'图书信息管理'}
          },
          {
            path: '/booktype',
            component: resolve => require(['@/views/book/booktype'],resolve),
           

            //component: Booktype,
            meta:{title:'图书类别管理'}
          },
          {
            path: '/chukusearch',
            component: resolve => require(['@/views/kuncun/chukusearch'],resolve),
            //component: Chukusearch,
            meta:{title:'出库查询'}
          },
          {
            path: '/kucunsearch',
            component: resolve => require(['@/views/kuncun/kucunsearch'],resolve),
            //component: Kucunsearch,
            meta:{title:'库存查询'}
          },
          {
            path: '/rukusearch',
            component: resolve => require(['@/views/kuncun/rukusearch'],resolve),
            //component: Rukusearch,
            meta:{title:'入库查询'}
          },
          {
            path: '/user',
            component: resolve => require(['@/views/user/user'],resolve),
            //component: User,
            meta:{title:'用户管理'}
          },
          {
            path: '/sys',
            component: resolve => require(['@/views/sys/sys'],resolve),
            //component: User,
            meta:{title:'系统管理'}
          }
      ]
    }
  ]
})




