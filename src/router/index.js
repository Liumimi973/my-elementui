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

export default new Router({
  
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Login',
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
            
            component: Home,
            meta:{title:'首页'}
          },
          {
            path: '/bookinfo',
           
            component: Bookinfo,
            meta:{title:'图书信息管理'}
          },
          {
            path: '/booktype',
           
            component: Booktype,
            meta:{title:'图书类别管理'}
          },
          {
            path: '/chukusearch',
           
            component: Chukusearch,
            meta:{title:'出库查询'}
          },
          {
            path: '/kucunsearch',
           
            component: Kucunsearch,
            meta:{title:'库存查询'}
          },
          {
            path: '/rukusearch',
            
            component: Rukusearch,
            meta:{title:'入库查询'}
          },
          {
            path: '/user',
            
            component: User,
            meta:{title:'用户管理'}
          }
      ]
    }
  ]
})




