import axios from 'axios'

import {Loading,Message} from 'element-ui'
//按需导入loading

// // 定义请求次数(用于判断请求是否已经全部响应)
// let requestCount = 0;
// let loading;
// // (客户端请求前)显示loading
// function showLoading() {
//   if (requestCount === 0) {
//     loading = Loading.service({
//       target: '.main',
//       text: '玩命加载中',
//       background: 'rgba(0,0,0,0.5)'
//     })
//   }
//   requestCount++
// }
// let timer;
// // (服务器响应后)尝试隐藏loading
// function tryHideLoading() {
//   requestCount-- 
//   //采用setTimeout是为了解决一个请求结束后紧接着有另一请求发起导致loading闪烁的问题
//   timer = setTimeout(() => {    
//     if (requestCount === 0) {
//       loading.close()
//       clearTimeout(timer)
//     }
//   })
// }


const loading = {
  loadingInstance: null,
  open: function () {
    if (this.loadingInstance === null) {
      this.loadingInstance = Loading.service({
        target: '.main',
        text: '玩命加载中，请稍后',
        background: 'rgba(0,0,0,0.5)'
      });

    }

  },
  close: function () {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close()
    }
    this.loadingInstance = null
  }
};


const myaxios = axios.create({

  //baseURL: process.env.BASE_API,
  //baseURL: '/dev-apis',
  baseURL: 'https://www.fastmock.site/mock/276fb559e232662a8dc6f45f58c99a5c/api', //此处可设置项目的公共请求地址
  timeout: 5000 //请求超时时间

});







// 请求拦截器
myaxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  loading.open()
  //showLoading()
  return config;
}, function (error) {
  //myloading.close()
  // Do something with request error
  return Promise.reject(error);
});

// 响应拦截器
myaxios.interceptors.response.use(function (response) {
  
  loading.close()
  //tryHideLoading()
  
  const resp=response.data
  if(resp.code!=200){
    Message({
      message:resp.message ||'系统异常',
      type:'warning',
      duration:5000,
      showClose:true
    })
  }
  return response;
}, function (error) {
  
  loading.close()
  //tryHideLoading()
  //console.log(error.response,error.response.status)
  
  Message({
    message:error.message,
    type:'error',
    duration:5000,
    showClose:true
  })
  return Promise.reject(error);
});

export default myaxios
