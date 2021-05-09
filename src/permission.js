import router from './router/index'
import { getUserInfo} from './api/login'

import store from './store/index.js'

router.beforeEach((to, from, next) => {
  //本地获取token
  //const token = localStorage.getItem("blyd-manager-token");
  //store 中获取token
  const token=store.state.user.token

  if (!token) {
    //没有获取到token
      if (to.path !== "/login") {
      //访问非登录页面，则返回登录页面
      next({ path: '/login',
        
      });
      } else {
      //访问登录页，则进入登录页面
       next(); //next没有参数，就是访问哪个页面，进入哪个页面
      }
  } else {
    //获取到token

    //访问登录页进入登录页
    if (to.path === "/login") {

      next();


    } else {
      //访问的是非登录页面，则查看本地是否存储用户信息
      //const userinfo = localStorage.getItem("blyd-manager-user")


      //访问的是非登录页面，则查看store是否存储用户信息
         const userinfo = store.state.user.user
         //console.log(userinfo)

      if (userinfo) {
        //本地有用户信息，进入相应页面
        next();
      } else {

        //本地没有用户信息，通过store里面的token去获取用户信息
      store.dispatch('GetUserInfo').then(response=>{
        if(response.flag){
          next()

        }else{

        //没有获取用户信息，则返回登录页
        next({path: '/login'})  
        }
      
      
      
      
      }).catch(error=>{


      })



        //本地没有用户信息，通过token去获取用户信息
        // getUserInfo(token).then(response => {
        //   const respUser = response.data;
        //   if (respUser.flag) {
        //     //获取用户信息后，用户信息写入本地存储
        //     localStorage.setItem("blyd-manager-user", JSON.stringify(response.data))
        //     next()
        //   } else {
        //     //没有获取用户信息，则返回登录页
        //     next({path: "/login"})
        //   }
        // });
      }
    }
  }
});
