<template>
  <div>
    <productHead/>
    <ProductList/>
    <productPagination/>
    <productAdd/>
  </div>
</template>

<script>
import productHead from './productHead.vue';
import ProductList from './productList.vue'
import productPagination from "./productPagination"
import productAdd from './productAdd.vue';


export default {
  name: 'productCenter',
  components:{
    productHead,
    ProductList,
    productPagination,
    productAdd,
    // productEditor,
    
  }
}
</script>

<style>

</style>
