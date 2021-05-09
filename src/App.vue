<template>
  <div id="app">
    <transition name="fade"
		            mode="out-in">
  <!-- <Login></Login> -->
  <router-view></router-view>
  </transition>
  </div>
  
</template>

<script>

export default {
  name: 'app',
  components:{
   
  }

}
</script>

<style>
body {
  font-family: "微软雅黑";
   margin: 0px auto; padding: 0;
}
#app {
 width: 100%;
 height: 100%;
}
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
