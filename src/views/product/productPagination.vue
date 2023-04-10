<template>
  <div class="pag">
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>

import api from '../../api'

export default {
    name:'productPagination',
    data() {
      return {
        total:0,
      }
    },
    mounted(){
      this.getTotal();
      this.$bus.$on('newTotal',()=>{
        this.getTotal();
      });
    },
    methods:{
      handleCurrentChange(val){
            this.$bus.$emit('OnPage',val);
      },
      getTotal(){
        api.total().then(res=>{
        if(res.data.status === 200){
          this.total = res.data.result[0]["count(*)"]
        }
      }).catch(error=>{console.log(error);})
      }
    }
};
</script>

<style scoped>
.pag {
  margin-top: 30px;
}
</style>