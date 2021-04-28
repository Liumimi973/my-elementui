<template>
    <div>
<!-- <div class="header">头部</div>
<div class="navbar">左侧导航</div>
<div class="main">主区域</div> -->

<app-Header ></app-Header>  
<app-navbar ></app-navbar>  
<app-navbar ></app-navbar>  
<app-main ></app-main> 
    </div>
</template>
<script>
import AppHeader from './AppHeader/index.vue'
import AppNavbar from './AppNavbar/index.vue'
import AppMain from './AppMain/index.vue'


export default {
    components:{
 AppHeader,
 AppNavbar,
 AppMain

    }

}
</script>


<style scoped>
.header{ position: absolute;line-height: 50px; top:0px; left:0px;  background:#130505 ; width: 100%;}
.Navbar{ position: absolute;left:0px; top:50px; width: 200px; bottom: 0px; overflow-y: auto ;color:#ffffff;background-color: rgba(84, 92, 100,0.7);}
.main{ position: absolute ; background: #fff; left:200px; bottom:0px; right:0px;top:50px; padding: 5px; overflow-y: auto ;}
</style>