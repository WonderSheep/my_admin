<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="id"
        label="商品ID"
        show-overflow-tooltip
        width="80"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="商品名称"
        show-overflow-tooltip
        width="150"
      ></el-table-column>
      <el-table-column
        prop="image"
        label="商品图片"
        show-overflow-tooltip
        width="100"
      ></el-table-column>
      <el-table-column
        prop="sellpoint"
        label="商品卖点"
        show-overflow-tooltip
        width="200"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        show-overflow-tooltip
        width="80"
      ></el-table-column>
      <el-table-column
        prop="num"
        label="商品数量"
        show-overflow-tooltip
        width="80"
      ></el-table-column>
      <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-html="scope.row.descs"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <productEditor :flag="change"></productEditor>
  </div>
</template>

<script>
import api from "../../api";
import { mapState } from "vuex";
import productEditor from "./productEditor.vue";

export default {
  data() {
    return {
      tableData: [],
      change:false
    };
  },
  computed: {
    ...mapState("productModule", ["page", "search"]),
    // pageChange(){
    //   return this.page;
    // },
    searchChange() {
      return this.search;
    },
  },
  watch: {
    searchChange(newValue) {
      console.log(newValue);
      api
        .search({
          search: newValue,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.tableData = res.data.result;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    productEditor
  },
  mounted() {
    this.http(1); //首次默认进入第一页
    this.$bus.$on("OnPage", (val) => {
      this.http(val); //后续再决定进入哪一页
    });
    this.$bus.$on("onRefresh", () => {
      this.http(1);
    });
  },
  methods: {
    http(page) {
      api
        .product({ page })
        .then((res) => {
          if (res.data.status === 200) {
            this.tableData = res.data.result;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleEdit(index, row) {
      // this.flag = !flag;
      this.change = !this.change;
      this.$bus.$emit('onShowEditor',row);
    },
    handleDelete(index, row) {
      //删除功能
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.delete({
            id: row.id,
          });
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.http(1);
          this.$bus.$emit('newTotal',true);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      api
        .delete({
          id: row.id,
        })
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>