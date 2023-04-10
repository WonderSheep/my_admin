<template>
  <div class="head">
    <el-form ref="searchForm" :model="search" @submit.native.prevent>
        <el-form-item>
            <el-input v-model="search.content" @keyup.enter.native="onSubmitSearch"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmitSearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addProductHandle">添加</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';

export default {
    data() {
        return {
           search:{
            content:''
           } 
        }
    },
    methods:{
        ...mapMutations('productModule',['setSearch']),
        onSubmitSearch(){
            this.setSearch(this.search.content);
        },
        addProductHandle(){
            this.$bus.$emit("onAdd",true);
        }
    }
}
</script >

<style lang="less" scoped>

.el-form {
    overflow: hidden;
    clear: both;
    display: flex;
    width: 100%;
    display: flex;
    .el-form-item {
        float: left;
        margin-right: 10px;
        .el-input {
            .el-input__inner{
                flex: 1;
            }
            width: 500px;
        }
    }
}

.head {
    margin-top: 20px;
    margin-left: 400px;
    width: 100%;
}

</style>