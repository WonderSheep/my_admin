<template>
  <div>
    <paramsHead />
    <el-table :data="paramsData">
      <el-table-column
        prop="id"
        show-overflow-tooltip=""
        label="规格参数ID"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="itemCatId"
        show-overflow-tooltip=""
        label="产品管理ID"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="paramData"
        show-overflow-tooltip=""
        label="规格参数"
        width="985"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加规格参数"
      :visible.sync="dialogVisible"
      width="65%"
      :before-close="handleClose"
    >
      <productTree @onTree="getTreeData" />
      <el-dialog
        title="添加参数"
        :visible.sync="dialogInnerVisible"
        width="60%"
        :before-close="handleClose"
        append-to-body
      >
        <el-button @click="addMainParamsHandle">添加主结构</el-button>
        <el-form :model="paramsDomain" ref="paramsDomain">
          <el-form-item
            label="规格参数"
            v-for="(item, index) in paramsDomain.domains"
            :key="index"
          >
            <el-input
              v-model="item.value"
              style="width: 90%"
              placeholder="添加主结构"
            ></el-input>
            <el-button @click="addMainParamsHandle2(index)"
              >添加子结构</el-button
            >
            <el-button @click="deleteMainParamsHandle(index)"
              >删除主结构</el-button
            >
            <div
              v-for="(childItem, childIndex) in item.children"
              :key="childIndex"
            >
              <el-input
                v-model="childItem.childValue"
                style="width: 60%"
                placeholder="添加子结构"
              ></el-input>
              <el-button @click="deleteMainParamsHandle2(index, childIndex)"
                >删除子结构</el-button
              >
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogInnerVisible = false">取 消</el-button>
          <el-button type="primary" @click="finish">确 定</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogInnerVisible = true"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api";
import paramsHead from "../../components/pubHead";
import { mapState } from "vuex";
import productTree from "../product/productTree.vue";

export default {
  data() {
    return {
      paramsData: [],
      dialogVisible: false,
      dialogInnerVisible: false,
      treeData: {},
      paramsDomain: {
        domains: [
          {
            value: "",
            children: [
              {
                childValue: "",
                //value并不是在这里添加，这里只添加一个结构，具体数据，有添加商品的时候处理
                value: "",
              },
            ],
          },
        ],
      },
    };
  },
  components: {
    paramsHead,
    productTree,
  },
  computed: {
    ...mapState("pubHeadModule", ["paramSearch"]),
    paramSearchChange() {
      return this.paramSearch;
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    addMainParamsHandle() {
      this.paramsDomain.domains.push({
        value: "",
        children: [
          {
            childValue: "",
            value: "",
          },
        ],
      });
    },
    addMainParamsHandle2(index) {
      this.paramsDomain.domains[index].children.push({
        childValue: "",
        value: "",
      });
    },
    deleteMainParamsHandle(index) {
      this.paramsDomain.domains.splice(index, 1);
    },
    deleteMainParamsHandle2(index, childIndex) {
      this.paramsDomain.domains[index].children.splice(childIndex, 1);
    },
    finish() {
      api
        .insertParams({
          itemCatId: this.treeData.cid,
          paramData: JSON.stringify(this.paramsDomain.domains),
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: "添加规格参数成功!",
              type: "success",
            });
            this.dialogInnerVisible = false;
            this.dialogVisible = false;
            this.http(1); //重新刷新
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTreeData(data) {
      this.treeData = data;
    },
    http(num) {
      api
        .paramAll({ page: num })
        .then((res) => {
          if (res.data.status === 200) {
            this.paramsData = res.data.result;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(index, row) {
      api
        .deleteParams({
          id: row.id,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: "添加规格参数成功!",
              type: "success",
            });
            this.http(1); //重新刷新
          }
        }).catch(error=>{
            console.log(error);
        });
    },
  },
  watch: {
    paramSearchChange(newValue) {
      api
        .paramsSearch({ search: newValue })
        .then((res) => {
          this.paramsData = res.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.http(1);
    this.$bus.$on("onAdd", () => {
      this.dialogVisible = true;
    });
  },
};
</script>

<style>
</style>