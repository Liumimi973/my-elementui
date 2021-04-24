import myaxios from '../utils/myaxios'


// myaxios
// .get('/static/data.json')
// .then(response => {
//     console.log(response.data)
// })
//       .catch(function (error) { // 请求失败处理
//         console.log('请求失败');
//       });
//请求本地接口
// export default{
//     getList(){
//         const promise1=myaxios({
//             method:'get',
//             url:'/static/data.json'
//         })
// return promise1
//     }
// }

//跨域请求
// const BASE_URL='/dev-api'
// const BASE_URL= process.env.BASE_API;

// console.log(process.env);
// console.log(process.env.BASE_API);
// console.log(process.env.SERVICE_URL);

export default{
    getList(){
        const promise1=myaxios({
            method:'get',
            url:'/static/data.json'
        })
return promise1
    }
}