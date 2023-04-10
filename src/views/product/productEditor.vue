<template>
  <div>
    <el-dialog
      title="编辑商品"
      :visible.sync="dialogEditorVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-form label-width="70px" :model="editorForm" ref="editorFrom">
        <el-form-item label="商品类目">
          <el-button
            type="primary"
            class="category"
            @click="dialogCategoryHandle"
            >类目选择</el-button
          >
          <span class="category">{{ treeData.name }}</span>
          <el-dialog
            width="50%"
            title="类目选择"
            :visible.sync="dialogCategoryVisible"
            append-to-body
          >
            <productTree @onTree="getTreeData" />
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogCategoryVisible = false"
                >取 消</el-button
              >
              <el-button type="primary" @click="dialogCategoryVisible = false"
                >确 定</el-button
              >
            </span></el-dialog
          >
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="editorForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点">
          <el-input v-model="editorForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="editorForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="editorForm.num"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-button class="category" type="primary" @click="dialogUploadHandle"
            >上传图片</el-button
          >
          <img class="upload-img" :src="uploadData.url" alt="" />
          <el-dialog
            width="50%"
            title="上传图片"
            :visible.sync="dialogUploadVisible"
            append-to-body
          >
            <productUpload @onUpload="getUploadData"></productUpload>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogUploadVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogUploadVisible = false"
                >确 定</el-button
              >
            </span></el-dialog
          >
        </el-form-item>
        <el-form-item label="商品描述">
          <wangEditor @onEditor="getEditorData" :wangContent="editorData" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditorVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
import productTree from "./productTree.vue";
import productUpload from "./productUpload.vue";
import wangEditor from "./wangEditor.vue";
import api from "../../api";

export default {
  data() {
    return {
      dialogEditorVisible: false,
      editorForm: {},
      dialogCategoryVisible: false,
      dialogUploadVisible: false,
      treeData: {},
      uploadData: {},
      editorData: "",
      currentID: "",
    };
  },
  components: {
    productTree,
    productUpload,
    wangEditor,
  },
  props: ["flag"],
  // props:{
  //     flag:{
  //         type:Boolean,
  //         default:false,
  //     }
  // },
  watch: {
    flag() {
      this.dialogEditorVisible = !this.dialogEditorVisible;
    },
  },
  mounted() {
    this.$bus.$on("onShowEditor", (row) => {
      this.currentID = row.id;
      api
        .preUpdate({ id: row.id })
        .then((res) => {
          this.treeData = {
            name: res.data.result.cid,
            cid: res.data.result.cid, //这里name是为了点击编辑的时候视图能读取到，cid是为了修改能读到对应的数据
          };
          this.editorForm = {
            name: res.data.result.title,
            price: res.data.result.price,
            num: res.data.result.num,
            sellPoint: res.data.result.sellPoint,
          };
          this.uploadData = {
            url: res.data.result.image,
          };
          this.editorData = res.data.result.descs;
        })
        .catch((error) => {});
    });
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    dialogCategoryHandle() {
      this.dialogCategoryVisible = true;
    },
    dialogUploadHandle() {
      this.dialogUploadVisible = true;
    },
    getTreeData(data) {
      this.treeData = data;
      // console.log(this.treeData);
    },
    //预更新
    editorHandle() {
      api
        .update2({
          id: this.currentID,
          title: this.editorForm.name,
          cid: this.treeData.cid, //从类目选择而来
          sellPoint: this.editorForm.sellPoint,
          price: this.editorForm.price,
          num: this.editorForm.num,
          desc: this.editorData,
          image: this.uploadData.url,
        })
        .then((res) => {
          if(res.data.status === 200){
          this.dialogEditorVisible = false;
          this.$bus.$emit('onRefresh');//重新渲染
          this.$bus.$emit('newTotal');//更新页面的页数
          // this.addForm={};
          // this.treeData={};
          // this.uploadData={};
          // this.$bus.$emit('clearEditor');//清除富文本编辑器里面的内容，失效
          this.$message({
          message: '恭喜你，修改成功!',
          type: 'success'
        });
        }else{
          console.log('修改失败');
        }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUploadData(data) {
      if (data.url) {
        data.url = data.url.replace("upload", "http://localhost:3000");
      }
      this.uploadData = data;
    },
    getEditorData(data) {
      this.editorData = data;
    },
  },
};
</script>
  
  <style scoped>
.category {
  float: left;
}

.upload-img {
  width: 300px;
  float: left;
  margin-left: 20px;
}
</style>