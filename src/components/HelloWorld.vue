<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>{{ list }}</h3>
    <ul>
      <li v-for="(value,index) in list" :key="index">{{value.bookname}}</li>
    </ul>
  </div>
</template>

<script>
//myaxios.js扩展名js可以不写
//import myaxios from '../utils/myaxios'
import testApi from'../api/test.js'
export default {
  data(){
    return {
       msg: 'Welcome to Your Vue.js App',
       list:[]
    }
      
    },

  created(){
    this.fetchData()
    testApi.getList()
    .then(response => {
    console.log(response.data)
    this.list=response.data
     })
      .catch(function (error) { // 请求失败处理
        console.log('请求失败');
      });
  },
  methods:{
    fetchData(){

    }
  }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
