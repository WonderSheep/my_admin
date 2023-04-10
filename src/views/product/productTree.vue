<template>
  <div>
    <el-tree
  :props="props"
  :load="loadNode"
  @node-click="handleNodeClick"
  lazy
  >
</el-tree>
  </div>
</template>

<script>
import api from "../../api"

export default {
    data() {
        return {
            props:{
              label:'name',
            }
        }
    },
    methods:{
        loadNode(node,resolve){
        //第一次加载
        //console.log(node);
        if(node.level === 0){
          api.category().then(res=>{
            if(res.data.status === 200){
              return resolve(res.data.result)
            }
            return resolve([]);
          }).catch(error=>{console.log(error);})
          }

        if(node.level >= 1){
          api.category({
            id:node.data.cid
          }).then(res=>{
            if(res.data.status === 200){
              return resolve(res.data.result)
            }
            return resolve([]);
          }).catch(error=>{console.log(error);})
        }
        },
        handleNodeClick(data){
          this.$emit("onTree",data);
        }
    }
}
</script>

<style>

</style>