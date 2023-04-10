<template>
  <div>
    <MainNav/>
    <router-view class="main-content"></router-view>
  </div>
</template>

<script>

import MainNav from '../components/MainNav'

export default {
  name: 'layoutCenter',
  components:{
    MainNav
  }
}
</script>

<style scoped>
.main-content{
  margin:10px 10px 0px 210px
}
</style>
