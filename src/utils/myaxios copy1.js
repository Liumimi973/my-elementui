import  axios from 'axios'
const myaxios = axios.create({
    //baseURL: '/',
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000,
   
  });
  


// myaxios
// .get('/static/data.json')
// .then(response => {
//     console.log(response.data)
// })
//       .catch(function (error) { // 请求失败处理
//         console.log(error);
//       });

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
  
export default myaxios